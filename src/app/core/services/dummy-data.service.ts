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
    { personnel_id: 1, user_id: 1, first_name: 'Admin', middle_name: '', last_name: 'User', gender: 'Other', contact: '09123456789', civil_status: 'Divorced', department_id: 1, designation: 'System Administrator' },
    { personnel_id: 2, user_id: 2, first_name: 'HR', middle_name: 'Hm', last_name: 'Manager', gender: 'Male', contact: '09234567890', civil_status: 'Single', department_id: 2, designation: 'HR Manager' },
    { personnel_id: 3, user_id: 3, first_name: 'John', middle_name: 'Deep', last_name: 'Doe', gender: 'Male', contact: '09345678901', civil_status: 'Married', department_id: 3, designation: 'Software Engineer' },
    { personnel_id: 4, user_id: 4, first_name: 'Payroll', middle_name: 'Pam', last_name: 'Manager', gender: 'Female', contact: '09456789012', civil_status: 'Widowed', department_id: 4, designation: 'Payroll Head' },
    { personnel_id: 5, user_id: 5, first_name: 'Anna', middle_name: '', last_name: 'Recruiter', gender: 'Female', contact: '09678901234', civil_status: 'Single', department_id: 5, designation: 'Recruitment Specialist' },
    { personnel_id: 6, user_id: 6, first_name: 'Mike', middle_name: 'Green', last_name: 'Manager', gender: 'Male', contact: '09789012345', civil_status: 'Married', department_id: 6, designation: 'Project Manager' }
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
}
