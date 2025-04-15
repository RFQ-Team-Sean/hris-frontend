import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

enum CivilStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed'
}

interface NewEmployeeForm {
  username: string;
  email: string;
  password_hash: string;
  role: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  date_of_birth: string;
  gender: string;
  civil_status: string;
  phone: string;
  address: string;
  designation: string;
  department: string;
  employment_type: string;
  date_hired: string;
  salary: number;
}

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() submitEmployee = new EventEmitter<NewEmployeeForm>();

  Gender = Gender; // Make enum available in template
  CivilStatus = CivilStatus; // Make enum available in template
  genders = Object.values(Gender); // Array of enum values
  civilStatuses = Object.values(CivilStatus); // Array of enum values

  newEmployee: NewEmployeeForm = {
    username: '',
    email: '',
    password_hash: '',
    role: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    date_of_birth: '',
    gender: '',
    civil_status: '',
    phone: '',
    address: '',
    designation: '',
    department: '',
    employment_type: '',
    date_hired: '',
    salary: 0
  };

  // Dropdown options
  roles: string[] = ['Admin', 'HR', 'Employee', 'Payroll_Manager', 'Recruiter', 'Manager'];
  designations: string[] = [
    'System Administrator',
    'HR Manager',
    'Software Engineer',
    'Payroll Head',
    'Recruitment Specialist',
    'Project Manager'
  ];
  departments: string[] = ['Admin', 'HR', 'IT', 'Payroll', 'Recruitment', 'Operations'];

  onClose() {
    this.closeModal.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.validateForm()) {
      this.submitEmployee.emit(this.newEmployee);
      this.resetForm();
    } else {
      alert('Please fill in all required fields');
    }
  }

  validateForm(): boolean {
    return !!(
      this.newEmployee.username &&
      this.newEmployee.email &&
      this.newEmployee.password_hash &&
      this.newEmployee.role &&
      this.newEmployee.first_name &&
      this.newEmployee.last_name &&
      this.newEmployee.designation &&
      this.newEmployee.department &&
      this.newEmployee.employment_type &&
      this.newEmployee.date_hired &&
      this.newEmployee.salary &&
      this.newEmployee.gender &&
      this.newEmployee.civil_status &&
      this.newEmployee.date_of_birth &&
      this.newEmployee.phone &&
      this.newEmployee.address
    );
  }

  private resetForm() {
    this.newEmployee = {
      username: '',
      email: '',
      password_hash: '',
      role: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      suffix: '',
      date_of_birth: '',
      gender: Gender.Male,
      civil_status: CivilStatus.Single,
      phone: '',
      address: '',
      designation: '',
      department: '',
      employment_type: '',
      date_hired: '',
      salary: 0
    };
  }
} 