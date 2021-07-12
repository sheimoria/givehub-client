/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EventInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateEvent
// ====================================================

export interface UpdateEvent_updateEvent_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface UpdateEvent_updateEvent {
  __typename: "EventResponse";
  errors: UpdateEvent_updateEvent_errors[] | null;
  success: boolean | null;
}

export interface UpdateEvent {
  updateEvent: UpdateEvent_updateEvent;
}

export interface UpdateEventVariables {
  id: number;
  input: EventInput;
}
