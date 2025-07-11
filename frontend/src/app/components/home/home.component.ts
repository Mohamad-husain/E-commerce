import { Component, AfterViewInit, OnInit } from '@angular/core';
import AOS from 'aos';
import { RouterModule } from '@angular/router';
import { NgForOf, CurrencyPipe } from '@angular/common';
import {ProductService} from '../../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgForOf, CurrencyPipe, RouterModule]
})
export class HomeComponent implements OnInit, AfterViewInit {
  featuredProducts: any[] = [];
  allProducts: any[] = [];
  categories: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchFeaturedProducts();
    this.fetchAllProducts();
    this.fetchCategories();
  }

  ngAfterViewInit(): void {
    AOS.init({ duration: 800, once: true });
  }

  fetchFeaturedProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.featuredProducts = data.slice(0, 8); // عرض أول 8 فقط
    });
  }

  fetchAllProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.allProducts = data;
    });
  }

  fetchCategories() {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getCategoryCount(categoryId: number): number {
    return this.allProducts.filter(p => p.category?.id === categoryId).length;
  }

  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }
}
