/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UEN
// ====================================================

export interface UEN_checkUENNumber_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface UEN_checkUENNumber_uendata {
  __typename: "UENData";
  entity_name: string;
}

export interface UEN_checkUENNumber {
  __typename: "UENResponse";
  errors: UEN_checkUENNumber_errors[] | null;
  uendata: UEN_checkUENNumber_uendata | null;
  success: boolean | null;
}

export interface UEN {
  checkUENNumber: UEN_checkUENNumber;
}

export interface UENVariables {
  UEN: string;
}
