// src\app\modules\recruitment\pages\applicant-tracker\applicant-tracker.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-applicant-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applicant-tracker.component.html',
  styleUrls: ['./applicant-tracker.component.scss']
})
export class ApplicantTrackerComponent {
  // Sample data - in a real app, this would come from an API
  applicants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      jobTitle: 'Frontend Developer',
      dateApplied: 'Jun 10, 2023',
      currentStage: 'Interview',
      lastActivity: 'Technical interview scheduled',
      lastActivityDate: 'Jun 14, 2023'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      jobTitle: 'UX Designer',
      dateApplied: 'Jun 5, 2023',
      currentStage: 'Screen',
      lastActivity: 'Resume reviewed',
      lastActivityDate: 'Jun 8, 2023'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      jobTitle: 'Product Manager',
      dateApplied: 'May 28, 2023',
      currentStage: 'Offer',
      lastActivity: 'Offer letter sent',
      lastActivityDate: 'Jun 12, 2023'
    }
  ];

  // In a real app, you would have methods to:
  // - Fetch applicant data from API
  // - Handle filter changes
  // - Move applicants between stages
  // - View applicant details
  // - Reject applicants
  // - Make hiring decisions
  // - Track applicant activity
}