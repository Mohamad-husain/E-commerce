import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import AOS from 'aos';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers = [
    {
      title: 'Summer Sale',
      description: 'Get up to 50% off on summer collection!',
      image: 'assets/images/offer-summer.jpg',
      category: 'men'
    },
    {
      title: 'Flash Deal',
      description: 'Limited time offer on selected items.',
      image: 'assets/images/offer-flash.jpg',
      category: 'deals'
    },
    {
      title: 'New Arrivals',
      description: 'Check out the latest additions to our collection.',
      image: 'assets/images/offer-new.jpg',
      category: 'new'
    }
  ];

  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Offers - E-Shop');
    AOS.init({ duration: 800, once: true });
  }
}
