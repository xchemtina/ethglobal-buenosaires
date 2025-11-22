// contracts/PoXRegistry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IReputation {
    function adjustReputation(address user, int256 delta) external;
}

contract PoXRegistry {
    struct Experiment {
        uint256 id;
        address submitter;
        string cid;            // Synapse pieceCid (string for convenience)
        bytes32 dataHash;      // hash of raw data (points + metadata)
        bytes32 metricsHash;   // hash of analysis output
        uint256 difficulty;    // arbitrary units
        int256 initialRV;      // scaled RV (e.g. *1e6)
        uint64 submittedAt;    // unix timestamp
    }

    uint256 public nextExperimentId;
    mapping(uint256 => Experiment) private experiments;

    IReputation public reputation;

    event ExperimentRegistered(
        uint256 indexed id,
        address indexed submitter,
        string cid,
        bytes32 dataHash,
        bytes32 metricsHash,
        uint256 difficulty,
        int256 initialRV,
        uint64 submittedAt
    );

    constructor(address reputationAddress) {
        reputation = IReputation(reputationAddress);
    }

    function registerExperiment(
        string calldata cid,
        bytes32 dataHash,
        bytes32 metricsHash,
        uint256 difficulty,
        int256 initialRV
    ) external returns (uint256 experimentId) {
        experimentId = nextExperimentId++;

        experiments[experimentId] = Experiment({
            id: experimentId,
            submitter: msg.sender,
            cid: cid,
            dataHash: dataHash,
            metricsHash: metricsHash,
            difficulty: difficulty,
            initialRV: initialRV,
            submittedAt: uint64(block.timestamp)
        });

        if (address(reputation) != address(0) && initialRV != 0) {
            reputation.adjustReputation(msg.sender, initialRV);
        }

        emit ExperimentRegistered(
            experimentId,
            msg.sender,
            cid,
            dataHash,
            metricsHash,
            difficulty,
            initialRV,
            uint64(block.timestamp)
        );
    }

    function getExperiment(
        uint256 experimentId
    )
        external
        view
        returns (
            uint256 id,
            address submitter,
            string memory cid,
            bytes32 dataHash,
            bytes32 metricsHash,
            uint256 difficulty,
            int256 initialRV,
            uint64 submittedAt
        )
    {
        Experiment storage e = experiments[experimentId];
        return (
            e.id,
            e.submitter,
            e.cid,
            e.dataHash,
            e.metricsHash,
            e.difficulty,
            e.initialRV,
            e.submittedAt
        );
    }

    function totalExperiments() external view returns (uint256) {
        return nextExperimentId;
    }
}
