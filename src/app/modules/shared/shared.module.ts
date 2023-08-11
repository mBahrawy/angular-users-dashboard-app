import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from 'src/app/components/ui/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, NgbModule, RouterModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule, NavBarComponent, RouterModule],
})
export class SharedModule {}
