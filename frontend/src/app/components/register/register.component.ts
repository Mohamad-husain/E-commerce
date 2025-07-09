import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; // عدل المسار حسب مشروعك

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  password: string = '';
  password_confirmation: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const data = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    this.authService.register(data).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
         localStorage.setItem('token', res.token); // لو بيرجع توكن
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Please check your input.');
      }
    });
  }
}
