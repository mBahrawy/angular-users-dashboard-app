import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../interfaces/user';

export interface UserState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
  error: any;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUserState: UserState = userAdapter.getInitialState({
  selectedUserId: null,
  loading: false,
  error: null,
});
