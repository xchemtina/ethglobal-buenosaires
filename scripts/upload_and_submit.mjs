import { Synapse, RPC_URLS, TOKENS } from "@filoz/synapse-sdk"
import { ethers } from "ethers"
import fs from "fs"
import { execSync } from "child_process"

const PRIVATE_KEY = process.env.PRIVATE_KEY
const RPC = RPC_URLS.calibration.http
const HPLC_PATH = process.argv[2]      // e.g. `data/hplc_001.csv`

async function main() {
  const synapse = await Synapse.create({
    privateKey: PRIVATE_KEY,
    rpcURL: RPC
  })

  const raw = fs.readFileSync(HPLC_PATH)
  const dataHash = ethers.keccak256(raw)

  // Upload to Filecoin Cloud
  const upload = await synapse.storage.storeFile(raw)
  const cid = upload.cid

  console.log("Uploaded HPLC dataset:", cid)
  console.log("Hash:", dataHash)

  // Derive difficulty (placeholder)
  const difficulty = BigInt(dataHash) % 10_000_000n

  // Submit using forge script (cleanest option)
  const cmd = `
    forge script script/RegisterDataset.s.sol \
      --rpc-url ${RPC} \
      --broadcast \
      --private-key ${PRIVATE_KEY} \
      --sig "submit(bytes32,string,uint256)" ${dataHash} "${cid}" ${difficulty}
  `
  console.log("Submitting on-chain…")
  execSync(cmd, { stdio: "inherit" })

  console.log("Done.")
}

main()

