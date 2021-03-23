import { Component, OnInit } from '@angular/core';
import {Configuration} from '../../../../../projects/ng-material-multilevel-menu/src/lib/app.model';

@Component({
  selector: 'app-minimise',
  templateUrl: './minimise.component.html',
  styleUrls: ['./minimise.component.css']
})
export class MinimiseComponent implements OnInit {
  appitems = [
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
    minimisedView: {
      position: 'bottom',
      icon: `keyboard_arrow_left`,
      maximiseTooltipLabel: 'Maximise',
      minimiseTooltipLabel: 'Minimise'
    },
    rtlLayout: false,
    paddingAtStart: true
  };

  icon: any;
  codeSnippet = `
    config: Configuration = {
      minimisedView: {
        position: 'bottom',
        icon: \`keyboard_arrow_left\`,
        maximiseTooltipLabel: 'Maximise',
        minimiseTooltipLabel: 'Minimise'
      }
    };
  `;
  isChecked = false;

  constructor() { }

  ngOnInit(): void {
  }

  setMenuIcon() {
    if (this.icon !== '') {
      this.config.minimisedView.icon = `${this.icon}`;
    }
  }

  setPosition(e) {
    this.config.minimisedView.position = e.checked ? 'top' : 'bottom';
  }
}
