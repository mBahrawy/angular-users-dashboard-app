import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PaginationData } from 'src/app/core/interfaces/response';
import { User } from 'src/app/core/interfaces/user';
import { ModalsService } from 'src/app/core/services/modals.service';
import { clearAllUsers, loadAllUsers } from 'src/app/core/state/users/user.actions';
import { selectError, selectPaginationData, selectUsers } from 'src/app/core/state/users/user.selectors';

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.scss'],
})
export class UsersListViewComponent implements OnInit, OnDestroy {
  page = 1;
  pageSize = 5;
  collectionSize!: number | null;
  usersList!: User[];

  users$!: Observable<User[]>;
  paginationData$!: Observable<PaginationData>;
  error$!: Observable<unknown>;

  constructor(private modals: ModalsService, private store: Store) {}

  openModal(userId: string) {
    this.modals.openDeletUserModal(userId, () => {
      this.getUsers(this.page, this.pageSize);
    });
  }

  getUsers(page = 1, per_page = 5) {
    this.store.dispatch(loadAllUsers({ page, per_page }))
  }

  ngOnInit(): void {
    this.users$ = this.store.select(selectUsers);
    this.store.select(selectPaginationData).subscribe((paginationData) => {
      this.page = paginationData?.page;
      this.pageSize = paginationData?.per_page;
      this.collectionSize = paginationData?.total;
    });

    this.error$ = this.store.select(selectError);
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearAllUsers());
  }
}
