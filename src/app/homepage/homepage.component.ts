import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  items: Array<any> = []

  constructor() {
    this.items = [
      { name: 'Jose' },
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
      { name: 'Bob' },
    ];

  }

  ngOnInit() {
  }

}
