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
  selectedQuantity: number = 1;
  maxQuantity: number = 10;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService,
    private titleService: Title,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.titleService.setTitle(`${data.name} - Product Details`);
      this.selectedImage = data.images[0];

      // تحويل الألوان إلى objects
      this.product.colors = this.product.colors.map((c: string) =>
        typeof c === 'string' ? this.mapColor(c) : c
      );
    });
  }

  mapColor(colorName: string) {
    const map: any = {
      Red: '#FF0000',
      Blue: '#0000FF',
      Black: '#000000',
      White: '#FFFFFF',
      Green: '#00FF00',
      Yellow: '#FFFF00',
    };

    return {
      name: colorName,
      value: map[colorName] || colorName
    };
  }

  increaseQuantity() {
    if (this.selectedQuantity < this.maxQuantity) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  addToCart() {
    if (!this.selectedSize || !this.selectedColor || !this.selectedQuantity) {
      this.notificationService.show('⚠️ Please select size, color, and quantity first!');
      return;
    }

    this.cartService.addToCart({
      name: this.product.name,
      price: this.product.price,
      size: this.selectedSize,
      color: this.selectedColor.name,
      quantity: this.selectedQuantity,
      image: this.selectedImage
    });

    this.notificationService.show(`🛒 ${this.product.name} added to cart!`);
  }
}
