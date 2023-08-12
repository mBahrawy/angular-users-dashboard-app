import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { UsersServiceMock } from 'src/app/core/tests/users.service.mock';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let usersService: UsersServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      providers: [
        { provide: UsersService, useClass: UsersServiceMock },
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
