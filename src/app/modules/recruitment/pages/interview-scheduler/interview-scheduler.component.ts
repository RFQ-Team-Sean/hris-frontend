// src\app\modules\recruitment\pages\interview-scheduler\interview-scheduler.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interview-scheduler',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-scheduler.component.html',
  styleUrls: ['./interview-scheduler.component.scss']
})
export class InterviewSchedulerComponent {
  // Sample data - in a real app, this would come from an API
  interviews = [
    {
      id: 1,
      applicantName: 'Maria Garcia',
      applicantId: 'APP-2023-001',
      jobTitle: 'Senior Frontend Developer',
      stage: 'Technical Interview',
      interviewer: 'John Smith (Tech Lead)',
      date: 'Jun 15, 2023',
      time: '10:00 AM - 11:00 AM',
      status: 'Scheduled'
    },
    {
      id: 2,
      applicantName: 'James Wilson',
      applicantId: 'APP-2023-002',
      jobTitle: 'Product Designer',
      stage: 'HR Interview',
      interviewer: 'Sarah Johnson (HR Manager)',
      date: 'Jun 16, 2023',
      time: '2:00 PM - 3:00 PM',
      status: 'Rescheduled'
    },
    {
      id: 3,
      applicantName: 'Robert Chen',
      applicantId: 'APP-2023-003',
      jobTitle: 'Cybersecurity Specialist',
      stage: 'Final Interview',
      interviewer: 'Michael Brown (Director)',
      date: 'Jun 14, 2023',
      time: '9:30 AM - 10:30 AM',
      status: 'Completed'
    }
  ];

  // In a real app, you would have methods to:
  // - Fetch interview data from API
  // - Handle filter changes
  // - Schedule new interviews
  // - Reschedule/cancel interviews
  // - Submit interview feedback
  // - Mark interviews as completed
  // - Make hiring decisions
}