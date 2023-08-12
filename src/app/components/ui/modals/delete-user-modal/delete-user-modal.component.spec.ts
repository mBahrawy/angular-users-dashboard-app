import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserModalComponent } from './delete-user-modal.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AuthServiceMock } from 'src/app/core/tests/auth.service.mock';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
describe('DeleteUserModalComponent', () => {
  let component: DeleteUserModalComponent;
  let fixture: ComponentFixture<DeleteUserModalComponent>;
  let authService: AuthServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUserModalComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: {} },
        { provide: NgbActiveModal, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
