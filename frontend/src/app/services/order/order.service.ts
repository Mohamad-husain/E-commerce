import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private order: any = null;
  private ordersKey = 'my_orders';

  setOrder(orderData: any) {
    this.order = orderData;
    localStorage.setItem('order', JSON.stringify(orderData));

    const history = this.getOrders();
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...orderData,
      status: 'Confirmed'
    };
    history.push(newOrder);
    localStorage.setItem(this.ordersKey, JSON.stringify(history));
  }

  getOrder() {
    if (this.order) return this.order;
    const saved = localStorage.getItem('order');
    return saved ? JSON.parse(saved) : null;
  }

  clearOrder() {
    this.order = null;
    localStorage.removeItem('order');
  }

  getOrders(): any[] {
    const saved = localStorage.getItem(this.ordersKey);
    return saved ? JSON.parse(saved) : [];
  }

  clearOrders() {
    localStorage.removeItem(this.ordersKey);
  }
}
