/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWordPair = /* GraphQL */ `
  mutation CreateWordPair(
    $input: CreateWordPairInput!
    $condition: ModelWordPairConditionInput
  ) {
    createWordPair(input: $input, condition: $condition) {
      id
      german
      spanish
      createdAt
      updatedAt
    }
  }
`;
export const updateWordPair = /* GraphQL */ `
  mutation UpdateWordPair(
    $input: UpdateWordPairInput!
    $condition: ModelWordPairConditionInput
  ) {
    updateWordPair(input: $input, condition: $condition) {
      id
      german
      spanish
      createdAt
      updatedAt
    }
  }
`;
export const deleteWordPair = /* GraphQL */ `
  mutation DeleteWordPair(
    $input: DeleteWordPairInput!
    $condition: ModelWordPairConditionInput
  ) {
    deleteWordPair(input: $input, condition: $condition) {
      id
      german
      spanish
      createdAt
      updatedAt
    }
  }
`;
