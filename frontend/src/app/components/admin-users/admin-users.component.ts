import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  searchTerm: string = '';
  userToDelete: any = null;

  users = [
    { name: 'Ahmad Khaled', email: 'ahmad@example.com', registered: '2025-07-01', role: 'User' },
    { name: 'Sara Ahmad', email: 'sara@example.com', registered: '2025-06-25', role: 'Admin' },
    { name: 'Mohammad Nader', email: 'mohammad@example.com', registered: '2025-06-18', role: 'User' }
  ];

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
  }

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(u =>
      u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
    );
  }

  confirmDelete(user: any): void {
    this.userToDelete = user;
    const modal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    modal.show();
  }

  deleteUser(): void {
    this.users = this.users.filter(u => u !== this.userToDelete);
    bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'))?.hide();
  }

  toggleRole(user: any): void {
    user.role = user.role === 'Admin' ? 'User' : 'Admin';
  }
}
