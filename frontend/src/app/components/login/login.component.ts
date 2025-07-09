import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
 imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const formData = this.loginForm.value;

    this.http.post('http://localhost:8000/api/login', formData).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        // تخزين التوكن أو أي معلومات حسب API
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed. Check your credentials.');
      }
    });
  }
}
