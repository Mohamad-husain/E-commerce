import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private baseUrl = 'http://localhost:8000/api/admin/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  toggleRole(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}/toggle-role`, {});
  }

  filterUsers(search: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/filter?search=${search}`);
  }
}
