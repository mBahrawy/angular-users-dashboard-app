import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { AuthServiceMock } from 'src/app/core/tests/auth.service.mock';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authService: AuthServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: {} },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
