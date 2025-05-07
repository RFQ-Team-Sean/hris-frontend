import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { forkJoin } from 'rxjs';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  personnel?: {
    first_name: string;
    last_name: string;
    department: string;
    designation: string;
  };
}

type FilterOption = 'all' | 'role' | 'status';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  // Expose Math to template
  protected readonly Math = Math;

  // Statistics
  statusStats = {
    totalUsers: 0,
    activeUsers: 0,
    admins: 0,
    hrUsers: 0
  };

  roleStats = {
    admin: 0,
    hr: 0,
    employee: 0,
    payrollManager: 0,
    recruiter: 0,
    manager: 0
  };

  // All users (unfiltered)
  allUsers: User[] = [];

  // Displayed users (filtered)
  users: User[] = [];

  // Search and Filter
  searchTerm: string = '';
  currentFilter: FilterOption = 'all';
  showFilterDropdown: boolean = false;

  // Filter options
  roles: string[] = ['Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'];
  statuses: string[] = ['Active', 'Inactive'];

  // Selected filter values
  selectedRole: string = '';
  selectedStatus: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // Modal state
  showEditModal = false;
  showDeleteModal = false;
  selectedUser: User | null = null;

  constructor(private dummyDataService: DummyDataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      users: this.dummyDataService.getUsers(),
      personnel: this.dummyDataService.getPersonnel(),
      departments: this.dummyDataService.getDepartments()
    }).subscribe(data => {
      // Map the data to our User interface
      this.allUsers = data.users.map(user => {
        const personnel = data.personnel.find(p => p.user_id === user.id);
        const department = personnel ? data.departments.find(d => d.id === personnel.department_id) : null;

        return {
          ...user,
          personnel: personnel ? {
            first_name: personnel.first_name,
            last_name: personnel.last_name,
            department: department?.department_name || '',
            designation: personnel.designation || ''
          } : undefined
        };
      });

      // Update users list
      this.users = [...this.allUsers];

      // Update stats
      this.updateStats();

      // Update total items for pagination
      this.totalItems = this.allUsers.length;
    });
  }

  private updateStats(): void {
    this.statusStats.totalUsers = this.allUsers.length;
    this.statusStats.activeUsers = this.allUsers.filter(user => user.status === 'Active').length;
    this.statusStats.admins = this.allUsers.filter(user => user.role === 'Admin').length;
    this.statusStats.hrUsers = this.allUsers.filter(user => user.role === 'HR').length;

    this.roleStats.admin = this.allUsers.filter(user => user.role === 'Admin').length;
    this.roleStats.hr = this.allUsers.filter(user => user.role === 'HR').length;
    this.roleStats.employee = this.allUsers.filter(user => user.role === 'Employee').length;
    this.roleStats.payrollManager = this.allUsers.filter(user => user.role === 'Payroll_Manager').length;
    this.roleStats.recruiter = this.allUsers.filter(user => user.role === 'Recruiter').length;
    this.roleStats.manager = this.allUsers.filter(user => user.role === 'Manager').length;
  }

  // Edit user
  onEditUser(user: User): void {
    this.selectedUser = { ...user };
    this.showEditModal = true;
  }

  // Delete user
  onDeleteUser(user: User): void {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  // Save edited user
  onSaveUser(updatedUser: User): void {
    // In a real application, this would make an API call
    const index = this.allUsers.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      this.allUsers[index] = updatedUser;
      this.users = [...this.allUsers];
      this.updateStats();
    }
    this.showEditModal = false;
    this.selectedUser = null;
  }

  // Confirm delete
  onConfirmDelete(): void {
    if (this.selectedUser) {
      // In a real application, this would make an API call
      this.allUsers = this.allUsers.filter(u => u.id !== this.selectedUser?.id);
      this.users = [...this.allUsers];
      this.updateStats();
    }
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  // Cancel edit/delete
  onCancel(): void {
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.selectedUser = null;
  }

  onRoleCardClick(role: string): void {
    this.currentFilter = 'role';
    this.selectedRole = role;
    this.showFilterDropdown = false;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  setFilterType(filterType: FilterOption): void {
    this.currentFilter = filterType;
    this.selectedRole = '';
    this.selectedStatus = '';
    this.applyFilters();
  }

  applyRoleFilter(role: string): void {
    this.selectedRole = role;
    this.applyFilters();
  }

  applyStatusFilter(status: string): void {
    this.selectedStatus = status;
    this.applyFilters();
  }

  resetFilters(): void {
    this.currentFilter = 'all';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.searchTerm = '';
    this.users = [...this.allUsers];
  }

  applyFilters(): void {
    let filteredUsers = [...this.allUsers];

    // Apply search filter
    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.username.toLowerCase().includes(this.searchTerm) ||
        user.email.toLowerCase().includes(this.searchTerm) ||
        user.role.toLowerCase().includes(this.searchTerm) ||
        (user.personnel && (
          user.personnel.first_name.toLowerCase().includes(this.searchTerm) ||
          user.personnel.last_name.toLowerCase().includes(this.searchTerm) ||
          user.personnel.department.toLowerCase().includes(this.searchTerm)
        ))
      );
    }

    // Apply role filter
    if (this.selectedRole) {
      filteredUsers = filteredUsers.filter(user => user.role === this.selectedRole);
    }

    // Apply status filter
    if (this.selectedStatus) {
      filteredUsers = filteredUsers.filter(user => user.status === this.selectedStatus);
    }

    this.users = filteredUsers;
    this.totalItems = filteredUsers.length;
    this.currentPage = 1;
  }

  getActiveFilterLabel(): string {
    switch (this.currentFilter) {
      case 'role':
        return this.selectedRole || 'Filter by Role';
      case 'status':
        return this.selectedStatus || 'Filter by Status';
      default:
        return 'All Filters';
    }
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getRoleColorClass(role: string): string {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'HR':
        return 'bg-blue-100 text-blue-800';
      case 'Employee':
        return 'bg-green-100 text-green-800';
      case 'Payroll_Manager':
        return 'bg-yellow-100 text-yellow-800';
      case 'Recruiter':
        return 'bg-pink-100 text-pink-800';
      case 'Manager':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
