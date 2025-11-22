import { Synapse, RPC_URLS, TIME_CONSTANTS } from '@filoz/synapse-sdk'
import { ethers } from 'ethers'

export async function createSynapseClient() {
  const pk = process.env.WALLET_PRIVATE_KEY
  if (!pk) throw new Error('WALLET_PRIVATE_KEY not set')

  const synapse = await Synapse.create({
    privateKey: pk,
    rpcURL: RPC_URLS.calibration.http,
  })

  return synapse
}

export async function fundWarmStorage(
  synapse: Awaited<ReturnType<typeof createSynapseClient>>,
  {
    usdfcAmount = '2.5',               // default
    durationEpochs = TIME_CONSTANTS.EPOCHS_PER_MONTH,
  } = {},
) {
  const depositAmount = ethers.parseUnits(usdfcAmount, 18)

  const tx = await synapse.payments.depositWithPermitAndApproveOperator(
    depositAmount,
    synapse.getWarmStorageAddress(),
    ethers.MaxUint256,
    ethers.MaxUint256,
    durationEpochs,
  )

  return tx
}

export async function uploadBytes(
  synapse: Awaited<ReturnType<typeof createSynapseClient>>,
  data: Uint8Array,
) {
  return synapse.storage.upload(data)
}

export async function downloadBytes(
  synapse: Awaited<ReturnType<typeof createSynapseClient>>,
  pieceCid: string,
) {
  return synapse.storage.download(pieceCid)
}
