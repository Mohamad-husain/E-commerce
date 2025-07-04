import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedOrder: any = null;
  orderToDelete: any = null;
  detailsModal: any;
  deleteModal: any;

  orders = [
    {
      id: 1001,
      customer: 'Ahmad Khaled',
      date: '2025-07-01',
      total: 75.55,
      status: 'Pending',
      items: [
        { name: 'Classic T-Shirt', quantity: 2, price: 25.99 },
        { name: 'Leather Jacket', quantity: 1, price: 68.52 }
      ]
    },
    {
      id: 1002,
      customer: 'Sara Ahmad',
      date: '2025-07-22',
      total: 89.99,
      status: 'Delivered',
      items: [
        { name: 'Running Shoes', quantity: 1, price: 59.99 },
        { name: 'Cap', quantity: 1, price: 30.0 }
      ]
    },
    {
      id: 1003,
      customer: 'Mohammad Ahmad',
      date: '2025-06-01',
      total: 45.0,
      status: 'Shipped',
      items: [
        { name: 'White Shirt', quantity: 3, price: 15.0 }
      ]
    }
  ];

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  get filteredOrders() {
    const term = this.searchTerm.toLowerCase();
    return this.orders.filter(order =>
      (order.customer.toLowerCase().includes(term) || order.id.toString().includes(term)) &&
      (this.selectedStatus ? order.status === this.selectedStatus : true)
    );
  }

  openDetailsModal(order: any): void {
    this.selectedOrder = order;
    this.detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
    this.detailsModal.show();
  }

  updateOrderStatus(order: any): void {
    console.log('Order status updated:', order.id, order.status);
  }

  confirmDelete(order: any): void {
    this.orderToDelete = order;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  deleteOrder(): void {
    if (this.orderToDelete) {
      this.orders = this.orders.filter(o => o.id !== this.orderToDelete.id);
      this.deleteModal.hide();
    }
  }
}
