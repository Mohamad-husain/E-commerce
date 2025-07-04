import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import { Title } from '@angular/platform-browser';
import { NotificationService } from '../../services/notification/notification.service';
import AOS from 'aos';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any;
  selectedImage: string = '';
  selectedSize: string = '';
  selectedColor: any = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);

    if (this.product) {
      this.selectedImage = this.product.images[0];
      this.titleService.setTitle(this.product.name + ' - Product Details');

      this.product.colors = this.product.colors.map((c: any) =>
        typeof c === 'string' ? this.mapColor(c) : c
      );
    }
  }

  mapColor(hex: string) {
    const colorMap: any = {
      '#000': 'Black',
      '#FFF': 'White',
      '#FFFFFF': 'White',
      '#FF0000': 'Red',
      '#00FF00': 'Green',
      '#0000FF': 'Blue',
      '#8B0000': 'Dark Red',
      '#FFFF00': 'Yellow',
      '#87CEEB': 'Sky Blue',
      '#000000': 'Black',
      '#333333': 'Dark Gray',
      '#00CED1': 'Dark Turquoise',
      '#F5F5DC': 'Beige',
      '#0000CD': 'Medium Blue'
    };

    const name = colorMap[hex.toUpperCase()] || hex.toUpperCase();
    return { name, value: hex };
  }

  addToCart() {
    if (!this.selectedSize || !this.selectedColor) {
      this.notificationService.show('⚠️ Please select size and color first!');
      return;
    }

    this.cartService.addToCart({
      name: this.product.name,
      price: this.product.price,
      size: this.selectedSize,
      color: this.selectedColor.name,
      quantity: 1,
      image: this.product.images[0]
    });

    this.notificationService.show(`🛒 ${this.product.name} added to cart!`);
  }
}
