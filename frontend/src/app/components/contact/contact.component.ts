import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../services/notification/notification.service';
import AOS from 'aos';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  constructor(private titleService: Title, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us - E-Shop');
    AOS.init({ duration: 700, once: true });
  }

  submitForm() {
    this.submitted = true;
    console.log('Message sent:', this.contact);
    this.notificationService.show('✅ Your message has been sent!');
    this.contact = { name: '', email: '', message: '' };
  }
}
