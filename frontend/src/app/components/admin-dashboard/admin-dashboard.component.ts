import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';
import {AdminDashboardService} from '../../services/admin/dashboard/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgChartsModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: any[] = [];
  latestOrders: any[] = [];

  chartRanges = ['Today', 'Last Week', 'Last Month'];
  selectedRange = 'Today';

  barChartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';
  lineChartType: ChartType = 'line';

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } }
  };

  barChartData: any;
  pieChartData: any;
  lineChartData: any;

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    AOS.init({ duration: 800, once: true });

    this.dashboardService.getOverview().subscribe(data => {
      this.stats = [
        { label: 'Total Products', value: data.total_products },
        { label: 'Total Orders', value: data.total_orders },
        { label: 'Total Users', value: data.total_users }
      ];
    });

    this.dashboardService.getLatestOrders().subscribe(data => {
      this.latestOrders = data;
    });

    this.updateCharts();
  }

  updateCharts() {
    this.dashboardService.getOrdersPerMonth(this.selectedRange).subscribe((orders: any[]) => {
      const labels = orders.map(o => o.label);
      const orderData = orders.map(o => o.count);

      const colorMap: any = {
        'Pending': '#ffc107',
        'Processing': '#0d6efd',
        'Shipped': '#0dcaf0',
        'Delivered': '#198754',
        'Cancelled': '#dc3545'
      };

      const backgroundColors = orders.map(o => colorMap[o.status] || '#6c757d');

      this.barChartData = {
        labels,
        datasets: [
          {
            label: 'Orders',
            data: orderData,
            backgroundColor: backgroundColors,
            borderRadius: 8
          }
        ]
      };
    });


    this.dashboardService.getOrderStatusBreakdown(this.selectedRange).subscribe(statusData => {
      const labels = statusData.map((s: any) => s.status);
      const data = statusData.map((s: any) => s.count);

      const colorMap: any = {
        'Pending': '#ffc107',
        'Processing': '#0d6efd',
        'Shipped': '#0dcaf0',
        'Delivered': '#198754',
        'Cancelled': '#dc3545'
      };

      const backgroundColors = labels.map((status: string) => colorMap[status] || '#6c757d');

      this.pieChartData = {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors
          }
        ]
      };
    });


    this.dashboardService.getUsersAndSales(this.selectedRange).subscribe((salesData: any) => {
      const labels = salesData.map((d: any) => d.label);
      const users = salesData.map((d: any) => d.new_users);
      const sales = salesData.map((d: any) => d.sales);

      this.lineChartData = {
        labels,
        datasets: [
          {
            label: 'New Users',
            data: users,
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Sales',
            data: sales,
            borderColor: '#198754',
            backgroundColor: 'rgba(25, 135, 84, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      };
    });
  }
}
