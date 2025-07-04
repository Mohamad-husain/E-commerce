import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AOS from 'aos';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'Mohammad Hussain',
    email: 'Mohammad@gmail.com',
    phone: '+972598610880',
    address: 'Nablus, Palestine'
  };

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  logout() {
    this.notificationService.show('🚪 Logged out successfully!');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
