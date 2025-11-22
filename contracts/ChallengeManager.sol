// contracts/ChallengeManager.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IPoXRegistry {
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
        );
}

interface IReputation2 {
    function adjustReputation(address user, int256 delta) external;
}

contract ChallengeManager {
    struct Challenge {
        uint256 id;
        uint256 experimentId;
        address challenger;
        bytes32 computedMetricsHash;
        bool resolved;
        bool experimentValid; // resolution outcome
    }

    address public owner;
    IPoXRegistry public registry;
    IReputation2 public reputation;

    uint256 public nextChallengeId;
    mapping(uint256 => Challenge) public challenges;

    event ChallengeOpened(
        uint256 indexed id,
        uint256 indexed experimentId,
        address indexed challenger,
        bytes32 computedMetricsHash
    );

    event ChallengeResolved(
        uint256 indexed id,
        bool experimentValid,
        int256 submitterDelta,
        int256 challengerDelta
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(address registryAddr, address reputationAddr) {
        owner = msg.sender;
        registry = IPoXRegistry(registryAddr);
        reputation = IReputation2(reputationAddr);
    }

    function openChallenge(
        uint256 experimentId,
        bytes32 computedMetricsHash
    ) external returns (uint256 challengeId) {
        challengeId = nextChallengeId++;

        challenges[challengeId] = Challenge({
            id: challengeId,
            experimentId: experimentId,
            challenger: msg.sender,
            computedMetricsHash: computedMetricsHash,
            resolved: false,
            experimentValid: false
        });

        emit ChallengeOpened(
            challengeId,
            experimentId,
            msg.sender,
            computedMetricsHash
        );
    }

    /**
     * MVP resolution:
     *  - experimentValid = true  => challenger confirms metric hash
     *  - experimentValid = false => challenger proves mismatch
     *
     * This function is owner-gated for now; in a next iteration you
     * can replace it with multi-sig / off-chain voting.
     */
    function resolveChallenge(
        uint256 challengeId,
        bool experimentValid
    ) external onlyOwner {
        Challenge storage c = challenges[challengeId];
        require(!c.resolved, "already resolved");

        (
            uint256 id,
            address submitter,
            ,
            ,
            bytes32 canonicalMetricsHash,
            uint256 difficulty,
            ,
            /*initialRV*/
            uint64 submittedAt
        ) = registry.getExperiment(c.experimentId);

        require(id == c.experimentId, "bad experiment");

        c.resolved = true;
        c.experimentValid = experimentValid;

        // Simplified scoring based on difficulty
        int256 submitterDelta;
        int256 challengerDelta;

        if (experimentValid) {
            // Challenger confirms correctness: small positive reward
            submitterDelta = int256(int64(difficulty));          // +D
            challengerDelta = int256(int64(difficulty / 10));    // +D/10
        } else {
            // Challenger flags mismatch: slash submitter, reward challenger
            submitterDelta = -int256(int64(difficulty));
            challengerDelta = int256(int64(difficulty));
        }

        reputation.adjustReputation(submitter, submitterDelta);
        reputation.adjustReputation(c.challenger, challengerDelta);

        emit ChallengeResolved(
            challengeId,
            experimentValid,
            submitterDelta,
            challengerDelta
        );
    }
}
