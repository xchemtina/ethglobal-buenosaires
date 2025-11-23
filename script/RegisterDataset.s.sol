pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../contracts/PoXRegistry.sol";

contract RegisterDataset is Script {
    function submit(bytes32 dataHash, string calldata cid, uint256 difficulty) 
        external 
    {
        vm.startBroadcast();
        PoXRegistry reg = PoXRegistry(0xYOUR_REGISTRY);
        reg.submitExperiment(dataHash, cid, difficulty);
        vm.stopBroadcast();
    }
}

