import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products = [
    {
      name: 'Classic T-Shirt',
      price: 25.99,
      category: 'Clothing',
      status: 'Available',
      image: 'assets/images/product8.jpg'
    },
    {
      name: 'Running Shoes',
      price: 59.99,
      category: 'Footwear',
      status: 'Out of Stock',
      image: 'assets/images/product6.jpg'
    },
    {
      name: 'Leather Jacket',
      price: 89.99,
      category: 'Clothing',
      status: 'Available',
      image: 'assets/images/product5.jpg'
    }
  ];

  searchTerm: string = '';
  selectedIndexToDelete: number | null = null;
  deleteModal: any;

  editModal: any;
  editedProduct: any = {};
  editIndex: number | null = null;

  addModal: any;
  newProduct: any = {
    name: '',
    price: 0,
    category: '',
    status: 'Available',
    image: ''
  };

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  get filteredProducts() {
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }

  openDeleteModal(index: number): void {
    this.selectedIndexToDelete = index;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  confirmDelete(): void {
    if (this.selectedIndexToDelete !== null) {
      this.products.splice(this.selectedIndexToDelete, 1);
      this.selectedIndexToDelete = null;
    }
    this.deleteModal.hide();
  }

  openEditModal(index: number): void {
    this.editIndex = index;
    this.editedProduct = { ...this.products[index] };
    this.editModal = new bootstrap.Modal(document.getElementById('editModal'));
    this.editModal.show();
  }

  saveChanges(): void {
    if (this.editIndex !== null) {
      this.products[this.editIndex] = { ...this.editedProduct };
      this.editIndex = null;
      this.editModal.hide();
    }
  }

  openAddModal(): void {
    this.newProduct = {
      name: '',
      price: 0,
      category: '',
      status: 'Available',
      image: ''
    };
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'));
    this.addModal.show();
  }

  addProduct(): void {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.image) {
      this.products.push({ ...this.newProduct });
      this.addModal.hide();
    }
  }

  handleImageUpload(event: any, target: 'new' | 'edit') {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (target === 'new') {
          this.newProduct.image = reader.result as string;
        } else if (target === 'edit') {
          this.editedProduct.image = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
