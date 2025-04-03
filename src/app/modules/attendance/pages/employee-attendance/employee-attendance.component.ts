import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-attendance',
  standalone: true,
  imports: [RouterModule, SidebarComponent, CommonModule],
  templateUrl: './employee-attendance.component.html',
  styleUrl: './employee-attendance.component.scss'
})
export class EmployeeAttendanceComponent implements OnInit {
  currentDate: Date = new Date();
  currentTime: Date = new Date();
  todayRecord: any = {
    timeIn: null,
    timeOut: null,
    hoursWorked: null,
    status: null
  };
  hasTimeInToday: boolean = false;
  hasTimeOutToday: boolean = false;

  ngOnInit() {
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    // Check if user has already timed in/out today
    this.checkTodaysRecord();
  }

  checkTodaysRecord() {
    // In a real app, you would fetch this from your API
    const storedRecord = localStorage.getItem('attendance-' + this.currentDate.toDateString());
    if (storedRecord) {
      this.todayRecord = JSON.parse(storedRecord);
      this.hasTimeInToday = !!this.todayRecord.timeIn;
      this.hasTimeOutToday = !!this.todayRecord.timeOut;
    }
  }

  timeIn() {
    const now = new Date();
    this.todayRecord.timeIn = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.todayRecord.status = 'Present';
    this.hasTimeInToday = true;
    
    // In a real app, you would send this to your API
    localStorage.setItem('attendance-' + this.currentDate.toDateString(), JSON.stringify(this.todayRecord));
  }

  timeOut() {
    const now = new Date();
    this.todayRecord.timeOut = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Calculate hours worked (simplified)
    if (this.todayRecord.timeIn) {
      const timeIn = new Date(this.currentDate.toDateString() + ' ' + this.todayRecord.timeIn);
      const diffMs = now.getTime() - timeIn.getTime();
      const diffHrs = Math.floor(diffMs / 3600000); // hours
      const diffMins = Math.floor((diffMs % 3600000) / 60000); // minutes
      this.todayRecord.hoursWorked = `${diffHrs}h ${diffMins}m`;
    }
    
    this.hasTimeOutToday = true;
    
    // In a real app, you would send this to your API
    localStorage.setItem('attendance-' + this.currentDate.toDateString(), JSON.stringify(this.todayRecord));
  }
}