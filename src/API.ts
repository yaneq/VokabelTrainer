/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateWordPairInput = {
  id?: string | null,
  german: string,
  spanish: string,
};

export type ModelWordPairConditionInput = {
  german?: ModelStringInput | null,
  spanish?: ModelStringInput | null,
  and?: Array< ModelWordPairConditionInput | null > | null,
  or?: Array< ModelWordPairConditionInput | null > | null,
  not?: ModelWordPairConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type WordPair = {
  __typename: "WordPair",
  id: string,
  german: string,
  spanish: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateWordPairInput = {
  id: string,
  german?: string | null,
  spanish?: string | null,
};

export type DeleteWordPairInput = {
  id: string,
};

export type ModelWordPairFilterInput = {
  id?: ModelIDInput | null,
  german?: ModelStringInput | null,
  spanish?: ModelStringInput | null,
  and?: Array< ModelWordPairFilterInput | null > | null,
  or?: Array< ModelWordPairFilterInput | null > | null,
  not?: ModelWordPairFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelWordPairConnection = {
  __typename: "ModelWordPairConnection",
  items?:  Array<WordPair | null > | null,
  nextToken?: string | null,
};

export type CreateWordPairMutationVariables = {
  input: CreateWordPairInput,
  condition?: ModelWordPairConditionInput | null,
};

export type CreateWordPairMutation = {
  createWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateWordPairMutationVariables = {
  input: UpdateWordPairInput,
  condition?: ModelWordPairConditionInput | null,
};

export type UpdateWordPairMutation = {
  updateWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteWordPairMutationVariables = {
  input: DeleteWordPairInput,
  condition?: ModelWordPairConditionInput | null,
};

export type DeleteWordPairMutation = {
  deleteWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetWordPairQueryVariables = {
  id: string,
};

export type GetWordPairQuery = {
  getWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListWordPairsQueryVariables = {
  filter?: ModelWordPairFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWordPairsQuery = {
  listWordPairs?:  {
    __typename: "ModelWordPairConnection",
    items?:  Array< {
      __typename: "WordPair",
      id: string,
      german: string,
      spanish: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateWordPairSubscription = {
  onCreateWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateWordPairSubscription = {
  onUpdateWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteWordPairSubscription = {
  onDeleteWordPair?:  {
    __typename: "WordPair",
    id: string,
    german: string,
    spanish: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
