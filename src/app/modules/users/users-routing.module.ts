import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListViewComponent
  },
  {
    path: ':id',
    component: UserViewComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
