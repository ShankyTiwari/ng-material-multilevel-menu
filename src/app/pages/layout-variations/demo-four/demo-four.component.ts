import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-four',
  templateUrl: './demo-four.component.html',
  styleUrls: ['./demo-four.component.css']
})
export class DemoFourComponent implements OnInit {
  appitems = [
    {
      label: 'Item 1 (with Font awesome icon)',
      imageIcon: '/assets/batman.jpg',
      items: [
        {
          label: 'Item 1.1',
          imageIcon: '/assets/blackpanther.jpg',
        },
        {
          label: 'Item 1.2',
          imageIcon: '/assets/captainamerica.jpg',
          items: [
            {
              label: 'Item 1.2.1',
              imageIcon: '/assets/drstange.jpg',
            },
            {
              label: 'Item 1.2.2',
              imageIcon: '/assets/ironman.jpg',
              items: [
                {
                  label: 'Item 1.2.2.1',
                  imageIcon: '/assets/shatiman.jpg',
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

  config = {
    paddingAtStart: false,
    classname: 'my-custom-lis'
  };

  constructor() { }

  ngOnInit() {
  }

  selectedItem($event) {
    console.log($event);
  }

}
