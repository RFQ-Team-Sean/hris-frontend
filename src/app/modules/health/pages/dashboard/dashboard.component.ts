import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'block'
  }
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
} 