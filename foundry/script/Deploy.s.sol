// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Script.sol";
import "../../contracts/Reputation.sol";
import "../../contracts/PoXRegistry.sol";
import "../../contracts/ChallengeManager.sol";

contract DeployPoX is Script {
    function run() external {
        vm.startBroadcast();
        
        // 1. Deploy Reputation
        Reputation reputation = new Reputation();
        console.log("Reputation deployed at:", address(reputation));
        
        // 2. Deploy Registry
        PoXRegistry registry = new PoXRegistry(address(reputation));
        console.log("PoXRegistry deployed at:", address(registry));
        
        // 3. Deploy ChallengeManager
        ChallengeManager challengeManager = new ChallengeManager(
            address(registry),
            address(reputation)
        );
        console.log("ChallengeManager deployed at:", address(challengeManager));
        
        // 4. Authorize contracts
        reputation.setAuthorized(address(registry), address(challengeManager));
        console.log("Contracts authorized!");
        
        vm.stopBroadcast();
        
        console.log("\n=== DEPLOYMENT COMPLETE ===");
        console.log("Reputation:", address(reputation));
        console.log("PoXRegistry:", address(registry));
        console.log("ChallengeManager:", address(challengeManager));
    }
}
