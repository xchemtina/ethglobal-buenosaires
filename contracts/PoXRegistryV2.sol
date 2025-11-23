// contracts/PoXRegistryV2.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IReputation {
    function adjustReputation(address user, int256 delta) external;
}

contract PoXRegistryV2 {
    enum ExperimentType {
        UNKNOWN,
        HPLC,
        NMR_1H,
        NMR_13C,
        NMR_2D,
        PXRD,
        MS,
        MS_MS,
        GC_MS,
        AIR_QUALITY
    }

    struct Experiment {
        uint256 id;
        address submitter;
        string cid;            // Synapse pieceCid (string for convenience)
        bytes32 dataHash;      // hash of raw data (points + metadata)
        bytes32 metricsHash;   // hash of analysis output
        uint256 difficulty;    // arbitrary units
        int256 initialRV;      // scaled RV (e.g. *1e6)
        uint64 submittedAt;    // unix timestamp
        ExperimentType expType; // NEW: experiment type
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
        uint64 submittedAt,
        ExperimentType expType
    );

    constructor(address reputationAddress) {
        reputation = IReputation(reputationAddress);
    }

    /**
     * @notice Register experiment with auto-detected type based on difficulty
     * Heuristic:
     *   - difficulty >= 50  => NMR_1H (complex spectra)
     *   - difficulty >= 25  => AIR_QUALITY (multi-sensor)
     *   - difficulty >= 10  => HPLC (chromatography)
     *   - else              => UNKNOWN
     */
    function registerExperiment(
        string calldata cid,
        bytes32 dataHash,
        bytes32 metricsHash,
        uint256 difficulty,
        int256 initialRV
    ) external returns (uint256 experimentId) {
        ExperimentType expType = detectType(difficulty);
        return registerExperimentWithType(cid, dataHash, metricsHash, difficulty, initialRV, expType);
    }

    /**
     * @notice Register experiment with explicit type (for advanced users)
     */
    function registerExperimentWithType(
        string calldata cid,
        bytes32 dataHash,
        bytes32 metricsHash,
        uint256 difficulty,
        int256 initialRV,
        ExperimentType expType
    ) public returns (uint256 experimentId) {
        experimentId = nextExperimentId++;

        experiments[experimentId] = Experiment({
            id: experimentId,
            submitter: msg.sender,
            cid: cid,
            dataHash: dataHash,
            metricsHash: metricsHash,
            difficulty: difficulty,
            initialRV: initialRV,
            submittedAt: uint64(block.timestamp),
            expType: expType
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
            uint64(block.timestamp),
            expType
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
            uint64 submittedAt,
            ExperimentType expType
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
            e.submittedAt,
            e.expType
        );
    }

    function getExperimentType(uint256 experimentId) external view returns (ExperimentType) {
        return experiments[experimentId].expType;
    }

    function totalExperiments() external view returns (uint256) {
        return nextExperimentId;
    }

    /**
     * @notice Detect experiment type from difficulty score
     * This is a heuristic based on current scoring:
     *   - NMR: D = 8 + 0.8*nPeaks + 2.0*complexPeaks => typically 25-100+
     *   - AIR_QUALITY: D = 15 + sensor_count => typically 15-30
     *   - HPLC: D = 1 + nPeaks + 8*noise + 0.5*ln(nPoints) => typically 5-25
     */
    function detectType(uint256 difficulty) internal pure returns (ExperimentType) {
        if (difficulty >= 50) {
            return ExperimentType.NMR_1H;
        } else if (difficulty >= 25) {
            return ExperimentType.AIR_QUALITY;
        } else if (difficulty >= 10) {
            return ExperimentType.HPLC;
        } else {
            return ExperimentType.UNKNOWN;
        }
    }
}
