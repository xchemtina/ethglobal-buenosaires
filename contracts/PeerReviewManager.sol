// contracts/PeerReviewManager.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

interface IPoXRegistryV2 {
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
        );

    function getExperimentType(uint256 experimentId) external view returns (ExperimentType);
}

interface IReputation {
    function adjustReputation(address user, int256 delta) external;
}

contract PeerReviewManager {
    enum ReviewType {
        VERIFICATION,      // Confirms data is correct
        REINTERPRETATION,  // Proposes alternative analysis
        ERROR_DETECTION    // Flags errors/mistakes
    }

    struct PeerReview {
        uint256 id;
        uint256 experimentId;
        address reviewer;
        bytes32 alternativeHash;    // CID hash of alternative interpretation
        string justificationCID;    // IPFS CID for detailed explanation
        ReviewType reviewType;
        uint64 submittedAt;
        bool resolved;
        bool originalValid;         // Resolution outcome
    }

    address public owner;
    IPoXRegistryV2 public registry;
    IReputation public reputation;

    uint256 public nextReviewId;
    mapping(uint256 => PeerReview) public reviews;

    // Experiment type => reputation multiplier (scaled by 10 for precision)
    // E.g., 10 = 1×, 20 = 2×, 30 = 3×
    mapping(IPoXRegistryV2.ExperimentType => uint256) public reputationMultipliers;

    event ReviewSubmitted(
        uint256 indexed id,
        uint256 indexed experimentId,
        address indexed reviewer,
        bytes32 alternativeHash,
        string justificationCID,
        ReviewType reviewType,
        uint64 submittedAt
    );

    event ReviewResolved(
        uint256 indexed id,
        bool originalValid,
        int256 submitterDelta,
        int256 reviewerDelta,
        uint256 multiplier
    );

    event MultiplierUpdated(
        IPoXRegistryV2.ExperimentType indexed expType,
        uint256 oldMultiplier,
        uint256 newMultiplier
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor(address registryAddr, address reputationAddr) {
        owner = msg.sender;
        registry = IPoXRegistryV2(registryAddr);
        reputation = IReputation(reputationAddr);

        // Initialize reputation multipliers (scaled by 10)
        reputationMultipliers[IPoXRegistryV2.ExperimentType.UNKNOWN] = 10;      // 1×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.HPLC] = 10;         // 1×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.NMR_1H] = 20;       // 2×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.NMR_13C] = 20;      // 2×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.NMR_2D] = 25;       // 2.5×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.PXRD] = 30;         // 3× (highest!)
        reputationMultipliers[IPoXRegistryV2.ExperimentType.MS] = 15;           // 1.5×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.MS_MS] = 20;        // 2×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.GC_MS] = 15;        // 1.5×
        reputationMultipliers[IPoXRegistryV2.ExperimentType.AIR_QUALITY] = 10;  // 1×
    }

    /**
     * @notice Submit a peer review for an experiment
     * @param experimentId ID of the experiment being reviewed
     * @param alternativeHash Hash of alternative interpretation (0x0 if just verification)
     * @param justificationCID IPFS CID containing detailed explanation/analysis
     * @param reviewType Type of review being submitted
     */
    function submitReview(
        uint256 experimentId,
        bytes32 alternativeHash,
        string calldata justificationCID,
        ReviewType reviewType
    ) external returns (uint256 reviewId) {
        reviewId = nextReviewId++;

        reviews[reviewId] = PeerReview({
            id: reviewId,
            experimentId: experimentId,
            reviewer: msg.sender,
            alternativeHash: alternativeHash,
            justificationCID: justificationCID,
            reviewType: reviewType,
            submittedAt: uint64(block.timestamp),
            resolved: false,
            originalValid: false
        });

        emit ReviewSubmitted(
            reviewId,
            experimentId,
            msg.sender,
            alternativeHash,
            justificationCID,
            reviewType,
            uint64(block.timestamp)
        );
    }

    /**
     * @notice Resolve a peer review (owner-gated for MVP)
     * @param reviewId ID of the review to resolve
     * @param originalValid Whether the original experiment was correct
     * 
     * Reputation logic:
     *   If originalValid = true (review confirms correctness):
     *     - Submitter: +D × multiplier
     *     - Reviewer: +(D/10) × multiplier (small reward for verification)
     *   If originalValid = false (review finds error):
     *     - Submitter: -(D × multiplier) (slashed)
     *     - Reviewer: +(D × multiplier) (full reward for finding error)
     */
    function resolveReview(
        uint256 reviewId,
        bool originalValid
    ) external onlyOwner {
        PeerReview storage review = reviews[reviewId];
        require(!review.resolved, "already resolved");

        (
            uint256 id,
            address submitter,
            ,
            ,
            ,
            uint256 difficulty,
            ,
            ,
            IPoXRegistryV2.ExperimentType expType
        ) = registry.getExperiment(review.experimentId);

        require(id == review.experimentId, "bad experiment");

        review.resolved = true;
        review.originalValid = originalValid;

        // Get type-specific multiplier
        uint256 multiplier = reputationMultipliers[expType];
        require(multiplier > 0, "invalid multiplier");

        // Calculate reputation deltas
        int256 submitterDelta;
        int256 reviewerDelta;

        if (originalValid) {
            // Review confirms correctness
            // Submitter gets full reward × multiplier
            submitterDelta = int256((difficulty * multiplier) / 10);
            
            // Reviewer gets small reward for verification (10% of full reward)
            reviewerDelta = int256((difficulty * multiplier) / 100);
        } else {
            // Review finds error
            // Submitter loses reputation (slashed) × multiplier
            submitterDelta = -int256((difficulty * multiplier) / 10);
            
            // Reviewer gets full reward × multiplier
            reviewerDelta = int256((difficulty * multiplier) / 10);
        }

        // Apply reputation adjustments
        reputation.adjustReputation(submitter, submitterDelta);
        reputation.adjustReputation(review.reviewer, reviewerDelta);

        emit ReviewResolved(
            reviewId,
            originalValid,
            submitterDelta,
            reviewerDelta,
            multiplier
        );
    }

    /**
     * @notice Update reputation multiplier for an experiment type
     * @param expType Experiment type to update
     * @param newMultiplier New multiplier (scaled by 10, e.g. 20 = 2×)
     */
    function setReputationMultiplier(
        IPoXRegistryV2.ExperimentType expType,
        uint256 newMultiplier
    ) external onlyOwner {
        require(newMultiplier > 0 && newMultiplier <= 100, "invalid multiplier");
        
        uint256 oldMultiplier = reputationMultipliers[expType];
        reputationMultipliers[expType] = newMultiplier;

        emit MultiplierUpdated(expType, oldMultiplier, newMultiplier);
    }

    /**
     * @notice Get all reviews for an experiment
     * @param experimentId Experiment ID to query
     * @return Array of review IDs
     */
    function getReviewsForExperiment(uint256 experimentId) external view returns (uint256[] memory) {
        // Count reviews for this experiment
        uint256 count = 0;
        for (uint256 i = 0; i < nextReviewId; i++) {
            if (reviews[i].experimentId == experimentId) {
                count++;
            }
        }

        // Build array
        uint256[] memory reviewIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextReviewId; i++) {
            if (reviews[i].experimentId == experimentId) {
                reviewIds[index] = i;
                index++;
            }
        }

        return reviewIds;
    }

    /**
     * @notice Get review details
     */
    function getReview(uint256 reviewId) external view returns (
        uint256 id,
        uint256 experimentId,
        address reviewer,
        bytes32 alternativeHash,
        string memory justificationCID,
        ReviewType reviewType,
        uint64 submittedAt,
        bool resolved,
        bool originalValid
    ) {
        PeerReview storage r = reviews[reviewId];
        return (
            r.id,
            r.experimentId,
            r.reviewer,
            r.alternativeHash,
            r.justificationCID,
            r.reviewType,
            r.submittedAt,
            r.resolved,
            r.originalValid
        );
    }

    function totalReviews() external view returns (uint256) {
        return nextReviewId;
    }
}
