import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs'; // Import 'of' for creating observable
import { ModalsService } from 'src/app/core/services/modals.service';
import {
  clearSingleUser,
  loadSingleUser, // Import loadSingleUser action
} from 'src/app/core/state/users/user.actions'; // Make sure the path is correct
import { UsersServiceMock } from 'src/app/core/tests/users.service.mock';
import { UserViewComponent } from './user-view.component';
import { UsersService } from 'src/app/core/services/users.service';

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let store: MockStore;
  const initialState = {
    user: null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewComponent],
      providers: [
        { provide: UsersService, useClass: UsersServiceMock },
        ModalsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1',
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {},
        },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal and navigate on valid userId', () => {
    component.userId = '1';
    const modalsService = TestBed.inject(ModalsService);
    const modalsServiceSpy = spyOn(modalsService, 'openDeletUserModal');
    component.openModal();
    expect(modalsServiceSpy).toHaveBeenCalledWith('1', jasmine.any(Function));
  });

  it('should dispatch loadSingleUser action on ngOnInit', fakeAsync(() => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
    };

    // Stub selectUser action to return mockUser
    spyOn(store, 'select').and.returnValue(of(mockUser));

    // Dispatch loadSingleUser action with mock userId
    component.userId = '1';
    component.ngOnInit();
    store.dispatch(loadSingleUser({ userId: '1' }));

    // Ensure that the state is updated before making assertions
    tick();

    expect(component.userData$).toBeTruthy();
    component.userData$.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
  }));

  it('should dispatch clearSingleUser action on ngOnDestroy', () => {
    const clearSingleUserSpy = spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(clearSingleUserSpy).toHaveBeenCalledWith(clearSingleUser());
  });

});
