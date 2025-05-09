import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

interface Organization {
  id: number;
  name: string;
  overallPerformance: number;
  metrics: {
    growth: number;
    efficiency: number;
    innovation: number;
  };
}

interface Department {
  id: number;
  name: string;
  score: number;
  icon: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  performance: number;
  avatar: string;
}

@Component({
  selector: 'app-kpi-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './kpi-dashboard.component.html',
  styleUrl: './kpi-dashboard.component.scss'
})
export class KpiDashboardComponent implements OnInit {
  // Filter states
  selectedOrganization: string = 'All Organizations';
  selectedDepartment: string = 'All Departments';
  selectedTimePeriod: string = 'Last 30 Days';
  searchQuery: string = '';

  // Data streams
  private organizationsSubject = new BehaviorSubject<Organization[]>([]);
  private departmentsSubject = new BehaviorSubject<Department[]>([]);
  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  // Observable data
  organizations$ = this.organizationsSubject.asObservable();
  departments$ = this.departmentsSubject.asObservable();
  employees$ = this.employeesSubject.asObservable();

  // Mock data
  private mockOrganizations: Organization[] = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      overallPerformance: 92,
      metrics: {
        growth: 88,
        efficiency: 95,
        innovation: 85
      }
    }
  ];

  private mockDepartments: Department[] = [
    { id: 1, name: 'Sales', score: 95, icon: 'dollar-sign' },
    { id: 2, name: 'Marketing', score: 87, icon: 'bullhorn' },
    { id: 3, name: 'Engineering', score: 91, icon: 'code' },
    { id: 4, name: 'HR', score: 89, icon: 'users' },
    { id: 5, name: 'Finance', score: 93, icon: 'chart-pie' },
    { id: 6, name: 'Operations', score: 78, icon: 'cogs' }
  ];

  private mockEmployees: Employee[] = [
    {
      id: 1,
      name: 'John Smith',
      position: 'Sales Executive',
      department: 'Sales',
      performance: 98,
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Senior Developer',
      department: 'Engineering',
      performance: 96,
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Product Manager',
      department: 'Marketing',
      performance: 95,
      avatar: 'https://via.placeholder.com/50'
    }
  ];

  constructor() {}

  ngOnInit() {
    // Initialize with mock data
    this.organizationsSubject.next(this.mockOrganizations);
    this.departmentsSubject.next(this.mockDepartments);
    this.employeesSubject.next(this.mockEmployees);
  }

  // Filter handlers
  onOrganizationChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.selectedOrganization = select.value;
      this.applyFilters();
    }
  }

  onDepartmentChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.selectedDepartment = select.value;
      this.applyFilters();
    }
  }

  onTimePeriodChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.selectedTimePeriod = select.value;
      this.applyFilters();
    }
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      this.searchQuery = input.value;
      this.applyFilters();
    }
  }

  private applyFilters() {
    // Filter employees based on search and department
    let filteredEmployees = [...this.mockEmployees];
    
    if (this.searchQuery) {
      filteredEmployees = filteredEmployees.filter(emp => 
        emp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedDepartment !== 'All Departments') {
      filteredEmployees = filteredEmployees.filter(emp => 
        emp.department === this.selectedDepartment
      );
    }

    this.employeesSubject.next(filteredEmployees);
  }

  // Helper methods for UI
  getPerformanceClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'poor';
  }
}
