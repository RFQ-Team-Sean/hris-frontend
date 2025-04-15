import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {

  // Users Table (Dummy Accounts for Testing Logins)
  private users = [
    { user_id: 1, username: 'admin', email: 'admin@example.com', password_hash: 'password', role: 'Admin', employment_type: 'Full_time', status: 'Active' },
    { user_id: 2, username: 'hr_manager', email: 'hr@example.com', password_hash: 'password', role: 'HR', employment_type: 'Part_time', status: 'Active' },
    { user_id: 3, username: 'employee_john', email: 'john@example.com', password_hash: 'password', role: 'Employee', employment_type: 'Contract', status: 'Active' },
    { user_id: 4, username: 'payroll_mgr', email: 'payroll@example.com', password_hash: 'password', role: 'Payroll_Manager', employment_type: 'Full_time', status: 'Active' },
    { user_id: 5, username: 'recruiter_anna', email: 'anna@example.com', password_hash: 'password', role: 'Recruiter', employment_type: 'Temporary', status: 'Active' },
    { user_id: 6, username: 'manager_mike', email: 'mike@example.com', password_hash: 'password', role: 'Manager', employment_type: 'Full_time', status: 'Active' }
  ];

  // Personnel Table
  private personnel = [
    { 
      personnel_id: 1, 
      user_id: 1, 
      first_name: 'Admin', 
      middle_name: '', 
      last_name: 'User', 
      gender: 'Other', 
      contact_number: '09123456789', 
      address: '123 Main St, Anytown, USA',
      civil_status: 'Divorced', 
      department_id: 1, 
      designation: 'System Administrator',
      gsis_number: '123456789012',
      pagibig_number: '123456789012',
      philhealth_number: '123456789012',
      sss_number: '123456789012',
      tin_number: '123456789012'
    },
    { 
      personnel_id: 2, 
      user_id: 2, 
      first_name: 'HR', 
      middle_name: 'Hm', 
      last_name: 'Manager', 
      gender: 'Male', 
      contact_number: '09234567890', 
      address: '234 Main St, Anytown, USA',
      civil_status: 'Single', 
      department_id: 2, 
      designation: 'HR Manager',
      gsis_number: '234567890123',
      pagibig_number: '234567890123',
      philhealth_number: '234567890123',
      sss_number: '234567890123',
      tin_number: '234567890123'
    },
    { 
      personnel_id: 3, 
      user_id: 3, 
      first_name: 'John', 
      middle_name: 'Deep', 
      last_name: 'Doe', 
      gender: 'Male', 
      contact_number: '09345678901', 
      address: '345 Main St, Anytown, USA',
      civil_status: 'Married', 
      department_id: 3, 
      designation: 'Software Engineer',
      gsis_number: '345678901234',
      pagibig_number: '345678901234',
      philhealth_number: '345678901234',
      sss_number: '345678901234',
      tin_number: '345678901234'
    },
    { 
      personnel_id: 4, 
      user_id: 4, 
      first_name: 'Payroll', 
      middle_name: 'Pam', 
      last_name: 'Manager', 
      gender: 'Female', 
      contact_number: '09456789012', 
      address: '456 Main St, Anytown, USA',
      civil_status: 'Widowed', 
      department_id: 4, 
      designation: 'Payroll Head',
      gsis_number: '456789012345',
      pagibig_number: '456789012345',
      philhealth_number: '456789012345',
      sss_number: '456789012345',
      tin_number: '456789012345'
    },
    { 
      personnel_id: 5, 
      user_id: 5, 
      first_name: 'Anna', 
      middle_name: '', 
      last_name: 'Recruiter', 
      gender: 'Female', 
      contact_number: '09678901234', 
      address: '567 Main St, Anytown, USA',
      civil_status: 'Single', 
      department_id: 5, 
      designation: 'Recruitment Specialist',
      gsis_number: '567890123456',
      pagibig_number: '567890123456',
      philhealth_number: '567890123456',
      sss_number: '567890123456',
      tin_number: '567890123456'
    },
    { 
      personnel_id: 6, 
      user_id: 6, 
      first_name: 'Mike', 
      middle_name: 'Green', 
      last_name: 'Manager', 
      gender: 'Male', 
      contact_number: '09789012345', 
      address: '678 Main St, Anytown, USA',
      civil_status: 'Married', 
      department_id: 6, 
      designation: 'Project Manager',
      gsis_number: '678901234567',
      pagibig_number: '678901234567',
      philhealth_number: '678901234567',
      sss_number: '678901234567',
      tin_number: '678901234567'
    }
  ];

  // Departments Table
  private departments = [
    { department_id: 1, department_name: 'Admin', department_head: 1 },
    { department_id: 2, department_name: 'HR', department_head: 2 },
    { department_id: 3, department_name: 'IT', department_head: 3 },
    { department_id: 4, department_name: 'Payroll', department_head: 4 },
    { department_id: 5, department_name: 'Recruitment', department_head: 5 },
    { department_id: 6, department_name: 'Operations', department_head: 6 }
  ];

  // Simulated Authentication Method (Using Email Instead of Username)
  login(email: string, password: string): Observable<any> {
    const user = this.users.find(u => u.email === email && u.password_hash === password);
    return user ? of({ success: true, user }) : of({ success: false, message: 'Invalid email or password' });
  }

  // Simulated API Calls
  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  getPersonnel(): Observable<any[]> {
    return of(this.personnel);
  }

  getDepartments(): Observable<any[]> {
    return of(this.departments);
  }

  // Add new employee with government IDs
  addEmployee(employeeData: any): Observable<any> {
    const newPersonnelId = this.personnel.length + 1;
    const newUserId = this.users.length + 1;

    // Create new user
    const newUser = {
      user_id: newUserId,
      username: employeeData.username,
      email: employeeData.email,
      password_hash: employeeData.password_hash,
      role: employeeData.role,
      employment_type: employeeData.employment_type,
      status: 'Active'
    };

    // Create new personnel
    const newPersonnel = {
      personnel_id: newPersonnelId,
      user_id: newUserId,
      first_name: employeeData.first_name,
      middle_name: employeeData.middle_name,
      last_name: employeeData.last_name,
      gender: employeeData.gender,
      contact_number: employeeData.phone,
      civil_status: employeeData.civil_status,
      department_id: this.departments.findIndex(d => d.department_name === employeeData.department) + 1,
      designation: employeeData.designation,
      gsis_number: employeeData.gsis_number,
      pagibig_number: employeeData.pagibig_number,
      philhealth_number: employeeData.philhealth_number,
      sss_number: employeeData.sss_number,
      tin_number: employeeData.tin_number,
      address: employeeData.address
    };

    // Add to arrays
    this.users.push(newUser);
    this.personnel.push(newPersonnel);

    return of({ success: true, user: newUser, personnel: newPersonnel });
  }
}
