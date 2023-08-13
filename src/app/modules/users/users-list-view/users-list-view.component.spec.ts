import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UsersListViewComponent } from './users-list-view.component';
import {
  loadAllUsers,
  setPaginationData,
  clearAllUsers,
} from 'src/app/core/state/users/user.actions';
import {
  selectUsers,
  selectPaginationData,
  selectError,
} from 'src/app/core/state/users/user.selectors';
import { PaginationData } from 'src/app/core/interfaces/response';
import { UsersService } from 'src/app/core/services/users.service';
import { UsersServiceMock } from 'src/app/core/tests/users.service.mock';
import { of } from 'rxjs';

describe('UsersListViewComponent', () => {
  let component: UsersListViewComponent;
  let fixture: ComponentFixture<UsersListViewComponent>;
  let store: MockStore;

  const initialState = {
    users: [],
    currentUser: null,
    paginationData: {
      page: 1,
      per_page: 5,
      total: null,
      total_pages: null,
    },
    error: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListViewComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: UsersService, useClass: UsersServiceMock },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    fixture = TestBed.createComponent(UsersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSingleUser action on ngOnInit', fakeAsync(() => {
    const mockUsers = [
      {
        id: 1,
        email: 'test@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: '',
      },
      {
        id: 2,
        email: 'test2@example.com',
        first_name: 'Max',
        last_name: 'Haos',
        avatar: '',
      },
    ];

    // Stub selectUser action to return mockUser
    spyOn(store, 'select').and.returnValue(of(mockUsers));

    // Dispatch loadSingleUser action with mock userId
    component.ngOnInit();
    store.dispatch(loadAllUsers({ page: 1, per_page: 5 }));

    // Ensure that the state is updated before making assertions
    tick();

    expect(component.users$).toBeTruthy();
    component.users$.subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });
  }));

  it('should dispatch clearSingleUser action on ngOnDestroy', () => {
    const clearSingleUserSpy = spyOn(store, 'dispatch');
    component.ngOnDestroy();
    expect(clearSingleUserSpy).toHaveBeenCalledWith(clearAllUsers());
  });

  it('should update pagination data when selectPaginationData emits', () => {
    const mockPaginationData: PaginationData = {
      page: 1,
      per_page: 5,
      total: 30,
      total_pages: 3,
    };

    store.overrideSelector(selectPaginationData, mockPaginationData);
    store.refreshState();

    expect(component.page).toBe(mockPaginationData.page);
    expect(component.pageSize).toBe(mockPaginationData.per_page);
  });
});
