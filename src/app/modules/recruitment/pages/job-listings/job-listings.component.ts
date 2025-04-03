// src\app\modules\recruitment\pages\job-listings\job-listings.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.scss']
})
export class JobListingsComponent {
  // Sample data - in a real app, this would come from an API
  jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      reference: 'DEV-1024',
      department: 'Engineering',
      type: 'Full-time',
      applications: 24,
      status: 'Active',
      postedDate: 'May 15, 2023'
    },
    {
      id: 2,
      title: 'Product Designer',
      reference: 'DES-2048',
      department: 'Product',
      type: 'Contract',
      applications: 18,
      status: 'Active',
      postedDate: 'Jun 1, 2023'
    },
    {
      id: 3,
      title: 'Cybersecurity Specialist',
      reference: 'SEC-4096',
      department: 'IT Security',
      type: 'Full-time',
      applications: 32,
      status: 'Draft',
      postedDate: 'Jun 15, 2023'
    }
  ];

  // In a real app, you would have methods to:
  // - Fetch job listings from API
  // - Handle filter changes
  // - Edit/delete job listings
  // - Create new job listings
}