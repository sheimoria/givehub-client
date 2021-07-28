import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AdminApproval {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CategoryInput = {
  categories: Array<Scalars['Float']>;
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Charity = {
  __typename?: 'Charity';
  id: Scalars['Float'];
  name: Scalars['String'];
  uen: Scalars['String'];
  physicalAddress: Scalars['String'];
  postalCode: Scalars['String'];
  charitycreator: User;
  followNumber: Scalars['Float'];
  followStatus?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  profile?: Maybe<Charityprofile>;
  categories: Array<Category>;
  followers: Array<User>;
  charityEvents: Array<Event>;
  adminStatus: Scalars['Boolean'];
};

export type CharityDataInput = {
  uen: Scalars['String'];
  name: Scalars['String'];
  physicalAddress: Scalars['String'];
  postalCode: Scalars['String'];
};

export type CharityProfileUpdateInput = {
  name: Scalars['String'];
  physicalAddress: Scalars['String'];
  postalCode: Scalars['String'];
  about: Scalars['String'];
  links?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Scalars['Int']>>;
  displayPicture?: Maybe<Scalars['String']>;
};

export type CharityResponse = {
  __typename?: 'CharityResponse';
  errors?: Maybe<Array<FieldError>>;
  charity?: Maybe<Charity>;
  success: Scalars['Boolean'];
};

export type Charityprofile = {
  __typename?: 'Charityprofile';
  id: Scalars['Float'];
  about: Scalars['String'];
  displayPicture?: Maybe<Scalars['String']>;
  links?: Maybe<Scalars['String']>;
  contactNumber?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  text: Scalars['String'];
  authorId: Scalars['Float'];
  postId: Scalars['Float'];
  parentId?: Maybe<Scalars['Int']>;
  rootId: Scalars['Float'];
  auditstat: Scalars['Boolean'];
  level: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  author?: Maybe<User>;
  parentComment?: Maybe<Comment>;
};

export type CommentInput = {
  text: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
};

export type EPost = {
  __typename?: 'EPost';
  post: Post;
  event?: Maybe<Event>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
  venue: Scalars['String'];
  charity: Charity;
  creator: User;
  likeNumber: Scalars['Float'];
  completed: Scalars['Boolean'];
  imageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
  likeStatus: Scalars['Boolean'];
  approvalStatus?: Maybe<AdminApproval>;
  currentEventVolunteers?: Maybe<Array<User>>;
  volunteerNumber: Scalars['Int'];
  eventTasks?: Maybe<Array<Task>>;
  adminStatus: Scalars['Boolean'];
  unassignedVolunteers?: Maybe<Array<User>>;
};

export type EventInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  dateStart: Scalars['String'];
  dateEnd: Scalars['String'];
  venue?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
};

export type EventLikeResponse = {
  __typename?: 'EventLikeResponse';
  success: Scalars['Boolean'];
  likeItem?: Maybe<Event>;
  errors?: Maybe<Array<FieldError>>;
};

export type EventPostResponse = {
  __typename?: 'EventPostResponse';
  errors?: Maybe<Array<FieldError>>;
  epost?: Maybe<EPost>;
  success?: Maybe<Scalars['Boolean']>;
};

export type EventResponse = {
  __typename?: 'EventResponse';
  errors?: Maybe<Array<FieldError>>;
  event?: Maybe<Event>;
  timeout?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type EventTaskContainer = {
  __typename?: 'EventTaskContainer';
  event: Event;
  tasks: Array<Task>;
};

export type EventTaskContainerResponse = {
  __typename?: 'EventTaskContainerResponse';
  eventContainers: Array<EventTaskContainer>;
  success: Scalars['Boolean'];
};

export type EventVolunteerContainer = {
  __typename?: 'EventVolunteerContainer';
  user?: Maybe<User>;
  adminapproval?: Maybe<AdminApproval>;
  eventId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

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
  __typename?: 'Mutation';
  updateUserCategories: CategoryResponse;
  updateCharityCategories: CategoryResponse;
  register: UserResponse;
  verifyUser: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  updateUserProfile: UserResponse;
  changePassword: UserResponse;
  forgotPassword: UserResponse;
  requestFriend: UserResponse;
  acceptFriendRequest: UserResponse;
  blockUser: UserResponse;
  likePost: PostLikeResponse;
  createPost: EPost;
  updatePost?: Maybe<EPost>;
  deletePost: Scalars['Boolean'];
  commentOnPost: PostResponse;
  updateCommentOnPost: PostResponse;
  deleteCommentOnPost: PostResponse;
  createCharity: CharityResponse;
  updateCharityProfile: CharityResponse;
  followCharity: CharityResponse;
  addAdminToCharity: CharityResponse;
  likeEvent: EventLikeResponse;
  createEvent: EventResponse;
  updateEvent: EventResponse;
  deleteEvent: EventResponse;
  shareEvent: EventPostResponse;
  markEventAsComplete: EventResponse;
  requestEvent: EventResponse;
  acceptEventVolunteer: UpdateEventVolunteerResponse;
  removeEventVolunteer: UpdateEventVolunteerResponse;
  createTask: TaskResponse;
  updateTask: TaskResponse;
  deleteTask: TaskResponse;
  addVolunteerToTask: TaskVolunteerResponse;
  removeVolunteerFromTask: TaskVolunteerResponse;
  createTelegramGroupForEvent: EventResponse;
  updateTelegramGroupMembersForEvent: EventResponse;
};


export type MutationUpdateUserCategoriesArgs = {
  categories: CategoryInput;
};


export type MutationUpdateCharityCategoriesArgs = {
  charityId: Scalars['Float'];
  categories: CategoryInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationVerifyUserArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUpdateUserProfileArgs = {
  options: UserProfileUpdateInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRequestFriendArgs = {
  userId: Scalars['Float'];
};


export type MutationAcceptFriendRequestArgs = {
  accept: Scalars['Boolean'];
  userId: Scalars['Float'];
};


export type MutationBlockUserArgs = {
  userId: Scalars['Float'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationUpdatePostArgs = {
  text: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationCommentOnPostArgs = {
  input: CommentInput;
  postId: Scalars['Float'];
};


export type MutationUpdateCommentOnPostArgs = {
  input: CommentInput;
  commentId: Scalars['Float'];
};


export type MutationDeleteCommentOnPostArgs = {
  commentId: Scalars['Float'];
};


export type MutationCreateCharityArgs = {
  options: CharityDataInput;
};


export type MutationUpdateCharityProfileArgs = {
  options: CharityProfileUpdateInput;
  charityId: Scalars['Float'];
};


export type MutationFollowCharityArgs = {
  charityId: Scalars['Int'];
};


export type MutationAddAdminToCharityArgs = {
  userId: Scalars['Int'];
  charityId: Scalars['Int'];
};


export type MutationLikeEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationCreateEventArgs = {
  charityId: Scalars['Float'];
  input: EventInput;
};


export type MutationUpdateEventArgs = {
  input: EventInput;
  id: Scalars['Float'];
};


export type MutationDeleteEventArgs = {
  id: Scalars['Float'];
};


export type MutationShareEventArgs = {
  input: PostInput;
  id: Scalars['Float'];
};


export type MutationMarkEventAsCompleteArgs = {
  id: Scalars['Float'];
};


export type MutationRequestEventArgs = {
  eventId: Scalars['Int'];
};


export type MutationAcceptEventVolunteerArgs = {
  acceptVolunteer: Scalars['Boolean'];
  eventVolunteerUserId: Scalars['Int'];
  eventId: Scalars['Int'];
};


export type MutationRemoveEventVolunteerArgs = {
  eventVolunteerUserId: Scalars['Int'];
  eventId: Scalars['Int'];
};


export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
  eventId: Scalars['Int'];
};


export type MutationUpdateTaskArgs = {
  completionStatus?: Maybe<TaskCompletionStatus>;
  taskInput: TaskInput;
  taskId: Scalars['Int'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['Int'];
};


export type MutationAddVolunteerToTaskArgs = {
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
};


export type MutationRemoveVolunteerFromTaskArgs = {
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
};


export type MutationCreateTelegramGroupForEventArgs = {
  groupDescription: Scalars['String'];
  groupName: Scalars['String'];
  eventId: Scalars['Int'];
};


export type MutationUpdateTelegramGroupMembersForEventArgs = {
  eventId: Scalars['Int'];
};

export type PaginatedCharities = {
  __typename?: 'PaginatedCharities';
  items: Array<Charity>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type PaginatedComments = {
  __typename?: 'PaginatedComments';
  items: Array<Comment>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  success: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type PaginatedEventVolunteers = {
  __typename?: 'PaginatedEventVolunteers';
  items: Array<EventVolunteerContainer>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
  success: Scalars['Boolean'];
};

export type PaginatedEvents = {
  __typename?: 'PaginatedEvents';
  items: Array<Event>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  items: Array<EPost>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type PaginatedTasks = {
  __typename?: 'PaginatedTasks';
  items: Array<Task>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
  success: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  items: Array<User>;
  total: Scalars['Int'];
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  text: Scalars['String'];
  likeNumber: Scalars['Float'];
  voteStatus?: Maybe<Scalars['Int']>;
  creatorId: Scalars['Float'];
  creator: User;
  auditstat: Scalars['Boolean'];
  isEvent: Scalars['Boolean'];
  imageUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  textSnippet: Scalars['String'];
  likeStatus: Scalars['Boolean'];
  creatorStatus: Scalars['Boolean'];
  comments?: Maybe<Array<Comment>>;
  commentNumber: Scalars['Int'];
};

export type PostInput = {
  text: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
};

export type PostLikeResponse = {
  __typename?: 'PostLikeResponse';
  success: Scalars['Boolean'];
  likeItem?: Maybe<EPost>;
  errors?: Maybe<Array<FieldError>>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  epost: EPost;
  success: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  interests: Array<Category>;
  userroles: Array<Userrole>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  viewTasksAssignedToMe: EventTaskContainerResponse;
  viewMyPendingFriendRequests: UserResponse;
  searchUsers: PaginatedUsers;
  posts: PaginatedPosts;
  post?: Maybe<EPost>;
  postComments: PaginatedComments;
  getCommentsAtRoot: PaginatedComments;
  charitySearchByUEN?: Maybe<Charity>;
  charitySearchByID?: Maybe<Charity>;
  checkUENNumber: UenResponse;
  searchCharitiesByCategories: PaginatedCharities;
  searchCharities: PaginatedCharities;
  searchEvents: PaginatedEvents;
  event?: Maybe<Event>;
  getVolunteerRequestListForEvents: PaginatedEventVolunteers;
  getPendingVolunteerRequestForEvents: PaginatedEventVolunteers;
  getAcceptedVolunteerRequestListForEvents: PaginatedEventVolunteers;
  searchTasks: PaginatedTasks;
  userRecommender: PaginatedUsers;
  charityRecommender: PaginatedCharities;
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QuerySearchUsersArgs = {
  input?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostCommentsArgs = {
  depth?: Maybe<Scalars['Int']>;
  limit: Scalars['Float'];
  postId: Scalars['Float'];
};


export type QueryGetCommentsAtRootArgs = {
  depth?: Maybe<Scalars['Int']>;
  limit: Scalars['Float'];
  rootCommentId: Scalars['Float'];
};


export type QueryCharitySearchByUenArgs = {
  uen: Scalars['String'];
};


export type QueryCharitySearchByIdArgs = {
  id: Scalars['Int'];
};


export type QueryCheckUenNumberArgs = {
  UENNumber: Scalars['String'];
};


export type QuerySearchCharitiesByCategoriesArgs = {
  categories?: Maybe<Array<Scalars['Float']>>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QuerySearchCharitiesArgs = {
  input?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  categories: Array<Scalars['Float']>;
  limit: Scalars['Int'];
};


export type QuerySearchEventsArgs = {
  input?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  categories: Array<Scalars['Float']>;
  sortByUpcoming: Scalars['Boolean'];
  sortByLikes: Scalars['Boolean'];
  limit: Scalars['Int'];
};


export type QueryEventArgs = {
  id: Scalars['Int'];
};


export type QueryGetVolunteerRequestListForEventsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  eventIds: Array<Scalars['Int']>;
};


export type QueryGetPendingVolunteerRequestForEventsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  eventIds: Array<Scalars['Int']>;
};


export type QueryGetAcceptedVolunteerRequestListForEventsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  eventIds: Array<Scalars['Int']>;
};


export type QuerySearchTasksArgs = {
  input?: Maybe<Scalars['String']>;
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserRecommenderArgs = {
  limit: Scalars['Float'];
};


export type QueryCharityRecommenderArgs = {
  limit: Scalars['Float'];
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['Float'];
  description: Scalars['String'];
  deadline: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  volunteersAssigned?: Maybe<Array<User>>;
  unassignedVolunteers?: Maybe<Array<User>>;
  adminStatus: Scalars['Boolean'];
};

export enum TaskCompletionStatus {
  Closed = 'CLOSED',
  New = 'NEW',
  Active = 'ACTIVE',
  Resolved = 'RESOLVED'
}

export type TaskInput = {
  description: Scalars['String'];
  deadline: Scalars['String'];
};

export type TaskResponse = {
  __typename?: 'TaskResponse';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
  task?: Maybe<Task>;
};

export type TaskVolunteerResponse = {
  __typename?: 'TaskVolunteerResponse';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type UenData = {
  __typename?: 'UENData';
  uen: Scalars['String'];
  reg_street_name: Scalars['String'];
  entity_name: Scalars['String'];
  entity_type: Scalars['String'];
  reg_postal_code: Scalars['String'];
  issuance_agency_id: Scalars['String'];
  uen_issue_date: Scalars['String'];
  uen_status: Scalars['String'];
};

export type UenResponse = {
  __typename?: 'UENResponse';
  errors?: Maybe<Array<FieldError>>;
  uendata?: Maybe<UenData>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateEventVolunteerResponse = {
  __typename?: 'UpdateEventVolunteerResponse';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  profile?: Maybe<Userprofile>;
  categories: Array<Category>;
  followedCharities: Array<Charity>;
  adminCharities: Array<Charity>;
  likedEvents: Array<Event>;
  volunteeredEvents?: Maybe<Array<Event>>;
  friends: Array<User>;
  friendStatus?: Maybe<FriendRequestStatus>;
  viewerStatus: Scalars['Boolean'];
  posts?: Maybe<Array<EPost>>;
  friendNumber: Scalars['Int'];
  followedCharitiesNumber: Scalars['Int'];
  mutualFriends: Array<User>;
};

export type UserProfileUpdateInput = {
  email: Scalars['String'];
  about: Scalars['String'];
  gender?: Maybe<Genders>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  telegramHandle?: Maybe<Scalars['String']>;
  displayPicture?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Scalars['Int']>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  userList?: Maybe<Array<User>>;
  timeout?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Userprofile = {
  __typename?: 'Userprofile';
  id: Scalars['Float'];
  about: Scalars['String'];
  gender?: Maybe<Genders>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  displayPicture?: Maybe<Scalars['String']>;
  telegramHandle?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Userrole = {
  __typename?: 'Userrole';
  id: Scalars['Float'];
  roleName: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CategoryFragment = (
  { __typename?: 'Category' }
  & Pick<Category, 'id' | 'name'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { adminCharities: Array<(
        { __typename?: 'Charity' }
        & Pick<Charity, 'id' | 'name'>
      )> }
    )> }
  ) }
);

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SignUpMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  ) }
);

export type CharityQueryVariables = Exact<{
  charityId: Scalars['Int'];
}>;


export type CharityQuery = (
  { __typename?: 'Query' }
  & { charitySearchByID?: Maybe<(
    { __typename?: 'Charity' }
    & CharityPageFragment
  )> }
);

export type CharityEventsFragment = (
  { __typename?: 'Charity' }
  & { charityEvents: Array<(
    { __typename?: 'Event' }
    & EventCardFragment
  )> }
);

export type CharityFollowsFragment = (
  { __typename?: 'Charity' }
  & Pick<Charity, 'id' | 'followNumber' | 'followStatus'>
);

export type CharityHeaderFragment = (
  { __typename?: 'Charity' }
  & Pick<Charity, 'id' | 'name' | 'followStatus' | 'adminStatus'>
  & { profile?: Maybe<(
    { __typename?: 'Charityprofile' }
    & Pick<Charityprofile, 'displayPicture'>
  )>, categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )> }
);

export type CharityPageFragment = (
  { __typename?: 'Charity' }
  & CharityProfileFragment
  & CharityEventsFragment
);

export type CharityProfileFragment = (
  { __typename?: 'Charity' }
  & Pick<Charity, 'adminStatus' | 'physicalAddress' | 'postalCode'>
  & { profile?: Maybe<(
    { __typename?: 'Charityprofile' }
    & Pick<Charityprofile, 'id' | 'about' | 'links' | 'displayPicture' | 'email' | 'contactNumber'>
  )> }
  & CharityHeaderFragment
  & CharityFollowsFragment
);

export type CharityRecommendationsQueryVariables = Exact<{
  limit: Scalars['Float'];
}>;


export type CharityRecommendationsQuery = (
  { __typename?: 'Query' }
  & { charityRecommender: (
    { __typename?: 'PaginatedCharities' }
    & Pick<PaginatedCharities, 'hasMore'>
    & { items: Array<(
      { __typename?: 'Charity' }
      & CharityHeaderFragment
    )> }
  ) }
);

export type CreateCharityMutationVariables = Exact<{
  options: CharityDataInput;
}>;


export type CreateCharityMutation = (
  { __typename?: 'Mutation' }
  & { createCharity: (
    { __typename?: 'CharityResponse' }
    & Pick<CharityResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, charity?: Maybe<(
      { __typename?: 'Charity' }
      & Pick<Charity, 'id' | 'name' | 'physicalAddress' | 'postalCode'>
    )> }
  ) }
);

export type FollowCharityMutationVariables = Exact<{
  charityId: Scalars['Int'];
}>;


export type FollowCharityMutation = (
  { __typename?: 'Mutation' }
  & { followCharity: (
    { __typename?: 'CharityResponse' }
    & { charity?: Maybe<(
      { __typename?: 'Charity' }
      & CharityFollowsFragment
    )> }
  ) }
);

export type SearchCharitiesQueryVariables = Exact<{
  input?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type SearchCharitiesQuery = (
  { __typename?: 'Query' }
  & { searchCharities: (
    { __typename?: 'PaginatedCharities' }
    & Pick<PaginatedCharities, 'hasMore'>
    & { items: Array<(
      { __typename?: 'Charity' }
      & CharityHeaderFragment
    )> }
  ) }
);

export type UenQueryVariables = Exact<{
  UEN: Scalars['String'];
}>;


export type UenQuery = (
  { __typename?: 'Query' }
  & { checkUENNumber: (
    { __typename?: 'UENResponse' }
    & Pick<UenResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, uendata?: Maybe<(
      { __typename?: 'UENData' }
      & Pick<UenData, 'entity_name'>
    )> }
  ) }
);

export type UpdateCharityProfileMutationVariables = Exact<{
  options: CharityProfileUpdateInput;
  charityId: Scalars['Float'];
}>;


export type UpdateCharityProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateCharityProfile: (
    { __typename?: 'CharityResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, charity?: Maybe<(
      { __typename?: 'Charity' }
      & CharityProfileFragment
    )> }
  ) }
);

export type AcceptVolunteerMutationVariables = Exact<{
  accept: Scalars['Boolean'];
  eventId: Scalars['Int'];
  volunteerId: Scalars['Int'];
}>;


export type AcceptVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { acceptEventVolunteer: (
    { __typename?: 'UpdateEventVolunteerResponse' }
    & Pick<UpdateEventVolunteerResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type AssignVolunteerMutationVariables = Exact<{
  userId: Scalars['Int'];
  taskId: Scalars['Int'];
}>;


export type AssignVolunteerMutation = (
  { __typename?: 'Mutation' }
  & { addVolunteerToTask: (
    { __typename?: 'TaskVolunteerResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateEventMutationVariables = Exact<{
  charityId: Scalars['Float'];
  input: EventInput;
}>;


export type CreateEventMutation = (
  { __typename?: 'Mutation' }
  & { createEvent: (
    { __typename?: 'EventResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, event?: Maybe<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'name' | 'description'>
    )> }
  ) }
);

export type CreateTelegramMutationVariables = Exact<{
  eventId: Scalars['Int'];
  groupName: Scalars['String'];
  groupDescription: Scalars['String'];
}>;


export type CreateTelegramMutation = (
  { __typename?: 'Mutation' }
  & { createTelegramGroupForEvent: (
    { __typename?: 'EventResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteEventMutation = (
  { __typename?: 'Mutation' }
  & { deleteEvent: (
    { __typename?: 'EventResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type EventQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type EventQuery = (
  { __typename?: 'Query' }
  & { event?: Maybe<(
    { __typename?: 'Event' }
    & EventCardFragment
  )> }
);

export type EventCardFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'adminStatus' | 'imageUrl'>
  & EventInfoFragment
  & EventLikesFragment
  & EventRequestsFragment
);

export type EventHeaderFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'createdAt' | 'name' | 'dateStart' | 'dateEnd' | 'venue'>
  & { charity: (
    { __typename?: 'Charity' }
    & CharityHeaderFragment
  ) }
);

export type EventInfoFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'description' | 'imageUrl'>
  & EventHeaderFragment
);

export type EventLikesFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'likeStatus' | 'likeNumber'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type EventRequestsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'approvalStatus' | 'volunteerNumber' | 'adminStatus'>
);

export type EventSnippetFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'name' | 'dateStart' | 'dateEnd' | 'venue'>
  & { charity: (
    { __typename?: 'Charity' }
    & Pick<Charity, 'id' | 'name'>
  ) }
);

export type EventTasksQueryVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type EventTasksQuery = (
  { __typename?: 'Query' }
  & { event?: Maybe<(
    { __typename?: 'Event' }
    & { unassignedVolunteers?: Maybe<Array<(
      { __typename?: 'User' }
      & UserHeaderFragment
    )>>, eventTasks?: Maybe<Array<(
      { __typename?: 'Task' }
      & { volunteersAssigned?: Maybe<Array<(
        { __typename?: 'User' }
        & UserHeaderFragment
      )>> }
      & TaskHeaderFragment
    )>> }
  )> }
);

export type EventsQueryVariables = Exact<{
  limit: Scalars['Int'];
  categories: Array<Scalars['Float']> | Scalars['Float'];
  sortByLikes: Scalars['Boolean'];
  sortByUpcoming: Scalars['Boolean'];
}>;


export type EventsQuery = (
  { __typename?: 'Query' }
  & { searchEvents: (
    { __typename?: 'PaginatedEvents' }
    & Pick<PaginatedEvents, 'total' | 'hasMore'>
    & { items: Array<(
      { __typename?: 'Event' }
      & EventCardFragment
    )> }
  ) }
);

export type LikeEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type LikeEventMutation = (
  { __typename?: 'Mutation' }
  & { likeEvent: (
    { __typename?: 'EventLikeResponse' }
    & { likeItem?: Maybe<(
      { __typename?: 'Event' }
      & EventLikesFragment
    )> }
  ) }
);

export type RequestEventMutationVariables = Exact<{
  eventId: Scalars['Int'];
}>;


export type RequestEventMutation = (
  { __typename?: 'Mutation' }
  & { requestEvent: (
    { __typename?: 'EventResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, event?: Maybe<(
      { __typename?: 'Event' }
      & EventRequestsFragment
    )> }
  ) }
);

export type SearchEventsQueryVariables = Exact<{
  input?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type SearchEventsQuery = (
  { __typename?: 'Query' }
  & { searchEvents: (
    { __typename?: 'PaginatedEvents' }
    & Pick<PaginatedEvents, 'hasMore'>
    & { items: Array<(
      { __typename?: 'Event' }
      & EventHeaderFragment
    )> }
  ) }
);

export type ShareEventMutationVariables = Exact<{
  input: PostInput;
  id: Scalars['Float'];
}>;


export type ShareEventMutation = (
  { __typename?: 'Mutation' }
  & { shareEvent: (
    { __typename?: 'EventPostResponse' }
    & Pick<EventPostResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, epost?: Maybe<(
      { __typename?: 'EPost' }
      & { post: (
        { __typename?: 'Post' }
        & PostCardFragment
      ), event?: Maybe<(
        { __typename?: 'Event' }
        & EventCardFragment
      )> }
    )> }
  ) }
);

export type UpdateEventMutationVariables = Exact<{
  id: Scalars['Float'];
  input: EventInput;
}>;


export type UpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { updateEvent: (
    { __typename?: 'EventResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type VolunteerRequestsQueryVariables = Exact<{
  eventIds: Array<Scalars['Int']> | Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type VolunteerRequestsQuery = (
  { __typename?: 'Query' }
  & { getPendingVolunteerRequestForEvents: (
    { __typename?: 'PaginatedEventVolunteers' }
    & Pick<PaginatedEventVolunteers, 'hasMore'>
    & { items: Array<(
      { __typename?: 'EventVolunteerContainer' }
      & { user?: Maybe<(
        { __typename?: 'User' }
        & UserHeaderFragment
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CommentSnippetFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'createdAt' | 'text'>
  & { author?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'Userprofile' }
      & Pick<Userprofile, 'firstName' | 'lastName' | 'displayPicture'>
    )> }
  )> }
);

export type CreateCommentMutationVariables = Exact<{
  input: CommentInput;
  postId: Scalars['Float'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { commentOnPost: (
    { __typename?: 'PostResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'EPost' }
    & { post: (
      { __typename?: 'Post' }
      & PostCardFragment
    ), event?: Maybe<(
      { __typename?: 'Event' }
      & EventCardFragment
    )> }
  ) }
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost: (
    { __typename?: 'PostLikeResponse' }
    & { likeItem?: Maybe<(
      { __typename?: 'EPost' }
      & { post: (
        { __typename?: 'Post' }
        & PostLikesFragment
      ) }
    )> }
  ) }
);

export type PostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'EPost' }
    & { post: (
      { __typename?: 'Post' }
      & PostCardFragment
    ), event?: Maybe<(
      { __typename?: 'Event' }
      & EventInfoFragment
    )> }
  )> }
);

export type PostCardFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'creatorStatus' | 'imageUrl' | 'commentNumber'>
  & PostHeaderFragment
  & PostInfoFragment
  & PostLikesFragment
);

export type PostCardCommentInputFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id'>
  & { creator: (
    { __typename?: 'User' }
    & { profile?: Maybe<(
      { __typename?: 'Userprofile' }
      & Pick<Userprofile, 'displayPicture'>
    )> }
  ) }
);

export type PostCommentsQueryVariables = Exact<{
  depth?: Maybe<Scalars['Int']>;
  limit: Scalars['Float'];
  postId: Scalars['Float'];
}>;


export type PostCommentsQuery = (
  { __typename?: 'Query' }
  & { postComments: (
    { __typename?: 'PaginatedComments' }
    & Pick<PaginatedComments, 'hasMore'>
    & { items: Array<(
      { __typename?: 'Comment' }
      & CommentSnippetFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type PostHeaderFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'createdAt'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { profile?: Maybe<(
      { __typename?: 'Userprofile' }
      & Pick<Userprofile, 'firstName' | 'lastName' | 'displayPicture'>
    )> }
  ) }
);

export type PostInfoFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'text'>
);

export type PostLikesFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'likeStatus' | 'likeNumber'>
);

export type PostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: (
    { __typename?: 'PaginatedPosts' }
    & { items: Array<(
      { __typename?: 'EPost' }
      & { post: (
        { __typename?: 'Post' }
        & PostCardFragment
      ), event?: Maybe<(
        { __typename?: 'Event' }
        & EventInfoFragment
      )> }
    )> }
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  text: Scalars['String'];
  id: Scalars['Float'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'EPost' }
    & { post: (
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'text'>
    ) }
  )> }
);

export type CreateTaskMutationVariables = Exact<{
  taskInput: TaskInput;
  eventId: Scalars['Int'];
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { createTask: (
    { __typename?: 'TaskResponse' }
    & Pick<TaskResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, task?: Maybe<(
      { __typename?: 'Task' }
      & TaskCardFragment
    )> }
  ) }
);

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars['Int'];
}>;


export type DeleteTaskMutation = (
  { __typename?: 'Mutation' }
  & { deleteTask: (
    { __typename?: 'TaskResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type TaskCardFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'adminStatus' | 'description' | 'deadline' | 'createdAt'>
  & { volunteersAssigned?: Maybe<Array<(
    { __typename?: 'User' }
    & UserProfileFragment
  )>> }
);

export type TaskHeaderFragment = (
  { __typename?: 'Task' }
  & Pick<Task, 'id' | 'description' | 'deadline'>
);

export type AcceptFriendRequestMutationVariables = Exact<{
  userId: Scalars['Float'];
  accept: Scalars['Boolean'];
}>;


export type AcceptFriendRequestMutation = (
  { __typename?: 'Mutation' }
  & { acceptFriendRequest: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type FriendRecommendationsQueryVariables = Exact<{
  limit: Scalars['Float'];
}>;


export type FriendRecommendationsQuery = (
  { __typename?: 'Query' }
  & { userRecommender: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { items: Array<(
      { __typename?: 'User' }
      & UserHeaderFragment
    )> }
  ) }
);

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendRequestsQuery = (
  { __typename?: 'Query' }
  & { viewMyPendingFriendRequests: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, userList?: Maybe<Array<(
      { __typename?: 'User' }
      & UserHeaderFragment
    )>> }
  ) }
);

export type HeaderFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'username'>
  & { profile?: Maybe<(
    { __typename?: 'Userprofile' }
    & Pick<Userprofile, 'id' | 'firstName' | 'lastName' | 'telegramHandle' | 'displayPicture'>
  )>, adminCharities: Array<(
    { __typename?: 'Charity' }
    & Pick<Charity, 'id' | 'name'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & HeaderFragment
  )> }
);

export type RequestFriendMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type RequestFriendMutation = (
  { __typename?: 'Mutation' }
  & { requestFriend: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, userList?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>> }
  ) }
);

export type SearchUsersQueryVariables = Exact<{
  input?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type SearchUsersQuery = (
  { __typename?: 'Query' }
  & { searchUsers: (
    { __typename?: 'PaginatedUsers' }
    & Pick<PaginatedUsers, 'hasMore'>
    & { items: Array<(
      { __typename?: 'User' }
      & UserHeaderFragment
    )> }
  ) }
);

export type UpdateUserCategoriesMutationVariables = Exact<{
  categories: CategoryInput;
}>;


export type UpdateUserCategoriesMutation = (
  { __typename?: 'Mutation' }
  & { updateUserCategories: (
    { __typename?: 'CategoryResponse' }
    & Pick<CategoryResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UpdateUserProfileMutationVariables = Exact<{
  options: UserProfileUpdateInput;
}>;


export type UpdateUserProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfile: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserProfileFragment
    )> }
  ) }
);

export type UserQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserHeaderFragment
    & UserProfileFragment
    & UserEventsFragment
  )> }
);

