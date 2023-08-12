import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserViewComponent } from './user-view.component';
import { UsersService } from 'src/app/core/services/users.service';
import { UsersServiceMock } from 'src/app/core/tests/users.service.mock';
import { ActivatedRoute, Router } from '@angular/router';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let usersService: UsersServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserViewComponent],
      providers: [
        { provide: UsersService, useClass: UsersServiceMock },
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
