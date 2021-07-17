import * as Apollo from '@apollo/client'

import { gql } from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export enum AdminApproval {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export type Category = {
  __typename?: 'Category'
  id: Scalars['Float']
  name: Scalars['String']
  createdAt: Scalars['String']
  udpatedAt: Scalars['String']
}

export type CategoryInput = {
  categories: Array<Scalars['Float']>
}

export type CategoryResponse = {
  __typename?: 'CategoryResponse'
  errors?: Maybe<Array<FieldError>>
  success?: Maybe<Scalars['Boolean']>
}

export type Charity = {
  __typename?: 'Charity'
  id: Scalars['Float']
  name: Scalars['String']
  uen: Scalars['String']
  physicalAddress: Scalars['String']
  postalcode: Scalars['String']
  charitycreator: User
  followNumber: Scalars['Float']
  followStatus?: Maybe<Scalars['Int']>
  createdAt: Scalars['String']
  udpatedAt: Scalars['String']
  profile?: Maybe<Charityprofile>
  categories: Array<Category>
  followers: Array<User>
  charityEvents: Array<Event>
  adminStatus: Scalars['Boolean']
}

export type CharityDataInput = {
  uen: Scalars['String']
  name: Scalars['String']
  physicalAddress: Scalars['String']
  postalcode: Scalars['String']
}

export type CharityProfileUpdateInput = {
  name: Scalars['String']
  physicalAddress: Scalars['String']
  postalcode: Scalars['String']
  about: Scalars['String']
  links?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Scalars['Int']>>
}

export type CharityResponse = {
  __typename?: 'CharityResponse'
  errors?: Maybe<Array<FieldError>>
  charity?: Maybe<Charity>
  success: Scalars['Boolean']
}

export type Charityprofile = {
  __typename?: 'Charityprofile'
  id: Scalars['Float']
  about: Scalars['String']
  displayPicture?: Maybe<Scalars['String']>
  links?: Maybe<Scalars['String']>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type EPost = {
  __typename?: 'EPost'
  post: Post
  eventId?: Maybe<Scalars['Float']>
  eventName?: Maybe<Scalars['String']>
  isEvent: Scalars['Boolean']
  creatorStatus: Scalars['Boolean']
}

export type Event = {
  __typename?: 'Event'
  id: Scalars['Float']
  name: Scalars['String']
  description: Scalars['String']
  dateStart: Scalars['String']
  dateEnd: Scalars['String']
  venue: Scalars['String']
  charity: Charity
  creator: User
  likeNumber: Scalars['Float']
  completed: Scalars['Boolean']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
  textSnippet: Scalars['String']
  voteStatus?: Maybe<Scalars['Int']>
  approvalStatus?: Maybe<AdminApproval>
  currentEventVolunteers?: Maybe<Array<User>>
  eventTasks?: Maybe<Array<Task>>
  adminStatus: Scalars['Boolean']
}

export type EventInput = {
  name: Scalars['String']
  description: Scalars['String']
  dateStart: Scalars['String']
  dateEnd: Scalars['String']
  venue?: Maybe<Scalars['String']>
}

export type EventLikeResponse = {
  __typename?: 'EventLikeResponse'
  success: Scalars['Boolean']
  likeItem?: Maybe<Event>
  errors?: Maybe<Array<FieldError>>
}

export type EventPostResponse = {
  __typename?: 'EventPostResponse'
  errors?: Maybe<Array<FieldError>>
  epost?: Maybe<EPost>
  success?: Maybe<Scalars['Boolean']>
}

export type EventResponse = {
  __typename?: 'EventResponse'
  errors?: Maybe<Array<FieldError>>
  event?: Maybe<Event>
  success?: Maybe<Scalars['Boolean']>
}

export type EventTaskContainer = {
  __typename?: 'EventTaskContainer'
  event: Event
  tasks: Array<Task>
}

export type EventTaskContainerResponse = {
  __typename?: 'EventTaskContainerResponse'
  eventContainers: Array<EventTaskContainer>
  success: Scalars['Boolean']
}

export type EventVolunteerContainer = {
  __typename?: 'EventVolunteerContainer'
  user?: Maybe<User>
  adminapproval?: Maybe<AdminApproval>
  eventId?: Maybe<Scalars['Int']>
}

export type FieldError = {
  __typename?: 'FieldError'
  field: Scalars['String']
  message: Scalars['String']
}

export enum FriendRequestStatus {
  User1Req = 'USER1_REQ',
  User2Req = 'USER2_REQ',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  BlockedUser1 = 'BLOCKED_USER1',
  BlockedUser2 = 'BLOCKED_USER2'
}

export enum Genders {
  Male = 'MALE',
  Female = 'FEMALE',
  Nonbinary = 'NONBINARY',
  Withheld = 'WITHHELD'
}

export type Mutation = {
  __typename?: 'Mutation'
  updateUserCategories: CategoryResponse
  updateCharityCategories: CategoryResponse
  register: UserResponse
  login: UserResponse
  logout: Scalars['Boolean']
  updateUserProfile: UserResponse
  changePassword: UserResponse
  forgotPassword: Scalars['Boolean']
  requestFriend: UserResponse
  acceptFriendRequest: UserResponse
  blockUser: UserResponse
  likePost: PostLikeResponse
  createPost: EPost
  updatePost?: Maybe<EPost>
  deletePost: Scalars['Boolean']
  createCharity: CharityResponse
  updateCharityProfile: CharityResponse
  followCharity: CharityResponse
  addAdminToCharity: CharityResponse
  likeEvent: EventLikeResponse
  createEvent: EventResponse
  updateEvent: EventResponse
  deleteEvent: EventResponse
  shareEvent: EventPostResponse
  markEventAsComplete: EventResponse
  requestEvent: EventResponse
  acceptEventVolunteer: UpdateEventVolunteerResponse
  createTask: TaskResponse
  updateTask: TaskResponse
  deleteTask: TaskResponse
  addVolunteerToTask: TaskVolunteerResponse
  removeVolunteerFromTask: TaskVolunteerResponse
}

export type MutationUpdateUserCategoriesArgs = {
  categories: CategoryInput
}

export type MutationUpdateCharityCategoriesArgs = {
  charityId: Scalars['Float']
  categories: CategoryInput
}

export type MutationRegisterArgs = {
  options: UsernamePasswordInput
}

export type MutationLoginArgs = {
  password: Scalars['String']
  usernameOrEmail: Scalars['String']
}

export type MutationUpdateUserProfileArgs = {
  options: UserProfileUpdateInput
}

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']
  token: Scalars['String']
}

export type MutationForgotPasswordArgs = {
  email: Scalars['String']
}

export type MutationRequestFriendArgs = {
  userId: Scalars['Float']
}

export type MutationAcceptFriendRequestArgs = {
  userId: Scalars['Float']
}

export type MutationBlockUserArgs = {
  userId: Scalars['Float']
}

export type MutationLikePostArgs = {
  postId: Scalars['Int']
}

export type MutationCreatePostArgs = {
  input: PostInput
}

export type MutationUpdatePostArgs = {
  text: Scalars['String']
  title: Scalars['String']
  id: Scalars['Float']
}

export type MutationDeletePostArgs = {
  id: Scalars['Float']
}

export type MutationCreateCharityArgs = {
  options: CharityDataInput
}

export type MutationUpdateCharityProfileArgs = {
  options: CharityProfileUpdateInput
  charityId: Scalars['Float']
}

export type MutationFollowCharityArgs = {
  charityId: Scalars['Int']
}

export type MutationAddAdminToCharityArgs = {
  userId: Scalars['Int']
  charityId: Scalars['Int']
}

export type MutationLikeEventArgs = {
  eventId: Scalars['Int']
}

export type MutationCreateEventArgs = {
  charityId: Scalars['Float']
  input: EventInput
}

export type MutationUpdateEventArgs = {
  input: EventInput
  id: Scalars['Float']
}

export type MutationDeleteEventArgs = {
  id: Scalars['Float']
}

export type MutationShareEventArgs = {
  input: PostInput
  id: Scalars['Float']
}

export type MutationMarkEventAsCompleteArgs = {
  id: Scalars['Float']
}

export type MutationRequestEventArgs = {
  eventId: Scalars['Int']
}

export type MutationAcceptEventVolunteerArgs = {
  acceptVolunteer: Scalars['Boolean']
  eventVolunteerUserId: Scalars['Int']
  eventId: Scalars['Int']
}

export type MutationCreateTaskArgs = {
  taskInput: TaskInput
  eventId: Scalars['Int']
}

export type MutationUpdateTaskArgs = {
  completionStatus?: Maybe<TaskCompletionStatus>
  taskInput: TaskInput
  taskId: Scalars['Int']
}

export type MutationDeleteTaskArgs = {
  taskId: Scalars['Int']
}

export type MutationAddVolunteerToTaskArgs = {
  userId: Scalars['Int']
  taskId: Scalars['Int']
}

export type MutationRemoveVolunteerFromTaskArgs = {
  userId: Scalars['Int']
  taskId: Scalars['Int']
}

export type PaginatedCharities = {
  __typename?: 'PaginatedCharities'
  items: Array<Charity>
  total: Scalars['Int']
  hasMore: Scalars['Boolean']
}

export type PaginatedEventVolunteers = {
  __typename?: 'PaginatedEventVolunteers'
  items: Array<EventVolunteerContainer>
  total: Scalars['Int']
  hasMore: Scalars['Boolean']
  errors?: Maybe<Array<FieldError>>
  success: Scalars['Boolean']
}

export type PaginatedEvents = {
  __typename?: 'PaginatedEvents'
  items: Array<Event>
  total: Scalars['Int']
  hasMore: Scalars['Boolean']
}

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts'
  items: Array<EPost>
  total: Scalars['Int']
  hasMore: Scalars['Boolean']
}

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers'
  items: Array<User>
  total: Scalars['Int']
  hasMore: Scalars['Boolean']
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['Float']
  title: Scalars['String']
  text: Scalars['String']
  likeNumber: Scalars['Float']
  voteStatus?: Maybe<Scalars['Int']>
  creatorId: Scalars['Float']
  creator: User
  auditstat: Scalars['Boolean']
  isEvent: Scalars['Boolean']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
  textSnippet: Scalars['String']
  creatorStatus: Scalars['Boolean']
}

