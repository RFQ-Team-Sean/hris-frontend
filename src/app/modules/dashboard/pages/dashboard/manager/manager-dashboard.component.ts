import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../../core/services/dummy-data.service';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'present' | 'absent' | 'on_leave';
  performance: number;
  lastReview: string;
  initials: string;
}

interface TeamStats {
  totalTeamMembers: number;
  presentToday: number;
  pendingApprovals: number;
  teamPerformance: number;
  upcomingMeetings: number;
  pendingReviews: number;
}

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.scss'
})
export class ManagerDashboardComponent implements OnInit {
  teamStats: TeamStats = {
    totalTeamMembers: 0,
    presentToday: 0,
    pendingApprovals: 0,
    teamPerformance: 0,
    upcomingMeetings: 0,
    pendingReviews: 0
  };

  teamMembers: TeamMember[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalTeamMembers = 0;
  totalPages = 1;

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load personnel data
    this.dummyDataService.getPersonnel().subscribe(personnel => {
      this.teamMembers = personnel.map(p => ({
        id: p.id,
        name: `${p.first_name} ${p.last_name}`,
        email: p.email || `${p.first_name.toLowerCase()}.${p.last_name.toLowerCase()}@company.com`,
        role: p.designation,
        status: this.getRandomStatus(),
        performance: Math.floor(Math.random() * 30) + 70, // Random performance between 70-100
        lastReview: new Date().toISOString().split('T')[0],
        initials: `${p.first_name[0]}${p.last_name[0]}`
      }));
      this.totalTeamMembers = this.teamMembers.length;
      this.totalPages = Math.ceil(this.totalTeamMembers / this.itemsPerPage);
    });

    // Load attendance data
    this.dummyDataService.getAttendanceLogs().subscribe(logs => {
      const today = new Date().toISOString().split('T')[0];
      const todayLogs = logs.filter(log => 
        log.log_date.toISOString().split('T')[0] === today
      );
      
      this.teamStats.presentToday = todayLogs.filter(log => 
        log.status === 'Present' || log.status === 'Late'
      ).length;
    });

    // Load leave applications
    this.dummyDataService.getLeaveApplications().subscribe(applications => {
      this.teamStats.pendingApprovals = applications.filter(app => 
        app.status === 'Pending'
      ).length;
    });

    // Load performance reviews
    this.dummyDataService.getPerformanceReviews().subscribe(reviews => {
      this.teamStats.pendingReviews = reviews.filter(review => 
        review.status === 'Pending'
      ).length;
    });

    // Calculate team performance
    this.calculateTeamPerformance();
  }

  private calculateTeamPerformance(): void {
    if (this.teamMembers.length > 0) {
      const totalPerformance = this.teamMembers.reduce((sum, member) => sum + member.performance, 0);
      this.teamStats.teamPerformance = Math.round(totalPerformance / this.teamMembers.length);
    }
  }

  private getRandomStatus(): 'present' | 'absent' | 'on_leave' {
    const statuses: ('present' | 'absent' | 'on_leave')[] = ['present', 'absent', 'on_leave'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value.toLowerCase();
    
    this.dummyDataService.getPersonnel().subscribe(personnel => {
      this.teamMembers = personnel
        .filter(p => 
          `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm) ||
          p.designation.toLowerCase().includes(searchTerm) ||
          p.email?.toLowerCase().includes(searchTerm)
        )
        .map(p => ({
          id: p.id,
          name: `${p.first_name} ${p.last_name}`,
          email: p.email || `${p.first_name.toLowerCase()}.${p.last_name.toLowerCase()}@company.com`,
          role: p.designation,
          status: this.getRandomStatus(),
          performance: Math.floor(Math.random() * 30) + 70,
          lastReview: new Date().toISOString().split('T')[0],
          initials: `${p.first_name[0]}${p.last_name[0]}`
        }));
    });
  }

  onQuickAction(action: string, member?: TeamMember): void {
    switch(action) {
      case 'schedule_meeting':
        // TODO: Implement meeting scheduler
        console.log('Schedule meeting');
        break;
      case 'export_report':
        // TODO: Implement report export
        console.log('Export report');
        break;
      case 'view_profile':
        if (member) {
          // TODO: Navigate to member profile
          console.log('View profile for:', member.name);
        }
        break;
      case 'schedule_review':
        if (member) {
          // TODO: Open review scheduler
          console.log('Schedule review for:', member.name);
        }
        break;
      case 'send_message':
        if (member) {
          // TODO: Open messaging interface
          console.log('Send message to:', member.name);
        }
        break;
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // TODO: Implement pagination logic
    }
  }
}
