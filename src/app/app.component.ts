import { Component, OnInit } from '@angular/core';
import {ExpandedRTL, ExpandedLTR } from './../../projects/ng-material-multilevel-menu/src/public_api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ExpandedRTL, ExpandedLTR]
})
export class AppComponent implements OnInit {
  selectedData = null;
  showHome = true;
  expandCollapseStatus: string = null;

  appItems = [
    {
      label: 'Home',
      link: '/pages/home',
    },
    {
      label: 'Layout Variations',
      items: [
        {
          label: 'Default',
          link: '/pages/layout-variations/demo-one',
        },
        {
          label: 'Work with Colours',
          link: '/pages/layout-variations/demo-two',
        },
        {
          label: 'Change background',
          link: '/pages/layout-variations/demo-three',
        },
        {
          label: 'Use Images in the list',
          link: '/pages/layout-variations/demo-four',
        },
        {
          label: 'RLT Demo',
          link: '/pages/layout-variations/demo-five',
        },
        {
          label: 'Custom Templates',
          link: '/pages/layout-variations/demo-six',
          items: [
            {
              label: 'Version 1',
              link: '/pages/layout-variations/demo-six/version-one',
            },
            {
              label: 'Version 2',
              link: '/pages/layout-variations/demo-six/version-two',
            },
            {
              label: 'Version 3',
              link: '/pages/layout-variations/demo-six/version-three',
            }
          ],
        },
      ],
    },
    {
      label: 'Configurations',
      items: [
        {
          label: 'Add/Remove Padding',
          link: '/pages/more-configuration/disable-padding',
        },
        {
          label: 'Enable/Disable Routing',
          link: '/pages/more-configuration/disable-routing',
        },
        {
          label: 'Expand Collapse Menu' ,
          link: '/pages/more-configuration/expand-collapse'
        },
        {
          label: `Don't Emit` ,
          link: '/pages/more-configuration/dont-emit'
        },
        {
          label: `Select Menu By ID` ,
          link: '/pages/more-configuration/select-by-id'
        }
      ],
    },
  ];

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    collapseOnSelect: true,
    highlightOnSelect: true,
  };

  selectedItem(selectedData) {
    console.log(selectedData);
    this.selectedData = selectedData;
  }

  constructor() {}

  ngOnInit() {
  }

  redirect(path) {
    window.location.href = path;
  }

  setExpandCollapseStatus(type) {
    this.expandCollapseStatus = type;
  }
  getClass(item) {
    return {
      [item.faIcon]: true
    };
  }
}
