// lib/graphql-client.ts
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

// Will be provided by other instance working on The Graph deployment
const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || 
  'https://api.studio.thegraph.com/query/YOUR_SUBGRAPH_ID/pox-filecoin/version/latest'

export const graphqlClient = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache(),
})

// Query to fetch recent experiments
export const GET_EXPERIMENTS = gql`
  query GetExperiments($first: Int = 20, $orderBy: String = "submittedAt", $orderDirection: String = "desc") {
    experiments(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      experimentId
      submitter
      cid
      dataHash
      metricsHash
      difficulty
      rvInitial
      submittedAt
      experimentType
      sampleId
      method
      peakCount
      compounds
    }
  }
`

// Query to fetch single experiment by ID
export const GET_EXPERIMENT = gql`
  query GetExperiment($id: ID!) {
    experiment(id: $id) {
      id
      experimentId
      submitter
      cid
      dataHash
      metricsHash
      difficulty
      rvInitial
      submittedAt
      experimentType
      sampleId
      method
      peakCount
      peakPurity
      retentionTimes
      compounds
      solvent
    }
  }
`

// Query to fetch user's reputation
export const GET_REPUTATION = gql`
  query GetReputation($address: String!) {
    user(id: $address) {
      id
      reputation
      experimentsSubmitted
      validExperiments
      invalidExperiments
    }
  }
`

// Query for recent transactions (challenges, registrations)
export const GET_RECENT_ACTIVITY = gql`
  query GetRecentActivity($first: Int = 10) {
    experimentRegistered: experiments(
      first: $first
      orderBy: "submittedAt"
      orderDirection: "desc"
    ) {
      id
      experimentId
      submitter
      submittedAt
      difficulty
    }
  }
`
