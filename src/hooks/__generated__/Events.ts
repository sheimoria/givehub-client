/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Events
// ====================================================

export interface Events_events_events {
  __typename: "Event";
  id: number;
}

export interface Events_events {
  __typename: "PaginatedEvents";
  events: Events_events_events[];
  hasMore: boolean;
}

export interface Events {
  events: Events_events;
}

export interface EventsVariables {
  limit: number;
  cursor?: string | null;
  sortByLikes: boolean;
  sortByUpcoming: boolean;
}
