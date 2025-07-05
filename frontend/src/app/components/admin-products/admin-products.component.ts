import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

declare var bootstrap: any;

interface ProductVariation {
  color: string;
  size: string;
  quantity: number;
}

interface Product {
  id?: number;
  name: string;
  price: number;
  discount?: number;
  category: string;
  status: string;
  image: string;
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
  products: Product[] = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 25.99,
      discount: 10,
      category: 'Clothing',
      status: 'Available',
      image: 'assets/images/product8.jpg',
      variations: [
        { color: 'White', size: 'S', quantity: 10 },
        { color: 'White', size: 'M', quantity: 15 },
        { color: 'White', size: 'L', quantity: 8 },
        { color: 'Blue', size: 'M', quantity: 12 },
        { color: 'Blue', size: 'L', quantity: 5 }
      ]
    },
    {
      id: 2,
      name: 'Running Shoes',
      price: 89.99,
      discount: 15,
      category: 'Footwear',
      status: 'Available',
      image: 'assets/images/product6.jpg',
      variations: [
        { color: 'Black', size: '39', quantity: 5 },
        { color: 'Black', size: '40', quantity: 7 },
        { color: 'Black', size: '42', quantity: 8 },
        { color: 'Red', size: '40', quantity: 0 },
        { color: 'Red', size: '41', quantity: 12 }
      ]
    },
    {
      id: 3,
      name: 'Leather Jacket',
      price: 129.99,
      category: 'Clothing',
      status: 'Out of Stock',
      image: 'assets/images/product5.jpg',
      variations: [
        { color: 'Black', size: 'M', quantity: 0 },
        { color: 'Black', size: 'L', quantity: 0 },
        { color: 'Black', size: 'XL', quantity: 0 }
      ]
    }
  ];

  sizeOptions: string[] = ['S', 'M', 'L', 'XL', '38', '39', '40', '41', '42', '43', '44', '45'];
  colorOptions: string[] = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Brown'];
  searchTerm: string = '';
  selectedIndexToDelete: number | null = null;
  deleteModal: any;

  editModal: any;
  editedProduct: Product = {
    name: '',
    price: 0,
    discount: 0,
    category: '',
    status: 'Available',
    image: '',
    variations: []
  };
  editIndex: number | null = null;

  addModal: any;
  newProduct: Product = {
    name: '',
    price: 0,
    discount: 0,
    category: '',
    status: 'Available',
    image: '',
    variations: []
  };

  inventoryModal: any;
  selectedProduct: Product = {
    name: '',
    price: 0,
    discount: 0,
    category: '',
    status: 'Available',
    image: '',
    variations: []
  };
  selectedProductIndex: number | null = null;

  addVariationModal: any;
  newVariation: ProductVariation = {
    color: '',
    size: '',
    quantity: 0
  };

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
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
      this.updateProductStatus(this.editIndex);
      this.editIndex = null;
      this.editModal.hide();
    }
  }

  openAddModal(): void {
    this.newProduct = {
      name: '',
      price: 0,
      discount: 0,
      category: '',
      status: 'Available',
      image: '',
      variations: []
    };
    this.addModal = new bootstrap.Modal(document.getElementById('addModal'));
    this.addModal.show();
  }

  addProduct(): void {
    const newId = this.products.length > 0 ?
      Math.max(...this.products.map(p => p.id || 0)) + 1 : 1;

    this.newProduct.id = newId;
    this.products.push({ ...this.newProduct });
    this.addModal.hide();
  }

  openInventoryModal(index: number): void {
    this.selectedProductIndex = index;
    this.selectedProduct = { ...this.products[index] };
    this.inventoryModal = new bootstrap.Modal(document.getElementById('inventoryModal'));
    this.inventoryModal.show();
  }

  saveInventoryChanges(): void {
    if (this.selectedProductIndex !== null) {
      this.products[this.selectedProductIndex] = { ...this.selectedProduct };
      this.updateProductStatus(this.selectedProductIndex);
      this.inventoryModal.hide();
    }
  }

  updateProductStatus(index: number): void {
    const product = this.products[index];
    const totalQuantity = this.getTotalQuantity(product);

    if (totalQuantity > 0) {
      product.status = 'Available';
    } else {
      product.status = 'Out of Stock';
    }
  }

  updateVariationStatus(index: number): void {
    const variation = this.selectedProduct.variations[index];
    // Additional logic can be added here if needed
  }

  openAddVariationModal(): void {
    this.newVariation = {
      color: this.colorOptions[0],
      size: this.sizeOptions[0],
      quantity: 0
    };
    this.addVariationModal = new bootstrap.Modal(document.getElementById('addVariationModal'));
    this.addVariationModal.show();
  }

  addVariation(): void {
    const exists = this.selectedProduct.variations.some(v =>
      v.color === this.newVariation.color && v.size === this.newVariation.size);

    if (!exists) {
      this.selectedProduct.variations.push({ ...this.newVariation });
      this.addVariationModal.hide();
    } else {
      alert('This color-size combination already exists!');
    }
  }

  removeVariation(index: number): void {
    this.selectedProduct.variations.splice(index, 1);
  }

  handleImageUpload(event: any, target: 'new' | 'edit'): void {
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
