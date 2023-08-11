import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  userData!: User;

  constructor(private users: UsersService, private route: ActivatedRoute) {}

  getUser() {
    const userId = this.route.snapshot.paramMap.get('id');
    userId &&
      this.users.single(userId).subscribe((res) => {
        console.log(res);
        this.userData = res;
      });
  }
  ngOnInit(): void {
    this.getUser();
  }
}
