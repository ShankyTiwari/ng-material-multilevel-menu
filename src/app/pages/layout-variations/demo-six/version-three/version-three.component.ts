import { Component, OnInit } from '@angular/core';

import { MultilevelNodes, Configuration, SlideInOut, ExpandedLTR } from './../../../../../../projects/ng-material-multilevel-menu/src/public_api';
@Component({
  selector: 'app-version-three',
  templateUrl: './version-three.component.html',
  styleUrls: ['./version-three.component.css'],
  animations: [
    SlideInOut,
    ExpandedLTR,
  ]
})
export class VersionThreeComponent implements OnInit {
  appitems: MultilevelNodes[] = [
    {
      label: 'Item 1 (with Font awesome icon)',
      faIcon: 'fab fa-500px',
      data: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    },
    {
      label: 'Item 2',
      faIcon: 'fas fa-ambulance',
      data: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    },
    {
      label: 'Item 3',
      faIcon: 'fas fa-anchor',
      data: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`
    }
  ];

  config: Configuration = {
    paddingAtStart: false,
    customTemplate: true,
    selectedListFontColor: '#000',
    collapseOnSelect: true
  };
  constructor() { }

  ngOnInit(): void {
  }

  selectedItem($event) {
    console.log($event);
  }
}