export type PostInput = {
  title: Scalars['String']
  text: Scalars['String']
}

export type PostLikeResponse = {
  __typename?: 'PostLikeResponse'
  success: Scalars['Boolean']
  likeItem?: Maybe<EPost>
  errors?: Maybe<Array<FieldError>>
}

export type Query = {
  __typename?: 'Query'
  hello: Scalars['String']
  interests: Array<Category>
  me?: Maybe<User>
  viewTasksAssignedToMe: EventTaskContainerResponse
  viewMyPendingFriendRequests: UserResponse
  searchUsers: PaginatedUsers
  posts: PaginatedPosts
  post?: Maybe<EPost>
  charitySearchByUEN?: Maybe<Charity>
  charitySearchByID?: Maybe<Charity>
  checkUENNumber: UenResponse
  searchCharitiesByCategories: PaginatedCharities
  searchCharities: PaginatedCharities
  searchEvents: PaginatedEvents
  event?: Maybe<Event>
  getVolunteerRequestListForEvents: PaginatedEventVolunteers
}

export type QuerySearchUsersArgs = {
  input?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QueryPostArgs = {
  id: Scalars['Int']
}

export type QueryCharitySearchByUenArgs = {
  uen: Scalars['String']
}

export type QueryCharitySearchByIdArgs = {
  id: Scalars['Int']
}

export type QueryCheckUenNumberArgs = {
  UENNumber: Scalars['String']
}

export type QuerySearchCharitiesByCategoriesArgs = {
  categories?: Maybe<Array<Scalars['Float']>>
  cursor?: Maybe<Scalars['String']>
  limit: Scalars['Int']
}

export type QuerySearchCharitiesArgs = {
  input?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  categories: Array<Scalars['Float']>
  limit: Scalars['Int']
}

export type QuerySearchEventsArgs = {
  input?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  categories: Array<Scalars['Float']>
  sortByUpcoming: Scalars['Boolean']
  sortByLikes: Scalars['Boolean']
  limit: Scalars['Int']
}

export type QueryEventArgs = {
  id: Scalars['Int']
}

export type QueryGetVolunteerRequestListForEventsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit: Scalars['Int']
  eventIds: Array<Scalars['Int']>
}

