/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateEvent
// ====================================================

export interface CreateEvent_createEvent_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface CreateEvent_createEvent {
  __typename: "EventResponse";
  errors: CreateEvent_createEvent_errors[] | null;
  success: boolean | null;
}

export interface CreateEvent {
  createEvent: CreateEvent_createEvent;
}

export interface CreateEventVariables {
  charityId: number;
  input: EventInput;
}
