import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private baseUrl = 'http://127.0.0.1:8000/api/admin';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/allProduct`);
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/showDetails/${id}`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProduct`, formData);
  }

  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateProduct/${id}?_method=PUT`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProduct/${id}`);
  }

  updateVariations(id: number, variations: any[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProduct/${id}/variations`, { variations });
  }

  addVariation(productId: number, variation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateProduct/${productId}/variation`, variation);
  }

  deleteVariation(variationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/updateProduct/${variationId}/variation`);
  }

  filterProducts(searchTerm: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/filter-products?search=${searchTerm}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }
}
