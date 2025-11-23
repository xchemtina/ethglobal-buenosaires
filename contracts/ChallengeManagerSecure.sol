// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IPoXRegistryForChallenge {
    function getExperiment(uint256 experimentId)
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

interface IReputationForChallenge {
    function adjustReputation(address user, int256 delta) external;
}

/**
 * @title ChallengeManagerSecure
 * @notice Secure challenge system with economic stakes and timeouts
 * @dev Implements stake requirements, challenge expiration, and reentrancy protection
 */
contract ChallengeManagerSecure is ReentrancyGuard {
    struct Challenge {
        uint256 id;
        uint256 experimentId;
        address challenger;
        bytes32 computedMetricsHash;
        uint64 createdAt;
        uint64 deadline;
        bool resolved;
        bool experimentValid;
    }
    
    IPoXRegistryForChallenge public immutable registry;
    IReputationForChallenge public immutable reputation;
    address public immutable owner;
    
    uint256 public nextChallengeId;
    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => uint256) public challengeStakes;
    
    // Economic parameters
    uint256 public challengeStake = 0.01 ether;
    uint256 public challengeTimeout = 7 days;
    uint256 public verificationRewardDivisor = 10;
    
    event ChallengeOpened(
        uint256 indexed id,
        uint256 indexed experimentId,
        address indexed challenger,
        bytes32 computedMetricsHash,
        uint256 stake,
        uint64 deadline
    );
    
    event ChallengeResolved(
        uint256 indexed id,
        uint256 indexed experimentId,
        bool experimentValid,
        int256 submitterDelta,
        int256 challengerDelta
    );
    
    event ChallengeExpired(uint256 indexed id);
    event StakeUpdated(uint256 newStake);
    event TimeoutUpdated(uint256 newTimeout);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }
    
    constructor(address registryAddr, address reputationAddr) {
        require(registryAddr != address(0) && reputationAddr != address(0), "zero address");
        registry = IPoXRegistryForChallenge(registryAddr);
        reputation = IReputationForChallenge(reputationAddr);
        owner = msg.sender;
    }
    
    /**
     * @notice Open challenge with stake requirement
     * @param experimentId ID of experiment to challenge
     * @param computedMetricsHash Challenger's computed metrics hash
     * @return challengeId Unique challenge ID
     */
    function openChallenge(uint256 experimentId, bytes32 computedMetricsHash)
        external
        payable
        nonReentrant
        returns (uint256 challengeId)
    {
        require(msg.value >= challengeStake, "insufficient stake");
        require(computedMetricsHash != bytes32(0), "zero hash");
        
        // Verify experiment exists
        (uint256 id,,,,,,,) = registry.getExperiment(experimentId);
        require(id == experimentId, "experiment not found");
        
        challengeId = nextChallengeId;
        unchecked {
            nextChallengeId++;
        }
        
        uint64 deadline = uint64(block.timestamp + challengeTimeout);
        
        challenges[challengeId] = Challenge({
            id: challengeId,
            experimentId: experimentId,
            challenger: msg.sender,
            computedMetricsHash: computedMetricsHash,
            createdAt: uint64(block.timestamp),
            deadline: deadline,
            resolved: false,
            experimentValid: false
        });
        
        challengeStakes[challengeId] = msg.value;
        
        emit ChallengeOpened(
            challengeId,
            experimentId,
            msg.sender,
            computedMetricsHash,
            msg.value,
            deadline
        );
    }
    
    /**
     * @notice Resolve challenge (owner-gated for MVP)
     * @param challengeId ID of challenge to resolve
     * @param experimentValid Whether experiment is valid
     */
    function resolveChallenge(uint256 challengeId, bool experimentValid)
        external
        onlyOwner
        nonReentrant
    {
        Challenge storage c = challenges[challengeId];
        require(!c.resolved, "already resolved");
        require(block.timestamp <= c.deadline, "challenge expired");
        
        (
            ,  // id
            address submitter,
            ,  // cid
            ,  // dataHash
            ,  // metricsHash
            uint256 difficulty,
            ,  // initialRV
             // submittedAt
        ) = registry.getExperiment(c.experimentId);
        
        c.resolved = true;
        c.experimentValid = experimentValid;
        
        uint256 stake = challengeStakes[challengeId];
        int256 submitterDelta;
        int256 challengerDelta;
        
        if (experimentValid) {
            // Experiment valid: challenger verifies, gets small reward
            submitterDelta = int256(difficulty);
            challengerDelta = int256(difficulty / verificationRewardDivisor);
            
            // Refund stake to challenger
            (bool success,) = payable(c.challenger).call{value: stake}("");
            require(success, "refund failed");
        } else {
            // Experiment invalid: slash submitter, reward challenger
            submitterDelta = -int256(difficulty);
            challengerDelta = int256(difficulty);
            
            // Forfeit stake to submitter (partial compensation)
            (bool success,) = payable(submitter).call{value: stake}("");
            require(success, "forfeit failed");
        }
        
        // Update reputations
        reputation.adjustReputation(submitter, submitterDelta);
        reputation.adjustReputation(c.challenger, challengerDelta);
        
        emit ChallengeResolved(
            challengeId,
            c.experimentId,
            experimentValid,
            submitterDelta,
            challengerDelta
        );
    }
    
    /**
     * @notice Expire unresolved challenge after timeout
     * @param challengeId ID of challenge to expire
     */
    function expireChallenge(uint256 challengeId) external nonReentrant {
        Challenge storage c = challenges[challengeId];
        require(!c.resolved, "already resolved");
        require(block.timestamp > c.deadline, "not expired");
        
        c.resolved = true;
        c.experimentValid = true;  // Default to valid
        
        // Return stake to challenger
        uint256 stake = challengeStakes[challengeId];
        (bool success,) = payable(c.challenger).call{value: stake}("");
        require(success, "refund failed");
        
        emit ChallengeExpired(challengeId);
    }
    
    // Configuration functions
    function updateChallengeStake(uint256 newStake) external onlyOwner {
        require(newStake > 0, "zero stake");
        challengeStake = newStake;
        emit StakeUpdated(newStake);
    }
    
    function updateChallengeTimeout(uint256 newTimeout) external onlyOwner {
        require(newTimeout >= 1 days && newTimeout <= 30 days, "invalid timeout");
        challengeTimeout = newTimeout;
        emit TimeoutUpdated(newTimeout);
    }
    
    // Query functions
    function getChallengeStatus(uint256 challengeId)
        external
        view
        returns (
            uint256 experimentId,
            address challenger,
            bool resolved,
            bool experimentValid,
            uint64 deadline,
            uint256 stake
        )
    {
        Challenge storage c = challenges[challengeId];
        return (
            c.experimentId,
            c.challenger,
            c.resolved,
            c.experimentValid,
            c.deadline,
            challengeStakes[challengeId]
        );
    }
}