export type Task = {
  __typename?: 'Task'
  id: Scalars['Float']
  description: Scalars['String']
  deadline: Scalars['String']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
  volunteersAssigned?: Maybe<Array<User>>
  adminStatus: Scalars['Boolean']
}

export enum TaskCompletionStatus {
  Closed = 'CLOSED',
  New = 'NEW',
  Active = 'ACTIVE',
  Resolved = 'RESOLVED'
}

export type TaskInput = {
  description: Scalars['String']
  deadline: Scalars['String']
}

export type TaskResponse = {
  __typename?: 'TaskResponse'
  success: Scalars['Boolean']
  errors?: Maybe<Array<FieldError>>
  task?: Maybe<Task>
}

export type TaskVolunteerResponse = {
  __typename?: 'TaskVolunteerResponse'
  success: Scalars['Boolean']
  errors?: Maybe<Array<FieldError>>
}

export type UenData = {
  __typename?: 'UENData'
  uen: Scalars['String']
  reg_street_name: Scalars['String']
  entity_name: Scalars['String']
  entity_type: Scalars['String']
  reg_postal_code: Scalars['String']
  issuance_agency_id: Scalars['String']
  uen_issue_date: Scalars['String']
  uen_status: Scalars['String']
}

export type UenResponse = {
  __typename?: 'UENResponse'
  errors?: Maybe<Array<FieldError>>
  uendata?: Maybe<UenData>
  success?: Maybe<Scalars['Boolean']>
}

export type UpdateEventVolunteerResponse = {
  __typename?: 'UpdateEventVolunteerResponse'
  success: Scalars['Boolean']
  errors?: Maybe<Array<FieldError>>
}

export type User = {
  __typename?: 'User'
  id: Scalars['Float']
  username: Scalars['String']
  email: Scalars['String']
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
  profile?: Maybe<Userprofile>
  categories: Array<Category>
  followedCharities: Array<Charity>
  adminCharities: Array<Charity>
  likedEvents: Array<Event>
  volunteeredEvents: Array<Event>
  friends: Array<User>
  friendStatus?: Maybe<FriendRequestStatus>
  viewerStatus: Scalars['Boolean']
}

