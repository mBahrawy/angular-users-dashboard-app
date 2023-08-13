import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { PaginationData } from './../../interfaces/response';
import * as userActions from './user.actions';

export interface UserState {
  users: User[];
  currentUser: User | null;
  paginationData: PaginationData;
  error: unknown;
}

export const initialState: UserState = {
  paginationData: {
    page: 1,
    per_page: 5,
    total: null,
    total_pages: null,
  },
  currentUser: null,
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,

  // For all users view componenet
  on(userActions.loadAllUsersSuccess, (state, { response }) => ({
    ...state,
    users: response.data,
    error: null,
  })),
  on(userActions.setPaginationData, (state, { paginationData }) => ({
    ...state,
    paginationData,
  })),
  on(userActions.loadAllUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    error,
  })),
  on(userActions.clearAllUsers, (state) => ({
    ...state,
    users: [],
  })),

  // For single view componenet
  on(userActions.loadAllUsersuccess, (state, { response }) => ({
    ...state,
    currentUser: response,
    error: null,
  })),
  on(userActions.loadSingleUserFailure, (state, { error }) => ({
    ...state,
    currentUser: null,
    error,
  })),
  on(userActions.clearSingleUser, (state) => ({
    ...state,
    currentUser: null,
  }))
);