export type UserEventsFragment = (
  { __typename?: 'User' }
  & { likedEvents: Array<(
    { __typename?: 'Event' }
    & EventCardFragment
  )>, volunteeredEvents?: Maybe<Array<(
    { __typename?: 'Event' }
    & EventCardFragment
  )>> }
);

export type UserFriendFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'friendStatus'>
);

export type UserHeaderFragment = (
  { __typename?: 'User' }
  & Pick<User, 'username' | 'friendStatus'>
  & { profile?: Maybe<(
    { __typename?: 'Userprofile' }
    & Pick<Userprofile, 'id' | 'firstName' | 'lastName' | 'telegramHandle'>
  )> }
  & UserPictureFragment
);

export type UserPictureFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id'>
  & { profile?: Maybe<(
    { __typename?: 'Userprofile' }
    & Pick<Userprofile, 'id' | 'displayPicture'>
  )> }
);

export type UserProfileFragment = (
  { __typename?: 'User' }
  & Pick<User, 'email' | 'friendStatus' | 'friendNumber' | 'followedCharitiesNumber' | 'viewerStatus'>
  & { profile?: Maybe<(
    { __typename?: 'Userprofile' }
    & Pick<Userprofile, 'id' | 'about'>
  )>, categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )>, adminCharities: Array<(
    { __typename?: 'Charity' }
    & Pick<Charity, 'id' | 'name'>
  )> }
  & UserHeaderFragment
);

