/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Charity
// ====================================================

export interface Charity_charitySearchByID_charityEvents {
  __typename: "Event";
  id: number;
}

export interface Charity_charitySearchByID {
  __typename: "Charity";
  id: number;
  name: string;
  uen: string;
  physicalAddress: string;
  postalcode: string;
  charityEvents: Charity_charitySearchByID_charityEvents[];
}

export interface Charity {
  charitySearchByID: Charity_charitySearchByID | null;
}

export interface CharityVariables {
  id: number;
}
