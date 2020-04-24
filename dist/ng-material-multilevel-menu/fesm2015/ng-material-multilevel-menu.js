import { __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, Injectable, EventEmitter, Input, Output, Component, NgModule } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: `amml-container`,
    DEFAULT_LIST_CLASS_NAME: `amml-item`,
    SELECTED_LIST_CLASS_NAME: `selected-amml-item`,
    ACTIVE_ITEM_CLASS_NAME: `active-amml-item`,
    DISABLED_ITEM_CLASS_NAME: `disabled-amml-item`,
    DEFAULT_SELECTED_FONT_COLOR: `#1976d2`,
    DEFAULT_LIST_BACKGROUND_COLOR: `transparent`,
    DEFAULT_LIST_FONT_COLOR: `rgba(0,0,0,.87)`,
    DEFAULT_HREF_TARGET_TYPE: '_self',
    ERROR_MESSAGE: `Invalid data for material Multilevel List Component`
};

let MultilevelMenuService = class MultilevelMenuService {
    generateId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    addRandomId(nodes) {
        nodes.forEach((node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        });
    }
    recursiveCheckId(node, nodeId) {
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some((nestedNode) => {
                    return this.recursiveCheckId(nestedNode, nodeId);
                });
            }
        }
    }
    recursiveCheckLink(nodes, link) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            const node = nodes[nodeIndex];
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    if (encodeURI(node.link) === link) {
                        this.foundLinkObject = node;
                    }
                    else {
                        if (node.items !== undefined) {
                            this.recursiveCheckLink(node.items, link);
                        }
                    }
                }
            }
        }
    }
    getMatchedObjectByUrl(node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    }
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    kvDummyComparerFn() {
        return 0;
    }
};
MultilevelMenuService.ɵprov = ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
MultilevelMenuService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MultilevelMenuService);

let ListItemComponent = class ListItemComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
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
        if (this.node.faIcon !== null &&
            this.node.faIcon !== undefined &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }
        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }
    setSelectedClass(isFound) {
        if (isFound) {
            if (!this.firstInitializer) {
                this.expanded = true;
            }
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined ? true : false;
        }
        else {
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
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    }
    getListStyle() {
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
        }
        else if (this.nodeConfiguration.fontColor !== null) {
            styles.color = this.nodeConfiguration.fontColor;
        }
        return styles;
    }
    getListIcon(node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return `icon`;
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return `faicon`;
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return `imageicon`;
        }
        else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
            return `svgicon`;
        }
        else {
            return ``;
        }
    }
    getSelectedSvgIcon() {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    }
    getSelectedIcon() {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    }
    getSelectedFaIcon() {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    }
    getSelectedImageIcon() {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    }
    getHrefTargetType() {
        if (this.node.hrefTargetType) {
            return this.node.hrefTargetType;
        }
        return CONSTANT.DEFAULT_HREF_TARGET_TYPE;
    }
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    isRtlLayout() {
        return this.nodeConfiguration.rtlLayout;
    }
    setClasses() {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            'amml-submenu': this.hasItems() && this.getPaddingAtStart()
        };
    }
    expand(node) {
        if (node.disabled) {
            return;
        }
        this.expanded = !this.expanded;
        this.firstInitializer = true;
        this.setClasses();
        if (this.nodeConfiguration.interfaceWithRoute !== null
            && this.nodeConfiguration.interfaceWithRoute
            && node.link !== undefined
            && node.link) {
            this.router.navigate([node.link], node.navigationExtras);
        }
        else if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    }
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
};
ListItemComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "level", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "submenuLevel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "selectedNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "nodeConfiguration", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "selectedItem", void 0);
ListItemComponent = __decorate([
    Component({
        selector: 'ng-list-item',
        template: "<mat-list-item matRipple \r\n  *ngIf=\"!node.hidden\"\r\n  title=\"{{node.label}}\"\r\n  [matRippleDisabled]=\"node.disabled\" \r\n  [ngClass]=\"selectedListClasses\"\r\n  [ngStyle]=\"getListStyle()\"\r\n  (click)=\"expand(node)\">\r\n  <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n    [nodeConfiguration]='nodeConfiguration' \r\n    [node]=\"singleNode.value\" \r\n    [level]=\"level + 1\"\r\n    [submenuLevel]=\"singleNode.key\"\r\n    [selectedNode]='selectedNode' \r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n\r\n<ng-template #linkTemplate>\r\n  <a class=\"anml-link\" *ngIf=\"node.externalRedirect\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\r\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\r\n  </a>\r\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect\" [routerLink]=\"node.link\">\r\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelOutlet>\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{getSelectedIcon()}}\r\n      </mat-icon>\r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\r\n        alt=\"{{node.label}}\" />\r\n    </div>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()' [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>",
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
                transition('no => yes', animate(200)),
                transition('yes => no', animate(200))
            ]),
            trigger('isExpandedRTL', [
                state('no', style({ transform: 'rotate(90deg)' })),
                state('yes', style({ transform: 'rotate(0deg)', })),
                transition('no => yes', animate(200)),
                transition('yes => no', animate(200))
            ])
        ],
        styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
    }),
    __metadata("design:paramtypes", [Router,
        MultilevelMenuService])
], ListItemComponent);

