import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/components/ui/loader/loader.component';
import { NavBarComponent } from 'src/app/components/ui/nav-bar/nav-bar.component';
import {
  NgbModule,
  NgbModalModule,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserModalComponent } from 'src/app/components/ui/modals/delete-user-modal/delete-user-modal.component';

@NgModule({
  declarations: [NavBarComponent, DeleteUserModalComponent, LoaderComponent],
  imports: [CommonModule, NgbModule, NgbModalModule, RouterModule],
  providers: [NgbActiveModal],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    NavBarComponent,
    RouterModule,
    DeleteUserModalComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
