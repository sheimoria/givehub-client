/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UsernamePasswordInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_register_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface Register_register_user {
  __typename: "User";
  id: number;
}

export interface Register_register {
  __typename: "UserResponse";
  errors: Register_register_errors[] | null;
  user: Register_register_user | null;
}

export interface Register {
  register: Register_register;
}

export interface RegisterVariables {
  options: UsernamePasswordInput;
}