export type UserTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type UserTasksQuery = (
  { __typename?: 'Query' }
  & { viewTasksAssignedToMe: (
    { __typename?: 'EventTaskContainerResponse' }
    & { eventContainers: Array<(
      { __typename?: 'EventTaskContainer' }
      & { event: (
        { __typename?: 'Event' }
        & EventSnippetFragment
      ), tasks: Array<(
        { __typename?: 'Task' }
        & TaskHeaderFragment
      )> }
    )> }
  ) }
);

export type VerifyUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyUserMutation = (
  { __typename?: 'Mutation' }
  & { verifyUser: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'success'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
}
    `;
export const CharityHeaderFragmentDoc = gql`
    fragment CharityHeader on Charity {
  id
  profile {
    displayPicture
  }
  name
  categories {
    id
    name
  }
  followStatus
  adminStatus
}
    `;
export const CharityFollowsFragmentDoc = gql`
    fragment CharityFollows on Charity {
  id
  followNumber
  followStatus
}
    `;
export const CharityProfileFragmentDoc = gql`
    fragment CharityProfile on Charity {
  adminStatus
  ...CharityHeader
  profile {
    id
    about
    links
    displayPicture
    email
    contactNumber
  }
  physicalAddress
  postalCode
  ...CharityFollows
}
    ${CharityHeaderFragmentDoc}
${CharityFollowsFragmentDoc}`;
export const EventHeaderFragmentDoc = gql`
    fragment EventHeader on Event {
  id
  charity {
    ...CharityHeader
  }
  createdAt
  name
  dateStart
  dateEnd
  venue
}
    ${CharityHeaderFragmentDoc}`;
export const EventInfoFragmentDoc = gql`
    fragment EventInfo on Event {
  ...EventHeader
  description
  imageUrl
}
    ${EventHeaderFragmentDoc}`;
export const EventLikesFragmentDoc = gql`
    fragment EventLikes on Event {
  id
  creator {
    id
  }
  likeStatus
  likeNumber
}
    `;
export const EventRequestsFragmentDoc = gql`
    fragment EventRequests on Event {
  id
  approvalStatus
  volunteerNumber
  adminStatus
}
    `;
export const EventCardFragmentDoc = gql`
    fragment EventCard on Event {
  adminStatus
  ...EventInfo
  imageUrl
  ...EventLikes
  ...EventRequests
}
    ${EventInfoFragmentDoc}
${EventLikesFragmentDoc}
${EventRequestsFragmentDoc}`;
export const CharityEventsFragmentDoc = gql`
    fragment CharityEvents on Charity {
  charityEvents {
    ...EventCard
  }
}
    ${EventCardFragmentDoc}`;
export const CharityPageFragmentDoc = gql`
    fragment CharityPage on Charity {
  ...CharityProfile
  ...CharityEvents
}
    ${CharityProfileFragmentDoc}
${CharityEventsFragmentDoc}`;
export const EventSnippetFragmentDoc = gql`
    fragment EventSnippet on Event {
  id
  charity {
    id
    name
  }
  name
  dateStart
  dateEnd
  venue
}
    `;
export const CommentSnippetFragmentDoc = gql`
    fragment CommentSnippet on Comment {
  id
  author {
    id
    username
    profile {
      firstName
      lastName
      displayPicture
    }
  }
  createdAt
  text
}
    `;
export const PostHeaderFragmentDoc = gql`
    fragment PostHeader on Post {
  id
  creator {
    id
    profile {
      firstName
      lastName
      displayPicture
    }
    username
  }
  createdAt
}
    `;
export const PostInfoFragmentDoc = gql`
    fragment PostInfo on Post {
  id
  text
}
    `;
export const PostLikesFragmentDoc = gql`
    fragment PostLikes on Post {
  id
  likeStatus
  likeNumber
}
    `;
export const PostCardFragmentDoc = gql`
    fragment PostCard on Post {
  creatorStatus
  ...PostHeader
  ...PostInfo
  imageUrl
  ...PostLikes
  commentNumber
}
    ${PostHeaderFragmentDoc}
${PostInfoFragmentDoc}
${PostLikesFragmentDoc}`;
export const PostCardCommentInputFragmentDoc = gql`
    fragment PostCardCommentInput on Post {
  id
  creator {
    profile {
      displayPicture
    }
  }
}
    `;
export const UserPictureFragmentDoc = gql`
    fragment UserPicture on User {
  id
  profile {
    id
    displayPicture
  }
}
    `;
export const UserHeaderFragmentDoc = gql`
    fragment UserHeader on User {
  ...UserPicture
  profile {
    id
    firstName
    lastName
    telegramHandle
  }
  username
  friendStatus
}
    ${UserPictureFragmentDoc}`;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on User {
  ...UserHeader
  email
  profile {
    id
    about
  }
  categories {
    id
    name
  }
  adminCharities {
    id
    name
  }
  friendStatus
  friendNumber
  followedCharitiesNumber
  viewerStatus
}
    ${UserHeaderFragmentDoc}`;
export const TaskCardFragmentDoc = gql`
    fragment TaskCard on Task {
  id
  adminStatus
  description
  deadline
  createdAt
  volunteersAssigned {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export const TaskHeaderFragmentDoc = gql`
    fragment TaskHeader on Task {
  id
  description
  deadline
}
    `;
export const HeaderFragmentDoc = gql`
    fragment Header on User {
  id
  email
  username
  profile {
    id
    firstName
    lastName
    telegramHandle
    displayPicture
  }
  adminCharities {
    id
    name
  }
}
    `;
export const UserEventsFragmentDoc = gql`
    fragment UserEvents on User {
  likedEvents {
    ...EventCard
  }
  volunteeredEvents {
    ...EventCard
  }
}
    ${EventCardFragmentDoc}`;
export const UserFriendFragmentDoc = gql`
    fragment UserFriend on User {
  id
  friendStatus
}
    `;
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
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

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
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      field
      message
    }
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
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
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

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
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($options: UsernamePasswordInput!) {
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
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CharityDocument = gql`
    query Charity($charityId: Int!) {
  charitySearchByID(id: $charityId) {
    ...CharityPage
  }
}
    ${CharityPageFragmentDoc}`;

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
export function useCharityQuery(baseOptions: Apollo.QueryHookOptions<CharityQuery, CharityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharityQuery, CharityQueryVariables>(CharityDocument, options);
      }
export function useCharityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharityQuery, CharityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharityQuery, CharityQueryVariables>(CharityDocument, options);
        }
export type CharityQueryHookResult = ReturnType<typeof useCharityQuery>;
export type CharityLazyQueryHookResult = ReturnType<typeof useCharityLazyQuery>;
export type CharityQueryResult = Apollo.QueryResult<CharityQuery, CharityQueryVariables>;
export const CharityRecommendationsDocument = gql`
    query CharityRecommendations($limit: Float!) {
  charityRecommender(limit: $limit) {
    items {
      ...CharityHeader
    }
    hasMore
  }
}
    ${CharityHeaderFragmentDoc}`;

/**
 * __useCharityRecommendationsQuery__
 *
 * To run a query within a React component, call `useCharityRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharityRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharityRecommendationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCharityRecommendationsQuery(baseOptions: Apollo.QueryHookOptions<CharityRecommendationsQuery, CharityRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CharityRecommendationsQuery, CharityRecommendationsQueryVariables>(CharityRecommendationsDocument, options);
      }
export function useCharityRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CharityRecommendationsQuery, CharityRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CharityRecommendationsQuery, CharityRecommendationsQueryVariables>(CharityRecommendationsDocument, options);
        }
