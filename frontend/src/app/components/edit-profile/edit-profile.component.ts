import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import AOS from 'aos';
import { NotificationService } from '../../services/notification/notification.service'; // ✅ استدعاء الخدمة

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
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

  saveChanges() {
    this.notificationService.show('✅ Profile updated successfully!');
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 1000);
  }

  cancel() {
    this.router.navigate(['/profile']);
  }
}