export type UserProfileUpdateInput = {
  email: Scalars['String']
  about: Scalars['String']
  gender: Genders
  firstName: Scalars['String']
  lastName: Scalars['String']
  telegramHandle?: Maybe<Scalars['String']>
  categories?: Maybe<Array<Scalars['Int']>>
}

export type UserResponse = {
  __typename?: 'UserResponse'
  errors?: Maybe<Array<FieldError>>
  user?: Maybe<User>
  userList?: Maybe<Array<User>>
  success: Scalars['Boolean']
}

export type UsernamePasswordInput = {
  email: Scalars['String']
  username: Scalars['String']
  password: Scalars['String']
}

export type Userprofile = {
  __typename?: 'Userprofile'
  id: Scalars['Float']
  about: Scalars['String']
  gender: Genders
  firstName: Scalars['String']
  lastName: Scalars['String']
  displayPicture?: Maybe<Scalars['String']>
  telegramHandle?: Maybe<Scalars['String']>
  createdAt: Scalars['String']
  updatedAt: Scalars['String']
}

export type CategoryFragment = { __typename?: 'Category' } & Pick<
  Category,
  'id' | 'name'
>

export type CharityFragment = { __typename?: 'Charity' } & Pick<
  Charity,
  | 'id'
  | 'name'
  | 'uen'
  | 'physicalAddress'
  | 'postalcode'
  | 'followNumber'
  | 'followStatus'
  | 'adminStatus'
> & {
    charitycreator: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    profile?: Maybe<{ __typename?: 'Charityprofile' } & CharityProfileFragment>
    categories: Array<
      { __typename?: 'Category' } & Pick<Category, 'id' | 'name'>
    >
    followers: Array<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
    charityEvents: Array<
      { __typename?: 'Event' } & Pick<
        Event,
        | 'name'
        | 'description'
        | 'dateStart'
        | 'dateEnd'
        | 'venue'
        | 'completed'
        | 'adminStatus'
        | 'createdAt'
      > & {
          charity: { __typename?: 'Charity' } & Pick<Charity, 'id' | 'name'>
          creator: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
          currentEventVolunteers?: Maybe<
            Array<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
          >
          eventTasks?: Maybe<Array<{ __typename?: 'Task' } & Pick<Task, 'id'>>>
        } & LikeEventFragment &
        RequestEventFragment
    >
  }

export type CharityProfileFragment = { __typename?: 'Charityprofile' } & Pick<
  Charityprofile,
  'about' | 'displayPicture' | 'links'
>

export type EventFragment = { __typename?: 'Event' } & Pick<
  Event,
  | 'name'
  | 'description'
  | 'dateStart'
  | 'dateEnd'
  | 'venue'
  | 'completed'
  | 'adminStatus'
  | 'createdAt'
> & {
    charity: { __typename?: 'Charity' } & CharityFragment
    creator: { __typename?: 'User' } & Pick<User, 'id' | 'username'>
    currentEventVolunteers?: Maybe<
      Array<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
    >
    eventTasks?: Maybe<Array<{ __typename?: 'Task' } & Pick<Task, 'id'>>>
  } & LikeEventFragment &
  RequestEventFragment

export type FollowCharityFragment = { __typename?: 'Charity' } & Pick<
  Charity,
  'id' | 'followNumber' | 'followStatus'
>

export type HeaderFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'username'
> & {
    adminCharities: Array<
      { __typename?: 'Charity' } & Pick<Charity, 'id' | 'name'>
    >
  }

export type LikeEventFragment = { __typename?: 'Event' } & Pick<
  Event,
  'id' | 'voteStatus' | 'likeNumber'
>

export type RequestEventFragment = { __typename?: 'Event' } & Pick<
  Event,
  'id' | 'approvalStatus'
>

export type UserProfileFragment = { __typename?: 'Userprofile' } & Pick<
  Userprofile,
  | 'id'
  | 'about'
  | 'gender'
  | 'firstName'
  | 'lastName'
  | 'displayPicture'
  | 'telegramHandle'
>

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String']
  newPassword: Scalars['String']
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
  changePassword: { __typename?: 'UserResponse' } & {
    errors?: Maybe<
      Array<
        { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
      >
    >
    user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
  }
}

export type CharityCategoryMutationVariables = Exact<{
  charityId: Scalars['Float']
  categories: CategoryInput
}>

export type CharityCategoryMutation = { __typename?: 'Mutation' } & {
  updateCharityCategories: { __typename?: 'CategoryResponse' } & Pick<
    CategoryResponse,
    'success'
  > & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
}

export type CharitySignUpMutationVariables = Exact<{
  options: CharityDataInput
}>

export type CharitySignUpMutation = { __typename?: 'Mutation' } & {
  createCharity: { __typename?: 'CharityResponse' } & Pick<
    CharityResponse,
    'success'
  > & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
      charity?: Maybe<{ __typename?: 'Charity' } & Pick<Charity, 'id'>>
    }
}

