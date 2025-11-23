// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/**
 * @title ReputationSecure
 * @notice Secure reputation ledger with overflow protection and authorization locking
 * @dev Implements safe signed integer math and immutable authorization
 */
contract ReputationSecure {
    mapping(address => int256) public reputation;
    
    address public registry;
    address public challengeManager;
    address public immutable owner;
    bool public authorizationLocked;
    
    // Reputation bounds (int128 max for safety margin)
    int256 public constant MAX_REPUTATION = type(int128).max;
    int256 public constant MIN_REPUTATION = type(int128).min;
    
    event ReputationAdjusted(address indexed user, int256 delta, int256 newScore);
    event AuthorizedSet(address indexed registry, address indexed challengeManager);
    event AuthorizationLocked();
    
    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == registry || msg.sender == challengeManager,
            "not authorized"
        );
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @notice Set authorized contracts (one-time unless unlocked)
     * @param _registry Address of PoXRegistry contract
     * @param _challengeManager Address of ChallengeManager contract
     */
    function setAuthorized(address _registry, address _challengeManager) 
        external 
        onlyOwner 
    {
        require(!authorizationLocked, "authorization locked");
        require(_registry != address(0) && _challengeManager != address(0), "zero address");
        
        registry = _registry;
        challengeManager = _challengeManager;
        
        emit AuthorizedSet(_registry, _challengeManager);
    }
    
    /**
     * @notice Permanently lock authorization (cannot be changed)
     */
    function lockAuthorization() external onlyOwner {
        require(registry != address(0) && challengeManager != address(0), "not initialized");
        authorizationLocked = true;
        emit AuthorizationLocked();
    }
    
    /**
     * @notice Adjust user reputation with overflow protection
     * @param user Address of user
     * @param delta Change in reputation (can be negative)
     */
    function adjustReputation(address user, int256 delta) 
        external 
        onlyAuthorized 
    {
        require(user != address(0), "zero address");
        
        int256 oldScore = reputation[user];
        int256 newScore;
        
        // Safe signed integer math
        if (delta > 0) {
            require(oldScore <= MAX_REPUTATION - delta, "reputation overflow");
            newScore = oldScore + delta;
        } else if (delta < 0) {
            require(oldScore >= MIN_REPUTATION - delta, "reputation underflow");
            newScore = oldScore + delta;
        } else {
            newScore = oldScore;
        }
        
        reputation[user] = newScore;
        emit ReputationAdjusted(user, delta, newScore);
    }
    
    function getReputation(address user) external view returns (int256) {
        return reputation[user];
    }
}