export type CharityRecommendationsQueryHookResult = ReturnType<typeof useCharityRecommendationsQuery>;
export type CharityRecommendationsLazyQueryHookResult = ReturnType<typeof useCharityRecommendationsLazyQuery>;
export type CharityRecommendationsQueryResult = Apollo.QueryResult<CharityRecommendationsQuery, CharityRecommendationsQueryVariables>;
export const CreateCharityDocument = gql`
    mutation CreateCharity($options: CharityDataInput!) {
  createCharity(options: $options) {
    errors {
      field
      message
    }
    charity {
      id
      name
      physicalAddress
      postalCode
    }
    success
  }
}
    `;
export type CreateCharityMutationFn = Apollo.MutationFunction<CreateCharityMutation, CreateCharityMutationVariables>;

/**
 * __useCreateCharityMutation__
 *
 * To run a mutation, you first call `useCreateCharityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCharityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCharityMutation, { data, loading, error }] = useCreateCharityMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateCharityMutation(baseOptions?: Apollo.MutationHookOptions<CreateCharityMutation, CreateCharityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCharityMutation, CreateCharityMutationVariables>(CreateCharityDocument, options);
      }
export type CreateCharityMutationHookResult = ReturnType<typeof useCreateCharityMutation>;
export type CreateCharityMutationResult = Apollo.MutationResult<CreateCharityMutation>;
export type CreateCharityMutationOptions = Apollo.BaseMutationOptions<CreateCharityMutation, CreateCharityMutationVariables>;
export const FollowCharityDocument = gql`
    mutation FollowCharity($charityId: Int!) {
  followCharity(charityId: $charityId) {
    charity {
      ...CharityFollows
    }
  }
}
    ${CharityFollowsFragmentDoc}`;
export type FollowCharityMutationFn = Apollo.MutationFunction<FollowCharityMutation, FollowCharityMutationVariables>;

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
export function useFollowCharityMutation(baseOptions?: Apollo.MutationHookOptions<FollowCharityMutation, FollowCharityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowCharityMutation, FollowCharityMutationVariables>(FollowCharityDocument, options);
      }
export type FollowCharityMutationHookResult = ReturnType<typeof useFollowCharityMutation>;
export type FollowCharityMutationResult = Apollo.MutationResult<FollowCharityMutation>;
export type FollowCharityMutationOptions = Apollo.BaseMutationOptions<FollowCharityMutation, FollowCharityMutationVariables>;
export const SearchCharitiesDocument = gql`
    query SearchCharities($input: String, $limit: Int!) {
  searchCharities(input: $input, cursor: null, categories: [], limit: $limit) {
    items {
      ...CharityHeader
    }
    hasMore
  }
}
    ${CharityHeaderFragmentDoc}`;

/**
 * __useSearchCharitiesQuery__
 *
 * To run a query within a React component, call `useSearchCharitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCharitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCharitiesQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchCharitiesQuery(baseOptions: Apollo.QueryHookOptions<SearchCharitiesQuery, SearchCharitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCharitiesQuery, SearchCharitiesQueryVariables>(SearchCharitiesDocument, options);
      }
export function useSearchCharitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCharitiesQuery, SearchCharitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCharitiesQuery, SearchCharitiesQueryVariables>(SearchCharitiesDocument, options);
        }
export type SearchCharitiesQueryHookResult = ReturnType<typeof useSearchCharitiesQuery>;
export type SearchCharitiesLazyQueryHookResult = ReturnType<typeof useSearchCharitiesLazyQuery>;
export type SearchCharitiesQueryResult = Apollo.QueryResult<SearchCharitiesQuery, SearchCharitiesQueryVariables>;
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
    `;

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
export function useUenQuery(baseOptions: Apollo.QueryHookOptions<UenQuery, UenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UenQuery, UenQueryVariables>(UenDocument, options);
      }
export function useUenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UenQuery, UenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UenQuery, UenQueryVariables>(UenDocument, options);
        }
export type UenQueryHookResult = ReturnType<typeof useUenQuery>;
export type UenLazyQueryHookResult = ReturnType<typeof useUenLazyQuery>;
export type UenQueryResult = Apollo.QueryResult<UenQuery, UenQueryVariables>;
export const UpdateCharityProfileDocument = gql`
    mutation UpdateCharityProfile($options: CharityProfileUpdateInput!, $charityId: Float!) {
  updateCharityProfile(options: $options, charityId: $charityId) {
    errors {
      field
      message
    }
    charity {
      ...CharityProfile
    }
  }
}
    ${CharityProfileFragmentDoc}`;
export type UpdateCharityProfileMutationFn = Apollo.MutationFunction<UpdateCharityProfileMutation, UpdateCharityProfileMutationVariables>;

/**
 * __useUpdateCharityProfileMutation__
 *
 * To run a mutation, you first call `useUpdateCharityProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCharityProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCharityProfileMutation, { data, loading, error }] = useUpdateCharityProfileMutation({
 *   variables: {
 *      options: // value for 'options'
 *      charityId: // value for 'charityId'
 *   },
 * });
 */