export type CreateEventMutationVariables = Exact<{
  charityId: Scalars['Float']
  input: EventInput
}>

export type CreateEventMutation = { __typename?: 'Mutation' } & {
  createEvent: { __typename?: 'EventResponse' } & Pick<
    EventResponse,
    'success'
  > & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
}

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Float']
}>

export type DeleteEventMutation = { __typename?: 'Mutation' } & {
  deleteEvent: { __typename?: 'EventResponse' } & Pick<
    EventResponse,
    'success'
  > & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
}

export type FollowCharityMutationVariables = Exact<{
  charityId: Scalars['Int']
}>

export type FollowCharityMutation = { __typename?: 'Mutation' } & {
  followCharity: { __typename?: 'CharityResponse' } & {
    charity?: Maybe<{ __typename?: 'Charity' } & FollowCharityFragment>
  }
}

export type LikeEventMutationVariables = Exact<{
  eventId: Scalars['Int']
}>

export type LikeEventMutation = { __typename?: 'Mutation' } & {
  likeEvent: { __typename?: 'EventLikeResponse' } & {
    likeItem?: Maybe<
      { __typename?: 'Event' } & Pick<Event, 'id' | 'voteStatus' | 'likeNumber'>
    >
  }
}

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & {
    errors?: Maybe<
      Array<
        { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
      >
    >
    user?: Maybe<
      { __typename?: 'User' } & Pick<User, 'id' | 'username'> & {
          adminCharities: Array<
            { __typename?: 'Charity' } & Pick<Charity, 'id' | 'name'>
          >
        }
    >
  }
}

export type LogOutMutationVariables = Exact<{ [key: string]: never }>

export type LogOutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>

export type RequestEventMutationVariables = Exact<{
  eventId: Scalars['Int']
}>

export type RequestEventMutation = { __typename?: 'Mutation' } & {
  requestEvent: { __typename?: 'EventResponse' } & {
    event?: Maybe<
      { __typename?: 'Event' } & Pick<Event, 'id' | 'approvalStatus'>
    >
  }
}

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput
}>

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & {
    errors?: Maybe<
      Array<
        { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
      >
    >
    user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id'>>
  }
}

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['Float']
  input: EventInput
}>

export type UpdateEventMutation = { __typename?: 'Mutation' } & {
  updateEvent: { __typename?: 'EventResponse' } & Pick<
    EventResponse,
    'success'
  > & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
    }
}

export type CharityQueryVariables = Exact<{
  charityId: Scalars['Int']
}>

export type CharityQuery = { __typename?: 'Query' } & {
  charitySearchByID?: Maybe<{ __typename?: 'Charity' } & CharityFragment>
}

export type EventQueryVariables = Exact<{
  id: Scalars['Int']
}>

export type EventQuery = { __typename?: 'Query' } & {
  event?: Maybe<{ __typename?: 'Event' } & EventFragment>
}

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int']
  categories: Array<Scalars['Float']> | Scalars['Float']
  sortByLikes: Scalars['Boolean']
  sortByUpcoming: Scalars['Boolean']
}>

export type EventsQuery = { __typename?: 'Query' } & {
  searchEvents: { __typename?: 'PaginatedEvents' } & Pick<
    PaginatedEvents,
    'total' | 'hasMore'
  > & {
      items: Array<{ __typename?: 'Event' } & EventFragment & LikeEventFragment>
    }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & HeaderFragment>
}

export type UenQueryVariables = Exact<{
  UEN: Scalars['String']
}>

export type UenQuery = { __typename?: 'Query' } & {
  checkUENNumber: { __typename?: 'UENResponse' } & Pick<
    UenResponse,
    'success'
  > & {
      errors?: Maybe<
        Array<
          { __typename?: 'FieldError' } & Pick<FieldError, 'field' | 'message'>
        >
      >
      uendata?: Maybe<{ __typename?: 'UENData' } & Pick<UenData, 'entity_name'>>
    }
}

export type VolunteerRequestsQueryVariables = Exact<{
  eventIds: Array<Scalars['Int']> | Scalars['Int']
}>

export type VolunteerRequestsQuery = { __typename?: 'Query' } & {
  getVolunteerRequestListForEvents: {
    __typename?: 'PaginatedEventVolunteers'
  } & {
    items: Array<
      { __typename?: 'EventVolunteerContainer' } & Pick<
        EventVolunteerContainer,
        'adminapproval' | 'eventId'
      > & {
          user?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'username'>>
        }
    >
  }
}

