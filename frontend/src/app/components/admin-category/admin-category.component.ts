import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CategoryService } from '../../services/admin/category/category.service';
import { AdminProductService } from '../../services/admin/product/admin-product.service'; // المسار حسب مشروعك

declare var bootstrap: any;

interface Category {
  id?: number;
  name: string;
  image?: string;
  slug?: string;
}

interface Product {
  id?: number;
  name: string;
  status: string;
  price: number;
  image?: string;
  discount?: number;
  categoryId?: number;
}

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  searchTerm: string = '';
  allCategories: Category[] = [];
  categories: Category[] = [];

  newCategory: Category = { name: '', image: '' };
  editedCategory: Category = { name: '', image: '' };

  newProduct: Product = {
    name: '',
    status: 'Available',
    price: 0,
    discount: 0,
    image: '',
    categoryId: undefined
  };

  selectedCategory: Category | null = null;

  addModal: any;
  editModal: any;
  deleteModal: any;
  addProductModal: any;

  selectedIndexToDelete: number | null = null;

  imageFile: File | null = null;
  imagePreview: string = '';

  productImageFile: File | null = null;

  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(
  private router: Router,
  private categoryService: CategoryService,
  private adminProductService: AdminProductService  
) {}

  ngOnInit(): void {
    this.loadCategories();
  }


loadCategories(): void {
  this.categoryService.getCategories().subscribe({
    next: res => {
      if (res.status) {
        this.allCategories = res.data;
        this.categories = [...this.allCategories];
      }
    },
    error: err => {
      console.error('Failed to load categories', err);
    }
  });
}


onSearchChange(): void {
  const term = this.searchTerm.trim();
  if (term.length === 0) {
    this.loadCategories();
  } else {
    this.categoryService.searchCategoryByName(term).subscribe({
      next: res => {
        if (res.status) {
          this.categories = res.data;
        }
      },
      error: err => {
        console.error('Search failed', err);
      }
    });
  }
}


  getImageUrl(image: string | null | undefined): string {
    if (!image) return 'assets/default-category.png';
    if (image.startsWith('http') || image.startsWith('data:')) return image;
    return `http://127.0.0.1:8000/storage/${image}`;
  }

  // ----------------- Category Modals -----------------
  openAddCategoryModal(): void {
    this.newCategory = { name: '', image: '' };
    this.imageFile = null;
    this.imagePreview = '';
    this.addModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    this.addModal.show();
  }

  openEditCategoryModal(index: number): void {
    this.editedCategory = { ...this.categories[index] };
    this.imageFile = null;
    this.imagePreview = this.getImageUrl(this.editedCategory.image || '');
    this.editModal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
    this.editModal.show();
  }

  openDeleteCategoryModal(index: number): void {
    this.selectedIndexToDelete = index;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteCategoryModal'));
    this.deleteModal.show();
  }

  handleImageUpload(event: any, type: 'new' | 'edit'): void {
    const file = event.target.files[0];
    if (file) {
      this.imagePreview = URL.createObjectURL(file);
      this.imageFile = file;
    }
  }

  addCategory(): void {
    if (!this.newCategory.name || !this.imageFile) {
      alert('Please enter name and select image');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.newCategory.name);
    formData.append('image', this.imageFile);

    this.categoryService.addCategory(formData).subscribe({
      next: () => {
        this.loadCategories();
        this.addModal.hide();
        this.showTemporaryAlert('Category added successfully!');
      },
      error: err => {
        console.error(err);
        alert('Failed to add category');
      }
    });
  }

  saveEditedCategory(): void {
    if (!this.editedCategory.name) {
      alert('Name is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.editedCategory.name);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    if (typeof this.editedCategory.id !== 'number') {
      alert('Invalid category ID');
      return;
    }

    this.categoryService.updateCategory(this.editedCategory.id, formData).subscribe({
      next: () => {
        this.loadCategories();
        this.editModal.hide();
        this.showTemporaryAlert('Category updated successfully!');
      },
      error: err => {
        console.error(err);
        alert('Failed to update category');
      }
    });
  }

  confirmDelete(): void {
    if (this.selectedIndexToDelete === null) return;

    const idToDelete = this.categories[this.selectedIndexToDelete].id;

    if (typeof idToDelete !== 'number') {
      alert('Invalid category ID');
      return;
    }

    this.categoryService.deleteCategory(idToDelete).subscribe({
      next: () => {
        this.loadCategories();
        this.deleteModal.hide();
        this.selectedIndexToDelete = null;
        this.showTemporaryAlert('Category deleted successfully!');
      },
      error: err => {
        console.error(err);
        alert('Failed to delete category');
      }
    });
  }

  // ----------------- Product Modals (كما طلبت تبقى كما هي) -----------------
  openAddProductModal(category: Category): void {
    this.selectedCategory = category;
    this.newProduct = {
      name: '',
      status: 'Available',
      price: 0,
      discount: 0,
      image: '',
      categoryId: category.id
    };
    this.productImageFile = null;
    this.addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    this.addProductModal.show();
  }

  handleProductImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newProduct.image = URL.createObjectURL(file);
      this.productImageFile = file;
    }
  }

  addProduct(): void {
  if (!this.newProduct.name || !this.newProduct.price || !this.productImageFile) {
    alert('Please fill all required product fields and select image');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.newProduct.name);
  formData.append('status', this.newProduct.status);
  formData.append('price', this.newProduct.price.toString());
  formData.append('discount', (this.newProduct.discount || 0).toString());

  // 👇 المهم: نرسل category_id كما يحتاجه Laravel
  if (this.newProduct.categoryId) {
    formData.append('category_id', this.newProduct.categoryId.toString());
  } else {
    alert('Category is required');
    return;
  }

  formData.append('image', this.productImageFile);

  this.adminProductService.addProduct(formData).subscribe({
    next: (res) => {
      this.addProductModal.hide();
      this.showTemporaryAlert('Product added successfully!');
      console.log('Added Product:', res);
    },
    error: err => {
      console.error(err);
      alert('Failed to add product');
    }
  });
}


  // ----------------- Alert -----------------
  showTemporaryAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }
}
