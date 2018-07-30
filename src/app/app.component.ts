import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { constant as CONSTANT } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appitems = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;


  constructor(
    private router: Router
  ) { }

  selectedItem($event) {
    console.log($event);
  }

  redirect(link) {
    this.router.navigate([link]);
  }
}
