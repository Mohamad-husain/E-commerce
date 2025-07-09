import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { NotificationService } from '../../services/notification/notification.service';
import { AdminOrderService } from '../../services/admin/order/admin-order.service';

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
  orders: any[] = [];

  detailsModal: any;
  deleteModal: any;

  constructor(
    private orderService: AdminOrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService
      .filterOrders(this.searchTerm.trim(), this.selectedStatus)
      .subscribe(data => {
        this.orders = data;
      });
  }

  onSearchChange() {
    this.fetchOrders();
  }

  onStatusChange() {
    this.fetchOrders();
  }

  openDetailsModal(order: any): void {
    this.orderService.getOrderDetails(order.id).subscribe(data => {
      this.selectedOrder = data;
      this.detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
      this.detailsModal.show();
    });
  }

  updateOrderStatus(order: any): void {
    this.orderService.updateStatus(order.id, order.status).subscribe(() => {
      this.notificationService.show(`Order #${order.id} status updated.`);
    });
  }

  confirmDelete(order: any): void {
    this.orderToDelete = order;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    this.deleteModal.show();
  }

  deleteOrder(): void {
    this.orderService.deleteOrder(this.orderToDelete.id).subscribe(() => {
      this.notificationService.show(`Order #${this.orderToDelete.id} deleted.`);
      this.fetchOrders();
      this.deleteModal.hide();
    });
  }
}
