import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { MultilevelMenuService } from './multilevel-menu.service';

import { Configuration, MultilevelNodes, BackgroundStyle } from './app.model';
import { CONSTANT } from './constants';

@Component({
  selector: 'ng-material-multilevel-menu',
  templateUrl: './ng-material-multilevel-menu.component.html',
  styleUrls: ['./ng-material-multilevel-menu.component.css'],
})
export class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges {
  @Input() items: MultilevelNodes[];
  @Input() configuration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  currentNode: MultilevelNodes;
  nodeConfig: Configuration = {
    paddingAtStart: true,
    listBackgroundColor: null,
    fontColor: null,
    selectedListFontColor: null,
    interfaceWithRoute: null,
    collapseOnSelect: null,
    highlightOnSelect: false
  };
  isInvalidConfig = true;
  constructor(
    private router: Router,
    private multilevelMenuService: MultilevelMenuService
  ) { }
  ngOnChanges() {
    this.checkValiddata();
    this.detectInvalidConfig();
  }
  ngOnInit() {
    if (
      this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
      this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
      this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.updateNodeByURL(event.url);
          }
        });
      this.updateNodeByURL(this.router.url);
    }
  }
  updateNodeByURL(url: string): void {
    const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
    if (
      foundNode !== undefined &&
      foundNode.link !== undefined &&
      foundNode.link !== null &&
      foundNode.link !== ''
    ) {
      this.currentNode = foundNode;
      this.selectedListItem(foundNode);
    }
  }
  checkValiddata(): void {
    if (this.items.length === 0) {
      console.warn(CONSTANT.ERROR_MESSAGE);
    } else {
      this.items = this.items.filter(n => !n.hidden);
      this.multilevelMenuService.addRandomId(this.items);
    }
  }
  detectInvalidConfig(): void {
    if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
      this.isInvalidConfig = true;
    } else {
      this.isInvalidConfig = false;
      const config = this.configuration;
      if (config.paddingAtStart !== undefined && config.paddingAtStart !== null && typeof config.paddingAtStart === 'boolean') {
        this.nodeConfig.paddingAtStart = config.paddingAtStart;
      }
      if (config.listBackgroundColor !== '' &&
        config.listBackgroundColor !== null &&
        config.listBackgroundColor !== undefined) {
        this.nodeConfig.listBackgroundColor = config.listBackgroundColor;
      }
      if (config.fontColor !== '' &&
        config.fontColor !== null &&
        config.fontColor !== undefined) {
        this.nodeConfig.fontColor = config.fontColor;
      }
      if (config.selectedListFontColor !== '' &&
        config.selectedListFontColor !== null &&
        config.selectedListFontColor !== undefined) {
        this.nodeConfig.selectedListFontColor = config.selectedListFontColor;
      }
      if (config.interfaceWithRoute !== null &&
        config.interfaceWithRoute !== undefined &&
        typeof config.interfaceWithRoute === 'boolean') {
        this.nodeConfig.interfaceWithRoute = config.interfaceWithRoute;
      }
      if (config.collapseOnSelect !== null &&
        config.collapseOnSelect !== undefined &&
        typeof config.collapseOnSelect === 'boolean') {
        this.nodeConfig.collapseOnSelect = config.collapseOnSelect;
      }
      if (config.highlightOnSelect !== null &&
        config.highlightOnSelect !== undefined &&
        typeof config.highlightOnSelect === 'boolean') {
        this.nodeConfig.highlightOnSelect = config.highlightOnSelect;
      }
    }
  }
  getClassName(): string {
    if (this.isInvalidConfig) {
      return CONSTANT.DEFAULT_CLASS_NAME;
    } else {
      if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
        return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
      } else {
        return CONSTANT.DEFAULT_CLASS_NAME;
      }
    }
  }
  getGlobalStyle(): BackgroundStyle {
    if (!this.isInvalidConfig) {
      const styles = {
        background : null
      };
      if (this.configuration.backgroundColor !== '' &&
        this.configuration.backgroundColor !== null &&
        this.configuration.backgroundColor !== undefined) {
        styles.background = this.configuration.backgroundColor;
      }
      return styles;
    }
  }
  selectedListItem(event: MultilevelNodes): void {
    this.currentNode = event;
    if (event.items === undefined && !event.onSelected) {
      this.selectedItem.emit(event);
    }
  }
}
