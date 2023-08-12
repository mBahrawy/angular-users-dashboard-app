import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [UsersListViewComponent, UserViewComponent, UserFormComponent],
  imports: [SharedModule, UsersRoutingModule],
})
export class UsersModule {}
