import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { forkJoin } from 'rxjs';

interface Employee {
  id: number;
  name: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
  email?: string;
  phone?: string;
  avatar: string;
  position: string;
  department: string;
  employmentType: 'Full-Time' | 'Part-Time' | 'Regular' | 'Intern';
  attendanceStatus: 'Present' | 'Absent' | 'Late';
  dateOfBirth?: string;
  gender?: string;
  civilStatus?: string;
  address?: string;
  dateHired?: string;
  salary?: number;
  gsisNumber?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNumber?: string;
  tinNumber?: string;
  status?: string;
  workSchedule?: {
    start: string;
    end: string;
  };
  assignedLocation?: string;
  employmentHistory?: Array<{
    position: string;
    promotionDate?: string;
    startDate: string;
    endDate?: string;
  }>;
  salaryHistory?: {
    currentGrade: string;
    compensationHistory: string;
  };
}

type FilterOption = 'all' | 'department' | 'employmentType' | 'attendanceStatus';

@Component({
  selector: 'app-personnel-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeDetailsComponent
  ],
  templateUrl: './personnel-dashboard.component.html',
  styleUrls: ['./personnel-dashboard.component.scss']
})
export class PersonnelDashboardComponent implements OnInit {
  // Reference to Math for template usage
  Math = Math;

  // Toggle state for cards view
  showEmploymentTypeCards = false;

  // Statistics for both views
  statusStats = {
    totalEmployees: 0,
    inOffice: 0,
    regulars: 0,
    interns: 0
  };

  employmentTypeStats = {
    fullTime: 0,
    partTime: 0,
    regulars: 0,
    interns: 0
  };

  // All employees (unfiltered)
  allEmployees: Employee[] = [];

  // Displayed employees (filtered)
  employees: Employee[] = [];

  // Search and Filter
  searchTerm: string = '';
  currentFilter: FilterOption = 'all';
  showFilterDropdown: boolean = false;

  // Filter options
  departments: string[] = [];
  employmentTypes: string[] = ['Full-Time', 'Part-Time', 'Regular', 'Intern'];
  attendanceStatuses: string[] = ['Present', 'Absent', 'Late'];

  // Selected filter values
  selectedDepartment: string = '';
  selectedEmploymentType: string = '';
  selectedAttendanceStatus: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // Modal state
  showEmployeeDetails = false;
  selectedEmployee: Employee | null = null;

  constructor(private dummyDataService: DummyDataService) { }

  ngOnInit(): void {
    // Fetch data from DummyDataService
    this.loadData();
  }

  // Load data from service
  loadData(): void {
    // Use forkJoin to get all data at once
    forkJoin({
      personnel: this.dummyDataService.getPersonnel(),
      users: this.dummyDataService.getUsers(),
      departments: this.dummyDataService.getDepartments()
    }).subscribe(data => {
      console.log('Personnel data from service:', data.personnel);
      console.log('Users data from service:', data.users);
      console.log('Departments data from service:', data.departments);

      // Map the data to our Employee interface
      this.allEmployees = data.personnel.map((person, index) => {
        const user = data.users.find(u => u.user_id === person.user_id);
        const dept = data.departments.find(d => d.department_id === person.department_id);

        // Assign consistent employment types based on user_id
        let employmentType: 'Full-Time' | 'Part-Time' | 'Regular' | 'Intern';
        switch (person.user_id % 4) {
          case 0: employmentType = 'Full-Time'; break;
          case 1: employmentType = 'Part-Time'; break;
          case 2: employmentType = 'Regular'; break;
          case 3: employmentType = 'Intern'; break;
          default: employmentType = 'Full-Time';
        }

        // Assign consistent attendance statuses based on user_id
        let attendanceStatus: 'Present' | 'Absent' | 'Late';
        switch (person.user_id % 3) {
          case 0: attendanceStatus = 'Present'; break;
          case 1: attendanceStatus = 'Absent'; break;
          case 2: attendanceStatus = 'Late'; break;
          default: attendanceStatus = 'Present';
        }

        return {
          id: person.personnel_id,
          name: `${person.first_name} ${person.last_name}`,
          firstName: person.first_name,
          lastName: person.last_name,
          email: user?.email || '',
          avatar: 'assets/images/Quanby Logo-png.gif',
          position: person.designation,
          department: dept?.department_name || '',
          employmentType: employmentType,
          attendanceStatus: attendanceStatus,
          status: user?.status || '',
          phone: `09${Math.floor(100000000 + Math.random() * 900000000)}`,
          dateOfBirth: '1990-01-01',
          gender: index % 2 === 0 ? 'Male' : 'Female',
          civilStatus: index % 3 === 0 ? 'Married' : 'Single',
          address: `${index + 100} Main Street, ${dept?.department_name || 'City'} Area`,
          dateHired: `202${index}-01-15`,
          salary: 25000 + (index * 5000),
          gsisNumber: `GSIS-${1000000 + index}`,
          pagibigNumber: `PAGIBIG-${2000000 + index}`,
          philhealthNumber: `PHIC-${3000000 + index}`,
          sssNumber: `SSS-${4000000 + index}`,
          tinNumber: `TIN-${5000000 + index}`,
          workSchedule: {
            start: '9 AM',
            end: '5 PM'
          },
          assignedLocation: dept?.department_name || 'Head Office',
          employmentHistory: [
            {
              position: person.designation,
              startDate: `202${index}-01-15`,
              endDate: undefined
            }
          ],
          salaryHistory: {
            currentGrade: `Grade ${index + 1}`,
            compensationHistory: `₱${20000 + (index * 5000)} - ₱${25000 + (index * 5000)}`
          }
        };
      });

      // Update employees list
      this.employees = [...this.allEmployees];

      // Update stats
      this.updateStats();

      // Extract unique departments
      this.departments = [...new Set(this.allEmployees.map(emp => emp.department))];

      // Update total items for pagination
      this.totalItems = this.allEmployees.length;
    });
  }

