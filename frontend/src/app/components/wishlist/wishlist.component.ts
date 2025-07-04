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
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeItem(id: number) {
    const removed = this.wishlist.find(p => p.id === id);
    this.wishlistService.removeFromWishlist(id);
    this.wishlist = this.wishlistService.getWishlist();
    this.notificationService.show(`❌ Removed ${removed?.name} from wishlist`);
  }
}