export function useUpdateCharityProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCharityProfileMutation, UpdateCharityProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCharityProfileMutation, UpdateCharityProfileMutationVariables>(UpdateCharityProfileDocument, options);
      }
export type UpdateCharityProfileMutationHookResult = ReturnType<typeof useUpdateCharityProfileMutation>;
export type UpdateCharityProfileMutationResult = Apollo.MutationResult<UpdateCharityProfileMutation>;
export type UpdateCharityProfileMutationOptions = Apollo.BaseMutationOptions<UpdateCharityProfileMutation, UpdateCharityProfileMutationVariables>;
export const AcceptVolunteerDocument = gql`
    mutation AcceptVolunteer($accept: Boolean!, $eventId: Int!, $volunteerId: Int!) {
  acceptEventVolunteer(
    acceptVolunteer: $accept
    eventVolunteerUserId: $volunteerId
    eventId: $eventId
  ) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type AcceptVolunteerMutationFn = Apollo.MutationFunction<AcceptVolunteerMutation, AcceptVolunteerMutationVariables>;

/**
 * __useAcceptVolunteerMutation__
 *
 * To run a mutation, you first call `useAcceptVolunteerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptVolunteerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptVolunteerMutation, { data, loading, error }] = useAcceptVolunteerMutation({
 *   variables: {
 *      accept: // value for 'accept'
 *      eventId: // value for 'eventId'
 *      volunteerId: // value for 'volunteerId'
 *   },
 * });
 */
