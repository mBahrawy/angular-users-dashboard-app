import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  backendError = '';

  constructor(private auth: AuthService, private route: ActivatedRoute) {}

  justRegisteredEmail!: string;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.justRegisteredEmail =
      this.route.snapshot.queryParamMap.get('email') || '';
    this.loginForm = new FormGroup({
      email: new FormControl(this.justRegisteredEmail, [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    } else {
      // Form is validated
      this.auth.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).subscribe();
    }
  }
}
