import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../core/services/dummy-data.service';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';
import { WorkSchedule, PersonnelSchedule } from '../../../../core/models/attendance.model';
import { FormsModule } from '@angular/forms';

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
  departmentId: string;
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

interface FilterState {
  department: string;
  shiftType: string;
  schedulePeriod: string;
}

interface ScheduleForm {
  employeeId: string;
  scheduleId: string;
  startDate: Date;
  endDate: Date | null;
}

@Component({
  selector: 'app-work-schedule-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-schedule-management.component.html',
  styleUrls: ['./work-schedule-management.component.scss']
})
export class WorkScheduleManagementComponent implements OnInit {
  // Observables for data
  workSchedules$!: Observable<WorkSchedule[]>;
  private personnelSchedulesSubject = new BehaviorSubject<PersonnelSchedule[]>([]);
  personnelSchedules$ = this.personnelSchedulesSubject.asObservable();
  personnel$!: Observable<Personnel[]>;
  departments$!: Observable<Department[]>;

  // Filter state
  private filterState = new BehaviorSubject<FilterState>({
    department: '',
    shiftType: '',
    schedulePeriod: 'May 27 - June 2, 2024'
  });

  // Combined data for the view
  scheduleData$!: Observable<ScheduleData[]>;
  morningShiftCount$!: Observable<number>;
  eveningShiftCount$!: Observable<number>;
  nightShiftCount$!: Observable<number>;

  // Filter values for template
  selectedDepartment = '';
  selectedShiftType = '';
  selectedSchedulePeriod = 'May 27 - June 2, 2024';

  // Modal state
  showCreateModal = false;
  newSchedule: ScheduleForm = {
    employeeId: '',
    scheduleId: '',
    startDate: new Date(),
    endDate: null
  };

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit() {
    // Initialize observables
    this.workSchedules$ = this.dummyDataService.getWorkSchedules();
    this.dummyDataService.getPersonnelSchedules().subscribe(schedules => {
      this.personnelSchedulesSubject.next(schedules);
    });
    this.personnel$ = this.dummyDataService.getPersonnel();
    this.departments$ = this.dummyDataService.getDepartments();

    // Combine the data for the view with filters
    this.scheduleData$ = combineLatest([
      this.personnelSchedules$,
      this.workSchedules$,
      this.personnel$,
      this.departments$,
      this.filterState
    ]).pipe(
      map(([personnelSchedules, workSchedules, personnel, departments, filters]) => {
        return personnelSchedules
          .map(schedule => {
            const workSchedule = workSchedules.find(ws => ws.id === schedule.schedule_id);
            const employee = personnel.find(p => p.id === schedule.personnel_id);
            const department = departments.find(d => d.id === employee?.department_id);
            
            return {
              id: schedule.id,
              employeeName: `${employee?.first_name} ${employee?.last_name}`,
              department: department?.department_name || 'Unknown',
              departmentId: department?.id || '',
              schedule: this.formatSchedule(workSchedule),
              startDate: schedule.start_date,
              endDate: schedule.end_date
            };
          })
          .filter(data => {
            // Apply department filter
            if (filters.department && data.departmentId !== filters.department) {
              return false;
            }
            
            // Apply shift type filter
            if (filters.shiftType) {
              const shiftType = filters.shiftType.toLowerCase();
              const scheduleDays = Object.values(data.schedule) as { type: string; shift: string }[];
              const hasMatchingShift = scheduleDays.some(day => 
                day.type.toLowerCase() === shiftType
              );
              if (!hasMatchingShift) {
                return false;
              }
            }
            
            return true;
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

  // Filter change handlers
  onDepartmentChange(department: string) {
    this.selectedDepartment = department;
    this.updateFilters();
  }

  onShiftTypeChange(shiftType: string) {
    this.selectedShiftType = shiftType;
    this.updateFilters();
  }

  onSchedulePeriodChange(period: string) {
    this.selectedSchedulePeriod = period;
    this.updateFilters();
  }

  private updateFilters() {
    this.filterState.next({
      department: this.selectedDepartment,
      shiftType: this.selectedShiftType,
      schedulePeriod: this.selectedSchedulePeriod
    });
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
    this.showCreateModal = true;
  }

  // Method to handle schedule editing
  editSchedule(scheduleId: string) {
    // TODO: Implement schedule editing logic
  }

  // Method to handle schedule publishing
  publishSchedule() {
    // TODO: Implement schedule publishing logic
  }

  // Method to handle modal close
  closeModal() {
    this.showCreateModal = false;
    this.newSchedule = {
      employeeId: '',
      scheduleId: '',
      startDate: new Date(),
      endDate: null
    };
  }

  // Method to handle form submission
  submitSchedule() {
    if (!this.newSchedule.employeeId || !this.newSchedule.scheduleId || !this.newSchedule.startDate) {
      console.error('Please fill in all required fields');
      return;
    }

    // Create a new personnel schedule
    const newPersonnelSchedule: PersonnelSchedule = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random ID for demo
      personnel_id: this.newSchedule.employeeId,
      schedule_id: this.newSchedule.scheduleId,
      start_date: new Date(this.newSchedule.startDate),
      end_date: this.newSchedule.endDate ? new Date(this.newSchedule.endDate) : null,
      created_by: '1', // Hardcoded for demo
      created_at: new Date()
    };

    // Update the schedules list with the new schedule
    const currentSchedules = this.personnelSchedulesSubject.getValue();
    this.personnelSchedulesSubject.next([...currentSchedules, newPersonnelSchedule]);

    // Close the modal and reset the form
    this.closeModal();
  }
}