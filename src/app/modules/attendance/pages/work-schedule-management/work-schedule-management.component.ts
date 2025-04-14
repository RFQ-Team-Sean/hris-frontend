import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map } from 'rxjs';
import { WorkSchedule, PersonnelSchedule } from '../../../../core/models/attendance.model';

interface Personnel {
  id: string;
  first_name: string;
  last_name: string;
  department_id?: string;
}

interface Department {
  id: string;
  department_name: string;
}

interface ScheduleData {
  id: string;
  employeeName: string;
  department: string;
  schedule: {
    mon: { type: string; shift: string };
    tue: { type: string; shift: string };
    wed: { type: string; shift: string };
    thu: { type: string; shift: string };
    fri: { type: string; shift: string };
    sat: { type: string; shift: string };
    sun: { type: string; shift: string };
  };
  startDate: Date;
  endDate: Date | null;
}

@Component({
  selector: 'app-work-schedule-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-schedule-management.component.html',
  styleUrls: ['./work-schedule-management.component.scss']
})
export class WorkScheduleManagementComponent implements OnInit {
  // Observables for data
  workSchedules$!: Observable<WorkSchedule[]>;
  personnelSchedules$!: Observable<PersonnelSchedule[]>;
  personnel$!: Observable<Personnel[]>;
  departments$!: Observable<Department[]>;

  // Combined data for the view
  scheduleData$!: Observable<ScheduleData[]>;
  morningShiftCount$!: Observable<number>;
  eveningShiftCount$!: Observable<number>;
  nightShiftCount$!: Observable<number>;

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit() {
    // Initialize observables
    this.workSchedules$ = this.dummyDataService.getWorkSchedules();
    this.personnelSchedules$ = this.dummyDataService.getPersonnelSchedules();
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();

    // Combine the data for the view
    this.scheduleData$ = combineLatest([
      this.personnelSchedules$,
      this.workSchedules$,
      this.personnel$,
      this.departments$
    ]).pipe(
      map(([personnelSchedules, workSchedules, personnel, departments]) => {
        return personnelSchedules.map(schedule => {
          const workSchedule = workSchedules.find(ws => ws.id === schedule.schedule_id);
          const employee = personnel.find(p => p.id === schedule.personnel_id);
          const department = departments.find(d => d.id === employee?.department_id);
          
          return {
            id: schedule.id,
            employeeName: `${employee?.first_name} ${employee?.last_name}`,
            department: department?.department_name || 'Unknown',
            schedule: this.formatSchedule(workSchedule),
            startDate: schedule.start_date,
            endDate: schedule.end_date
          };
        });
      })
    );

    // Compute shift counts
    this.morningShiftCount$ = this.scheduleData$.pipe(
      map(data => data.filter(s => s.schedule.mon.type === 'morning').length)
    );

    this.eveningShiftCount$ = this.scheduleData$.pipe(
      map(data => data.filter(s => s.schedule.mon.type === 'evening').length)
    );

    this.nightShiftCount$ = this.scheduleData$.pipe(
      map(data => data.filter(s => s.schedule.mon.type === 'night').length)
    );
  }

  // Helper method to format schedule for display
  private formatSchedule(schedule: WorkSchedule | undefined): any {
    if (!schedule) return {};

    const formatTime = (date: Date | null) => {
      if (!date) return '';
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    return {
      mon: { 
        shift: `${formatTime(schedule.start_time)}-${formatTime(schedule.end_time)}`,
        type: this.getShiftType(schedule.start_time)
      },
      tue: { 
        shift: `${formatTime(schedule.start_time)}-${formatTime(schedule.end_time)}`,
        type: this.getShiftType(schedule.start_time)
      },
      wed: { 
        shift: `${formatTime(schedule.start_time)}-${formatTime(schedule.end_time)}`,
        type: this.getShiftType(schedule.start_time)
      },
      thu: { 
        shift: `${formatTime(schedule.start_time)}-${formatTime(schedule.end_time)}`,
        type: this.getShiftType(schedule.start_time)
      },
      fri: { 
        shift: `${formatTime(schedule.start_time)}-${formatTime(schedule.end_time)}`,
        type: this.getShiftType(schedule.start_time)
      },
      sat: { shift: 'OFF', type: 'off' },
      sun: { shift: 'OFF', type: 'off' }
    };
  }

  // Helper method to determine shift type
  private getShiftType(startTime: Date | null): string {
    if (!startTime) return 'off';
    
    const hour = startTime.getHours();
    if (hour < 10) return 'morning';
    if (hour < 14) return 'mid';
    if (hour < 22) return 'evening';
    return 'night';
  }

  // Get shift color based on type
  getShiftColor(type: string): { background: string; text: string } {
    switch(type) {
      case 'morning':
        return { background: '#d1fae5', text: '#065f46' };
      case 'mid':
        return { background: '#fef3c7', text: '#92400e' };
      case 'evening':
        return { background: '#e0e7ff', text: '#4338ca' };
      case 'night':
        return { background: '#f3e8ff', text: '#6b21a8' };
      case 'off':
        return { background: '#fee2e2', text: '#991b1b' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // Method to handle schedule creation
  createSchedule() {
    // TODO: Implement schedule creation logic
  }

  // Method to handle schedule editing
  editSchedule(scheduleId: string) {
    // TODO: Implement schedule editing logic
  }

  // Method to handle schedule publishing
  publishSchedule() {
    // TODO: Implement schedule publishing logic
  }
}