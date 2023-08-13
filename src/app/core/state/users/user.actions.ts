import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user';
import {
  PaginatedResponse,
  PaginationData,
  Response,
} from '../../interfaces/response';

// For all users view componenet
export const loadAllUsers = createAction(
  '[User] Load Users',
  props<{ page: number; per_page: number }>()
);

export const loadAllUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ response: PaginatedResponse<User[]> }>()
);

export const loadAllUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: unknown }>()
);

export const setPaginationData = createAction(
  '[User] Set Pagination Data',
  props<{ paginationData: PaginationData }>()
);
export const clearAllUsers = createAction('[User] CLear Users');

// For single view componenet
export const loadSingleUser = createAction(
  '[User] Load User',
  props<{ userId: string }>()
);

export const loadAllUsersuccess = createAction(
  '[User] Load User Success',
  props<{ response: User }>()
);

export const loadSingleUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: unknown }>()
);

export const clearSingleUser = createAction('[User] Clear User');
