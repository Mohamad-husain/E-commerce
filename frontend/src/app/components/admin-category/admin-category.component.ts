import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

declare var bootstrap: any;

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  name: string;
  status: string;
  price: number;
  discount: number;
  image: string;
  categoryId: number;
}

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent {
  constructor(private router: Router) {}

  searchTerm: string = '';
  allCategories: Category[] = [
    { id: 1, name: 'Shoes', image: 'shoes.jpg' },
    { id: 2, name: 'Shirts', image: 'shirts.jpg' },
    { id: 3, name: 'Accessories', image: 'accessories.jpg' }
  ];
  categories: Category[] = [...this.allCategories];

  newCategory: Category = { id: 0, name: '', image: '' };
  editedCategory: Category = { id: 0, name: '', image: '' };

  addModal: any;
  editModal: any;
  deleteModal: any;
  addProductModal: any;

  selectedIndexToDelete: number | null = null;
  imageFile: File | null = null;

  selectedCategory: Category | null = null;
  newProduct: Product = {
    name: '',
    status: 'Available',
    price: 0,
    discount: 0,
    image: '',
    categoryId: 0
  };

  allProducts: Product[] = [];

  alertMessage: string = '';
  showAlert: boolean = false;

  onSearchChange(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.categories = this.allCategories.filter(cat =>
      cat.name.toLowerCase().includes(term)
    );
  }

  getImageUrl(image: string): string {
    return image.startsWith('http') ? image : `http://127.0.0.1:8000/storage/${image}`;
  }

  openAddCategoryModal(): void {
    this.newCategory = { id: 0, name: '', image: '' };
    this.imageFile = null;
    this.addModal = new bootstrap.Modal(document.getElementById('addCategoryModal'));
    this.addModal.show();
  }

  handleImageUpload(event: any, type: 'new' | 'edit'): void {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'new') {
        this.newCategory.image = imageUrl;
      } else {
        this.editedCategory.image = imageUrl;
      }
      this.imageFile = file;
    }
  }

  handleProductImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newProduct.image = URL.createObjectURL(file);
    }
  }

  addCategory(): void {
    const newId = this.allCategories.length + 1;
    const newCat = { ...this.newCategory, id: newId };
    this.allCategories.push(newCat);
    this.onSearchChange();
    this.addModal.hide();
  }

  openEditCategoryModal(index: number): void {
    this.editedCategory = { ...this.categories[index] };
    this.editModal = new bootstrap.Modal(document.getElementById('editCategoryModal'));
    this.editModal.show();
  }

  saveEditedCategory(): void {
    const i = this.allCategories.findIndex(cat => cat.id === this.editedCategory.id);
    if (i !== -1) {
      this.allCategories[i] = { ...this.editedCategory };
      this.onSearchChange();
      this.editModal.hide();
    }
  }

  openDeleteCategoryModal(index: number): void {
    this.selectedIndexToDelete = index;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteCategoryModal'));
    this.deleteModal.show();
  }

  confirmDelete(): void {
    if (this.selectedIndexToDelete !== null) {
      const idToDelete = this.categories[this.selectedIndexToDelete].id;
      this.allCategories = this.allCategories.filter(cat => cat.id !== idToDelete);
      this.onSearchChange();
      this.deleteModal.hide();
      this.selectedIndexToDelete = null;
    }
  }

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
    this.addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    this.addProductModal.show();
  }

  addProduct(): void {
    const newProd = { ...this.newProduct };
    this.allProducts.push(newProd);
    this.addProductModal.hide();
    this.alertMessage = 'Product added successfully';
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }

}