export function useAcceptVolunteerMutation(baseOptions?: Apollo.MutationHookOptions<AcceptVolunteerMutation, AcceptVolunteerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptVolunteerMutation, AcceptVolunteerMutationVariables>(AcceptVolunteerDocument, options);
      }
export type AcceptVolunteerMutationHookResult = ReturnType<typeof useAcceptVolunteerMutation>;
export type AcceptVolunteerMutationResult = Apollo.MutationResult<AcceptVolunteerMutation>;
export type AcceptVolunteerMutationOptions = Apollo.BaseMutationOptions<AcceptVolunteerMutation, AcceptVolunteerMutationVariables>;
export const AssignVolunteerDocument = gql`
    mutation assignVolunteer($userId: Int!, $taskId: Int!) {
  addVolunteerToTask(userId: $userId, taskId: $taskId) {
    errors {
      field
      message
    }
  }
}
    `;
export type AssignVolunteerMutationFn = Apollo.MutationFunction<AssignVolunteerMutation, AssignVolunteerMutationVariables>;

/**
 * __useAssignVolunteerMutation__
 *
 * To run a mutation, you first call `useAssignVolunteerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignVolunteerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignVolunteerMutation, { data, loading, error }] = useAssignVolunteerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useAssignVolunteerMutation(baseOptions?: Apollo.MutationHookOptions<AssignVolunteerMutation, AssignVolunteerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignVolunteerMutation, AssignVolunteerMutationVariables>(AssignVolunteerDocument, options);
      }
export type AssignVolunteerMutationHookResult = ReturnType<typeof useAssignVolunteerMutation>;
export type AssignVolunteerMutationResult = Apollo.MutationResult<AssignVolunteerMutation>;
export type AssignVolunteerMutationOptions = Apollo.BaseMutationOptions<AssignVolunteerMutation, AssignVolunteerMutationVariables>;
export const CreateEventDocument = gql`
    mutation CreateEvent($charityId: Float!, $input: EventInput!) {
  createEvent(charityId: $charityId, input: $input) {
    errors {
      field
      message
    }
    event {
      id
      name
      description
    }
  }
}
    `;
export type CreateEventMutationFn = Apollo.MutationFunction<CreateEventMutation, CreateEventMutationVariables>;

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
export function useCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument, options);
      }
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>;
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<CreateEventMutation, CreateEventMutationVariables>;
export const CreateTelegramDocument = gql`
    mutation CreateTelegram($eventId: Int!, $groupName: String!, $groupDescription: String!) {
  createTelegramGroupForEvent(
    eventId: $eventId
    groupName: $groupName
    groupDescription: $groupDescription
  ) {
    errors {
      field
      message
    }
  }
}
    `;
export type CreateTelegramMutationFn = Apollo.MutationFunction<CreateTelegramMutation, CreateTelegramMutationVariables>;

/**
 * __useCreateTelegramMutation__
 *
 * To run a mutation, you first call `useCreateTelegramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTelegramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTelegramMutation, { data, loading, error }] = useCreateTelegramMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      groupName: // value for 'groupName'
 *      groupDescription: // value for 'groupDescription'
 *   },
 * });
 */
export function useCreateTelegramMutation(baseOptions?: Apollo.MutationHookOptions<CreateTelegramMutation, CreateTelegramMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTelegramMutation, CreateTelegramMutationVariables>(CreateTelegramDocument, options);
      }
