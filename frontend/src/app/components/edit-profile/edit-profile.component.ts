import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { NotificationService } from '../../services/notification/notification.service';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  loading = true;

  user = {
    phone: '',
    city: '',
    country: '',
    birth_date: '',
    gender: '',
    bio: '',

  };

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });

    // جلب بيانات المستخدم لتعبئة الفورم
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.user = {
          phone: res.profile?.phone || '',
          city: res.profile?.city || '',
          country: res.profile?.country || '',
          birth_date: res.profile?.birth_date || '',
          gender: res.profile?.gender || '',
          bio: res.profile?.bio || '',
        };
        this.loading = false;
      },
      error: () => {
        this.notificationService.show('❌ Failed to load profile data.');
        this.loading = false;
      }
    });
  }

  saveChanges(): void {
    this.profileService.updateProfile(this.user).subscribe({
      next: (res) => {
        this.notificationService.show('✅ Profile updated successfully!');
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 1000);
      },
      error: (err) => {
        console.error(err);
        this.notificationService.show('❌ Failed to update profile.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}
