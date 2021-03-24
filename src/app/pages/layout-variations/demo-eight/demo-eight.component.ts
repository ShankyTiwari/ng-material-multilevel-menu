import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger, state } from '@angular/animations';
import {Configuration} from '../../../../../projects/ng-material-multilevel-menu/src/lib/app.model';

@Component({
  selector: 'app-demo-eight',
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms', style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('centerleft', [
      state('true', style({ width: 'calc(100% - 340px )' })),
      state('false', style({ width: '100%' })),
      transition('* => *', animate('300ms  linear'))
    ]),
    trigger('slideInOut', [
      state('true', style({ width: '*' })),
      state('false', style({ width: '10%' })),
      transition('* => *', animate('500ms linear'))
    ])
  ],
  templateUrl: './demo-eight.component.html',
  styleUrls: ['./demo-eight.component.css']
})
export class DemoEightComponent implements OnInit {
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
      icon: `keyboard_arrow_right`,
      maximiseTooltipLabel: 'Maximise',
      minimiseTooltipLabel: 'Minimise'
    },
    rtlLayout: true,
    paddingAtStart: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
