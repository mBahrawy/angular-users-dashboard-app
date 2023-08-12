import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { UsersService } from 'src/app/core/services/users.service';

type FormType = 'create' | 'edit';
const nameRegex = /^[a-z ,.'-]+$/i;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userData!: User;
  formType: FormType = 'create';
  userForm!: FormGroup;
  imageURL!: string;

  constructor(
    private users: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.userForm.patchValue({
        avatar: file,
      });

      this.userForm.get('avatar')?.updateValueAndValidity();
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeAvatar() {
    this.imageURL = '';
    this.userForm.patchValue({
      avatar: null,
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((field) => {
        const control = this.userForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    // Creating formData instance to collect all values with the image file, this is the proper way to submit the form
    // but the API have a different interface to send the data
    /*
      const formData = new FormData();
      formData.append('avatar', this.userForm.value.avatar);
      formData.append('firstName', this.userForm.value.firstName);
      formData.append('lastName', this.userForm.value.lastName);
      formData.append('email', this.userForm.value.email);
    */

    // I used this static data because the enpoint accept diffrant user data interface
    const dummyPostData = {
      name: 'morpheus',
      job: 'leader',
    };

    this.formType === 'create' &&
      this.users.new(dummyPostData).subscribe(() => {
        this.router.navigate(['/users']);
      });

    this.formType === 'edit' &&
      this.users.edit(dummyPostData, this.userData.id).subscribe(() => {
        this.router.navigate(['/users']);
      });
  }

  buildForm(firstName = '', lastName = '', avatar = '', email = '') {
    this.userForm = new FormGroup({
      firstName: new FormControl(firstName, [
        Validators.pattern(nameRegex),
        Validators.required,
      ]),
      lastName: new FormControl(lastName, [
        Validators.pattern(nameRegex),
        Validators.required,
      ]),
      avatar: new FormControl(avatar),
      email: new FormControl(email, [Validators.email, Validators.required]),
    });
  }

  getUser(userId: string) {
    this.users.single(userId).subscribe((res) => {
      this.userData = res;
      this.buildForm(res.first_name, res.last_name, res.avatar, res.email);
      this.imageURL = res.avatar;
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot?.paramMap?.get('id');

    // In case if there is a user ID, this view will act as edit form
    if (userId) {
      this.formType = 'edit';
      this.getUser(userId);
      return;
    }

    // Otherwise, this view will act as create form
    this.formType = 'create';
    this.buildForm();
  }
}