let MaterialsModule = class MaterialsModule {
};
MaterialsModule = __decorate([
    NgModule({
        imports: [
            MatIconModule,
            MatListModule,
            MatRippleModule,
        ],
        declarations: [],
        exports: [
            MatIconModule,
            MatListModule,
            MatRippleModule,
        ]
    })
], MaterialsModule);

let NgMaterialMultilevelMenuComponent = class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.selectedItem = new EventEmitter();
        this.selectedLabel = new EventEmitter();
        this.nodeConfig = {
            paddingAtStart: true,
            listBackgroundColor: null,
            fontColor: null,
            selectedListFontColor: null,
            interfaceWithRoute: null,
            collapseOnSelect: null,
            highlightOnSelect: false,
            rtlLayout: false,
        };
        this.isInvalidConfig = true;
    }
    ngOnChanges() {
        this.detectInvalidConfig();
    }
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
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
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    }
    checkValidData() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
        }
    }
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
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
            if (config.rtlLayout !== null &&
                config.rtlLayout !== undefined &&
                typeof config.rtlLayout === 'boolean') {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
        }
        this.checkValidData();
    }
    getClassName() {
        if (this.isInvalidConfig) {
            return CONSTANT.DEFAULT_CLASS_NAME;
        }
        else {
            if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
            }
            else {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
        }
    }
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            const styles = {
                background: null
            };
            if (this.configuration.backgroundColor !== '' &&
                this.configuration.backgroundColor !== null &&
                this.configuration.backgroundColor !== undefined) {
                styles.background = this.configuration.backgroundColor;
            }
            return styles;
        }
    }
    isRtlLayout() {
        return this.nodeConfig.rtlLayout;
    }
    selectedListItem(event) {
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    }
};
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgMaterialMultilevelMenuComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgMaterialMultilevelMenuComponent.prototype, "configuration", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NgMaterialMultilevelMenuComponent.prototype, "selectedItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NgMaterialMultilevelMenuComponent.prototype, "selectedLabel", void 0);
NgMaterialMultilevelMenuComponent = __decorate([
    Component({
        selector: 'ng-material-multilevel-menu',
        template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      (selectedItem)=\"selectedListItem($event)\r\n    \">\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n",
        styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
    }),
    __metadata("design:paramtypes", [Router,
        MultilevelMenuService])
], NgMaterialMultilevelMenuComponent);

let NgMaterialMultilevelMenuModule = class NgMaterialMultilevelMenuModule {
};
NgMaterialMultilevelMenuModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            MaterialsModule,
            RouterModule,
        ],
        declarations: [
            NgMaterialMultilevelMenuComponent,
            ListItemComponent,
        ],
        exports: [NgMaterialMultilevelMenuComponent]
    })
], NgMaterialMultilevelMenuModule);

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, MaterialsModule as ɵa, MultilevelMenuService as ɵb, ListItemComponent as ɵc };
//# sourceMappingURL=ng-material-multilevel-menu.js.map
