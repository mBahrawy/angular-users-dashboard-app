import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/core/state/users/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/core/state/users/user.effects';

@NgModule({
  declarations: [UsersListViewComponent, UserViewComponent, UserFormComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
})
export class UsersModule {}
