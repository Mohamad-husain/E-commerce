import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NotificationService } from '../../services/notification/notification.service';
import AOS from 'aos';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  order: any = null;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });

    this.order = this.orderService.getOrder();
    if (!this.order) {
      this.notificationService.show('❌ No order found.');
      this.router.navigate(['/shop']);
    }
  }

  confirmOrder() {
    this.notificationService.show('✅ Order placed successfully.');
    this.orderService.clearOrder();
    this.router.navigate(['/']);
  }

  getTotal() {
    return this.order.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }
}
