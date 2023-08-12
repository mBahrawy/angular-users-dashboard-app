import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public navbarCollapsed = true;

  constructor(public auth: AuthService,) {}

  logout() {
    this.auth.logout();
  }

  toggleCollapse() {
    if (window.innerWidth <= 991) {
      this.navbarCollapsed = !this.navbarCollapsed;
    }
  }
}
