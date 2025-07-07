import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, NgIf]
})
export class ChangePasswordComponent {
  changeForm: FormGroup;
  passwordChanged = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
  const email = localStorage.getItem('resetEmail');
  const resetToken = localStorage.getItem('resetToken');

  this.changeForm = this.fb.group({
  newPassword: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.required]],
});

  if (!email || !resetToken) {
    this.errorMessage = 'Missing email or token. Please restart the process.';
    return;
  }

  if (newPassword !== confirmPassword) {
    this.errorMessage = 'Passwords do not match';
    return;
  }

  const data = {
    email,
    reset_token: resetToken,
    new_password: newPassword,
    new_password_confirmation: confirmPassword
  };

  this.authService.changePassword(data).subscribe({
    next: () => {
      this.passwordChanged = true;
      this.changeForm.reset();
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetToken');

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: (err) => {
      this.errorMessage = err.error?.message || 'Password change failed. Please try again.';
    }
  });
}

}
