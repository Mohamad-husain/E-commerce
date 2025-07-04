import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public cartService: CartService) {}

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/wishlist', label: 'Favorites' },
    { path: '/offers', label: 'Offers' },
    { path: '/color-harmony', label: 'StyleSet' },
    { path: '/my-orders', label: 'My Orders' },
    { path: '/blog', label: 'Blog' },

  ];

  isLoggedIn = false;
  userName = 'Mohammad';

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  logout() {
    this.isLoggedIn = false;
  }
}
