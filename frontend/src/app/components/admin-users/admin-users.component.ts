import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { AdminUserService } from '../../services/admin/users/admin-user.service';
import { NotificationService } from '../../services/notification/notification.service';

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
  users: any[] = [];
  userToDelete: any = null;
  userToToggle: any = null;

  constructor(
    private userService: AdminUserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    AOS.init({ duration: 600, once: true });
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSearchChange() {
    const trimmedTerm = this.searchTerm.trim();
    if (!trimmedTerm) {
      this.loadUsers(); // reset
      return;
    }

    this.userService.filterUsers(trimmedTerm).subscribe(data => {
      this.users = data;
    });
  }

  confirmDelete(user: any): void {
    this.userToDelete = user;
    const modal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    modal.show();
  }

  deleteUser(): void {
    if (!this.userToDelete?.id) return;
    this.userService.deleteUser(this.userToDelete.id).subscribe(() => {
      this.notificationService.show(`User "${this.userToDelete.name}" deleted successfully.`);
      this.loadUsers();
      bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'))?.hide();
    });
  }

  toggleRole(user: any): void {
    this.userToToggle = user;
    const modal = new bootstrap.Modal(document.getElementById('confirmToggleRoleModal'));
    modal.show();
  }

  confirmToggleRole(): void {
    if (!this.userToToggle?.id) return;

    this.userService.toggleRole(this.userToToggle.id).subscribe((res: any) => {
      this.userToToggle.role = res.new_role === 'Admin' ? 'Admin' : 'User';
      this.notificationService.show(`User "${this.userToToggle.name}" is now ${res.new_role}.`);
      bootstrap.Modal.getInstance(document.getElementById('confirmToggleRoleModal'))?.hide();
      this.userToToggle = null;
    });
  }
}

