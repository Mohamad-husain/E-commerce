import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NgChartsModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats = [
    { label: 'Total Products', value: 120 },
    { label: 'Total Orders', value: 87 },
    { label: 'Total Users', value: 45 }
  ];

  latestOrders = [
    { name: 'John Doe', date: '2025-06-30', total: 150, status: 'Completed' },
    { name: 'Jane Smith', date: '2025-06-29', total: 99.99, status: 'Pending' },
    { name: 'Mike Brown', date: '2025-06-28', total: 200.5, status: 'Cancelled' }
  ];

  chartRanges = ['Today', 'Last Week', 'Last Month'];
  selectedRange = 'Last Month';

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

  constructor() {}

  ngOnInit(): void {
    AOS.init({ duration: 800, once: true });
    this.updateCharts();
  }

  updateCharts() {
    const shortLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    switch (this.selectedRange) {
      case 'Today':
        this.setChartData(['Now'], [5], [2], [200]);
        break;
      case 'Last Week':
        this.setChartData(
          shortLabels,
          [3, 5, 2, 6, 4, 1, 0],
          [1, 3, 2, 4, 3, 2, 1],
          [180, 220, 150, 300, 250, 170, 100]
        );
        break;
      case 'Last Month':
      default:
        this.setChartData(
          monthlyLabels.slice(0, 4),
          [12, 18, 14, 20],
          [5, 9, 8, 11],
          [300, 350, 280, 390]
        );
        break;
    }
  }

  private setChartData(labels: string[], orderData: number[], users: number[], sales: number[]) {
    this.barChartData = {
      labels,
      datasets: [
        {
          label: 'Orders',
          data: orderData,
          backgroundColor: '#dc3545',
          borderRadius: 8
        }
      ]
    };

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

    this.pieChartData = {
      labels: ['Completed', 'Pending', 'Cancelled'],
      datasets: [
        {
          data: [60, 25, 15],
          backgroundColor: ['#198754', '#ffc107', '#dc3545']
        }
      ]
    };
  }
}
