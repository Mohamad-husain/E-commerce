import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  
  getIsLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${this.apiUrl}/login`, data).subscribe({
        next: (res: any) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.loggedIn$.next(true);  // حدث الحالة هنا
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn$.next(false);  // حدث الحالة هنا
  }

  sendResetCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-reset-code`, { email });
  }

  verifyResetCode(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-reset-code`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getResetEmail(email: string) {
    throw new Error('Method not implemented.');
  }
}
