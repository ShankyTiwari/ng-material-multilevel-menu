import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MultilevelMenuService } from './multilevel-menu.service';

import { Configuration, MultilevelNodes, BackgroundStyle } from './app.model';
import { CONSTANT } from './constants';

@Component({
  selector: 'ng-material-multilevel-menu',
  templateUrl: './ng-material-multilevel-menu.component.html',
  styleUrls: ['./ng-material-multilevel-menu.component.css'],
})
export class NgMaterialMultilevelMenuComponent implements OnInit {
  @Input() items: MultilevelNodes[];
  @Input() configuration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  currentNode: MultilevelNodes;
  nodeConfig: Configuration = {
    paddingAtStart: true,
    listBackgroundColor: null,
    fontColor: null,
    selectedListFontColor: null
  };
  isInvalidConfig = true;
  isLastItemCliked = false;
  constructor(
    private multilevelMenuService: MultilevelMenuService
  ) { }
  ngOnInit() {
    this.checkValiddata();
    this.detectInvalidConfig();
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
    this.selectedItem.emit(event);
  }
}
