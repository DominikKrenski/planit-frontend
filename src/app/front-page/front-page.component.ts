import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  authToken = JSON.parse(localStorage.getItem('currentUser'));

  constructor() { }

  ngOnInit() {
  }

}
