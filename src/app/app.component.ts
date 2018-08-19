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
  displayList = false;


  constructor(
    private router: Router
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 5000);
  }

  selectedItem($event) {
    console.log($event);
  }

  redirect(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }
}
