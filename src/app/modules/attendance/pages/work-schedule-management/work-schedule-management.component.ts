import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-schedule-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-schedule-management.component.html',
  styleUrls: ['./work-schedule-management.component.scss']
})
export class WorkScheduleManagementComponent {
  // Sample data - in a real app, this would come from an API
  employees = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      department: 'IT',
      schedule: {
        mon: { shift: '8AM-5PM', type: 'morning' },
        tue: { shift: '8AM-5PM', type: 'morning' },
        wed: { shift: '8AM-5PM', type: 'morning' },
        thu: { shift: '8AM-5PM', type: 'morning' },
        fri: { shift: '8AM-5PM', type: 'morning' },
        sat: { shift: 'OFF', type: 'off' },
        sun: { shift: 'OFF', type: 'off' }
      }
    },
    {
      id: 2,
      name: 'Maria Santos',
      department: 'HR',
      schedule: {
        mon: { shift: '8AM-5PM', type: 'morning' },
        tue: { shift: '8AM-5PM', type: 'morning' },
        wed: { shift: 'OFF', type: 'off' },
        thu: { shift: '8AM-5PM', type: 'morning' },
        fri: { shift: '8AM-5PM', type: 'morning' },
        sat: { shift: 'OFF', type: 'off' },
        sun: { shift: 'OFF', type: 'off' }
      }
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      department: 'Operations',
      schedule: {
        mon: { shift: '2PM-11PM', type: 'evening' },
        tue: { shift: '2PM-11PM', type: 'evening' },
        wed: { shift: '2PM-11PM', type: 'evening' },
        thu: { shift: 'OFF', type: 'off' },
        fri: { shift: '2PM-11PM', type: 'evening' },
        sat: { shift: '2PM-11PM', type: 'evening' },
        sun: { shift: 'OFF', type: 'off' }
      }
    }
  ];

  // Get shift color based on type
  getShiftColor(type: string): { background: string; text: string } {
    switch(type) {
      case 'morning':
        return { background: '#d1fae5', text: '#065f46' };
      case 'evening':
        return { background: '#fef3c7', text: '#92400e' };
      case 'night':
        return { background: '#e0e7ff', text: '#4338ca' };
      case 'off':
        return { background: '#fee2e2', text: '#991b1b' };
      default:
        return { background: '#e5e7eb', text: '#1f2937' };
    }
  }

  // In a real app, you would have methods to:
  // - Fetch schedule data from API
  // - Handle filter changes
  // - Edit employee schedules
  // - Publish schedules
  // - Navigate between weeks
}