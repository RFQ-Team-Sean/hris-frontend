import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  host: {
    class: 'block'
  }
})
export class EventsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
} 