import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteUserModalComponent } from 'src/app/components/ui/modals/delete-user-modal/delete-user-modal.component';
import { User } from 'src/app/core/interfaces/user';
import { ModalsService } from 'src/app/core/services/modals.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  userData!: User;

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private modals: ModalsService,
    private router: Router
  ) {}

  openModal() {
    this.modals.opendDeletUserModal(this.userData.id, () => {
      this.router.navigate(['/users']);
    });
  }

  getUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    userId &&
      this.users.single(userId).subscribe((res) => (this.userData = res));
  }
  ngOnInit(): void {
    this.getUser();
  }
}
