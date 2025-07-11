import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  slug?: string;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin/categories';

  constructor(private http: HttpClient) { }

  // Get all categories
  getCategories(): Observable<{status: boolean, data: Category[]}> {
    return this.http.get<{status: boolean, data: Category[]}>(this.apiUrl);
  }

  // Add new category
  addCategory(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Update category by id
  updateCategory(id: number, data: FormData): Observable<any> {
    data.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/${id}`, data);
  }

  // Delete category by id
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ New: Search category by name
  searchCategoryByName(name: string): Observable<{ status: boolean, data: Category[] }> {
    const params = new HttpParams().set('name', name);
    return this.http.get<{ status: boolean, data: Category[] }>(
      `${this.apiUrl}/search`,
      { params }
    );
  }
}
