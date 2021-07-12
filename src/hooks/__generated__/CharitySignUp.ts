/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CharityDataInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CharitySignUp
// ====================================================

export interface CharitySignUp_createCharity_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface CharitySignUp_createCharity_charity {
  __typename: "Charity";
  id: number;
}

export interface CharitySignUp_createCharity {
  __typename: "CharityResponse";
  errors: CharitySignUp_createCharity_errors[] | null;
  charity: CharitySignUp_createCharity_charity | null;
  success: boolean;
}

export interface CharitySignUp {
  createCharity: CharitySignUp_createCharity;
}

export interface CharitySignUpVariables {
  options: CharityDataInput;
}
