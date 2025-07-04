import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Title } from '@angular/platform-browser';
import AOS from 'aos';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];

  shipping = {
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: ''
  };

  payment = {
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.titleService.setTitle('Checkout - E-Shop');
    AOS.init({ duration: 700, once: true });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      this.notificationService.show('❌ Your cart is empty!');
      return;
    }

    const order = {
      items: this.cartItems,
      shipping: this.shipping,
      payment: this.payment
    };

    this.orderService.setOrder(order);
    this.cartService.clearCart();
    this.notificationService.show('✅ Order placed successfully!');
    this.router.navigate(['/order-summary']);
  }
}
