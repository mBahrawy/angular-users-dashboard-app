import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [UsersListViewComponent, UserViewComponent],
  imports: [SharedModule, UsersRoutingModule],
})
export class UsersModule {}
