import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-on-select',
    templateUrl: './on-select.component.html',
    styleUrls: ['./on-select.component.css'],
})
export class OnSelectComponent implements OnInit {
    codeSnippet = `
    {
      label: 'Changing Colours',
      link: '/demo two',
      icon: 'favorite_border',
      onSelected: function() {
        // some logic
      }
  }`;

    codeSnippetUsage = `
    import { Component } from '@angular/core';
    import {
      MultilevelNodes,
      Configuration,
      ExpandedRTL,
      ExpandedLTR
    } from 'ng-material-multilevel-menu';
    @Component({
        selector: 'app-demo',
        templateUrl: './demo.component.html',
        styleUrls: ['./demo.component.css'],
        animations: [ExpandedRTL, ExpandedLTR]
    })
    export class DemoComponent  {
        appitems: MultilevelNodes[] = [
            ...
            {
              label: 'Changing Colours',
              link: '/demo two',
              icon: 'favorite_border',
              onSelected: this.onSelected.bind(this)
            }
            ...
        ];
        config: Configuration = {
            rtlLayout: true,
            customTemplate: true,
        }
        constructor() { }
        onSelected(args) {
          console.log(args)
        }
    }
  `;

    constructor() {}

    ngOnInit(): void {}
}