export const CategoryFragmentDoc = gql`
  fragment Category on Category {
    id
    name
  }
`
export const LikeEventFragmentDoc = gql`
  fragment LikeEvent on Event {
    id
    voteStatus
    likeNumber
  }
`
export const RequestEventFragmentDoc = gql`
  fragment RequestEvent on Event {
    id
    approvalStatus
  }
`
export const CharityProfileFragmentDoc = gql`
  fragment CharityProfile on Charityprofile {
    about
    displayPicture
    links
  }
`
export const CharityFragmentDoc = gql`
  fragment Charity on Charity {
    id
    name
    uen
    physicalAddress
    postalcode
    charitycreator {
      id
      username
    }
    followNumber
    followStatus
    profile {
      ...CharityProfile
    }
    categories {
      id
      name
    }
    followers {
      id
      username
    }
    charityEvents {
      ...LikeEvent
      ...RequestEvent
      name
      description
      dateStart
      dateEnd
      venue
      charity {
        id
        name
      }
      creator {
        id
        username
      }
      completed
      currentEventVolunteers {
        id
        username
      }
      eventTasks {
        id
      }
      adminStatus
      createdAt
    }
    adminStatus
  }
  ${CharityProfileFragmentDoc}
  ${LikeEventFragmentDoc}
  ${RequestEventFragmentDoc}
`
export const EventFragmentDoc = gql`
  fragment Event on Event {
    ...LikeEvent
    ...RequestEvent
    name
    description
    dateStart
    dateEnd
    venue
    charity {
      ...Charity
    }
    creator {
      id
      username
    }
    completed
    currentEventVolunteers {
      id
      username
    }
    eventTasks {
      id
    }
    adminStatus
    createdAt
  }
  ${LikeEventFragmentDoc}
  ${RequestEventFragmentDoc}
  ${CharityFragmentDoc}
`
export const FollowCharityFragmentDoc = gql`
  fragment FollowCharity on Charity {
    id
    followNumber
    followStatus
  }
`
export const HeaderFragmentDoc = gql`
  fragment Header on User {
    id
    username
    adminCharities {
      id
      name
    }
  }
`
export const UserProfileFragmentDoc = gql`
  fragment UserProfile on Userprofile {
    id
    about
    gender
    firstName
    lastName
    displayPicture
    telegramHandle
  }
`
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
`
export type ChangePasswordMutationFn = Apollo.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, options)
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>
export type ChangePasswordMutationResult =
  Apollo.MutationResult<ChangePasswordMutation>
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>
export const CharityCategoryDocument = gql`
  mutation CharityCategory($charityId: Float!, $categories: CategoryInput!) {
    updateCharityCategories(charityId: $charityId, categories: $categories) {
      errors {
        field
        message
      }
      success
    }
  }
