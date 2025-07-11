import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';
import AOS from 'aos';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgFor],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName = '';

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/wishlist', label: 'Favorites' },
    { path: '/offers', label: 'Offers' },
    { path: '/color-harmony', label: 'StyleSet' },
    { path: '/my-orders', label: 'My Orders' },
    { path: '/blog', label: 'Blog' },
  ];

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
  AOS.init({ duration: 600, once: true });

  this.authService.getIsLoggedIn().subscribe(isLogged => {
    this.isLoggedIn = isLogged;

    if (this.isLoggedIn) {
      this.loadUserName();
    } else {
      this.userName = '';
    }
  });
}


  loadUserName() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.userName = res.user_name ?? 'User';
      },
      error: (err) => {
        console.error('Failed to load profile', err);

        this.logout();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/login']);
  }
}
