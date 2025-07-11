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
  imports: [CommonModule, CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  categories: any[] = [];
  sizes: string[] = [];
  colors: string[] = [];

  selectedCategory: number | '' = '';
  selectedSizes: string[] = [];
  selectedColor = '';
  searchQuery = '';

  currentPage = 1;
  pageSize = 9;
  paginatedProducts: any[] = [];
  totalPages = 0;

  wishlistIds: number[] = [];

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Shop - E-Shop');
    this.fetchCategories();
    this.loadWishlist();
    this.fetchSizesAndColors();

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = +params['category'];
        this.fetchProductsByCategory(this.selectedCategory);
      } else {
        this.fetchFilteredProducts();
      }
    });
  }

  ngAfterViewInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  fetchCategories() {
    this.productService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  fetchSizesAndColors() {
    this.productService.getAllSizesAndColors().subscribe(data => {
      this.sizes = data.sizes;
      this.colors = data.colors;
    });
  }

  fetchProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(data => {
      this.products = data;
      this.updatePagination();
    });
  }

  fetchFilteredProducts() {
    const filters = {
      name: this.searchQuery,
      category_id: this.selectedCategory !== '' ? this.selectedCategory : null,
      sizes: this.selectedSizes,
      color: this.selectedColor
    };

    this.productService.filterProducts(filters).subscribe(data => {
      this.products = data;
      this.updatePagination();
    });
  }

  onSizeChange(event: any, size: string) {
    if (event.target.checked) {
      this.selectedSizes.push(size);
    } else {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    }
    this.fetchFilteredProducts();
  }

  updatePagination() {
    const allFiltered = this.products;
    this.totalPages = Math.ceil(allFiltered.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = allFiltered.slice(start, end);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.fetchFilteredProducts();
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
    this.fetchFilteredProducts();
  }

  loadWishlist() {
    this.wishlistService.getWishlistFromAPI().subscribe(data => {
      const products = data.map((item: any) => item.product);
      this.wishlistService.setWishlist(products);
      this.wishlistIds = this.wishlistService.getWishlistIds();
    });
  }

  toggleWishlist(product: any) {
    const isInList = this.isInWishlist(product.id);

    if (isInList) {
      this.wishlistService.removeFromWishlist(product.id).subscribe(() => {
        this.wishlistIds = this.wishlistIds.filter(id => id !== product.id);
        this.notificationService.show(`💔 Removed ${product.name} from wishlist`);
      });
    } else {
      this.wishlistService.addToWishlist(product.id).subscribe(() => {
        this.wishlistIds.push(product.id);
        this.notificationService.show(`❤️ Added ${product.name} to wishlist`);
      });
    }
  }

  isInWishlist(id: number): boolean {
    return this.wishlistIds.includes(id);
  }
}
