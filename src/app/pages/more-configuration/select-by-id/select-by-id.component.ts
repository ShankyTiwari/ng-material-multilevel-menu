import { Component, OnInit } from '@angular/core';

import {
  MultilevelMenuService,
  MultilevelNodes,
  Configuration
} from './../../../../../projects/ng-material-multilevel-menu/src/public_api';

@Component({
  selector: 'app-select-by-id',
  templateUrl: './select-by-id.component.html',
  styleUrls: ['./select-by-id.component.css']
})
export class SelectByIdComponent implements OnInit {
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
              faIcon: 'fas fa-allergies'
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
      icon: 'alarm',
      items: [
        {
          label: 'Item 2.1',
          icon: 'favorite'
        },
        {
          label: 'Item 2.2',
          icon: 'favorite_border'
        }
      ]
    },
    {
      label: 'Item 3',
      icon: 'offline_pin'
    },
    {
      label: 'Item 4',
      icon: 'star_rate',
      hidden: true
    }
  ];

  config: Configuration = {
    paddingAtStart: true,
    classname: 'my-custom-class',
    listBackgroundColor: `rgb(208, 241, 239)`,
    fontColor: `rgb(8, 54, 71)`,
    backgroundColor: `rgb(208, 241, 239)`,
    selectedListFontColor: `red`,
  };

  menuId: string = null;

  constructor(
      private multilevelMenuService: MultilevelMenuService
  ) {}

  selectMenuID() {
    if (this.menuId ===  null) {
      alert('Menu ID can\'t be empty');
      return;
    }
    this.multilevelMenuService.selectMenuByID(this.menuId);
  }

  selectedItem(event: MultilevelNodes) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
