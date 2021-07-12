/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoryEvents
// ====================================================

export interface CategoryEvents_eventsByCategories_events {
  __typename: "Event";
  id: number;
}

export interface CategoryEvents_eventsByCategories {
  __typename: "PaginatedEvents";
  events: CategoryEvents_eventsByCategories_events[];
  hasMore: boolean;
}

export interface CategoryEvents {
  eventsByCategories: CategoryEvents_eventsByCategories;
}

export interface CategoryEventsVariables {
  categories: number[];
}
