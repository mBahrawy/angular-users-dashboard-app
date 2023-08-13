import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user';
import { PaginationData, Response } from '../../interfaces/response';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page: number; per_page: number }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ response: Response<User[]> }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: unknown }>()
);

export const setPaginationData = createAction(
  '[User] Set Pagination Data',
  props<{ paginationData: PaginationData }>()
);
