import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

// For all users view componenet
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectPaginationData = createSelector(
  selectUserState,
  (state: UserState) => state.paginationData
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// For single view componenet
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.currentUser
);