`
export type CharityCategoryMutationFn = Apollo.MutationFunction<
  CharityCategoryMutation,
  CharityCategoryMutationVariables
>

/**
 * __useCharityCategoryMutation__
 *
 * To run a mutation, you first call `useCharityCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCharityCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [charityCategoryMutation, { data, loading, error }] = useCharityCategoryMutation({
 *   variables: {
 *      charityId: // value for 'charityId'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useCharityCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CharityCategoryMutation,
    CharityCategoryMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CharityCategoryMutation,
    CharityCategoryMutationVariables
  >(CharityCategoryDocument, options)
}
export type CharityCategoryMutationHookResult = ReturnType<
  typeof useCharityCategoryMutation
>
export type CharityCategoryMutationResult =
  Apollo.MutationResult<CharityCategoryMutation>
export type CharityCategoryMutationOptions = Apollo.BaseMutationOptions<
  CharityCategoryMutation,
  CharityCategoryMutationVariables
>
export const CharitySignUpDocument = gql`
  mutation CharitySignUp($options: CharityDataInput!) {
    createCharity(options: $options) {
      errors {
        field
        message
      }
      charity {
        id
      }
      success
    }
  }
`
export type CharitySignUpMutationFn = Apollo.MutationFunction<
  CharitySignUpMutation,
  CharitySignUpMutationVariables
>

/**
 * __useCharitySignUpMutation__
 *
 * To run a mutation, you first call `useCharitySignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCharitySignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [charitySignUpMutation, { data, loading, error }] = useCharitySignUpMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCharitySignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CharitySignUpMutation,
    CharitySignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CharitySignUpMutation,
    CharitySignUpMutationVariables
  >(CharitySignUpDocument, options)
}
export type CharitySignUpMutationHookResult = ReturnType<
  typeof useCharitySignUpMutation
>
export type CharitySignUpMutationResult =
  Apollo.MutationResult<CharitySignUpMutation>
export type CharitySignUpMutationOptions = Apollo.BaseMutationOptions<
  CharitySignUpMutation,
  CharitySignUpMutationVariables
>
export const CreateEventDocument = gql`
  mutation CreateEvent($charityId: Float!, $input: EventInput!) {
    createEvent(charityId: $charityId, input: $input) {
      errors {
        field
        message
      }
      success
    }
  }
`
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      charityId: // value for 'charityId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    options
  )
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>
export type CreateEventMutationResult =
  Apollo.MutationResult<CreateEventMutation>
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>
export const DeleteEventDocument = gql`
  mutation DeleteEvent($id: Float!) {
    deleteEvent(id: $id) {
      errors {
        field
        message
      }
      success
    }
  }
`
export type DeleteEventMutationFn = Apollo.MutationFunction<
  DeleteEventMutation,
  DeleteEventMutationVariables
>

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEventMutation,
    DeleteEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(
    DeleteEventDocument,
    options
  )
}
export type DeleteEventMutationHookResult = ReturnType<
  typeof useDeleteEventMutation
>
export type DeleteEventMutationResult =
  Apollo.MutationResult<DeleteEventMutation>
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<
  DeleteEventMutation,
  DeleteEventMutationVariables
>
export const FollowCharityDocument = gql`
  mutation FollowCharity($charityId: Int!) {
    followCharity(charityId: $charityId) {
      charity {
        ...FollowCharity
      }
    }
  }
  ${FollowCharityFragmentDoc}
`
export type FollowCharityMutationFn = Apollo.MutationFunction<
  FollowCharityMutation,
  FollowCharityMutationVariables
>

/**
 * __useFollowCharityMutation__
 *
 * To run a mutation, you first call `useFollowCharityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowCharityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followCharityMutation, { data, loading, error }] = useFollowCharityMutation({
 *   variables: {
 *      charityId: // value for 'charityId'
 *   },
 * });
 */
export function useFollowCharityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FollowCharityMutation,
    FollowCharityMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    FollowCharityMutation,
    FollowCharityMutationVariables
  >(FollowCharityDocument, options)
}
export type FollowCharityMutationHookResult = ReturnType<
  typeof useFollowCharityMutation
>
export type FollowCharityMutationResult =
  Apollo.MutationResult<FollowCharityMutation>
export type FollowCharityMutationOptions = Apollo.BaseMutationOptions<
  FollowCharityMutation,
  FollowCharityMutationVariables
>
export const LikeEventDocument = gql`
  mutation LikeEvent($eventId: Int!) {
    likeEvent(eventId: $eventId) {
      likeItem {
        id
        voteStatus
        likeNumber
      }
    }
  }
`
export type LikeEventMutationFn = Apollo.MutationFunction<
  LikeEventMutation,
  LikeEventMutationVariables
>

/**
 * __useLikeEventMutation__
 *
 * To run a mutation, you first call `useLikeEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeEventMutation, { data, loading, error }] = useLikeEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useLikeEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeEventMutation,
    LikeEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LikeEventMutation, LikeEventMutationVariables>(
    LikeEventDocument,
    options
  )
}
export type LikeEventMutationHookResult = ReturnType<
  typeof useLikeEventMutation
>
export type LikeEventMutationResult = Apollo.MutationResult<LikeEventMutation>
export type LikeEventMutationOptions = Apollo.BaseMutationOptions<
  LikeEventMutation,
  LikeEventMutationVariables
>
export const LoginDocument = gql`
  mutation login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      errors {
        field
        message
      }
      user {
        id
        username
        adminCharities {
          id
          name
        }
      }
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const LogOutDocument = gql`
  mutation LogOut {
    logout
  }
`
export type LogOutMutationFn = Apollo.MutationFunction<
  LogOutMutation,
  LogOutMutationVariables
>

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogOutMutation,
    LogOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(
    LogOutDocument,
    options
  )
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>
export type LogOutMutationOptions = Apollo.BaseMutationOptions<
  LogOutMutation,
  LogOutMutationVariables
>
export const RequestEventDocument = gql`
  mutation RequestEvent($eventId: Int!) {
    requestEvent(eventId: $eventId) {
      event {
        id
        approvalStatus
      }
    }
  }
`
export type RequestEventMutationFn = Apollo.MutationFunction<
  RequestEventMutation,
  RequestEventMutationVariables
>

/**
 * __useRequestEventMutation__
 *
 * To run a mutation, you first call `useRequestEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestEventMutation, { data, loading, error }] = useRequestEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useRequestEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RequestEventMutation,
    RequestEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RequestEventMutation,
    RequestEventMutationVariables
  >(RequestEventDocument, options)
}
export type RequestEventMutationHookResult = ReturnType<
  typeof useRequestEventMutation
>
export type RequestEventMutationResult =
  Apollo.MutationResult<RequestEventMutation>
export type RequestEventMutationOptions = Apollo.BaseMutationOptions<
  RequestEventMutation,
  RequestEventMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      user {
        id
      }
    }
  }
`
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  )
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
export const UpdateEventDocument = gql`
  mutation UpdateEvent($id: Float!, $input: EventInput!) {
    updateEvent(id: $id, input: $input) {
      errors {
        field
        message
      }
      success
    }
  }
`
export type UpdateEventMutationFn = Apollo.MutationFunction<
  UpdateEventMutation,
  UpdateEventMutationVariables
>

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(
    UpdateEventDocument,
    options
  )
}
export type UpdateEventMutationHookResult = ReturnType<
  typeof useUpdateEventMutation
>
export type UpdateEventMutationResult =
  Apollo.MutationResult<UpdateEventMutation>
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<
  UpdateEventMutation,
  UpdateEventMutationVariables
>
export const CharityDocument = gql`
  query Charity($charityId: Int!) {
    charitySearchByID(id: $charityId) {
      ...Charity
    }
  }
  ${CharityFragmentDoc}
`

/**
 * __useCharityQuery__
 *
 * To run a query within a React component, call `useCharityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharityQuery({
 *   variables: {
 *      charityId: // value for 'charityId'
 *   },
 * });
 */
export function useCharityQuery(
  baseOptions: Apollo.QueryHookOptions<CharityQuery, CharityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CharityQuery, CharityQueryVariables>(
    CharityDocument,
    options
  )
}
export function useCharityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CharityQuery, CharityQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CharityQuery, CharityQueryVariables>(
    CharityDocument,
    options
  )
}
export type CharityQueryHookResult = ReturnType<typeof useCharityQuery>
export type CharityLazyQueryHookResult = ReturnType<typeof useCharityLazyQuery>
export type CharityQueryResult = Apollo.QueryResult<
  CharityQuery,
  CharityQueryVariables
