// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Script.sol";
import "../../contracts/Reputation.sol";
import "../../contracts/PoXRegistryV2.sol";
import "../../contracts/PeerReviewManager.sol";

contract DeployV2 is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy Reputation ledger
        Reputation reputation = new Reputation();
        console.log("Reputation deployed at:", address(reputation));

        // 2. Deploy PoXRegistryV2 with type support
        PoXRegistryV2 registry = new PoXRegistryV2(address(reputation));
        console.log("PoXRegistryV2 deployed at:", address(registry));

        // 3. Deploy PeerReviewManager with type-specific multipliers
        PeerReviewManager reviewManager = new PeerReviewManager(
            address(registry),
            address(reputation)
        );
        console.log("PeerReviewManager deployed at:", address(reviewManager));

        // 4. Authorize contracts to adjust reputation
        reputation.setAuthorized(address(registry), address(reviewManager));
        console.log("Contracts authorized");

        vm.stopBroadcast();

        // Print deployment summary
        console.log("\n=== Deployment Summary ===");
        console.log("Reputation:         ", address(reputation));
        console.log("PoXRegistryV2:      ", address(registry));
        console.log("PeerReviewManager:  ", address(reviewManager));
        console.log("\nSave these addresses to your .env file:");
        console.log("REPUTATION_ADDRESS=", address(reputation));
        console.log("REGISTRY_V2_ADDRESS=", address(registry));
        console.log("REVIEW_MANAGER_ADDRESS=", address(reviewManager));
    }
}
