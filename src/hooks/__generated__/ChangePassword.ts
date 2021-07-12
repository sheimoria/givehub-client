/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword_changePassword_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface ChangePassword_changePassword_user {
  __typename: "User";
  id: number;
  username: string;
}

export interface ChangePassword_changePassword {
  __typename: "UserResponse";
  errors: ChangePassword_changePassword_errors[] | null;
  user: ChangePassword_changePassword_user | null;
}

export interface ChangePassword {
  changePassword: ChangePassword_changePassword;
}

export interface ChangePasswordVariables {
  token: string;
  newPassword: string;
}
