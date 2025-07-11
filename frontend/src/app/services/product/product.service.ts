import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  filterProducts(filters: any): Observable<any[]> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);
    if (filters.category_id && filters.category_id !== 'All') {
      params = params.set('category_id', filters.category_id);
    }

    if (filters.sizes && filters.sizes.length > 0) {
      filters.sizes.forEach((size: string) => {
        params = params = params.append('sizes', size);
      });
    }

    if (filters.color) params = params.set('color', filters.color);

    return this.http.get<any[]>(`${this.apiUrl}/filter-products`, { params });
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryId}/products`);
  }

  getAllSizesAndColors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/variations`);
  }

  getProductsWithOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products-with-offers`);
  }

}
