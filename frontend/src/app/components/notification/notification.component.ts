import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { NgIf } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [NgIf],
  standalone: true
})
export class NotificationComponent implements OnInit {
  message: string = '';
  visible: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    AOS.init({ duration: 500, once: true });

    this.notificationService.notification$.subscribe(msg => {
      this.message = msg;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  }
}
