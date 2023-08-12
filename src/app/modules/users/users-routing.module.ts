import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListViewComponent
  },
  {
    path: 'new',
    component: UserFormComponent
  },
  {
    path: ':id',
    component: UserViewComponent
  },
  {
    path: ':id/edit',
    component: UserFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
