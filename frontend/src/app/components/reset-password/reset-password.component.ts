import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  codeDigits: string[] = ['', '', '', '', '', ''];
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  trackByIndex(index: number): number {
    return index;
  }

  onInput(index: number, event: any) {
    const input = event.target;
    const value = input.value;

    if (value.length > 1) {
      input.value = value.charAt(0);
      this.codeDigits[index] = value.charAt(0);
    }

    if (value && index < this.codeDigits.length - 1) {
      const nextInput = input.parentElement.querySelectorAll('input')[index + 1];
      if (nextInput) nextInput.focus();
    }
  }

  verifyCode() {
  const code = this.codeDigits.join('');
  const email = localStorage.getItem('resetEmail');

  if (!email || code.length !== 6) {
    this.error = 'Please enter the full code.';
    return;
  }

  const data = { email, code };

  this.authService.verifyResetCode(data).subscribe({
    next: (res) => {
      this.message = 'Code verified. Redirecting...';

      // ✅ احفظ reset_token في التخزين المحلي
      localStorage.setItem('resetToken', res.reset_token);

      setTimeout(() => {
        this.router.navigate(['/change-password']);
      }, 1000);
    },
    error: (err) => {
      this.error = err.error?.message || 'Verification failed.';
    }
  });
}

}
