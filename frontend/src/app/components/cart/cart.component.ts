import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { NotificationService } from '../../services/notification/notification.service';
import AOS from 'aos';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    public cartService: CartService,
    private notificationService: NotificationService
  ) {
    this.cartItems = this.cartService.getCart();
  }

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  updateQuantity(index: number, quantity: number) {
    this.cartService.updateQuantity(index, quantity);
    this.notificationService.show('✅ Quantity updated');
  }

  removeItem(index: number) {
    const removed = this.cartItems[index];
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCart();
    this.notificationService.show(`❌ Removed ${removed.name} from cart`);
  }

  getTotal() {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.notificationService.show('🗑️ Cart cleared');
  }


  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }


}
