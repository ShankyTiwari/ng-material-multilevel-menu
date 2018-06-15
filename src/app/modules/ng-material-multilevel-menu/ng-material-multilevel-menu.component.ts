import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, state, group } from '@angular/animations';

import { Configuration } from './interfaces/configuration';

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
  @Input() configuration: Configuration = null;
  isInvalidConfig: boolean = null;
  ngOnInit() {
    this.detectInvalidConfig();
    this.initializeList();
  }
  detectInvalidConfig(): void {
    if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
      this.isInvalidConfig = true;
    } else {
      this.isInvalidConfig = false;
    }
  }
  initializeList(): void {
    if (this.items !== undefined && this.items !== null && this.items !== '') {
      this.items.forEach((item) => {
        item['expanded'] = false;
      });
    }
  }
  getPaddingAtStart(){
    if (!this.isInvalidConfig) {
      const config = this.configuration;
      if (config.paddingAtStart !== undefined && config.paddingAtStart !== null && typeof config.paddingAtStart === 'boolean' ) {
        return config.paddingAtStart ? true : false;
      } else {
        return true;
      }
    } else {
      return true
    }
  }
  getClassName(): string {
    if (this.isInvalidConfig) {
      return `amml-container`;
    } else {
      if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
        return `amml-container ${this.configuration.classname}`;
      } else {
        return `amml-container`;
      }
    }
  }
  getListStyle() {
    if (!this.isInvalidConfig) {
      const styles = {};
      if (this.configuration.backgroundColor !== '' && this.configuration.backgroundColor !== null && this.configuration.backgroundColor !== undefined) {
        styles[`background`] = this.configuration.backgroundColor;
      }
      if (this.configuration.listBackgroundColor !== '' && this.configuration.listBackgroundColor !== null && this.configuration.listBackgroundColor !== undefined) {
        styles[`background`] = this.configuration.listBackgroundColor;
      }
      if (this.configuration.fontColor !== '' && this.configuration.fontColor !== null && this.configuration.fontColor !== undefined) {
        styles[`color`] = this.configuration.fontColor;
      }
      return styles;
    }
  }
  getGlobalStyle(){
    if (!this.isInvalidConfig) {
      const styles = {};
      if (this.configuration.backgroundColor !== '' && this.configuration.backgroundColor !== null && this.configuration.backgroundColor !== undefined) {
        styles[`background`] = this.configuration.backgroundColor;
      }
      return styles;
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
