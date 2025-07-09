import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private baseUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/allOrder`);
  }

  getOrderDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/detailsOrder/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${id}/status`, { status });
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteOrders/${id}`);
  }

  filterOrders(search: string, status: string): Observable<any> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (status) params = params.set('status', status);
    return this.http.get(`${this.baseUrl}/orders/filter`, { params });
  }

}
