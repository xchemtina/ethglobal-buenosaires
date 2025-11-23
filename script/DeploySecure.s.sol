// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Script.sol";
import "../../contracts/ReputationSecure.sol";
import "../../contracts/PoXRegistrySecure.sol";
import "../../contracts/ChallengeManagerSecure.sol";

contract DeploySecure is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        console.log("=== Deploying Secure PoX Contracts ===\n");
        
        // 1. Deploy Reputation
        console.log("1. Deploying ReputationSecure...");
        ReputationSecure reputation = new ReputationSecure();
        console.log("   Address:", address(reputation));
        
        // 2. Deploy Registry
        console.log("\n2. Deploying PoXRegistrySecure...");
        PoXRegistrySecure registry = new PoXRegistrySecure(address(reputation));
        console.log("   Address:", address(registry));
        
        // 3. Deploy ChallengeManager
        console.log("\n3. Deploying ChallengeManagerSecure...");
        ChallengeManagerSecure challengeManager = new ChallengeManagerSecure(
            address(registry),
            address(reputation)
        );
        console.log("   Address:", address(challengeManager));
        
        // 4. Authorize contracts
        console.log("\n4. Authorizing contracts...");
        reputation.setAuthorized(address(registry), address(challengeManager));
        console.log("   Registry and ChallengeManager authorized");
        
        vm.stopBroadcast();
        
        console.log("\n=== Deployment Complete ===");
        console.log("Reputation:", address(reputation));
        console.log("Registry:", address(registry));
        console.log("ChallengeManager:", address(challengeManager));
        console.log("\nSave these addresses to .env!");
    }
}
