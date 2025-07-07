import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  private baseUrl = 'http://127.0.0.1:8000/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  getOverview(): Observable<any> {
    return this.http.get(`${this.baseUrl}/overview`);
  }

  getOrdersPerMonth(range: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders-per-month?range=${range}`);
  }

  getOrderStatusBreakdown(range: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order-status?range=${range}`);
  }

  getUsersAndSales(range: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users-and-sales?range=${range}`);
  }

  getLatestOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/latest-orders`);
  }
}
