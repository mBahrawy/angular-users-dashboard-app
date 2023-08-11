import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { DeAuthGuard } from './core/guards/de-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
    canActivate: [DeAuthGuard],

  },
  {
    path: 'users',
    loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
