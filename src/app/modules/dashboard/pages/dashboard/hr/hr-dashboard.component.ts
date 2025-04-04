import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

interface CalendarDay {
    date: number;
    isSelected?: boolean;
    isCurrentMonth?: boolean;
}

interface CalendarEvent {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
    description: string;
    hasCamera?: boolean;
    link?: string;
    color: 'purple' | 'blue' | 'pink' | 'green' | 'orange' | 'yellow';
}

interface AgendaDay {
    date: Date;
    label: string;
    events: AgendaEvent[];
}

interface AgendaEvent {
    id: number;
    title: string;
    time: string;
    color: string;
    hasVideoCall: boolean;
    link?: string;
}

@Component({
    selector: 'app-hr-dashboard',
    standalone: true,
    imports: [RouterModule, SidebarComponent, CommonModule],
    templateUrl: './hr-dashboard.component.html',
    styleUrl: './hr-dashboard.component.scss',
    providers: [DatePipe]
})
export class HrDashboardComponent implements OnInit {
    // Dashboard data
    dashboardStats = {
        totalEmployees: 150,
        inOffice: 125,
        lockedAccounts: 15,
        totalDepartments: 5
    };

    username = 'Admin';

    // Current date and selected date
    today = new Date();
    selectedDate = new Date();
    currentMonth = this.today.getMonth();
    currentYear = this.today.getFullYear();

    // Stats data
    stats = [
      { icon: 'people', value: '150', label: 'Total Employees' },
      { icon: 'business', value: '125', label: 'In Office' },
      { icon: 'lock', value: '15', label: 'Locked Accounts' },
      { icon: 'alarm', value: '5', label: 'Total Departments' }
  ]; 

    // Calendar data
    daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    calendarDays: { date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean }[] = [];

    // Events map by month and day
    eventsByMonth: { [key: string]: { [key: number]: CalendarEvent[] } } = {
        // September 2021
        '2021-9': {
            5: [
                {
                    id: 'sept-1',
                    title: 'Team Building',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Quarterly team building activity',
                    hasCamera: true,
                    color: 'blue'
                }
            ],
            12: [
                {
                    id: 'sept-2',
                    title: 'Department Meeting',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Monthly department status update',
                    hasCamera: true,
                    color: 'purple'
                }
            ],
            19: [
                {
                    id: 'sept-3',
                    title: 'All-Hands Company Meeting',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Monthly catch-up',
                    hasCamera: true,
                    color: 'blue'
                },
                {
                    id: 'sept-4',
                    title: 'Quarterly review',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Quarterly review',
                    hasCamera: true,
                    link: 'https://zoom.us/j/1983475281',
                    color: 'blue'
                }
            ],
            25: [
                {
                    id: 'sept-5',
                    title: 'HR Training Session',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'New employee onboarding procedures',
                    hasCamera: true,
                    color: 'green'
                }
            ]
        },
        // February 2021
        '2021-2': {
            27: [
                {
                    id: 'feb-1',
                    title: 'All-Hands Company Meeting',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Monthly catch-up',
                    hasCamera: true,
                    color: 'purple'
                },
                {
                    id: 'feb-2',
                    title: 'Quarterly review',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Quarterly review',
                    hasCamera: true,
                    link: 'https://zoom.us/j/1983475281',
                    color: 'blue'
                }
            ],
            28: [
                {
                    id: 'feb-3',
                    title: 'Visit to discuss improvements',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Visit to discuss improvements',
                    hasCamera: true,
                    link: 'https://zoom.us/j/1983475281',
                    color: 'pink'
                },
                {
                    id: 'feb-4',
                    title: 'Presentation of new products and cost structure',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Presentation of new products and cost structure',
                    hasCamera: true,
                    color: 'blue'
                }
            ]
        },
        // March 2021
        '2021-3': {
            1: [
                {
                    id: 'mar-1',
                    title: 'City Sales Pitch',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'City Sales Pitch',
                    hasCamera: true,
                    link: 'https://zoom.us/j/1983475281',
                    color: 'pink'
                }
            ],
            2: [
                {
                    id: 'mar-2',
                    title: 'Visit to discuss improvements',
                    startTime: '8:30 AM',
                    endTime: '9:00 AM',
                    description: 'Visit to discuss improvements',
                    hasCamera: true,
                    color: 'yellow'
                }
            ]
        }
    };

