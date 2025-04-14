import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PerformanceMetric {
  name: string;
  current: number;
  previous: number;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface DepartmentPerformance {
  department: string;
  overallScore: number;
  employees: number;
  trend: 'up' | 'down' | 'stable';
}

interface EmployeePerformance {
  name: string;
  department: string;
  position: string;
  score: number;
  status: 'excellent' | 'good' | 'average' | 'needs_improvement';
  lastReview: string;
}

@Component({
  selector: 'app-performance-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './performance-reports.component.html',
  styleUrl: './performance-reports.component.scss'
})
export class PerformanceReportsComponent implements OnInit {
  filterForm: FormGroup;
  selectedTimeframe: string = 'quarterly';
  selectedDepartment: string = 'all';

  // Mock data for demonstration
  performanceMetrics: PerformanceMetric[] = [
    {
      name: 'Overall Performance',
      current: 4.2,
      previous: 4.0,
      trend: 'up',
      percentage: 5
    },
    {
      name: 'Goal Achievement',
      current: 85,
      previous: 82,
      trend: 'up',
      percentage: 3.7
    },
    {
      name: 'Employee Engagement',
      current: 3.8,
      previous: 3.9,
      trend: 'down',
      percentage: -2.6
    }
  ];

  departmentPerformance: DepartmentPerformance[] = [
    {
      department: 'Engineering',
      overallScore: 4.5,
      employees: 45,
      trend: 'up'
    },
    {
      department: 'Marketing',
      overallScore: 4.2,
      employees: 32,
      trend: 'stable'
    },
    {
      department: 'Sales',
      overallScore: 4.0,
      employees: 28,
      trend: 'up'
    }
  ];

  topPerformers: EmployeePerformance[] = [
    {
      name: 'John Smith',
      department: 'Engineering',
      position: 'Senior Developer',
      score: 4.8,
      status: 'excellent',
      lastReview: '2024-03-15'
    },
    {
      name: 'Sarah Johnson',
      department: 'Marketing',
      position: 'Marketing Manager',
      score: 4.7,
      status: 'excellent',
      lastReview: '2024-03-10'
    },
    {
      name: 'Michael Brown',
      department: 'Sales',
      position: 'Sales Lead',
      score: 4.6,
      status: 'excellent',
      lastReview: '2024-03-05'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      timeframe: ['quarterly'],
      department: ['all'],
      dateRange: [null]
    });
  }

  ngOnInit(): void {
    // Initialize any necessary data fetching or setup
  }

  onTimeframeChange(timeframe: string): void {
    this.selectedTimeframe = timeframe;
    // Here you would typically fetch new data based on the selected timeframe
  }

  onDepartmentChange(department: string): void {
    this.selectedDepartment = department;
    // Here you would typically filter data based on the selected department
  }

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
  }

  printReport(): void {
    // Implement print functionality
    window.print();
  }
}
