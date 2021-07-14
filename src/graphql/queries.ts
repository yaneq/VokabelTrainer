/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWordPair = /* GraphQL */ `
  query GetWordPair($id: ID!) {
    getWordPair(id: $id) {
      id
      german
      spanish
      createdAt
      updatedAt
    }
  }
`
export const listWordPairs = /* GraphQL */ `
  query ListWordPairs(
    $filter: ModelWordPairFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWordPairs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        german
        spanish
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getRecordTime = /* GraphQL */ `
  query GetRecordTime($id: ID!) {
    getRecordTime(id: $id) {
      id
      name
      time
      type
      createdAt
      updatedAt
    }
  }
`
export const listRecordTimes = /* GraphQL */ `
  query ListRecordTimes(
    $filter: ModelRecordTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordTimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        time
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const recordTimeByFastest = /* GraphQL */ `
  query RecordTimeByFastest(
    $time: ModelFloatKeyConditionInput
    $filter: ModelRecordTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    recordTimeByFastest(
      type: "RecordTime"
      time: $time
      sortDirection: ASC
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        time
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
