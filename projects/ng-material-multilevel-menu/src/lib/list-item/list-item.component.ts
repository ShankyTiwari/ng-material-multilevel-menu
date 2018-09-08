import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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
        style({ height: '*', opacity: 0.2 }),
        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-out', style({ opacity: 0 }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([
          animate(200, style({ height: '*' })),
          animate('400ms ease-out', style({ opacity: 1 }))
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
  expanded = false;
  constructor(
    private router: Router,
    private multilevelMenuService: MultilevelMenuService
  ) {
    this.selectedListClasses = {
      [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
      [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
    };
  }
  ngOnChanges() {
    this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
    if (this.selectedNode !== undefined && this.selectedNode !== null) {
      this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
    }
  }
  setSelectedClass(isFound: boolean): void {
    if (isFound) {
      this.expanded = true;
      this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined ? true : false;
    } else {
      this.isSelected = false;
      if (this.nodeConfiguration.collapseOnSelect) {
        this.expanded = false;
      }
    }
    this.selectedListClasses = {
      [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
      [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
    };
    this.setClasses();
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
  setClasses(): void {
    this.classes = {
      ['level-' + this.level]: true,
      'amml-submenu': this.hasItems() && this.expanded && this.getPaddingAtStart()
    };
  }
  expand(node: MultilevelNodes): void {
    this.expanded = !this.expanded;
    this.setClasses();
    if (node.onSelected) {
      node.onSelected(node);
      this.selectedListItem(node);
    } else if (this.nodeConfiguration.interfaceWithRoute !== null
      && this.nodeConfiguration.interfaceWithRoute
      && node.link !== undefined
    ) {
      if (node.externalRedirect !== undefined && node.externalRedirect) {
        window.location.href = node.link;
      } else {
        this.router.navigate([node.link]);
      }
    } else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
      this.selectedListItem(node);
    }
  }
  selectedListItem(node: MultilevelNodes): void {
    this.selectedItem.emit(node);
  }
}
