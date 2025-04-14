import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-attendance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.scss']
})
export class AttendanceDashboardComponent implements OnInit {
  currentDate: string = new Date().toISOString().split('T')[0];
  
  // Observables for data
  attendanceLogs$: Observable<any[]>;
  personnel$: Observable<any[]>;
  departments$: Observable<any[]>;

  // Combined data for template
  attendanceRecords$: Observable<any[]>;
  summaryStats$: Observable<any>;

  constructor(private dummyDataService: DummyDataService) {
    this.attendanceLogs$ = this.dummyDataService.getAttendanceLogs();
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();

    // Combine data for the template
    this.attendanceRecords$ = combineLatest([
      this.attendanceLogs$,
      this.personnel$,
      this.departments$
    ]).pipe(
      map(([logs, personnel, departments]) => {
        return logs.map(log => {
          const person = personnel.find(p => p.id === log.personnel_id);
          const dept = departments.find(d => d.id === person?.department_id);
          
          return {
            id: log.id,
            name: person ? `${person.first_name} ${person.last_name}` : 'Unknown',
            employeeId: person?.id || 'Unknown',
            department: dept?.department_name || 'Unknown',
            timeIn: log.time_in ? this.formatTime(log.time_in) : '--:-- --',
            timeOut: log.time_out ? this.formatTime(log.time_out) : '--:-- --',
            hoursWorked: this.calculateHoursWorked(log.time_in, log.time_out),
            status: log.status
          };
        });
      })
    );

    // Calculate summary statistics
    this.summaryStats$ = combineLatest([
      this.attendanceLogs$,
      this.personnel$
    ]).pipe(
      map(([logs, personnel]) => {
        const totalEmployees = personnel.length;
        const today = new Date().toISOString().split('T')[0];
        const todayLogs = logs.filter(log => 
          new Date(log.log_date).toISOString().split('T')[0] === today
        );

        return {
          totalEmployees,
          presentToday: todayLogs.filter(log => log.status === 'Present').length,
          lateArrivals: todayLogs.filter(log => log.status === 'Late').length,
          absent: todayLogs.filter(log => log.status === 'Absent').length
        };
      })
    );
  }

  ngOnInit(): void {
    // Additional initialization if needed
  }

  // Format time
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  // Calculate hours worked
  calculateHoursWorked(timeIn: Date | null, timeOut: Date | null): string {
    if (!timeIn || !timeOut) return '0h 0m';
    
    const start = new Date(timeIn);
    const end = new Date(timeOut);
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  }

  // Get status color
  getStatusColor(status: string): { background: string; text: string } {
    switch(status) {
      case 'Present':
        return { background: '#d1fae5', text: '#065f46' };
      case 'Late':
        return { background: '#fef3c7', text: '#92400e' };
      case 'Absent':
        return { background: '#fee2e2', text: '#991b1b' };
      case 'On_Leave':
        return { background: '#e0e7ff', text: '#4338ca' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // Handle view action
  viewAttendance(recordId: string): void {
    // TODO: Implement view logic
    console.log('Viewing attendance record:', recordId);
  }
}