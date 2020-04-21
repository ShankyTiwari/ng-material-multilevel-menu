import { __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, Injectable, EventEmitter, Input, Output, Component, NgModule } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

var CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: "amml-container",
    DEFAULT_LIST_CLASS_NAME: "amml-item",
    SELECTED_LIST_CLASS_NAME: "selected-amml-item",
    ACTIVE_ITEM_CLASS_NAME: "active-amml-item",
    DISABLED_ITEM_CLASS_NAME: "disabled-amml-item",
    DEFAULT_SELECTED_FONT_COLOR: "#1976d2",
    DEFAULT_LIST_BACKGROUND_COLOR: "transparent",
    DEFAULT_LIST_FONT_COLOR: "rgba(0,0,0,.87)",
    ERROR_MESSAGE: "Invalid data for material Multilevel List Component"
};

var MultilevelMenuService = /** @class */ (function () {
    function MultilevelMenuService() {
    }
    MultilevelMenuService.prototype.generateId = function () {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    MultilevelMenuService.prototype.addRandomId = function (nodes) {
        var _this = this;
        nodes.forEach(function (node) {
            node.id = _this.generateId();
            if (node.items !== undefined) {
                _this.addRandomId(node.items);
            }
        });
    };
    MultilevelMenuService.prototype.recursiveCheckId = function (node, nodeId) {
        var _this = this;
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some(function (nestedNode) {
                    return _this.recursiveCheckId(nestedNode, nodeId);
                });
            }
        }
    };
    MultilevelMenuService.prototype.recursiveCheckLink = function (nodes, link) {
        for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            var node = nodes[nodeIndex];
            for (var key in node) {
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
    };
    MultilevelMenuService.prototype.getMatchedObjectByUrl = function (node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    };
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    MultilevelMenuService.prototype.kvDummyComparerFn = function () {
        return 0;
    };
    MultilevelMenuService.ɵprov = ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
    MultilevelMenuService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], MultilevelMenuService);
    return MultilevelMenuService;
}());

var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(router, multilevelMenuService) {
        var _a;
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = false,
            _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = false,
            _a);
    }
    ListItemComponent.prototype.ngOnChanges = function () {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(function (n) { return !n.hidden; }) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    };
    ListItemComponent.prototype.ngOnInit = function () {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (this.node.faIcon !== null &&
            this.node.faIcon !== undefined &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = "fas " + this.node.faIcon;
        }
        this.selectedListClasses["level-" + this.level + "-submenulevel-" + this.submenuLevel] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    };
    ListItemComponent.prototype.setSelectedClass = function (isFound) {
        var _a;
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
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = this.isSelected,
            _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = this.selectedNode.id === this.node.id,
            _a[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled,
            _a["level-" + this.level + "-submenulevel-" + this.submenuLevel] = true,
            _a);
        this.setClasses();
    };
    ListItemComponent.prototype.getPaddingAtStart = function () {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    };
    ListItemComponent.prototype.getListStyle = function () {
        var styles = {
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
    };
    ListItemComponent.prototype.getListIcon = function (node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return "icon";
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return "faicon";
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return "imageicon";
        }
        else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
            return "svgicon";
        }
        else {
            return "";
        }
    };
    ListItemComponent.prototype.getSelectedSvgIcon = function () {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    };
    ListItemComponent.prototype.getSelectedIcon = function () {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    };
    ListItemComponent.prototype.getSelectedFaIcon = function () {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    };
    ListItemComponent.prototype.getSelectedImageIcon = function () {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    };
    ListItemComponent.prototype.hasItems = function () {
        return this.nodeChildren.length > 0 ? true : false;
    };
    ListItemComponent.prototype.isRtlLayout = function () {
        return this.nodeConfiguration.rtlLayout;
    };
    ListItemComponent.prototype.setClasses = function () {
        var _a;
        this.classes = (_a = {},
            _a["level-" + (this.level + 1)] = true,
            _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
            _a);
    };
    ListItemComponent.prototype.expand = function (node) {
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
            if (node.externalRedirect !== undefined && node.externalRedirect) {
                window.location.href = node.link;
            }
            else {
                this.router.navigate([node.link], node.navigationExtras);
            }
        }
        else if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    };
    ListItemComponent.prototype.selectedListItem = function (node) {
        this.selectedItem.emit(node);
    };
    ListItemComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
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
            template: "<mat-list-item matRipple [matRippleDisabled]=\"node.disabled\" [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\"\n  (click)=\"expand(node)\" title=\"{{node.label}}\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n    <a [routerLink]=\"node.link\" class=\"menu-link\">\n      <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n        <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n          <i [ngClass]=\"getSelectedFaIcon()\"></i>\n        </span>\n        <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n          {{getSelectedIcon()}}\n        </mat-icon>\n        <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\n        </mat-icon>\n        <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\" alt=\"{{node.label}}\"/>\n      </div>\n    </a>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n    [nodeConfiguration]='nodeConfiguration'\n    [node]=\"singleNode.value\"\n    [level]=\"level + 1\"\n    [submenuLevel]=\"singleNode.key\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
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
            styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start;height:48px}.disabled-amml-item{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}.amml-svg-icon{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
        }),
        __metadata("design:paramtypes", [Router,
            MultilevelMenuService])
    ], ListItemComponent);
    return ListItemComponent;
}());

