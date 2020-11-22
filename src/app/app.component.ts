import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { MultilevelNodes, MultilevelMenuService } from './../../projects/ng-material-multilevel-menu/src/public_api';

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
  menuId = null;
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private router: Router,
    private multilevelMenuService: MultilevelMenuService
  ) {
    setTimeout(() => {
      this.displayList = true;
    }, 100);
    iconRegistry.addSvgIcon(
      'psychology',
      sanitizer.bypassSecurityTrustResourceUrl('assets/psychology.svg'));
    iconRegistry.addSvgIcon(
      'activePsychology',
      sanitizer.bypassSecurityTrustResourceUrl('assets/brain.svg'));
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

  setExpandCollapseStatus(type) {
    this.multilevelMenuService.setMenuExapandCollpaseStatus(type);
  }

  selectMenuID(){
    console.log(this.menuId);
    this.multilevelMenuService.selectMenuByID(this.menuId);
  }
}
