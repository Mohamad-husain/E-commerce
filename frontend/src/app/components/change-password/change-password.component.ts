import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changeForm: FormGroup;
  passwordChanged = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.changeForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  changePassword() {
    this.passwordChanged = false;
    this.errorMessage = '';

    const newPassword = this.changeForm.get('newPassword')?.value;
    const confirmPassword = this.changeForm.get('confirmPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    setTimeout(() => {
      this.passwordChanged = true;
      this.changeForm.reset();
    }, 1000);
  }
}
