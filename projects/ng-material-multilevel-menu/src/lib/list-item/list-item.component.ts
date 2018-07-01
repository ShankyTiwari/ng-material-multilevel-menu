import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, state, group } from '@angular/animations';

import { MultilevelMenuService } from './../multilevel-menu.service';

import { Configuration, MultilevelNodes, ListStyle } from './../app.model';
import { CONSTANT } from './../constants';

@Component({
  selector: 'ng-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
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
export class ListItemComponent implements OnChanges {
  @Input() node: MultilevelNodes;
  @Input() level = 1;
  @Input() selectedNode: MultilevelNodes;
  @Input() nodeConfiguration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  isSelected = false;
  nodeChildren: MultilevelNodes[];
  classes: { [index: string]: boolean };
  selectedListClasses: { [index: string]: boolean };
  constructor(
    private multilevelMenuService: MultilevelMenuService
  ) {
    this.selectedListClasses = {
      [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
      [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
    };
  }
  ngOnChanges() {
    this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
    if (this.selectedNode !== undefined) {
      this.multilevelMenuService.isLastItemCliked.subscribe( (isClicked: boolean) => {
        if (isClicked) {
          if (this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id)) {
            this.isSelected = true;
          } else {
            this.isSelected = false;
          }
          this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
          };
        }
      });
    }
  }
  getPaddingAtStart(): boolean {
    return this.nodeConfiguration.paddingAtStart ? true : false;
  }
  getListStyle(): ListStyle {
    const styles = {
      background: CONSTANT.DEFAULT_LIST_BACKGROUND_COLOR,
      color: CONSTANT.DEFAULT_LIST_FONT_COLOR
    };
    if (this.nodeConfiguration.listBackgroundColor !== null) {
      styles.background = this.nodeConfiguration.listBackgroundColor;
    }
    if (this.isSelected) {
      this.nodeConfiguration.selectedListFontColor !== null ?
        styles.color = this.nodeConfiguration.selectedListFontColor : styles.color = CONSTANT.DEFAULT_SELECTED_FONT_COLOR;
    } else if (this.nodeConfiguration.fontColor !== null) {
      styles.color = this.nodeConfiguration.fontColor;
    }
    return styles;
  }
  hasItems(): boolean {
    return this.nodeChildren.length > 0 ? true : false;
  }
  setClasses() {
    this.classes = {
      ['level-' + this.level]: true,
      'amml-submenu': this.hasItems() && this.node.expanded && this.getPaddingAtStart()
    };
  }
  expand(node: MultilevelNodes): void {
    node.expanded = !node.expanded;
    if (node.items === undefined) {
      delete node.expanded;
      this.selectedListItem(node);
    }
    this.setClasses();
  }
  selectedListItem(node: MultilevelNodes): void {
    this.multilevelMenuService.updateClickedItem(true);
    this.selectedItem.emit(node);
  }
}