export type CreateTelegramMutationHookResult = ReturnType<typeof useCreateTelegramMutation>;
export type CreateTelegramMutationResult = Apollo.MutationResult<CreateTelegramMutation>;
export type CreateTelegramMutationOptions = Apollo.BaseMutationOptions<CreateTelegramMutation, CreateTelegramMutationVariables>;
export const DeleteEventDocument = gql`
    mutation DeleteEvent($id: Float!) {
  deleteEvent(id: $id) {
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

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
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const EventDocument = gql`
    query Event($id: Int!) {
  event(id: $id) {
    ...EventCard
  }
}
    ${EventCardFragmentDoc}`;

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
export function useEventQuery(baseOptions: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventQuery, EventQueryVariables>(EventDocument, options);
      }
export function useEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(EventDocument, options);
        }
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<EventQuery, EventQueryVariables>;
export const EventTasksDocument = gql`
    query EventTasks($eventId: Int!) {
  event(id: $eventId) {
    unassignedVolunteers {
      ...UserHeader
    }
    eventTasks {
      ...TaskHeader
      volunteersAssigned {
        ...UserHeader
      }
    }
  }
}
    ${UserHeaderFragmentDoc}
${TaskHeaderFragmentDoc}`;

/**
 * __useEventTasksQuery__
 *
 * To run a query within a React component, call `useEventTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventTasksQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventTasksQuery(baseOptions: Apollo.QueryHookOptions<EventTasksQuery, EventTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventTasksQuery, EventTasksQueryVariables>(EventTasksDocument, options);
      }
export function useEventTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventTasksQuery, EventTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventTasksQuery, EventTasksQueryVariables>(EventTasksDocument, options);
        }
