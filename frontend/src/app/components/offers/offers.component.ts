import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import AOS from 'aos';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: any[] = [];

  constructor(
    private titleService: Title,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Offers - E-Shop');
    AOS.init({ duration: 800, once: true });
    this.fetchOffers();
  }

  fetchOffers() {
    this.productService.getProductsWithOffers().subscribe(data => {
      this.offers = data;
    });
  }
}
