import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
}
