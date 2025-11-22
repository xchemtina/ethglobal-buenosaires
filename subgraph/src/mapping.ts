import { ExperimentSubmitted } from "../generated/PoXRegistry/PoXRegistry"
import { Experiment } from "../generated/schema"

export function handleExperimentSubmitted(event: ExperimentSubmitted): void {
  let entity = new Experiment(event.params.expId.toHex())

  entity.submitter  = event.params.submitter
  entity.dataHash   = event.params.dataHash
  entity.difficulty = event.params.difficulty
  entity.cid        = event.params.filecoinCID
  entity.timestamp  = event.block.timestamp

  entity.save()
}

