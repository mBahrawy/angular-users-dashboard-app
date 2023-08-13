import { PaginationData } from './../../interfaces/response';
import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.actions';
import { Response } from '../../interfaces/response';
import { User } from '../../interfaces/user';

export interface UserState {
  users: User[];
  paginationData: PaginationData;
  error: any;
}

export const initialState: UserState = {
  paginationData: {
    page: 1,
    per_page: 5,
    total: null,
    total_pages: null
  },
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(userActions.loadUsersSuccess, (state, { response }) => ({
    ...state,
    users: response.data,
    error: null,
  })),
  on(userActions.setPaginationData, (state, { paginationData }) => ({
    ...state,
    paginationData,
  })),
  on(userActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    users: [],
    error,
  }))
);
