/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CategoryInput {
  categories: number[];
}

export interface CharityDataInput {
  uen: string;
  name: string;
  physicalAddress: string;
  postalcode: string;
}

export interface EventInput {
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  venue?: string | null;
}

export interface UsernamePasswordInput {
  email: string;
  username: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
