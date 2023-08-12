import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AuthServiceMock } from 'src/app/core/tests/auth.service.mock';
describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let authService: AuthServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
