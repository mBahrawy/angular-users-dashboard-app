import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersFormComponent } from './users-form/users-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListViewComponent
  },
  {
    path: ':id',
    component: UserViewComponent
  },
  {
    path: 'new',
    component: UsersFormComponent
  },
  {
    path: ':id/edit',
    component: UsersFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
