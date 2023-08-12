import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListViewComponent } from './users-list-view.component';
import { UsersServiceMock } from 'src/app/core/tests/users.service.mock';
import { UsersService } from 'src/app/core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


describe('UsersListViewComponent', () => {
  let component: UsersListViewComponent;
  let fixture: ComponentFixture<UsersListViewComponent>;
  let usersService: UsersServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListViewComponent ],
      providers: [
        { provide: UsersService, useClass: UsersServiceMock },
        { provide: ActivatedRoute, useValue: {} },
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
