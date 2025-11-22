// contracts/Reputation.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Reputation {
    mapping(address => int256) public reputation;

    address public owner;
    address public registry;
    address public challengeManager;

    event ReputationAdjusted(address indexed user, int256 delta, int256 newScore);
    event AuthorizedSet(address indexed registry, address indexed challengeManager);

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

    function setAuthorized(address _registry, address _challengeManager) external onlyOwner {
        registry = _registry;
        challengeManager = _challengeManager;
        emit AuthorizedSet(_registry, _challengeManager);
    }

    function adjustReputation(address user, int256 delta) external onlyAuthorized {
        int256 newScore = reputation[user] + delta;
        reputation[user] = newScore;
        emit ReputationAdjusted(user, delta, newScore);
    }
}
