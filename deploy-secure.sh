#!/bin/bash
set -e

echo "=== Deploying Secure PoX Contracts ==="
echo ""

# Load .env
source .env

# Add 0x prefix if missing
if [[ ! $PRIVATE_KEY =~ ^0x ]]; then
    export PRIVATE_KEY="0x$PRIVATE_KEY"
fi

# Deploy
forge script foundry/script/DeploySecure.s.sol \
    --rpc-url https://api.calibration.node.glif.io/rpc/v1 \
    --broadcast \
    --legacy \
    --skip-simulation

echo ""
echo "=== Deployment Complete ==="
echo "Check broadcast/ folder for deployed addresses"
