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
`;
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
`;
