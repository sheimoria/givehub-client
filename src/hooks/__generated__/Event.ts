/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Event
// ====================================================

export interface Event_event_charity {
  __typename: "Charity";
  id: number;
  name: string;
}

export interface Event_event {
  __typename: "Event";
  id: number;
  name: string;
  createdAt: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  venue: string;
  charity: Event_event_charity;
  likeNumber: number;
  voteStatus: number | null;
}

export interface Event {
  event: Event_event | null;
}

export interface EventVariables {
  id: number;
}
