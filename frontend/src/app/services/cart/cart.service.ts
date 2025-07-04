import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  getCart() {
    return this.cartItems;
  }

  addToCart(item: any) {
    const existing = this.cartItems.find(p =>
      p.name === item.name &&
      p.size === item.size &&
      p.color === item.color
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity > 0) this.cartItems[index].quantity = quantity;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  getCartCount() {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }
}