    // Agenda data
    agendaDays: AgendaDay[] = [
        {
            date: new Date(2021, 1, 27), // February 27, 2021
            label: 'TODAY',
            events: [
                {
                    id: 1,
                    title: 'All-Hands Company Meeting',
                    time: '8:30 - 9:00 AM',
                    color: 'blue',
                    hasVideoCall: true,
                    link: 'https://zoom.us/j/1983475281'
                },
                {
                    id: 2,
                    title: 'Quarterly review',
                    time: '10:30 - 11:30 AM',
                    color: 'green',
                    hasVideoCall: true
                }
            ]
        },
        {
            date: new Date(2021, 1, 28), // February 28, 2021
            label: 'TOMORROW',
            events: [
                {
                    id: 3,
                    title: 'Visit to discuss improvements',
                    time: '8:30 - 10:00 AM',
                    color: 'purple',
                    hasVideoCall: true
                },
                {
                    id: 4,
                    title: 'Presentation of new products and cost structure',
                    time: '11:30 AM - 1:00 PM',
                    color: 'pink',
                    hasVideoCall: true
                }
            ]
        },
        {
            date: new Date(2021, 2, 1), // March 1, 2021
            label: 'MONDAY',
            events: [
                {
                    id: 5,
                    title: 'City Sales Pitch',
                    time: '2:00 - 3:00 PM',
                    color: 'orange',
                    hasVideoCall: true
                }
            ]
        },
        {
            date: new Date(2021, 2, 2), // March 2, 2021
            label: 'TUESDAY',
            events: [
                {
                    id: 6,
                    title: 'Visit to discuss improvements',
                    time: '11:00 AM - 12:30 PM',
                    color: 'yellow',
                    hasVideoCall: true
                }
            ]
        }
    ];

    // Filtered agenda events based on selected date
    displayAgendaEvents: AgendaEvent[] = [];

    constructor(private datePipe: DatePipe, private router: Router) { }

    ngOnInit(): void {
        this.generateCalendarDays();
        this.updateDisplayEvents();
    }

    // Generate the calendar days for the current month view
    generateCalendarDays(): void {
        this.calendarDays = [];

        // First day of the month
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        // Last day of the month
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

        // Previous month's days to show
        const prevMonthDays = firstDay.getDay();
        const prevMonth = new Date(this.currentYear, this.currentMonth, 0);

        // Fill in previous month's days
        for (let i = prevMonthDays; i > 0; i--) {
            const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - i + 1);
            this.calendarDays.push({
                date: date,
                isCurrentMonth: false,
                isToday: this.isSameDay(date, this.today),
                isSelected: this.isSameDay(date, this.selectedDate)
            });
        }

        // Fill in current month's days
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(this.currentYear, this.currentMonth, i);
            this.calendarDays.push({
                date: date,
                isCurrentMonth: true,
                isToday: this.isSameDay(date, this.today),
                isSelected: this.isSameDay(date, this.selectedDate)
            });
        }

        // Fill in next month's days
        const nextDays = 42 - this.calendarDays.length; // 6 rows of 7 days = 42
        for (let i = 1; i <= nextDays; i++) {
            const date = new Date(this.currentYear, this.currentMonth + 1, i);
            this.calendarDays.push({
                date: date,
                isCurrentMonth: false,
                isToday: this.isSameDay(date, this.today),
                isSelected: this.isSameDay(date, this.selectedDate)
            });
        }
    }

    // Navigate to previous month
    prevMonth(): void {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else {
            this.currentMonth--;
        }
        this.generateCalendarDays();
    }

    // Navigate to next month
    nextMonth(): void {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else {
            this.currentMonth++;
        }
        this.generateCalendarDays();
    }

    // Check if two dates are the same day
    isSameDay(date1: Date, date2: Date): boolean {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    }

    // Format the month and year for display
    get monthYearString(): string {
        const date = new Date(this.currentYear, this.currentMonth);
        return this.datePipe.transform(date, 'MMMM yyyy') || '';
    }

    // Select a day in the calendar
    selectDay(day: any): void {
        this.calendarDays.forEach(d => d.isSelected = false);
        day.isSelected = true;
        this.selectedDate = day.date;
        this.updateDisplayEvents();
    }

    // Update the displayed events based on the selected date
    updateDisplayEvents(): void {
        // In a real app, this would filter from a backend API
        // For demo purposes, we're just using the static data
        const selectedAgendaDay = this.agendaDays.find(day =>
            this.isSameDay(day.date, this.selectedDate)
        );

        this.displayAgendaEvents = selectedAgendaDay ? selectedAgendaDay.events : [];
    }

    // Navigate to a detailed view (placeholder for now)
    navigateToDetail(eventId: number): void {
        this.router.navigate(['/dashboard/hr/event', eventId]);
    }
} 