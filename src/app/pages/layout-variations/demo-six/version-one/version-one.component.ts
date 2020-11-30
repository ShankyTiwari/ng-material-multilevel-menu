import { Component, OnInit } from '@angular/core';

import { MultilevelNodes, Configuration, ExpandedRTL, ExpandedLTR } from './../../../../../../projects/ng-material-multilevel-menu/src/public_api';

@Component({
  selector: 'app-version-one',
  templateUrl: './version-one.component.html',
  styleUrls: ['./version-one.component.css'],
  animations: [ExpandedRTL, ExpandedLTR]
})
export class VersionOneComponent implements OnInit {
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
          label: 'Item 1.2',
          faIcon: 'fab fa-accessible-icon',
          items: [
            {
              label: 'Item 1.2.1',
              faIcon: 'fas fa-ambulance',
            },
            {
              label: 'Item 1.2.2',
              faIcon: 'fas fa-ambulance',
              items: [
                {
                  label: 'Item 1.2.2.1',
                  faIcon: 'fas fa-anchor'
                }
              ]
            }
          ]
        }
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
    rtlLayout: true,
    customTemplate: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  getClass(item) {
    return {
      [item.faIcon]: true
    };
  }

  selectedItem($event) {
    console.log($event);
  }

}
