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

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
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
            return userActions.loadUsersSuccess({ response });
          }),
          catchError((error) => of(userActions.loadUsersFailure({ error })))
        )
      )
    )
  );
}