>
export const EventDocument = gql`
  query Event($id: Int!) {
    event(id: $id) {
      ...Event
    }
  }
  ${EventFragmentDoc}
`

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventQuery(
  baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EventQuery, EventQueryVariables>(
    EventDocument,
    options
  )
}
export function useEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(
    EventDocument,
    options
  )
}
export type EventQueryHookResult = ReturnType<typeof useEventQuery>
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>
export type EventQueryResult = Apollo.QueryResult<
  EventQuery,
  EventQueryVariables
>
export const EventsDocument = gql`
  query Events(
    $limit: Int!
    $categories: [Float!]!
    $sortByLikes: Boolean!
    $sortByUpcoming: Boolean!
  ) {
    searchEvents(
      input: null
      cursor: null
      limit: $limit
      categories: $categories
      sortByLikes: $sortByLikes
      sortByUpcoming: $sortByUpcoming
    ) {
      items {
        ...Event
        ...LikeEvent
      }
      total
      hasMore
    }
  }
  ${EventFragmentDoc}
  ${LikeEventFragmentDoc}
`

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      categories: // value for 'categories'
 *      sortByLikes: // value for 'sortByLikes'
 *      sortByUpcoming: // value for 'sortByUpcoming'
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options
  )
}
export function useEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options
  )
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>
export type EventsQueryResult = Apollo.QueryResult<
  EventsQuery,
  EventsQueryVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...Header
    }
  }
  ${HeaderFragmentDoc}
`

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options)
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>
export const UenDocument = gql`
  query UEN($UEN: String!) {
    checkUENNumber(UENNumber: $UEN) {
      errors {
        field
        message
      }
      uendata {
        entity_name
      }
      success
    }
  }
`

/**
 * __useUenQuery__
 *
 * To run a query within a React component, call `useUenQuery` and pass it any options that fit your needs.
 * When your component renders, `useUenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUenQuery({
 *   variables: {
 *      UEN: // value for 'UEN'
 *   },
 * });
 */
export function useUenQuery(
  baseOptions: Apollo.QueryHookOptions<UenQuery, UenQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UenQuery, UenQueryVariables>(UenDocument, options)
}
export function useUenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UenQuery, UenQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UenQuery, UenQueryVariables>(UenDocument, options)
}
export type UenQueryHookResult = ReturnType<typeof useUenQuery>
export type UenLazyQueryHookResult = ReturnType<typeof useUenLazyQuery>
export type UenQueryResult = Apollo.QueryResult<UenQuery, UenQueryVariables>
export const VolunteerRequestsDocument = gql`
  query VolunteerRequests($eventIds: [Int!]!) {
    getVolunteerRequestListForEvents(
      cursor: null
      limit: 100
      eventIds: $eventIds
    ) {
      items {
        user {
          id
          username
        }
        adminapproval
        eventId
      }
    }
  }
`

/**
 * __useVolunteerRequestsQuery__
 *
 * To run a query within a React component, call `useVolunteerRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVolunteerRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVolunteerRequestsQuery({
 *   variables: {
 *      eventIds: // value for 'eventIds'
 *   },
 * });
 */
export function useVolunteerRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    VolunteerRequestsQuery,
    VolunteerRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    VolunteerRequestsQuery,
    VolunteerRequestsQueryVariables
  >(VolunteerRequestsDocument, options)
}
export function useVolunteerRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VolunteerRequestsQuery,
    VolunteerRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    VolunteerRequestsQuery,
    VolunteerRequestsQueryVariables
  >(VolunteerRequestsDocument, options)
}
export type VolunteerRequestsQueryHookResult = ReturnType<
  typeof useVolunteerRequestsQuery
>
export type VolunteerRequestsLazyQueryHookResult = ReturnType<
  typeof useVolunteerRequestsLazyQuery
>
export type VolunteerRequestsQueryResult = Apollo.QueryResult<
  VolunteerRequestsQuery,
  VolunteerRequestsQueryVariables
>
