import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];

  getWishlist() {
    return this.wishlist;
  }

  toggleWishlist(product: any) {
    const index = this.wishlist.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(product);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlist.some(p => p.id === id);
  }

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(p => p.id !== id);
  }
}
