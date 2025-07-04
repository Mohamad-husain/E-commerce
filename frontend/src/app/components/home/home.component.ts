import { Component, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgForOf, CurrencyPipe, RouterModule]
})
export class HomeComponent implements AfterViewInit {
  featuredProducts = [
    {
      id: 1,
      name: 'Casual Shirt',
      price: 25.00,
      images: ['assets/images/product1.jpg', 'assets/images/product2.jpg']
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 45.00,
      images: ['assets/images/product2.jpg', 'assets/images/product5.jpg']
    },
    {
      id: 3,
      name: 'Leather Bag',
      price: 60.00,
      images: ['assets/images/product3.jpg', 'assets/images/product2.jpg']
    },
    {
      id: 4,
      name: 'Sneakers',
      price: 35.00,
      images: ['assets/images/product4.jpg', 'assets/images/product7.jpg']
    },
    {
      id: 5,
      name: 'Casual Shirt',
      price: 25.00,
      images: ['assets/images/product9.jpg', 'assets/images/product1.jpg']
    },
    {
      id: 6,
      name: 'Denim Jacket',
      price: 45.00,
      images: ['assets/images/product8.jpg', 'assets/images/product4.jpg']
    },
    {
      id: 7,
      name: 'Leather Bag',
      price: 60.00,
      images: ['assets/images/product7.jpg', 'assets/images/product9.jpg']
    },
    {
      id: 8,
      name: 'Sneakers',
      price: 35.00,
      images: ['assets/images/product6.jpg', 'assets/images/product1.jpg']
    }
  ];

  allProducts = [
    { name: 'Elegant Jacket', category: 'Women' },
    { name: 'Casual Sneakers', category: 'Men' },
    { name: 'Stylish Hoodie', category: 'Accessories' },
    { name: 'Leather Handbag', category: 'Accessories' },
    { name: 'Floral Summer Dress', category: 'Women' },
    { name: 'Slim Fit Jeans', category: 'Men' },
    { name: 'Summer Hat', category: 'Accessories' },
    { name: 'Running Shoes', category: 'Men' },
    { name: 'Fashion T-shirt', category: 'New' }
  ];

  categories = [
    { name: 'Women', image: 'assets/images/product5.jpg' },
    { name: 'Men', image: 'assets/images/product6.jpg' },
    { name: 'Accessories', image: 'assets/images/product7.jpg' },
    { name: 'New', image: 'assets/images/product9.jpg' }
  ];

  ngAfterViewInit(): void {
    AOS.init({ duration: 800, once: true });
  }

  getCategoryCount(categoryName: string): number {
    return this.allProducts.filter(p => p.category === categoryName).length;
  }

  addToCart(product: any) {
    console.log('Product added to cart:', product);
  }
}
