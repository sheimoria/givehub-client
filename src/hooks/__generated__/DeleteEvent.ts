/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEvent
// ====================================================

export interface DeleteEvent_deleteEvent_errors {
  __typename: "FieldError";
  field: string;
  message: string;
}

export interface DeleteEvent_deleteEvent {
  __typename: "EventResponse";
  errors: DeleteEvent_deleteEvent_errors[] | null;
  success: boolean | null;
}

export interface DeleteEvent {
  deleteEvent: DeleteEvent_deleteEvent;
}

export interface DeleteEventVariables {
  id: number;
}
