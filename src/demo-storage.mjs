// src/storageService.ts
import { createSynapseClient, fundWarmStorage, uploadBytes, downloadBytes } from './synapseClient'

export async function ensureWarmStorageFunded() {
  const synapse = await createSynapseClient()
  const tx = await fundWarmStorage(synapse)
  await tx.wait()
  return tx.hash
}

export async function storeText(text: string) {
  const synapse = await createSynapseClient()
  const data = new TextEncoder().encode(text)
  const { pieceCid, size } = await uploadBytes(synapse, data)
  return { pieceCid, size }
}

export async function retrieveText(pieceCid: string) {
  const synapse = await createSynapseClient()
  const bytes = await downloadBytes(synapse, pieceCid)
  return new TextDecoder().decode(bytes)
}
