// src\app\modules\reports\pages\recruitment-reports\recruitment-reports.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruitment-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruitment-reports.component.html',
  styleUrls: ['./recruitment-reports.component.scss']
})
export class RecruitmentReportsComponent {
  // In a real app, this data would come from an API
  summaryMetrics = [
    { 
      title: 'Total Applicants', 
      value: '1,248', 
      change: '12.5%', 
      trend: 'up',
      icon: 'users',
      color: 'blue'
    },
    { 
      title: 'Hires', 
      value: '84', 
      change: '8.3%', 
      trend: 'up',
      icon: 'check',
      color: 'green'
    },
    { 
      title: 'Avg. Time to Hire', 
      value: '23 days', 
      change: '2 days', 
      trend: 'up',
      icon: 'clock',
      color: 'yellow'
    },
    { 
      title: 'Open Positions', 
      value: '32', 
      change: '15.8%', 
      trend: 'down',
      icon: 'briefcase',
      color: 'purple'
    }
  ];

  positionMetrics = [
    { position: 'Frontend Developer', applicants: 245, interviews: 48, offers: 12, hires: 8, conversion: '3.3%', time: '21 days' },
    { position: 'Backend Developer', applicants: 198, interviews: 42, offers: 10, hires: 7, conversion: '3.5%', time: '24 days' },
    { position: 'UX Designer', applicants: 156, interviews: 35, offers: 8, hires: 5, conversion: '3.2%', time: '19 days' },
    { position: 'Product Manager', applicants: 87, interviews: 22, offers: 6, hires: 4, conversion: '4.6%', time: '28 days' }
  ];

  sourceMetrics = [
    { source: 'LinkedIn', applicants: 428, hires: 32, conversion: '7.5%' },
    { source: 'Company Website', applicants: 356, hires: 28, conversion: '7.9%' },
    { source: 'Job Boards', applicants: 298, hires: 18, conversion: '6.0%' },
    { source: 'Referrals', applicants: 166, hires: 16, conversion: '9.6%' }
  ];
}