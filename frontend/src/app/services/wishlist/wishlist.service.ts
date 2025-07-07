import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private wishlist: any[] = [];

  constructor(private http: HttpClient) {}

  getWishlistFromAPI(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/wishlist`);
  }

  addToWishlist(productId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist`, { product_id: productId });
  }

  removeFromWishlist(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wishlist/${productId}`);
  }

  getWishlist() {
    return this.wishlist;
  }

  setWishlist(items: any[]) {
    this.wishlist = items;
  }

  getWishlistIds(): number[] {
    return this.wishlist.map(item => item.id);
  }
}