var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
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
    return MaterialsModule;
}());

var NgMaterialMultilevelMenuComponent = /** @class */ (function () {
    function NgMaterialMultilevelMenuComponent(router, multilevelMenuService) {
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
    NgMaterialMultilevelMenuComponent.prototype.ngOnChanges = function () {
        this.detectInvalidConfig();
    };
    NgMaterialMultilevelMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe(function (event) {
                if (event instanceof NavigationEnd) {
                    _this.updateNodeByURL(event.url);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.updateNodeByURL = function (url) {
        var foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.checkValidData = function () {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(function (n) { return !n.hidden; });
            this.multilevelMenuService.addRandomId(this.items);
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.detectInvalidConfig = function () {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            var config = this.configuration;
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
            this.checkValidData();
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.getClassName = function () {
        if (this.isInvalidConfig) {
            return CONSTANT.DEFAULT_CLASS_NAME;
        }
        else {
            if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                return CONSTANT.DEFAULT_CLASS_NAME + " " + this.configuration.classname;
            }
            else {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.getGlobalStyle = function () {
        if (!this.isInvalidConfig) {
            var styles = {
                background: null
            };
            if (this.configuration.backgroundColor !== '' &&
                this.configuration.backgroundColor !== null &&
                this.configuration.backgroundColor !== undefined) {
                styles.background = this.configuration.backgroundColor;
            }
            return styles;
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.isRtlLayout = function () {
        return this.nodeConfig.rtlLayout;
    };
    NgMaterialMultilevelMenuComponent.prototype.selectedListItem = function (event) {
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    };
    NgMaterialMultilevelMenuComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
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
            template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>\n",
            styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
        }),
        __metadata("design:paramtypes", [Router,
            MultilevelMenuService])
    ], NgMaterialMultilevelMenuComponent);
    return NgMaterialMultilevelMenuComponent;
}());

var NgMaterialMultilevelMenuModule = /** @class */ (function () {
    function NgMaterialMultilevelMenuModule() {
    }
    NgMaterialMultilevelMenuModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MaterialsModule,
                RouterModule,
            ],
            declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
            exports: [NgMaterialMultilevelMenuComponent]
        })
    ], NgMaterialMultilevelMenuModule);
    return NgMaterialMultilevelMenuModule;
}());

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, MaterialsModule as ɵa, MultilevelMenuService as ɵb, ListItemComponent as ɵc };
//# sourceMappingURL=ng-material-multilevel-menu.js.map