  // Update statistics based on current employee data
  private updateStats(): void {
    this.statusStats.totalEmployees = this.allEmployees.length;
    this.statusStats.inOffice = this.allEmployees.filter(emp => emp.attendanceStatus === 'Present').length;
    this.statusStats.regulars = this.allEmployees.filter(emp => emp.employmentType === 'Regular').length;
    this.statusStats.interns = this.allEmployees.filter(emp => emp.employmentType === 'Intern').length;

    this.employmentTypeStats.fullTime = this.allEmployees.filter(emp => emp.employmentType === 'Full-Time').length;
    this.employmentTypeStats.partTime = this.allEmployees.filter(emp => emp.employmentType === 'Part-Time').length;
    this.employmentTypeStats.regulars = this.statusStats.regulars;
    this.employmentTypeStats.interns = this.statusStats.interns;
  }

  // New method to handle card clicks
  onEmploymentTypeCardClick(type: 'Full-Time' | 'Part-Time' | 'Regular' | 'Intern'): void {
    this.currentFilter = 'employmentType';
    this.selectedEmploymentType = type;
    this.showFilterDropdown = false;
    this.applyFilters();
  }

  // Search functionality
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.applyFilters();
  }

  // Toggle filter dropdown
  toggleFilterDropdown(): void {
    this.showFilterDropdown = !this.showFilterDropdown;
  }

  // Set filter type
  setFilterType(filterType: FilterOption): void {
    this.currentFilter = filterType;

    // Reset selected values when changing filter type
    this.selectedDepartment = '';
    this.selectedEmploymentType = '';
    this.selectedAttendanceStatus = '';

    this.applyFilters();
  }

  // Apply selected department filter
  applyDepartmentFilter(department: string): void {
    this.selectedDepartment = department;
    this.applyFilters();
    this.showFilterDropdown = false;
  }

  // Apply selected employment type filter
  applyEmploymentTypeFilter(type: string): void {
    this.selectedEmploymentType = type;
    this.applyFilters();
    this.showFilterDropdown = false;
  }

  // Apply selected attendance status filter
  applyAttendanceStatusFilter(status: string): void {
    this.selectedAttendanceStatus = status;
    this.applyFilters();
    this.showFilterDropdown = false;
  }

  // Reset filters
  resetFilters(): void {
    this.currentFilter = 'all';
    this.selectedDepartment = '';
    this.selectedEmploymentType = '';
    this.selectedAttendanceStatus = '';
    this.showFilterDropdown = false;
    this.employees = [...this.allEmployees];
  }

  // Apply all active filters
  applyFilters(): void {
    let filteredEmployees = [...this.allEmployees];

    // Apply search filter if search term exists
    if (this.searchTerm) {
      filteredEmployees = filteredEmployees.filter(emp =>
        emp.name.toLowerCase().includes(this.searchTerm) ||
        emp.position.toLowerCase().includes(this.searchTerm) ||
        emp.department.toLowerCase().includes(this.searchTerm)
      );
    }

    // Apply other filters based on selected filter type
    if (this.currentFilter === 'department' && this.selectedDepartment) {
      filteredEmployees = filteredEmployees.filter(emp => emp.department === this.selectedDepartment);
    } else if (this.currentFilter === 'employmentType' && this.selectedEmploymentType) {
      filteredEmployees = filteredEmployees.filter(emp => emp.employmentType === this.selectedEmploymentType);
    } else if (this.currentFilter === 'attendanceStatus' && this.selectedAttendanceStatus) {
      filteredEmployees = filteredEmployees.filter(emp => emp.attendanceStatus === this.selectedAttendanceStatus);
    }

    this.employees = filteredEmployees;
  }

  // Get active filter label for display
  getActiveFilterLabel(): string {
    if (this.currentFilter === 'department' && this.selectedDepartment) {
      return `Department: ${this.selectedDepartment}`;
    } else if (this.currentFilter === 'employmentType' && this.selectedEmploymentType) {
      return `Type: ${this.selectedEmploymentType}`;
    } else if (this.currentFilter === 'attendanceStatus' && this.selectedAttendanceStatus) {
      return `Status: ${this.selectedAttendanceStatus}`;
    } else {
      return 'Filter';
    }
  }

  // Get color class based on status
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  // Get color class based on employment type
  getEmploymentTypeColorClass(type: string): string {
    switch (type) {
      case 'Full-Time':
        return 'bg-indigo-100 text-indigo-800';
      case 'Part-Time':
        return 'bg-indigo-100 text-indigo-800';
      case 'Regular':
        return 'bg-indigo-100 text-indigo-800';
      case 'Intern':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  openEmployeeDetails(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.showEmployeeDetails = true;
  }

  closeEmployeeDetails() {
    this.showEmployeeDetails = false;
    this.selectedEmployee = null;
  }
}
