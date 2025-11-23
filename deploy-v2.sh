#!/bin/bash
# deploy-v2.sh
# Deploy PoX V2 contracts with experiment type support

set -e

echo "=== Deploying PoX V2 Contracts ==="
echo ""

# Check env vars
if [ -z "$PRIVATE_KEY" ]; then
  echo "Error: PRIVATE_KEY not set"
  exit 1
fi

if [ -z "$ARBITRUM_SEPOLIA_RPC" ]; then
  echo "Error: ARBITRUM_SEPOLIA_RPC not set"
  exit 1
fi

RPC="$ARBITRUM_SEPOLIA_RPC"
PK="$PRIVATE_KEY"

# 1. Deploy Reputation
echo "1. Deploying Reputation..."
REPUTATION_ADDR=$(forge create contracts/Reputation.sol:Reputation \
  --rpc-url "$RPC" \
  --private-key "$PK" \
  --json | jq -r '.deployedTo')

if [ -z "$REPUTATION_ADDR" ] || [ "$REPUTATION_ADDR" = "null" ]; then
  echo "Error: Failed to deploy Reputation"
  exit 1
fi

echo "   Reputation deployed at: $REPUTATION_ADDR"
echo ""

# 2. Deploy PoXRegistryV2
echo "2. Deploying PoXRegistryV2..."
REGISTRY_ADDR=$(forge create contracts/PoXRegistryV2.sol:PoXRegistryV2 \
  --rpc-url "$RPC" \
  --private-key "$PK" \
  --constructor-args "$REPUTATION_ADDR" \
  --json | jq -r '.deployedTo')

if [ -z "$REGISTRY_ADDR" ] || [ "$REGISTRY_ADDR" = "null" ]; then
  echo "Error: Failed to deploy PoXRegistryV2"
  exit 1
fi

echo "   PoXRegistryV2 deployed at: $REGISTRY_ADDR"
echo ""

# 3. Deploy PeerReviewManager
echo "3. Deploying PeerReviewManager..."
REVIEW_MANAGER_ADDR=$(forge create contracts/PeerReviewManager.sol:PeerReviewManager \
  --rpc-url "$RPC" \
  --private-key "$PK" \
  --constructor-args "$REGISTRY_ADDR" "$REPUTATION_ADDR" \
  --json | jq -r '.deployedTo')

if [ -z "$REVIEW_MANAGER_ADDR" ] || [ "$REVIEW_MANAGER_ADDR" = "null" ]; then
  echo "Error: Failed to deploy PeerReviewManager"
  exit 1
fi

echo "   PeerReviewManager deployed at: $REVIEW_MANAGER_ADDR"
echo ""

# 4. Authorize contracts
echo "4. Authorizing contracts..."
cast send "$REPUTATION_ADDR" \
  "setAuthorized(address,address)" \
  "$REGISTRY_ADDR" \
  "$REVIEW_MANAGER_ADDR" \
  --rpc-url "$RPC" \
  --private-key "$PK"

echo "   Contracts authorized"
echo ""

echo "=== Deployment Summary ==="
echo "Reputation:         $REPUTATION_ADDR"
echo "PoXRegistryV2:      $REGISTRY_ADDR"
echo "PeerReviewManager:  $REVIEW_MANAGER_ADDR"
echo ""
echo "Add these to your .env file:"
echo "REPUTATION_V2_ADDRESS=$REPUTATION_ADDR"
echo "REGISTRY_V2_ADDRESS=$REGISTRY_ADDR"
echo "REVIEW_MANAGER_ADDRESS=$REVIEW_MANAGER_ADDR"
