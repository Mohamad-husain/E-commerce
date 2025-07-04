import { Component, OnInit, AfterViewInit } from '@angular/core';
import AOS from 'aos';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterLink]
})
export class ShopComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  categories = ['Women', 'Men', 'Accessories', 'Deals', 'New'];
  sizes = ['S', 'M', 'L', 'XL', 'One Size'];
  colors = ['Red', 'Blue', 'Black', 'Brown'];

  selectedCategory = '';
  selectedSizes: string[] = [];
  selectedColor = '';
  searchQuery = '';

  currentPage = 1;
  pageSize = 9;
  paginatedProducts: any[] = [];
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Shop - E-Shop');
    this.products = this.productService.getAllProducts();

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      this.updatePagination();
    });
  }

  ngAfterViewInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  filteredProducts() {
    return this.products.filter(p => {
      const matchCategory = !this.selectedCategory || p.category?.toLowerCase() === this.selectedCategory.toLowerCase();
      const matchSize = this.selectedSizes.length === 0 || this.selectedSizes.includes(p.size);
      const matchColor = !this.selectedColor || p.color === this.selectedColor;
      const matchSearch = !this.searchQuery || p.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCategory && matchSize && matchColor && matchSearch;
    });
  }

  onSizeChange(event: any, size: string) {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
    this.onSearchChange();
  }

  updatePagination() {
    const allFiltered = this.filteredProducts();
    this.totalPages = Math.ceil(allFiltered.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = allFiltered.slice(start, end);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get totalPagesArray() {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  resetFilters() {
    this.selectedCategory = '';
    this.selectedSizes = [];
    this.selectedColor = '';
    this.searchQuery = '';
    this.currentPage = 1;
    this.updatePagination();
  }

  toggleWishlist(product: any) {
    const isInList = this.isInWishlist(product.id);
    this.wishlistService.toggleWishlist(product);

    if (isInList) {
      this.notificationService.show(`💔 Removed ${product.name} from wishlist`);
    } else {
      this.notificationService.show(`❤️ Added ${product.name} to wishlist`);
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.isInWishlist(id);
  }
}
