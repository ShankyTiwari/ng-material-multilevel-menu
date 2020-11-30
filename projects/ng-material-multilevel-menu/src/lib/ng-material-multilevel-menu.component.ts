import { Component, OnChanges, OnInit, OnDestroy, Output, EventEmitter, Input, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackgroundStyle, Configuration, MultilevelNodes, ExpandCollapseStatusEnum } from './app.model';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';

@Component({
  selector: 'ng-material-multilevel-menu',
  templateUrl: './ng-material-multilevel-menu.component.html',
  styleUrls: ['./ng-material-multilevel-menu.component.css'],
})
export class NgMaterialMultilevelMenuComponent implements OnInit, OnChanges, OnDestroy {
  @Input() items: MultilevelNodes[];
  @Input() configuration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  @Output() selectedLabel = new EventEmitter<MultilevelNodes>();
  @ContentChild('listTemplate', {static: true}) listTemplate: TemplateRef<ElementRef>;

  expandCollapseStatusSubscription: Subscription = null;
  selectMenuByIDSubscription: Subscription = null;
  currentNode: MultilevelNodes = null;

  nodeConfig: Configuration = {
    paddingAtStart: true,
    listBackgroundColor: null,
    fontColor: null,
    selectedListFontColor: null,
    interfaceWithRoute: null,
    collapseOnSelect: null,
    highlightOnSelect: false,
    useDividers: true,
    rtlLayout: false,
    customTemplate: false,
  };
  isInvalidConfig = true;
  isInvalidData = true;
  nodeExpandCollapseStatus: ExpandCollapseStatusEnum = ExpandCollapseStatusEnum.neutral;

  constructor(
    private router: Router,
    public multilevelMenuService: MultilevelMenuService
  ) { }
  ngOnChanges() {
    this.detectInvalidConfig();
    this.initExpandCollapseStatus();
    this.initSelectedMenuID();
  }
  ngOnInit() {
    if (
      this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
      this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
      this.router.events
        .subscribe((event) => {
          if (event instanceof NavigationEnd) {
            this.updateNodeByURL(event.urlAfterRedirects);
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
      // && !foundNode.disabled // Prevent route redirection for disabled menu
    ) {
      this.currentNode = foundNode;
      if (foundNode.dontEmit !== undefined && foundNode.dontEmit !== null && !foundNode.dontEmit) {
        this.selectedListItem(foundNode);
      }
    }
  }
  checkValidData(): void {
    if (this.items === undefined || (Array.isArray(this.items) && this.items.length === 0)) {
      console.warn(CONSTANT.ERROR_MESSAGE);
    } else {
      this.items = this.items.filter(n => !n.hidden);
      this.multilevelMenuService.addRandomId(this.items);
      this.isInvalidData = false;
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
      if (config.useDividers !== null &&
        config.useDividers !== undefined &&
        typeof config.useDividers === 'boolean') {
        this.nodeConfig.useDividers = config.useDividers;
      }
      if (config.rtlLayout !== null &&
        config.rtlLayout !== undefined &&
        typeof config.rtlLayout === 'boolean') {
        this.nodeConfig.rtlLayout = config.rtlLayout;
      }
      if (config.customTemplate !== null &&
        config.customTemplate !== undefined &&
        typeof config.customTemplate === 'boolean') {
        this.nodeConfig.customTemplate = config.customTemplate;
      }

    }
    this.checkValidData();
  }
  initExpandCollapseStatus(): void {
    this.expandCollapseStatusSubscription = this.multilevelMenuService.expandCollapseStatus$
      .subscribe( (expandCollapseStatus: ExpandCollapseStatusEnum) => {
      this.nodeExpandCollapseStatus = expandCollapseStatus ? expandCollapseStatus : ExpandCollapseStatusEnum.neutral;
    }, () => {
      this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
    });
  }
  initSelectedMenuID(): void {
    this.selectMenuByIDSubscription = this.multilevelMenuService.selectedMenuID$.subscribe( (selectedMenuID: string) => {
      if (selectedMenuID) {
        const foundNode = this.multilevelMenuService.getMatchedObjectById(this.items, selectedMenuID);
        if (foundNode !== undefined) {
          this.currentNode = foundNode;
          this.selectedListItem(foundNode);
        }
      }
    });
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
  isRtlLayout(): boolean {
    return this.nodeConfig.rtlLayout;
  }
  selectedListItem(event: MultilevelNodes): void {
    this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
    this.currentNode = event;
    if (event.dontEmit !== undefined && event.dontEmit !== null && event.dontEmit) {
      return;
    }
    if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function') ) {
      this.selectedItem.emit(event);
    } else {
      this.selectedLabel.emit(event);
    }
  }
  ngOnDestroy() {
    this.expandCollapseStatusSubscription.unsubscribe();
    this.selectMenuByIDSubscription.unsubscribe();
  }
}
