import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const CHALLENGE_MANAGER_ADDRESS = process.env.CHALLENGE_MANAGER_ADDRESS || '0x6e80A987049965127f1EB69Cc49Fb4460AeB5E8B';
const RPC_URL = process.env.FILECOIN_CLOUD_RPC || 'https://api.calibration.node.glif.io/rpc/v1';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const CHALLENGE_MANAGER_ABI = [
  'function openChallenge(uint256 experimentId, bytes32 computedMetricsHash) external returns (uint256 challengeId)',
  'event ChallengeOpened(uint256 indexed id, uint256 indexed experimentId, address indexed challenger, bytes32 computedMetricsHash)',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experimentId, computedMetricsHash } = body;

    if (typeof experimentId !== 'number') {
      return NextResponse.json(
        { error: 'experimentId must be a number' },
        { status: 400 }
      );
    }

    if (!computedMetricsHash || typeof computedMetricsHash !== 'string') {
      return NextResponse.json(
        { error: 'computedMetricsHash is required' },
        { status: 400 }
      );
    }

    if (!PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error: PRIVATE_KEY not set' },
        { status: 500 }
      );
    }

    // Connect to Filecoin
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const challengeManager = new ethers.Contract(
      CHALLENGE_MANAGER_ADDRESS,
      CHALLENGE_MANAGER_ABI,
      wallet
    );

    // Open challenge
    console.log(`Opening challenge for experiment ${experimentId}...`);
    const tx = await challengeManager.openChallenge(
      experimentId,
      computedMetricsHash
    );

    console.log(`Challenge tx: ${tx.hash}`);
    const receipt = await tx.wait();
    console.log(`Challenge confirmed in block ${receipt.blockNumber}`);

    // Extract challenge ID from event
    const event = receipt.logs
      .map((log: any) => {
        try {
          return challengeManager.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((e: any) => e && e.name === 'ChallengeOpened');

    const challengeId = event ? event.args.id.toString() : 'unknown';

    return NextResponse.json({
      success: true,
      challengeId,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
    });
  } catch (error: any) {
    console.error('Failed to open challenge:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to open challenge' },
      { status: 500 }
    );
  }
}
