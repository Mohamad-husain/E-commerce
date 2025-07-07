import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
   imports: [
    ReactiveFormsModule

  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendResetLink() {
    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.value.email;

    this.authService.sendResetCode(email).subscribe({
      next: (res) => {
        this.message = 'Check your email for the reset code.';
        // تقدر تخزن الإيميل مؤقتًا عشان تستخدمه في صفحة التحقق
        localStorage.setItem('resetEmail', email);
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Something went wrong.';
      }
    });
  }
}
