import { GraphQLClient, gql } from "graphql-request"
import * as fs from "fs"

const SUBGRAPH_URL = process.env.SUBGRAPH_URL!

const query = gql`
  {
    experiments(first: 1000, orderBy: timestamp, orderDirection: desc) {
      id
      submitter
      cid
      dataHash
      difficulty
      timestamp
    }
  }
`

async function main() {
  const client = new GraphQLClient(SUBGRAPH_URL)
  const data = await client.request(query)

  const index = data.experiments.map((e: any) => ({
    id: e.id,
    submitter: e.submitter,
    cid: e.cid,
    hash: e.dataHash,
    difficulty: Number(e.difficulty),
    timestamp: Number(e.timestamp),
    url: `https://gateway.filecoin.io/ipfs/${e.cid}`,
  }))

  fs.writeFileSync("pox_index.json", JSON.stringify(index, null, 2))
  console.log("Updated local PoX index:", index.length, "experiments")
}

main()

