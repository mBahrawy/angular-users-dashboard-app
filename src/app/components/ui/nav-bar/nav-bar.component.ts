import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public navbarCollapsed = true;
  isLoggedIn!: boolean;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.token.subscribe((token) => (this.isLoggedIn = !!token));
  }

  ngOnInit(): void {
    this.auth.token.subscribe((token) => {
      console.log(token);
    });
  }

  logout() {
    this.auth.logout();
  }

  navigateToDashboard() {
    // const role = this.authService?.userData?.auth?.role
    // role ? this.router.navigate([`/dashboard/${role}`]) : this.authService.logout()
  }

  toggleCollapse() {
    if (window.innerWidth <= 991) {
      this.navbarCollapsed = !this.navbarCollapsed;
    }
  }
}
