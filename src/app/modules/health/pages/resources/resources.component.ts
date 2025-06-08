import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-health-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  host: {
    class: 'block'
  }
})
export class ResourcesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
} 