export type EventTasksQueryHookResult = ReturnType<typeof useEventTasksQuery>;
export type EventTasksLazyQueryHookResult = ReturnType<typeof useEventTasksLazyQuery>;
export type EventTasksQueryResult = Apollo.QueryResult<EventTasksQuery, EventTasksQueryVariables>;
export const EventsDocument = gql`
    query Events($limit: Int!, $categories: [Float!]!, $sortByLikes: Boolean!, $sortByUpcoming: Boolean!) {
  searchEvents(
    input: null
    cursor: null
    limit: $limit
    categories: $categories
    sortByLikes: $sortByLikes
    sortByUpcoming: $sortByUpcoming
  ) {
    items {
      ...EventCard
    }
    total
    hasMore
  }
}
    ${EventCardFragmentDoc}`;

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
export function useEventsQuery(baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;
export const LikeEventDocument = gql`
    mutation LikeEvent($eventId: Int!) {
  likeEvent(eventId: $eventId) {
    likeItem {
      ...EventLikes
    }
  }
}
    ${EventLikesFragmentDoc}`;
export type LikeEventMutationFn = Apollo.MutationFunction<LikeEventMutation, LikeEventMutationVariables>;

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
export function useLikeEventMutation(baseOptions?: Apollo.MutationHookOptions<LikeEventMutation, LikeEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeEventMutation, LikeEventMutationVariables>(LikeEventDocument, options);
      }
export type LikeEventMutationHookResult = ReturnType<typeof useLikeEventMutation>;
export type LikeEventMutationResult = Apollo.MutationResult<LikeEventMutation>;
export type LikeEventMutationOptions = Apollo.BaseMutationOptions<LikeEventMutation, LikeEventMutationVariables>;
export const RequestEventDocument = gql`
    mutation RequestEvent($eventId: Int!) {
  requestEvent(eventId: $eventId) {
    errors {
      field
      message
    }
    event {
      ...EventRequests
    }
  }
}
    ${EventRequestsFragmentDoc}`;
export type RequestEventMutationFn = Apollo.MutationFunction<RequestEventMutation, RequestEventMutationVariables>;

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
export function useRequestEventMutation(baseOptions?: Apollo.MutationHookOptions<RequestEventMutation, RequestEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestEventMutation, RequestEventMutationVariables>(RequestEventDocument, options);
      }
export type RequestEventMutationHookResult = ReturnType<typeof useRequestEventMutation>;
export type RequestEventMutationResult = Apollo.MutationResult<RequestEventMutation>;
export type RequestEventMutationOptions = Apollo.BaseMutationOptions<RequestEventMutation, RequestEventMutationVariables>;
export const SearchEventsDocument = gql`
    query SearchEvents($input: String, $limit: Int!) {
  searchEvents(
    input: $input
    cursor: null
    limit: $limit
    categories: []
    sortByUpcoming: false
    sortByLikes: false
  ) {
    items {
      ...EventHeader
    }
    hasMore
  }
}
    ${EventHeaderFragmentDoc}`;

/**
 * __useSearchEventsQuery__
 *
 * To run a query within a React component, call `useSearchEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchEventsQuery(baseOptions: Apollo.QueryHookOptions<SearchEventsQuery, SearchEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchEventsQuery, SearchEventsQueryVariables>(SearchEventsDocument, options);
      }
export function useSearchEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchEventsQuery, SearchEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchEventsQuery, SearchEventsQueryVariables>(SearchEventsDocument, options);
        }
export type SearchEventsQueryHookResult = ReturnType<typeof useSearchEventsQuery>;
export type SearchEventsLazyQueryHookResult = ReturnType<typeof useSearchEventsLazyQuery>;
export type SearchEventsQueryResult = Apollo.QueryResult<SearchEventsQuery, SearchEventsQueryVariables>;
export const ShareEventDocument = gql`
    mutation ShareEvent($input: PostInput!, $id: Float!) {
  shareEvent(input: $input, id: $id) {
    errors {
      field
      message
    }
    epost {
      post {
        ...PostCard
      }
      event {
        ...EventCard
      }
    }
    success
  }
}
    ${PostCardFragmentDoc}
${EventCardFragmentDoc}`;
export type ShareEventMutationFn = Apollo.MutationFunction<ShareEventMutation, ShareEventMutationVariables>;

/**
 * __useShareEventMutation__
 *
 * To run a mutation, you first call `useShareEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareEventMutation, { data, loading, error }] = useShareEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useShareEventMutation(baseOptions?: Apollo.MutationHookOptions<ShareEventMutation, ShareEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShareEventMutation, ShareEventMutationVariables>(ShareEventDocument, options);
      }
export type ShareEventMutationHookResult = ReturnType<typeof useShareEventMutation>;
export type ShareEventMutationResult = Apollo.MutationResult<ShareEventMutation>;
export type ShareEventMutationOptions = Apollo.BaseMutationOptions<ShareEventMutation, ShareEventMutationVariables>;
export const UpdateEventDocument = gql`
    mutation UpdateEvent($id: Float!, $input: EventInput!) {
  updateEvent(id: $id, input: $input) {
    errors {
      field
      message
    }
  }
}
    `;
export type UpdateEventMutationFn = Apollo.MutationFunction<UpdateEventMutation, UpdateEventMutationVariables>;

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
export function useUpdateEventMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEventMutation, UpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument, options);
      }
export type UpdateEventMutationHookResult = ReturnType<typeof useUpdateEventMutation>;
export type UpdateEventMutationResult = Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<UpdateEventMutation, UpdateEventMutationVariables>;
export const VolunteerRequestsDocument = gql`
    query VolunteerRequests($eventIds: [Int!]!, $limit: Int!) {
  getPendingVolunteerRequestForEvents(
    cursor: null
    limit: $limit
    eventIds: $eventIds
  ) {
    items {
      user {
        ...UserHeader
      }
    }
    hasMore
    errors {
      field
      message
    }
  }
}
    ${UserHeaderFragmentDoc}`;

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
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useVolunteerRequestsQuery(baseOptions: Apollo.QueryHookOptions<VolunteerRequestsQuery, VolunteerRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VolunteerRequestsQuery, VolunteerRequestsQueryVariables>(VolunteerRequestsDocument, options);
      }
export function useVolunteerRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VolunteerRequestsQuery, VolunteerRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VolunteerRequestsQuery, VolunteerRequestsQueryVariables>(VolunteerRequestsDocument, options);
        }
export type VolunteerRequestsQueryHookResult = ReturnType<typeof useVolunteerRequestsQuery>;
export type VolunteerRequestsLazyQueryHookResult = ReturnType<typeof useVolunteerRequestsLazyQuery>;
export type VolunteerRequestsQueryResult = Apollo.QueryResult<VolunteerRequestsQuery, VolunteerRequestsQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CommentInput!, $postId: Float!) {
  commentOnPost(input: $input, postId: $postId) {
    errors {
      field
      message
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    post {
      ...PostCard
    }
    event {
      ...EventCard
    }
  }
}
    ${PostCardFragmentDoc}
${EventCardFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: Int!) {
  likePost(postId: $postId) {
    likeItem {
      post {
        ...PostLikes
      }
    }
  }
}
    ${PostLikesFragmentDoc}`;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
  post(id: $id) {
    post {
      ...PostCard
    }
    event {
      ...EventInfo
    }
  }
}
    ${PostCardFragmentDoc}
${EventInfoFragmentDoc}`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostCommentsDocument = gql`
    query PostComments($depth: Int, $limit: Float!, $postId: Float!) {
  postComments(depth: $depth, limit: $limit, postId: $postId) {
    items {
      ...CommentSnippet
    }
    hasMore
    errors {
      field
      message
    }
  }
}
    ${CommentSnippetFragmentDoc}`;

/**
 * __usePostCommentsQuery__
 *
 * To run a query within a React component, call `usePostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostCommentsQuery({
 *   variables: {
 *      depth: // value for 'depth'
 *      limit: // value for 'limit'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostCommentsQuery(baseOptions: Apollo.QueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
      }
export function usePostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostCommentsQuery, PostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostCommentsQuery, PostCommentsQueryVariables>(PostCommentsDocument, options);
        }
export type PostCommentsQueryHookResult = ReturnType<typeof usePostCommentsQuery>;
export type PostCommentsLazyQueryHookResult = ReturnType<typeof usePostCommentsLazyQuery>;
export type PostCommentsQueryResult = Apollo.QueryResult<PostCommentsQuery, PostCommentsQueryVariables>;
export const PostsDocument = gql`
    query Posts($cursor: String, $limit: Int!) {
  posts(cursor: $cursor, limit: $limit) {
    items {
      post {
        ...PostCard
      }
      event {
        ...EventInfo
      }
    }
  }
}
    ${PostCardFragmentDoc}
${EventInfoFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($text: String!, $id: Float!) {
  updatePost(text: $text, id: $id) {
    post {
      id
      text
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($taskInput: TaskInput!, $eventId: Int!) {
  createTask(taskInput: $taskInput, eventId: $eventId) {
    errors {
      field
      message
    }
    task {
      ...TaskCard
    }
    success
  }
}
    ${TaskCardFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      taskInput: // value for 'taskInput'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($taskId: Int!) {
  deleteTask(taskId: $taskId) {
    errors {
      field
      message
    }
  }
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($userId: Float!, $accept: Boolean!) {
  acceptFriendRequest(userId: $userId, accept: $accept) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      accept: // value for 'accept'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const FriendRecommendationsDocument = gql`
    query FriendRecommendations($limit: Float!) {
  userRecommender(limit: $limit) {
    items {
      ...UserHeader
    }
    hasMore
  }
}
    ${UserHeaderFragmentDoc}`;

/**
 * __useFriendRecommendationsQuery__
 *
 * To run a query within a React component, call `useFriendRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRecommendationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFriendRecommendationsQuery(baseOptions: Apollo.QueryHookOptions<FriendRecommendationsQuery, FriendRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendRecommendationsQuery, FriendRecommendationsQueryVariables>(FriendRecommendationsDocument, options);
      }
export function useFriendRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendRecommendationsQuery, FriendRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendRecommendationsQuery, FriendRecommendationsQueryVariables>(FriendRecommendationsDocument, options);
        }
export type FriendRecommendationsQueryHookResult = ReturnType<typeof useFriendRecommendationsQuery>;
export type FriendRecommendationsLazyQueryHookResult = ReturnType<typeof useFriendRecommendationsLazyQuery>;
export type FriendRecommendationsQueryResult = Apollo.QueryResult<FriendRecommendationsQuery, FriendRecommendationsQueryVariables>;
export const FriendRequestsDocument = gql`
    query FriendRequests {
  viewMyPendingFriendRequests {
    errors {
      field
      message
    }
    success
    userList {
      ...UserHeader
    }
  }
}
    ${UserHeaderFragmentDoc}`;

/**
 * __useFriendRequestsQuery__
 *
 * To run a query within a React component, call `useFriendRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendRequestsQuery(baseOptions?: Apollo.QueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, options);
      }
export function useFriendRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendRequestsQuery, FriendRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FriendRequestsQuery, FriendRequestsQueryVariables>(FriendRequestsDocument, options);
        }
export type FriendRequestsQueryHookResult = ReturnType<typeof useFriendRequestsQuery>;
export type FriendRequestsLazyQueryHookResult = ReturnType<typeof useFriendRequestsLazyQuery>;
export type FriendRequestsQueryResult = Apollo.QueryResult<FriendRequestsQuery, FriendRequestsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Header
  }
}
    ${HeaderFragmentDoc}`;

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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RequestFriendDocument = gql`
    mutation RequestFriend($userId: Float!) {
  requestFriend(userId: $userId) {
    user {
      id
    }
    userList {
      id
    }
  }
}
    `;
export type RequestFriendMutationFn = Apollo.MutationFunction<RequestFriendMutation, RequestFriendMutationVariables>;

/**
 * __useRequestFriendMutation__
 *
 * To run a mutation, you first call `useRequestFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestFriendMutation, { data, loading, error }] = useRequestFriendMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRequestFriendMutation(baseOptions?: Apollo.MutationHookOptions<RequestFriendMutation, RequestFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestFriendMutation, RequestFriendMutationVariables>(RequestFriendDocument, options);
      }
export type RequestFriendMutationHookResult = ReturnType<typeof useRequestFriendMutation>;
export type RequestFriendMutationResult = Apollo.MutationResult<RequestFriendMutation>;
export type RequestFriendMutationOptions = Apollo.BaseMutationOptions<RequestFriendMutation, RequestFriendMutationVariables>;
export const SearchUsersDocument = gql`
    query SearchUsers($input: String, $limit: Int!) {
  searchUsers(input: $input, cursor: null, limit: $limit) {
    items {
      ...UserHeader
    }
    hasMore
  }
}
    ${UserHeaderFragmentDoc}`;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const UpdateUserCategoriesDocument = gql`
    mutation UpdateUserCategories($categories: CategoryInput!) {
  updateUserCategories(categories: $categories) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type UpdateUserCategoriesMutationFn = Apollo.MutationFunction<UpdateUserCategoriesMutation, UpdateUserCategoriesMutationVariables>;

/**
 * __useUpdateUserCategoriesMutation__
 *
 * To run a mutation, you first call `useUpdateUserCategoriesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserCategoriesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserCategoriesMutation, { data, loading, error }] = useUpdateUserCategoriesMutation({
 *   variables: {
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useUpdateUserCategoriesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserCategoriesMutation, UpdateUserCategoriesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserCategoriesMutation, UpdateUserCategoriesMutationVariables>(UpdateUserCategoriesDocument, options);
      }
export type UpdateUserCategoriesMutationHookResult = ReturnType<typeof useUpdateUserCategoriesMutation>;
export type UpdateUserCategoriesMutationResult = Apollo.MutationResult<UpdateUserCategoriesMutation>;
export type UpdateUserCategoriesMutationOptions = Apollo.BaseMutationOptions<UpdateUserCategoriesMutation, UpdateUserCategoriesMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($options: UserProfileUpdateInput!) {
  updateUserProfile(options: $options) {
    errors {
      field
      message
    }
    user {
      ...UserProfile
    }
  }
}
    ${UserProfileFragmentDoc}`;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UserDocument = gql`
    query User($id: Float!) {
  user(id: $id) {
    ...UserHeader
    ...UserProfile
    ...UserEvents
  }
}
    ${UserHeaderFragmentDoc}
${UserProfileFragmentDoc}
${UserEventsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserTasksDocument = gql`
    query UserTasks {
  viewTasksAssignedToMe {
    eventContainers {
      event {
        ...EventSnippet
      }
      tasks {
        ...TaskHeader
      }
    }
  }
}
    ${EventSnippetFragmentDoc}
${TaskHeaderFragmentDoc}`;

/**
 * __useUserTasksQuery__
 *
 * To run a query within a React component, call `useUserTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserTasksQuery(baseOptions?: Apollo.QueryHookOptions<UserTasksQuery, UserTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserTasksQuery, UserTasksQueryVariables>(UserTasksDocument, options);
      }
export function useUserTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserTasksQuery, UserTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserTasksQuery, UserTasksQueryVariables>(UserTasksDocument, options);
        }
export type UserTasksQueryHookResult = ReturnType<typeof useUserTasksQuery>;
export type UserTasksLazyQueryHookResult = ReturnType<typeof useUserTasksLazyQuery>;
export type UserTasksQueryResult = Apollo.QueryResult<UserTasksQuery, UserTasksQueryVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($token: String!) {
  verifyUser(token: $token) {
    errors {
      field
      message
    }
    success
  }
}
    `;
export type VerifyUserMutationFn = Apollo.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyUserMutation(baseOptions?: Apollo.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, options);
      }
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = Apollo.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = Apollo.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;