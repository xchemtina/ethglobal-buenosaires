import { ExperimentRegistered } from "../generated/PoXRegistry/PoXRegistry"
import { Experiment } from "../generated/schema"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleExperimentRegistered(event: ExperimentRegistered): void {
  let entity = new Experiment(event.params.id.toString())

  entity.submitter = event.params.submitter
  entity.cid = event.params.cid
  entity.dataHash = event.params.dataHash
  entity.metricsHash = event.params.metricsHash
  entity.difficulty = event.params.difficulty
  entity.initialRV = event.params.initialRV
  entity.submittedAt = event.params.submittedAt

  entity.save()
}

