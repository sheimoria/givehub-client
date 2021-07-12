/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface login_login_user_adminCharities {
  __typename: "Charity";
  id: number;
  name: string;
}

export interface login_login_user {
  __typename: "User";
  id: number;
  username: string;
  adminCharities: login_login_user_adminCharities[];
}

export interface login_login {
  __typename: "UserResponse";
  errors: login_login_errors[] | null;
  user: login_login_user | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  usernameOrEmail: string;
  password: string;
}
