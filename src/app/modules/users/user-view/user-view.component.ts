import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeleteUserModalComponent } from 'src/app/components/ui/modals/delete-user-modal/delete-user-modal.component';
import { User } from 'src/app/core/interfaces/user';
import { ModalsService } from 'src/app/core/services/modals.service';
import { UsersService } from 'src/app/core/services/users.service';
import { clearSingleUser, loadSingleUser } from 'src/app/core/state/users/user.actions';
import { selectUser } from 'src/app/core/state/users/user.selectors';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit, OnDestroy {
  userData$!: Observable<User | null>;
  userId!: string | null;
  constructor(
    private route: ActivatedRoute,
    private modals: ModalsService,
    private router: Router,
    private store: Store
  ) {}


  openModal() {
    if(!this.userId) return;
    this.modals.opendDeletUserModal(this.userId, () => {
      this.router.navigate(['/users']);
    });
  }

  getUser() {
    this.userId = this.route.snapshot?.paramMap?.get('id') || null;
    this.userId && this.store.dispatch(loadSingleUser({ userId: this.userId}));
  }

  ngOnInit(): void {
    this.userData$ = this.store.select(selectUser);
    this.getUser();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearSingleUser());
  }
}
