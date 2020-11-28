import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dont-emit',
  templateUrl: './dont-emit.component.html',
  styleUrls: ['./dont-emit.component.css']
})
export class DontEmitComponent implements OnInit {

  codeSnippet =`
    {
      label: 'Changing Colours',
      link: '/demo two',
      icon: 'favorite_border',
      activeIcon: 'favorite',
      dontEmit: true,
      navigationExtras: {
          queryParams: { order: 'popular', filter: 'new' },
      }
  }`;

  constructor() { }

  ngOnInit(): void {
  }

}
