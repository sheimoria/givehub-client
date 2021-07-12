/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CharityCategory
// ====================================================

export interface CharityCategory_updateCharityCategories_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface CharityCategory_updateCharityCategories {
  __typename: "CategoryResponse";
  errors: CharityCategory_updateCharityCategories_errors[] | null;
  success: boolean | null;
}

export interface CharityCategory {
  updateCharityCategories: CharityCategory_updateCharityCategories;
}

export interface CharityCategoryVariables {
  charityId: number;
  categories: CategoryInput;
}
