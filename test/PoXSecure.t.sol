// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../contracts/ReputationSecure.sol";
import "../contracts/PoXRegistrySecure.sol";
import "../contracts/ChallengeManagerSecure.sol";

contract PoXSecureTest is Test {
    ReputationSecure reputation;
    PoXRegistrySecure registry;
    ChallengeManagerSecure challengeManager;
    
    address alice = address(0x1);
    address bob = address(0x2);
    
    function setUp() public {
        reputation = new ReputationSecure();
        registry = new PoXRegistrySecure(address(reputation));
        challengeManager = new ChallengeManagerSecure(
            address(registry),
            address(reputation)
        );
        
        reputation.setAuthorized(address(registry), address(challengeManager));
        
        vm.deal(alice, 1 ether);
        vm.deal(bob, 1 ether);
    }
    
    // === CRITICAL INPUT VALIDATION TESTS ===
    
    function testCannotRegisterWithEmptyCID() public {
        vm.prank(alice);
        vm.expectRevert("invalid CID length");
        registry.registerExperiment("", keccak256("data"), keccak256("metrics"), 100, 1000);
    }
    
    function testCannotRegisterWithZeroDataHash() public {
        vm.prank(alice);
        vm.expectRevert("zero dataHash");
        registry.registerExperiment("QmTest123", bytes32(0), keccak256("metrics"), 100, 1000);
    }
    
    function testCannotRegisterWithZeroDifficulty() public {
        vm.prank(alice);
        vm.expectRevert("difficulty out of range");
        registry.registerExperiment(
            "QmTest123",
            keccak256("data"),
            keccak256("metrics"),
            0,
            1000
        );
    }
    
    function testCannotRegisterWithNegativeRV() public {
        vm.prank(alice);
        vm.expectRevert("negative RV");
        registry.registerExperiment(
            "QmTest123",
            keccak256("data"),
            keccak256("metrics"),
            100,
            -1000
        );
    }
    
    // === OVERFLOW PROTECTION TESTS ===
    
    function testCannotOverflowReputation() public {
        vm.prank(address(registry));
        reputation.adjustReputation(alice, type(int128).max);
        
        vm.prank(address(registry));
        vm.expectRevert("reputation overflow");
        reputation.adjustReputation(alice, 1);
    }
    
    function testCannotUnderflowReputation() public {
        vm.prank(address(registry));
        reputation.adjustReputation(alice, type(int128).min);
        
        vm.prank(address(registry));
        vm.expectRevert("reputation underflow");
        reputation.adjustReputation(alice, -1);
    }
    
    // === STAKE REQUIREMENT TESTS ===
    
    function testCannotChallengeWithoutStake() public {
        vm.prank(bob);
        vm.expectRevert("insufficient stake");
        challengeManager.openChallenge(0, keccak256("computed"));
    }
    
    function testChallengeWithStake() public {
        // Register experiment first
        vm.prank(alice);
        uint256 expId = registry.registerExperiment(
            "QmTest123",
            keccak256("data"),
            keccak256("metrics"),
            100,
            1000
        );
        
        // Bob challenges with stake
        vm.prank(bob);
        uint256 challengeId = challengeManager.openChallenge{value: 0.01 ether}(
            expId,
            keccak256("computed")
        );
        
        // Verify challenge created
        (uint256 experimentId, address challenger, bool resolved,,,) = 
            challengeManager.getChallengeStatus(challengeId);
        
        assertEq(experimentId, expId);
        assertEq(challenger, bob);
        assertFalse(resolved);
    }
    
    // === INTEGRATION TESTS ===
    
    function testFullSuccessFlow() public {
        // 1. Register experiment
        vm.prank(alice);
        uint256 expId = registry.registerExperiment(
            "QmTest123",
            keccak256("data"),
            keccak256("metrics"),
            100,
            1000
        );
        
        // Verify experiment stored
        (uint256 id, address submitter,,,, uint256 difficulty,,) = registry.getExperiment(expId);
        assertEq(id, expId);
        assertEq(submitter, alice);
        assertEq(difficulty, 100);
        
        // 2. Bob challenges with stake
        vm.prank(bob);
        uint256 challengeId = challengeManager.openChallenge{value: 0.01 ether}(
            expId,
            keccak256("computed")
        );
        
        // 3. Resolve challenge (experiment valid)
        challengeManager.resolveChallenge(challengeId, true);
        
        // 4. Verify reputations
        assertEq(reputation.getReputation(alice), 1100);  // 1000 initial + 100 reward
        assertGt(reputation.getReputation(bob), 0);  // Verification reward
    }
    
    function testChallengeTimeout() public {
        // Register experiment
        vm.prank(alice);
        uint256 expId = registry.registerExperiment(
            "QmTest123",
            keccak256("data"),
            keccak256("metrics"),
            100,
            1000
        );
        
        // Open challenge
        vm.prank(bob);
        uint256 bobBalanceBefore = bob.balance;
        uint256 challengeId = challengeManager.openChallenge{value: 0.01 ether}(
            expId,
            keccak256("computed")
        );
        
        // Fast-forward past timeout
        vm.warp(block.timestamp + 7 days + 1);
        
        // Expire challenge
        challengeManager.expireChallenge(challengeId);
        
        // Verify stake returned
        assertEq(bob.balance, bobBalanceBefore);
    }
    
    // === GAS OPTIMIZATION VERIFICATION ===
    
    function testGasOptimization() public {
        vm.prank(alice);
        uint256 gasBefore = gasleft();
        registry.registerExperiment(
            "QmTest123",
            keccak256("data"),
            keccak256("metrics"),
            100,
            1000
        );
        uint256 gasUsed = gasBefore - gasleft();
        
        // Should be < 200k gas (includes reentrancy + pause overhead)
        assertLt(gasUsed, 200000, "Gas usage too high");
    }
}
