import { Component, OnInit } from '@angular/core';
import { animate, group, state, style, transition, trigger } from '@angular/animations';

import { MultilevelNodes, Configuration, ExpandedRTL, ExpandedLTR } from './../../../../../../projects/ng-material-multilevel-menu/src/public_api';

@Component({
  selector: 'app-version-two',
  templateUrl: './version-two.component.html',
  styleUrls: ['./version-two.component.css'],
  animations: [
    ExpandedRTL,
    ExpandedLTR,
    trigger('highlight', [
      state('no', style({ height: '0px' })),
      state('yes', style({ height: '40%', })),

      transition('no => yes', animate(200)),
      transition('yes => no', animate(200))
    ])
  ]
})
export class VersionTwoComponent implements OnInit {
  appitems: MultilevelNodes[] = [
    {
      label: 'Item 1 (with Font awesome icon)',
      faIcon: 'fab fa-500px',
      items: [
        {
          label: 'Item 1.1',
          faIcon: 'fab fa-accusoft'
        },
        {
          label: 'Item 1.2.1',
          faIcon: 'fas fa-ambulance',
        },
        {
          label: 'Item 1.2.2',
          faIcon: 'fas fa-anchor',
        },
      ]
    },
    {
      label: 'Item 2',
      faIcon: 'fas fa-ambulance',
      items: [
        {
          label: 'Item 2.1',
          faIcon: 'fab fa-accusoft',
        },
        {
          label: 'Item 2.2',
          faIcon: 'fab fa-500px',
        }
      ]
    },
    {
      label: 'Item 3',
      faIcon: 'fas fa-anchor',
    }
  ];

  config: Configuration = {
    paddingAtStart: false,
    customTemplate: true,
    selectedListFontColor: '#000'
  };
  constructor() { }

  ngOnInit(): void {
  }

  selectedItem($event) {
    console.log($event);
  }


}
