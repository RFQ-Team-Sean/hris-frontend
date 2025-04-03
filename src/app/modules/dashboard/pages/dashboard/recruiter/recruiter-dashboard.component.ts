import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-recruiter-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './recruiter-dashboard.component.html',
  styleUrl: './recruiter-dashboard.component.scss'
})
export class RecruiterDashboardComponent {
 // Sample data - in a real app, this would come from an API
 quickStats = [
  { 
    title: 'Active Jobs', 
    value: '24', 
    change: '4', 
    trend: 'up',
    icon: 'briefcase',
    color: 'blue'
  },
  { 
    title: 'Total Applicants', 
    value: '1,248', 
    change: '12.5%', 
    trend: 'up',
    icon: 'users',
    color: 'green'
  },
  { 
    title: 'Upcoming Interviews', 
    value: '18', 
    change: '3', 
    trend: 'down',
    icon: 'clock',
    color: 'yellow'
  },
  { 
    title: 'Hires This Month', 
    value: '14', 
    change: '8.3%', 
    trend: 'up',
    icon: 'check',
    color: 'green'
  }
];

recentActivities = [
  {
    user: 'Maria',
    action: 'scheduled interview with John Doe',
    time: 'Today, 10:30 AM',
    avatar: 'assets/user1.jpg'
  },
  {
    user: 'Sarah Chen',
    action: 'was hired as Frontend Developer',
    time: 'Yesterday, 3:45 PM',
    avatar: 'assets/user2.jpg'
  },
  {
    user: 'New job posting',
    action: 'Senior UX Designer',
    time: '2 days ago',
    avatar: 'assets/user3.jpg'
  },
  {
    user: 'Michael',
    action: 'completed interview feedback',
    time: '3 days ago',
    avatar: 'assets/user4.jpg'
  }
];

openPositions = [
  { position: 'Senior Frontend Developer', applicants: 45, status: 'Active' },
  { position: 'UX Designer', applicants: 32, status: 'Active' },
  { position: 'Product Manager', applicants: 28, status: 'Draft' },
  { position: 'DevOps Engineer', applicants: 18, status: 'Active' }
];

upcomingInterviews = [
  {
    applicant: 'John Doe',
    type: 'Technical Interview',
    time: 'Tomorrow, 10:00 AM - 11:00 AM',
    avatar: 'assets/applicant1.jpg'
  },
  {
    applicant: 'Sarah Chen',
    type: 'HR Interview',
    time: 'Tomorrow, 2:30 PM - 3:15 PM',
    avatar: 'assets/applicant2.jpg'
  },
  {
    applicant: 'Michael Brown',
    type: 'Final Interview',
    time: 'Jun 15, 9:00 AM - 10:00 AM',
    avatar: 'assets/applicant3.jpg'
  },
  {
    applicant: 'Emily Wilson',
    type: 'Technical Interview',
    time: 'Jun 16, 11:30 AM - 12:30 PM',
    avatar: 'assets/applicant4.jpg'
  }
];
}