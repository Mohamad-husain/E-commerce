import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
 
})
export class ProfileComponent implements OnInit {
  user: any = null;
  loading = true;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
    this.loadProfile();
  }

  loadProfile() {
  this.profileService.getProfile().subscribe({
    next: (res) => {
      this.user = {
        name: res.user_name,
        phone: res.profile?.phone,
        country: res.profile?.country,
        city: res.profile?.city,

      };
      this.loading = false;
    },
    error: (err) => {
      this.notificationService.show('Failed to load profile.');
      this.loading = false;
    }
  });
}


  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    this.authService.logout();
    this.notificationService.show('🚪 Logged out successfully!');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }
}
