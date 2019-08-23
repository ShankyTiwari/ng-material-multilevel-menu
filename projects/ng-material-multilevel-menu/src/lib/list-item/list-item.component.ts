import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
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
          animate(200, style({ height: 0 })),
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
    trigger('isExpandedLTR', [
      state('no', style({ transform: 'rotate(-90deg)' })),
      state('yes', style({ transform: 'rotate(0deg)', })),

      transition('no => yes',
        animate(200)
      ),
      transition('yes => no',
        animate(200)
      )
    ]),
    trigger('isExpandedRTL', [
      state('no', style({ transform: 'rotate(90deg)' })),
      state('yes', style({ transform: 'rotate(0deg)', })),

      transition('no => yes',
        animate(200)
      ),
      transition('yes => no',
        animate(200)
      )
    ])
  ]
})
export class ListItemComponent implements OnChanges, OnInit {
  @Input() node: MultilevelNodes;
  @Input() level = 1;
  @Input() submenuLevel = 0;
  @Input() selectedNode: MultilevelNodes;
  @Input() nodeConfiguration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  isSelected = false;
  nodeChildren: MultilevelNodes[];
  classes: { [index: string]: boolean };
  selectedListClasses: { [index: string]: boolean };
  expanded = false;
  firstInitializer = false;
  constructor(
    private router: Router,
    private multilevelMenuService: MultilevelMenuService
  ) {
    this.selectedListClasses = {
      [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
      [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
      [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
    };
  }
  ngOnChanges() {
    this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
    if (this.selectedNode !== undefined && this.selectedNode !== null) {
      this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
    }
  }
  ngOnInit() {
    this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
    this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
    if (typeof this.node.expanded === 'boolean') {
      this.expanded = this.node.expanded;
    }
    this.setClasses();
  }
  setSelectedClass(isFound: boolean): void {
    if (isFound) {
      if (!this.firstInitializer) {
        this.expanded = true;
      }
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
      [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: this.selectedNode.id === this.node.id,
      [CONSTANT.DISABLED_ITEM_CLASS_NAME]: this.node.disabled,
      [`level-${this.level}-submenulevel-${this.submenuLevel}`]: true,
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
  getListIcon(node: MultilevelNodes): string {
    if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
      return `icon`;
    } else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
      return `faicon`;
    } else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
      return `imageicon`;
    } else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
      return `svgicon`;
    } else {
      return ``;
    }
  }
  hasItems(): boolean {
    return this.nodeChildren.length > 0 ? true : false;
  }
  isRtlLayout(): boolean {
    return this.nodeConfiguration.rtlLayout;
  }
  setClasses(): void {
    this.classes = {
      [`level-${this.level + 1}`]: true,
      'amml-submenu': this.hasItems() && this.getPaddingAtStart()
    };
  }
  expand(node: MultilevelNodes): void {
    if (node.disabled) {
      return;
    }
    this.expanded = !this.expanded;
    this.firstInitializer = true;
    this.setClasses();
    if (this.nodeConfiguration.interfaceWithRoute !== null
      && this.nodeConfiguration.interfaceWithRoute
      && node.link !== undefined
      && node.link
    ) {
      if (node.externalRedirect !== undefined && node.externalRedirect) {
        window.location.href = node.link;
      } else {
        this.router.navigate([node.link]);
      }
    } else if (node.onSelected && typeof node.onSelected === 'function') {
      node.onSelected(node);
      this.selectedListItem(node);
    } else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
      this.selectedListItem(node);
    }
  }
  selectedListItem(node: MultilevelNodes): void {
    this.selectedItem.emit(node);
  }
}
