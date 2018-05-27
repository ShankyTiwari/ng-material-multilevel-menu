import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, state, group } from '@angular/animations';

@Component({
  selector: 'ng-material-multilevel-menu',
  templateUrl: './ng-material-multilevel-menu.component.html',
  styleUrls: ['./ng-material-multilevel-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ 'opacity': '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ 'opacity': '1' }))
        ])
      ])
    ]),
    trigger('isExpanded', [
      state('no', style({ transform: 'rotate(-90deg)' })),
      state('yes', style({ transform: 'rotate(0deg)', })),

      transition('no => yes',
        animate(300)
      ),
      transition('yes => no',
        animate(300)
      )
    ])
  ]
})
export class NgMaterialMultilevelMenuComponent implements OnInit {
  @Input() items: any;
  @Output() selectedItem = new EventEmitter<any>();
  ngOnInit() {
    if (this.items !== undefined && this.items !== null && this.items !== '') {
      this.items.forEach((item) => {
        item['expanded'] = false;
      });
    }
  }
  hasItems(item) {
    return item.items !== undefined ? item.items.length > 0 : false;
  }
  expand(item) {
    item.expanded = !item.expanded;
    if (item.items === undefined) {
      delete item.expanded;
      this.selectedItem.emit(item);
    }
  }
}
