import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// import { MultilevelNodes } from './../../projects/ng-material-multilevel-menu/src/lib/app.model';
import { MultilevelNodes } from 'ng-material-multilevel-menu';

import { constant as CONSTANT } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appitems: MultilevelNodes[] = CONSTANT.sidebarDemoLinks;
  config = CONSTANT.sidebarConfigurations;
  displayList = false;

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
    iconRegistry.addSvgIcon(
      'psychology',
      sanitizer.bypassSecurityTrustResourceUrl('assets/psychology.svg'));
  }

  selectedItem($event) {
    console.log($event);
  }

  selectedLabel($event) {
    console.log($event);
  }

  redirect(link) {
    this.router.navigate([link]);
    setTimeout(() => {
      this.displayList = true;
    }, 100);
  }
}
