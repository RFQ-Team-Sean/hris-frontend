import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

// Enums based on your Prisma schema
enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  HR = 'HR',
  MANAGER = 'MANAGER',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended'
}

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other'
}

enum CivilStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed'
}

enum EmploymentType {
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
  CONTRACTUAL = 'Contractual',
  PROBATIONARY = 'Probationary'
}

// Interfaces based on your Prisma models
interface User {
  id: string;
  email: string;
  role: Role;
  status: Status;
}

interface Department {
  id: string;
  department_name: string;
}

interface Personnel {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string; 
  contact_number?: string;
  designation?: string;
  employment_type: EmploymentType;
  user: User;
  department?: Department;
}

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  profileImage: string | null = null;
  employee: Personnel | null = null;
  resumeDocuments: Document[] = [];

  ngOnInit(): void {
    // In a real app, you would fetch this data from a service
    this.mockFetchData();
  }

  private mockFetchData(): void {
    // Mock data - replace with actual API calls in a real application
    this.employee = {
      id: '12345',
      first_name: 'Ysa Bianca',
      last_name: 'De La Rama',
      middle_name: 'Avendario',
      contact_number: '09991298532',
      designation: 'UI/UX Designer',
      employment_type: EmploymentType.PART_TIME,
      user: {
        id: 'user-123',
        email: 'ysabianca_delaramad@gmail.com',
        role: Role.USER,
        status: Status.ACTIVE
      },
      department: {
        id: 'dept-1',
        department_name: 'IT'
      }
    };

    this.resumeDocuments = [
      { id: 'doc-1', name: 'asjkdgkjshakalsfas.pdf', type: 'resume', url: '', uploadDate: '2023-10-01' },
      { id: 'doc-2', name: 'asdfskndbaskd.pdf', type: 'resume', url: '', uploadDate: '2023-10-02' },
    ];
  }

  // Add methods for handling file uploads, downloads, etc.
}