import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { NotificationService } from '../../services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  constructor(
    private wishlistService: WishlistService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 800, once: true });
    this.loadWishlist();
  }

  loadWishlist() {
    this.wishlistService.getWishlistFromAPI().subscribe(
      data => {
        this.wishlist = data.map((item: any) => item.product);
        this.wishlistService.setWishlist(this.wishlist);
      },
      error => {
        console.error('Failed to load wishlist:', error);
      }
    );
  }

  removeItem(productId: number) {
    const removed = this.wishlist.find(p => p.id === productId);
    this.wishlistService.removeFromWishlist(productId).subscribe(() => {
      this.wishlist = this.wishlist.filter(p => p.id !== productId);
      this.notificationService.show(`❌ Removed ${removed?.name} from wishlist`);
    });
  }
}
