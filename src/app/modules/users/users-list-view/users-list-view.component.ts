import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import { ModalsService } from 'src/app/core/services/modals.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.scss'],
})
export class UsersListViewComponent implements OnInit {
  page!: number;
  pageSize!: number;
  totalPages!: number;
  collectionSize!: number;
  usersList!: User[];

  constructor(private users: UsersService, private modals: ModalsService) {}

  openModal(userId: number) {
    this.modals.opendDeletUserModal(userId, () => {
      this.getUsers(this.page, this.pageSize);
    });
  }

  getUsers(page = 1, per_page = 5) {
    this.users.index(page, per_page).subscribe((res) => {
      this.usersList = res.data;
      this.page = res.page;
      this.totalPages = res.total_pages;
      this.pageSize = res.per_page;
      this.collectionSize = res.total;
    });
  }
  ngOnInit(): void {
    this.getUsers();
  }
}
