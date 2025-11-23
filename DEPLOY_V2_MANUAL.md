# Manual Deployment Guide for PoX V2 Contracts

Since automated deployment is having issues, here's the manual deployment process:

## Prerequisites

```bash
export PRIVATE_KEY="f332f47b3005a8718b3041ad15c685d92b7cee0c01334e9e5f8f76ef348967d6"
export RPC="https://api.calibration.node.glif.io/rpc/v1"
export REPUTATION_ADDR="0xFBF4854D38C77bD4B74fb0c65d9C249fd7bdeFA1"  # Existing Reputation contract
```

## Step 1: Deploy PoXRegistryV2

```bash
cd /Users/crischimiadao/ETHGlobalBuenosAires

# Get bytecode
BYTECODE=$(forge inspect contracts/PoXRegistryV2.sol:PoXRegistryV2 bytecode)

# Encode constructor args (Reputation address)
CONSTRUCTOR_ARGS=$(cast abi-encode "constructor(address)" "0xFBF4854D38C77bD4B74fb0c65d9C249fd7bdeFA1")

# Deploy
cast send --create "$BYTECODE$CONSTRUCTOR_ARGS" \
  --rpc-url "$RPC" \
  --private-key "$PRIVATE_KEY" \
  --gas-limit 5000000

# Note the deployed address from the output
export REGISTRY_V2_ADDR="<address_from_output>"
```

## Step 2: Deploy PeerReviewManager

```bash
# Get bytecode
BYTECODE=$(forge inspect contracts/PeerReviewManager.sol:PeerReviewManager bytecode)

# Encode constructor args (Registry address, Reputation address)
CONSTRUCTOR_ARGS=$(cast abi-encode "constructor(address,address)" "$REGISTRY_V2_ADDR" "0xFBF4854D38C77bD4B74fb0c65d9C249fd7bdeFA1")

# Deploy
cast send --create "$BYTECODE$CONSTRUCTOR_ARGS" \
  --rpc-url "$RPC" \
  --private-key "$PRIVATE_KEY" \
  --gas-limit 5000000

# Note the deployed address
export REVIEW_MANAGER_ADDR="<address_from_output>"
```

## Step 3: Authorize Contracts

Since we're reusing the existing Reputation contract, we need to update the authorization:

```bash
# Call setAuthorized on Reputation
cast send "0xFBF4854D38C77bD4B74fb0c65d9C249fd7bdeFA1" \
  "setAuthorized(address,address)" \
  "$REGISTRY_V2_ADDR" \
  "$REVIEW_MANAGER_ADDR" \
  --rpc-url "$RPC" \
  --private-key "$PRIVATE_KEY"
```

This will overwrite the old authorization (old Registry + old ChallengeManager) with the new one.

## Alternative: Keep Both Systems Running

If you want to keep the old system running alongside the new one, you'll need to:

1. Deploy a NEW Reputation contract for V2
2. Deploy PoXRegistryV2 pointing to the NEW Reputation
3. Deploy PeerReviewManager pointing to PoXRegistryV2 and NEW Reputation
4. Authorize both contracts on the NEW Reputation

This keeps V1 (old contracts) and V2 (new contracts) independent.

## Addresses to Save

After deployment, save these to your .env:

```bash
REPUTATION_V2_ADDRESS=<new_reputation_or_reused>
REGISTRY_V2_ADDRESS=<poxregistryv2_address>
REVIEW_MANAGER_ADDRESS=<peerreviewmanager_address>
```

## Testing

Test the deployment with:

```bash
# Get total experiments from V2 registry
cast call "$REGISTRY_V2_ADDRESS" "totalExperiments()" --rpc-url "$RPC"

# Get reputation multiplier for NMR (enum value = 2)
cast call "$REVIEW_MANAGER_ADDRESS" "reputationMultipliers(uint8)" 2 --rpc-url "$RPC"
# Should return 20 (meaning 2× multiplier)

# Get reputation multiplier for PXRD (enum value = 5)
cast call "$REVIEW_MANAGER_ADDRESS" "reputationMultipliers(uint8)" 5 --rpc-url "$RPC"
# Should return 30 (meaning 3× multiplier)
```
