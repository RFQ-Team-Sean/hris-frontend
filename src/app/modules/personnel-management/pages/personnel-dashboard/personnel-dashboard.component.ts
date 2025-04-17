import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from '../../components/employee-details/employee-details.component';
import { AddEmployeeComponent } from '../../components/add-employee/add-employee.component';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { forkJoin } from 'rxjs';

interface Employee {
  id: number;
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix?: string;
  date_of_birth?: string;
  gender: string;
  civil_status: string;
  email: string;
  phone: string;
  address: string;
  position: string;
  department: string;
  employment_type?: string;
  date_hired?: string;
  salary?: number;
  status: string;
  gsis_number?: string;
  pagibig_number?: string;
  philhealth_number?: string;
  sss_number?: string;
  tin_number?: string;
  avatar?: string;
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
    EmployeeDetailsComponent,
    AddEmployeeComponent
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
  selectedFilter: string = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  // Modal state
  showEmployeeDetails = false;
  selectedEmployee: Employee | null = null;

  // Add Employee Modal
  showAddModal = false;

  roles = ['Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'];
  designations = ['System Administrator', 'HR Manager', 'Software Engineer', 'Payroll Head', 'Recruitment Specialist', 'Project Manager'];

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

        return {
          id: person.personnel_id,
          name: `${person.first_name} ${person.last_name}`,
          first_name: person.first_name,
          middle_name: person.middle_name || '',
          last_name: person.last_name,
          gender: person.gender,
          civil_status: person.civil_status,
          email: user?.email || '',
          phone: person.contact_number || '',
          address: person.address || '',
          position: person.designation,
          department: dept?.department_name || '',
          status: user?.status || 'Active',
          employment_type: user?.employment_type || 'Full-time',
          date_hired: person.date_hired || '',
          salary: person.salary || 0,
          gsis_number: person.gsis_number || '',
          pagibig_number: person.pagibig_number || '',
          philhealth_number: person.philhealth_number || '',
          sss_number: person.sss_number || '',
          tin_number: person.tin_number || '',
          avatar: 'assets/images/Quanby Logo-png.gif'
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
    // Count total employees
    this.statusStats.totalEmployees = this.allEmployees.length;

    // Count employees in office (assuming status 'Active' means in office)
    this.statusStats.inOffice = this.allEmployees.filter(emp => emp.status === 'Active').length;

    // Count regular employees
    this.statusStats.regulars = this.allEmployees.filter(emp => emp.employment_type === 'Regular').length;

    // Count interns
    this.statusStats.interns = this.allEmployees.filter(emp => emp.employment_type === 'Intern').length;

    // Count employment types
    this.employmentTypeStats = {
      fullTime: this.allEmployees.filter(emp => emp.employment_type === 'Full_time').length,
      partTime: this.allEmployees.filter(emp => emp.employment_type === 'Part_time').length,
      regulars: this.allEmployees.filter(emp => emp.employment_type === 'Regular').length,
      interns: this.allEmployees.filter(emp => emp.employment_type === 'Intern').length
    };
  }

  // Handle total employees click
  onTotalEmployeesClick(): void {
    this.selectedFilter = 'total';
    this.selectedEmploymentType = '';
    this.selectedDepartment = '';
    this.selectedAttendanceStatus = '';
    this.filterEmployees();
  }

  // Handle in office click
  onInOfficeClick(): void {
    this.selectedFilter = 'inOffice';
    this.selectedEmploymentType = '';
    this.selectedDepartment = '';
    this.selectedAttendanceStatus = '';
    this.filterEmployees();
  }

  // Handle employment type click
  onEmploymentTypeClick(type: string): void {
    this.selectedFilter = type;
    this.selectedEmploymentType = type;
    this.selectedDepartment = '';
    this.selectedAttendanceStatus = '';
    this.filterEmployees();
  }

  // Filter employees based on search term and selected filters
  private filterEmployees(): void {
    let filtered = [...this.allEmployees];

    // Apply search filter
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(emp => 
        emp.name.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower)
      );
    }

    // Apply employment type filter
    if (this.selectedEmploymentType) {
      filtered = filtered.filter(emp => emp.employment_type === this.selectedEmploymentType);
    }

    // Apply department filter
    if (this.selectedDepartment) {
      filtered = filtered.filter(emp => emp.department === this.selectedDepartment);
    }

    // Apply status filter
    if (this.selectedAttendanceStatus) {
      filtered = filtered.filter(emp => emp.status === this.selectedAttendanceStatus);
    }

    // Apply selected filter
    if (this.selectedFilter === 'inOffice') {
      filtered = filtered.filter(emp => emp.status === 'Present');
    } else if (this.selectedFilter === 'total') {
      // Show all employees
      filtered = [...this.allEmployees];
    }

    this.employees = filtered;
    this.updateStats();
  }

  // Handle search input
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filterEmployees();
  }

  // Handle employment type filter
  onEmploymentTypeCardClick(type: string): void {
    this.selectedEmploymentType = type;
    this.filterEmployees();
  }

  // Handle department filter
  applyDepartmentFilter(department: string): void {
    this.selectedDepartment = department;
    this.filterEmployees();
  }

  applyEmploymentTypeFilter(type: string): void {
    this.selectedEmploymentType = type;
    this.filterEmployees();
  }

  // Handle attendance status filter
  applyAttendanceStatusFilter(status: string): void {
    this.selectedAttendanceStatus = status;
    this.filterEmployees();
  }

  // Reset all filters
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedEmploymentType = '';
    this.selectedDepartment = '';
    this.selectedAttendanceStatus = '';
    this.selectedFilter = '';
    this.filterEmployees();
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

    this.filterEmployees();
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

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  handleAddEmployeeSubmit(newEmployee: any) {
    // Create new employee data
    const newEmployeeData = {
      id: this.allEmployees.length + 1,
      name: `${newEmployee.first_name} ${newEmployee.last_name}`,
      first_name: newEmployee.first_name,
      middle_name: newEmployee.middle_name || '',
      last_name: newEmployee.last_name,
      gender: newEmployee.gender,
      civil_status: newEmployee.civil_status,
      email: newEmployee.email,
      phone: newEmployee.phone || '',
      address: newEmployee.address || '',
      position: newEmployee.designation,
      department: newEmployee.department,
      status: 'Active',
      employment_type: newEmployee.employment_type,
      date_hired: newEmployee.date_hired || '',
      salary: newEmployee.salary || 0,
      avatar: 'assets/images/Quanby Logo-png.gif'
    };

    // Add to the employees list
    this.allEmployees.push(newEmployeeData);

    // Update the filtered employees list
    this.employees = [...this.allEmployees];

    // Update statistics
    this.updateStats();

    // Close modal
    this.toggleAddModal();
    alert('Employee added successfully!');
  }
}
