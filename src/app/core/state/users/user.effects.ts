import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as userActions from './user.actions';
import { UsersService } from '../../services/users.service';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  constructor(
    private store: Store,
    private actions$: Actions,
    private users: UsersService
  ) {}

  // For all users view componenet

  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadAllUsers),
      mergeMap((action) =>
        this.users.index(action.page, action.per_page).pipe(
          map((response) => {
            this.store.dispatch(
              userActions.setPaginationData({
                paginationData: {
                  page: response.page,
                  per_page: response.per_page,
                  total: response.total,
                  total_pages: response.total_pages,
                },
              })
            );
            return userActions.loadAllUsersSuccess({ response });
          }),
          catchError((error) => of(userActions.loadAllUsersFailure({ error })))
        )
      )
    )
  );

  // For single view componenet
  loadSingleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadSingleUser),
      mergeMap((action) =>
        this.users.single(action.userId).pipe(
          map((response) => userActions.loadAllUsersuccess({ response })),
          catchError((error) => of(userActions.loadAllUsersFailure({ error })))
        )
      )
    )
  );
}
