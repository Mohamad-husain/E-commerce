import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { AdminProductService } from '../../services/admin/product/admin-product.service';
import { NotificationService } from '../../services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

interface Category {
  id: number;
  name: string;
}

interface ProductVariation {
  id?: number;
  color: string;
  size: string;
  quantity: number;
}

interface Product {
  id?: number;
  name: string;
  price: number;
  discount?: number;
  status: string;
  image: string;
  category_id: number;
  category?: { id: number; name: string };
  variations: ProductVariation[];
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  sizeOptions: string[] = ['S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43', '44', '45'];
  colorOptions: string[] = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Brown'];
  searchTerm: string = '';
  selectedIndexToDelete: number | null = null;
  deleteModal: any;

  editModal: any;
  editedProduct: Product = this.getEmptyProduct();
  editIndex: number | null = null;

  addModal: any;
  newProduct: Product = this.getEmptyProduct();
  imageFile: File | null = null;

  inventoryModal: any;
  selectedProduct: Product = this.getEmptyProduct();
  selectedProductIndex: number | null = null;

  addVariationModal: any;
  newVariation: ProductVariation = { color: '', size: '', quantity: 0 };

  constructor(
  private productService: AdminProductService,
  private notificationService: NotificationService,
  private route: ActivatedRoute
) {}


  ngOnInit(): void {
  AOS.init({ duration: 600, once: true });

  this.route.queryParams.subscribe(params => {
    const categoryId = params['categoryId'];
    if (categoryId) {
      this.fetchCategoriesAndFilter(Number(categoryId));
    } else {
      this.fetchProducts();
    }
  });

  this.fetchCategories();
}
fetchCategoriesAndFilter(categoryId: number): void {
  this.productService.getAllCategories().subscribe((res: Category[]) => {
    this.categories = res;
    const selected = this.categories.find(c => c.id === categoryId);
    if (selected) {
      this.searchTerm = selected.name;
      this.fetchProducts();
    }
  });
}


  onSearchChange() {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.filterProducts(this.searchTerm).subscribe(res => {
      this.products = res;
    });
  }

  fetchCategories(): void {
    this.productService.getAllCategories().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  getTotalVariations(product: Product): number {
    return product.variations.length;
  }

  getTotalQuantity(product: Product): number {
    return product.variations.reduce((total, variation) => total + variation.quantity, 0);
  }

  openDeleteModal(index: number): void {
    this.selectedIndexToDelete = index;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  confirmDelete(): void {
    if (this.selectedIndexToDelete !== null) {
      const product = this.products[this.selectedIndexToDelete];
      this.productService.deleteProduct(product.id!).subscribe(() => {
        this.products.splice(this.selectedIndexToDelete!, 1);
        this.selectedIndexToDelete = null;
        this.deleteModal.hide();
        this.notificationService.show('🗑️ Product deleted successfully');
      });
    }
  }

  openEditModal(index: number): void {
    this.editIndex = index;
    this.editedProduct = { ...this.products[index] };
    this.editModal = new bootstrap.Modal(document.getElementById('editModal'));
    this.editModal.show();
  }

  saveChanges(): void {
    if (this.editIndex !== null) {
      const formData = this.prepareFormData(this.editedProduct, this.imageFile);
      const productId = this.editedProduct.id!;
      this.productService.updateProduct(productId, formData).subscribe(() => {
        this.fetchProducts();
        this.editModal.hide();
        this.notificationService.show('✏️ Product updated successfully');
      });
    }
  }

  openAddModal(): void {
    this.newProduct = this.getEmptyProduct();
    this.imageFile = null;
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'));
    this.addModal.show();
  }

  addProduct(): void {
    const formData = this.prepareFormData(this.newProduct, this.imageFile);
    this.productService.addProduct(formData).subscribe(() => {
      this.fetchProducts();
      this.addModal.hide();
      this.notificationService.show('✅ Product added successfully');
    });
  }

  openInventoryModal(index: number): void {
    this.selectedProductIndex = index;
    this.selectedProduct = JSON.parse(JSON.stringify(this.products[index]));
    this.inventoryModal = new bootstrap.Modal(document.getElementById('inventoryModal'));
    this.inventoryModal.show();
  }

  saveInventoryChanges(): void {
    if (this.selectedProductIndex !== null) {
      const id = this.selectedProduct.id!;

      const validVariations = this.selectedProduct.variations.filter(v =>
        v.id !== undefined &&
        v.color?.trim() !== '' &&
        v.size?.trim() !== '' &&
        v.quantity !== null && v.quantity >= 0
      );

      if (validVariations.length === 0) {
        this.inventoryModal.hide();
        return;
      }

      const payload = validVariations.map(v => ({
        id: v.id,
        color: v.color,
        size: v.size,
        quantity: Number(v.quantity)
      }));

      this.productService.updateVariations(id, payload).subscribe(() => {
        this.fetchProducts();
        this.inventoryModal.hide();
        this.notificationService.show('📦 Inventory updated successfully');
      });
    }
  }

  openAddVariationModal(): void {
    this.newVariation = { color: this.colorOptions[0], size: this.sizeOptions[0], quantity: 0 };
    this.addVariationModal = new bootstrap.Modal(document.getElementById('addVariationModal'));
    this.addVariationModal.show();
  }

  addVariation(): void {
    const id = this.selectedProduct.id!;
    this.productService.addVariation(id, this.newVariation).subscribe((res) => {
      this.selectedProduct.variations.push(res.variation);

      if (this.selectedProductIndex !== null) {
        this.products[this.selectedProductIndex].variations.push(res.variation);
      }

      this.addVariationModal.hide();
      this.notificationService.show('➕ Variation added successfully');
    });
  }

  updateVariationStatus(index: number): void {
    const variation = this.selectedProduct.variations[index];
    variation.quantity = Number(variation.quantity);
  }

  removeVariation(index: number): void {
    const variationId = this.selectedProduct.variations[index].id!;
    this.productService.deleteVariation(variationId).subscribe(() => {
      this.selectedProduct.variations.splice(index, 1);

      if (this.selectedProductIndex !== null) {
        const mainVariations = this.products[this.selectedProductIndex].variations;
        const mainIndex = mainVariations.findIndex(v => v.id === variationId);
        if (mainIndex !== -1) {
          mainVariations.splice(mainIndex, 1);
        }
      }
      this.notificationService.show('🗑️ Variation deleted');
    });
  }

  handleImageUpload(event: any, target: 'new' | 'edit'): void {
    const file = event.target.files[0];
    if (file) {
      if (target === 'new') {
        this.newProduct.image = URL.createObjectURL(file);
      } else {
        this.editedProduct.image = URL.createObjectURL(file);
      }
      this.imageFile = file;
    }
  }

  prepareFormData(product: Product, file: File | null): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', String(product.price));
    formData.append('discount', String(product.discount || 0));
    formData.append('status', product.status);
    formData.append('category_id', String(product.category_id));
    if (file) formData.append('image', file);
    formData.append('variations', JSON.stringify(product.variations));
    return formData;
  }

  getEmptyProduct(): Product {
    return {
      name: '',
      price: 0,
      discount: 0,
      category_id: 1,
      status: 'Available',
      image: '',
      variations: []
    };
  }

  isTempImage(image: string): boolean {
    return image.startsWith('blob:') || image.startsWith('data:');
  }
}
