import { NgModule, Injectable, Component, Input, Output, EventEmitter, defineInjectable } from '@angular/core';
import { MatIconModule, MatListModule, MatRippleModule } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
    MaterialsModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    return MaterialsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var MultilevelMenuService = /** @class */ (function () {
    function MultilevelMenuService() {
    }
    /**
     * @return {?}
     */
    MultilevelMenuService.prototype.generateId = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var text = '';
        /** @type {?} */
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    /**
     * @param {?} nodes
     * @return {?}
     */
    MultilevelMenuService.prototype.addRandomId = /**
     * @param {?} nodes
     * @return {?}
     */
    function (nodes) {
        var _this = this;
        nodes.forEach(function (node) {
            node.id = _this.generateId();
            if (node.items !== undefined) {
                _this.addRandomId(node.items);
            }
        });
    };
    /**
     * @param {?} node
     * @param {?} nodeId
     * @return {?}
     */
    MultilevelMenuService.prototype.recursiveCheckId = /**
     * @param {?} node
     * @param {?} nodeId
     * @return {?}
     */
    function (node, nodeId) {
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
    /**
     * @param {?} nodes
     * @param {?} link
     * @return {?}
     */
    MultilevelMenuService.prototype.recursiveCheckLink = /**
     * @param {?} nodes
     * @param {?} link
     * @return {?}
     */
    function (nodes, link) {
        for (var nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            /** @type {?} */
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
    /**
     * @param {?} node
     * @param {?} link
     * @return {?}
     */
    MultilevelMenuService.prototype.getMatchedObjectByUrl = /**
     * @param {?} node
     * @param {?} link
     * @return {?}
     */
    function (node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    };
    MultilevelMenuService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ MultilevelMenuService.ngInjectableDef = defineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
    return MultilevelMenuService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
var CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: "amml-container",
    DEFAULT_LIST_CLASS_NAME: "amml-item",
    SELECTED_LIST_CLASS_NAME: "selected-amml-item",
    DEFAULT_SELECTED_FONT_COLOR: "#1976d2",
    DEFAULT_LIST_BACKGROUND_COLOR: "transparent",
    DEFAULT_LIST_FONT_COLOR: "rgba(0,0,0,.87)",
    ERROR_MESSAGE: "Invalid data for material Multilevel List Component"
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.checkValiddata();
        this.detectInvalidConfig();
    };
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    /**
     * @param {?} url
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.updateNodeByURL = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        /** @type {?} */
        var foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== '') {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    };
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.checkValiddata = /**
     * @return {?}
     */
    function () {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(function (n) { return !n.hidden; });
            this.multilevelMenuService.addRandomId(this.items);
        }
    };
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.detectInvalidConfig = /**
     * @return {?}
     */
    function () {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            /** @type {?} */
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
        }
    };
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.getClassName = /**
     * @return {?}
     */
    function () {
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
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.getGlobalStyle = /**
     * @return {?}
     */
    function () {
        if (!this.isInvalidConfig) {
            /** @type {?} */
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
    /**
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.isRtlLayout = /**
     * @return {?}
     */
    function () {
        return this.nodeConfig.rtlLayout;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgMaterialMultilevelMenuComponent.prototype.selectedListItem = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    };
    NgMaterialMultilevelMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-material-multilevel-menu',
                    template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node'\n      [selectedNode]='currentNode'\n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>",
                    styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"],
                },] },
    ];
    NgMaterialMultilevelMenuComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
    NgMaterialMultilevelMenuComponent.propDecorators = {
        items: [{ type: Input }],
        configuration: [{ type: Input }],
        selectedItem: [{ type: Output }],
        selectedLabel: [{ type: Output }]
    };
    return NgMaterialMultilevelMenuComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = false,
            _a);
        var _a;
    }
    /**
     * @return {?}
     */
    ListItemComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(function (n) { return !n.hidden; }) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    };
    /**
     * @param {?} isFound
     * @return {?}
     */
    ListItemComponent.prototype.setSelectedClass = /**
     * @param {?} isFound
     * @return {?}
     */
    function (isFound) {
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
            _a);
        this.setClasses();
        var _a;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getPaddingAtStart = /**
     * @return {?}
     */
    function () {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getListStyle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
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
    /**
     * @param {?} node
     * @return {?}
     */
    ListItemComponent.prototype.getListIcon = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return "icon";
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return "faicon";
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return "imageicon";
        }
        else {
            return "";
        }
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.hasItems = /**
     * @return {?}
     */
    function () {
        return this.nodeChildren.length > 0 ? true : false;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.isRtlLayout = /**
     * @return {?}
     */
    function () {
        return this.nodeConfiguration.rtlLayout;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.setClasses = /**
     * @return {?}
     */
    function () {
        this.classes = (_a = {},
            _a['level-' + this.level] = true,
            _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
            _a);
        var _a;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ListItemComponent.prototype.expand = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
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
                this.router.navigate([node.link]);
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
    /**
     * @param {?} node
     * @return {?}
     */
    ListItemComponent.prototype.selectedListItem = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        this.selectedItem.emit(node);
    };
    ListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-list-item',
                    template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\" title=\"{{node.label}}\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"node.faIcon\"></i>\n      </span>\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n        {{node.icon}}\n      </mat-icon>\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{node.imageIcon}}\" alt=\"{{node.label}}\"/>\n    </div>    \n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <ng-container *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"hasItems() && expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"hasItems() && expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </ng-container>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\"\n    [nodeConfiguration]='nodeConfiguration'\n    [node]='singleNode'\n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
                    styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"],
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
                        trigger('isExpandedLTR', [
                            state('no', style({ transform: 'rotate(-90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(300)),
                            transition('yes => no', animate(300))
                        ]),
                        trigger('isExpandedRTL', [
                            state('no', style({ transform: 'rotate(90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(300)),
                            transition('yes => no', animate(300))
                        ])
                    ]
                },] },
    ];
    ListItemComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
    ListItemComponent.propDecorators = {
        node: [{ type: Input }],
        level: [{ type: Input }],
        selectedNode: [{ type: Input }],
        nodeConfiguration: [{ type: Input }],
        selectedItem: [{ type: Output }]
    };
    return ListItemComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgMaterialMultilevelMenuModule = /** @class */ (function () {
    function NgMaterialMultilevelMenuModule() {
    }
    NgMaterialMultilevelMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MaterialsModule
                    ],
                    declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
                    exports: [NgMaterialMultilevelMenuComponent]
                },] },
    ];
    return NgMaterialMultilevelMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NgMaterialMultilevelMenuModule, ListItemComponent as ɵd, MaterialsModule as ɵa, MultilevelMenuService as ɵc, NgMaterialMultilevelMenuComponent as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL21hdGVyaWFscy5tb2R1bGUudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvY29uc3RhbnRzLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQudHMiLCJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9saWIvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtcclxuICBNYXRJY29uTW9kdWxlLFxyXG4gIE1hdExpc3RNb2R1bGUsXHJcbiAgTWF0UmlwcGxlTW9kdWxlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIE1hdExpc3RNb2R1bGUsXHJcbiAgICBNYXRSaXBwbGVNb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsc01vZHVsZSB7IH1cclxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xyXG4gIGZvdW5kTGlua09iamVjdDogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIGdlbmVyYXRlSWQoKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZXh0ID0gJyc7XHJcbiAgICBjb25zdCBwb3NzaWJsZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDIwOyBpKyspIHtcclxuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgYWRkUmFuZG9tSWQobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdKTogdm9pZCB7XHJcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcclxuICAgICAgbm9kZS5pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5hZGRSYW5kb21JZChub2RlLml0ZW1zKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJlY3Vyc2l2ZUNoZWNrSWQobm9kZTogTXVsdGlsZXZlbE5vZGVzLCBub2RlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKG5vZGUuaWQgPT09IG5vZGVJZCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5pdGVtcy5zb21lKChuZXN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlY3Vyc2l2ZUNoZWNrSWQobmVzdGVkTm9kZSwgbm9kZUlkKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0xpbmsobm9kZXM6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IG5vZGVJbmRleCA9IDA7IG5vZGVJbmRleCA8IG5vZGVzLmxlbmd0aDsgbm9kZUluZGV4KyspIHtcclxuICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW25vZGVJbmRleF07XHJcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIG5vZGUpIHtcclxuICAgICAgICBpZiAobm9kZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICBpZiAoZW5jb2RlVVJJKG5vZGUubGluaykgPT09IGxpbmspIHtcclxuICAgICAgICAgICAgdGhpcy5mb3VuZExpbmtPYmplY3QgPSBub2RlO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUuaXRlbXMsIGxpbmspO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1hdGNoZWRPYmplY3RCeVVybChub2RlOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogTXVsdGlsZXZlbE5vZGVzIHtcclxuICAgIHRoaXMucmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGUsIGxpbmspO1xyXG4gICAgcmV0dXJuIHRoaXMuZm91bmRMaW5rT2JqZWN0O1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgQ09OU1RBTlQgPSB7XHJcbiAgICBQQURESU5HX0FUX1NUQVJUOiB0cnVlLFxyXG4gICAgREVGQVVMVF9DTEFTU19OQU1FOiBgYW1tbC1jb250YWluZXJgLFxyXG4gICAgREVGQVVMVF9MSVNUX0NMQVNTX05BTUU6IGBhbW1sLWl0ZW1gLFxyXG4gICAgU0VMRUNURURfTElTVF9DTEFTU19OQU1FOiBgc2VsZWN0ZWQtYW1tbC1pdGVtYCxcclxuICAgIERFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjogYCMxOTc2ZDJgLFxyXG4gICAgREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1I6IGB0cmFuc3BhcmVudGAsXHJcbiAgICBERUZBVUxUX0xJU1RfRk9OVF9DT0xPUjogYHJnYmEoMCwwLDAsLjg3KWAsXHJcbiAgICBFUlJPUl9NRVNTQUdFOiBgSW52YWxpZCBkYXRhIGZvciBtYXRlcmlhbCBNdWx0aWxldmVsIExpc3QgQ29tcG9uZW50YFxyXG59O1xyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBCYWNrZ3JvdW5kU3R5bGUgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWUoKVwiIFtuZ1N0eWxlXT1cImdldEdsb2JhbFN0eWxlKClcIiAqbmdJZj0naXRlbXMubGVuZ3RoICE9PSAwJyBbZGlyXT1cImlzUnRsTGF5b3V0KCkgPyAncnRsJyA6ICdsdHInXCI+XHJcbiAgPG1hdC1saXN0PlxyXG4gICAgPG5nLWxpc3QtaXRlbVxyXG4gICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiBpdGVtc1wiXHJcbiAgICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWcnXHJcbiAgICAgIFtub2RlXT0nbm9kZSdcclxuICAgICAgW3NlbGVjdGVkTm9kZV09J2N1cnJlbnROb2RlJ1xyXG4gICAgICAoc2VsZWN0ZWRJdGVtKT1cInNlbGVjdGVkTGlzdEl0ZW0oJGV2ZW50KVxyXG4gICAgXCI+XHJcbiAgICA8L25nLWxpc3QtaXRlbT5cclxuICA8L21hdC1saXN0PlxyXG48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2AuYW1tbC1pdGVte2xpbmUtaGVpZ2h0OjQ4cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO3Bvc2l0aW9uOnJlbGF0aXZlfS5hbm1sLWRhdGF7d2lkdGg6MTAwJTt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3RhcnR9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHh9LmFjdGl2ZXtjb2xvcjojMTk3NmQyfWRpdltkaXI9bHRyXSAuYW1tbC1pY29ue21hcmdpbi1yaWdodDoxNXB4fWRpdltkaXI9bHRyXSAuYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9ZGl2W2Rpcj1ydGxdIC5hbW1sLWljb257bWFyZ2luLWxlZnQ6MTVweH1kaXZbZGlyPXJ0bF0gLmFtbWwtc3VibWVudXttYXJnaW4tcmlnaHQ6MTZweH1gXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpdGVtczogTXVsdGlsZXZlbE5vZGVzW107XHJcbiAgQElucHV0KCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZExhYmVsID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxyXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcclxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZSxcclxuICAgIHJ0bExheW91dDogZmFsc2UsXHJcbiAgfTtcclxuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHsgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5jaGVja1ZhbGlkZGF0YSgpO1xyXG4gICAgdGhpcy5kZXRlY3RJbnZhbGlkQ29uZmlnKCk7XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSAnJyAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwodGhpcy5yb3V0ZXIudXJsKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcclxuICAgIGlmIChcclxuICAgICAgZm91bmROb2RlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gJydcclxuICAgICkge1xyXG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tWYWxpZGRhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKTtcclxuICAgICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uID09PSBudWxsIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gJycpIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcclxuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xyXG4gICAgICBpZiAoY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSB1bmRlZmluZWQgJiYgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSBudWxsICYmIHR5cGVvZiBjb25maWcucGFkZGluZ0F0U3RhcnQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmZvbnRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID0gY29uZmlnLmNvbGxhcHNlT25TZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcucnRsTGF5b3V0ICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLnJ0bExheW91dCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5ydGxMYXlvdXQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQgPSBjb25maWcucnRsTGF5b3V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gJycgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQ7XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50Tm9kZSA9IGV2ZW50O1xyXG4gICAgaWYgKGV2ZW50Lml0ZW1zID09PSB1bmRlZmluZWQgJiYgKCFldmVudC5vblNlbGVjdGVkIHx8IHR5cGVvZiBldmVudC5vblNlbGVjdGVkICE9PSAnZnVuY3Rpb24nKSApIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGFiZWwuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIHN0YXRlLCBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMsIExpc3RTdHlsZSB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGUgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCIgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxyXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiIFtuZ1N3aXRjaF09XCJnZXRMaXN0SWNvbihub2RlKVwiPlxyXG4gICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2ZhaWNvbidcIiBjbGFzcz1cImFtbWwtaWNvbiBhbW1sLWljb24tZmFcIj5cclxuICAgICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8bWF0LWljb24gKm5nU3dpdGNoQ2FzZT1cIidpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgICAge3tub2RlLmljb259fVxyXG4gICAgICA8L21hdC1pY29uPlxyXG4gICAgICA8aW1nIG1hdExpc3RBdmF0YXIgKm5nU3dpdGNoQ2FzZT1cIidpbWFnZWljb24nXCIgY2xhc3M9XCJhbW1sLWljb25cIiBzcmM9XCJ7e25vZGUuaW1hZ2VJY29ufX1cIiBhbHQ9XCJ7e25vZGUubGFiZWx9fVwiLz5cclxuICAgIDwvZGl2PiAgICBcclxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57e25vZGUubGFiZWx9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPSdoYXNJdGVtcygpJz5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj0nIWlzUnRsTGF5b3V0KCknIFtAaXNFeHBhbmRlZExUUl09XCJoYXNJdGVtcygpICYmIGV4cGFuZGVkID8gJ3llcycgOiAnbm8nXCI+XHJcbiAgICAgIGtleWJvYXJkX2Fycm93X2Rvd25cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8bWF0LWljb24gKm5nSWY9J2lzUnRsTGF5b3V0KCknICBbQGlzRXhwYW5kZWRSVExdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAgICBrZXlib2FyZF9hcnJvd19kb3duXHJcbiAgICA8L21hdC1pY29uPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L21hdC1saXN0LWl0ZW0+XHJcblxyXG48bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cclxuXHJcbjxkaXYgKm5nSWY9XCJoYXNJdGVtcygpICYmIGV4cGFuZGVkXCIgW0BzbGlkZUluT3V0XSBbZGlyXT1cImlzUnRsTGF5b3V0KCkgPyAncnRsJyA6ICdsdHInXCIgW25nQ2xhc3NdPVwiY2xhc3Nlc1wiPlxyXG4gIDxuZy1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IHNpbmdsZU5vZGUgb2Ygbm9kZUNoaWxkcmVuXCJcclxuICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWd1cmF0aW9uJ1xyXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJ1xyXG4gICAgW2xldmVsXT1cImxldmVsICsgMVwiXHJcbiAgICBbc2VsZWN0ZWROb2RlXT0nc2VsZWN0ZWROb2RlJ1xyXG4gICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIj5cclxuICA8L25nLWxpc3QtaXRlbT5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcn0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0O2hlaWdodDo0OHB4fS5hbW1sLWljb24tZmF7Zm9udC1zaXplOjIwcHh9LmFtbWwtaWNvbiwubGFiZWx7bGluZS1oZWlnaHQ6NDhweH1kaXZbZGlyPWx0cl0gLmFtbWwtaWNvbnttYXJnaW4tcmlnaHQ6MTZweH1kaXZbZGlyPWx0cl0uYW1tbC1zdWJtZW51LGRpdltkaXI9cnRsXSAuYW1tbC1pY29ue21hcmdpbi1sZWZ0OjE2cHh9ZGl2W2Rpcj1ydGxdLmFtbWwtc3VibWVudXttYXJnaW4tcmlnaHQ6MTZweH1gXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xyXG4gICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwIH0pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDMwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzAnLCBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRMVFInLCBbXHJcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkUlRMJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIEBJbnB1dCgpIGxldmVsID0gMTtcclxuICBASW5wdXQoKSBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIGlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgc2VsZWN0ZWRMaXN0Q2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBleHBhbmRlZCA9IGZhbHNlO1xyXG4gIGZpcnN0SW5pdGlhbGl6ZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZyB7XHJcbiAgICBpZiAobm9kZS5pY29uICE9PSBudWxsICYmIG5vZGUuaWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5mYUljb24gIT09IG51bGwgJiYgbm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmZhSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBmYWljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLmltYWdlSWNvbiAhPT0gbnVsbCAmJiBub2RlLmltYWdlSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaW1hZ2VJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYGltYWdlaWNvbmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYGA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucnRsTGF5b3V0O1xyXG4gIH1cclxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc2VzID0ge1xyXG4gICAgICBbJ2xldmVsLScgKyB0aGlzLmxldmVsXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgICAmJiBub2RlLmxpbmtcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUub25TZWxlY3RlZCAmJiB0eXBlb2Ygbm9kZS5vblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLml0ZW1zID09PSB1bmRlZmluZWQgfHwgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdGVyaWFsc01vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWxzLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgfSBmcm9tICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRlcmlhbHNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCwgTGlzdEl0ZW1Db21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7SUFRQTtLQWFnQzs7Z0JBYi9CLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGVBQWU7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1AsYUFBYTt3QkFDYixhQUFhO3dCQUNiLGVBQWU7cUJBQ2hCO2lCQUNGOztJQUM4QixzQkFBQztDQUFBOzs7Ozs7QUNyQmhDO0lBR0E7S0FvREM7Ozs7SUEvQ0MsMENBQVU7OztJQUFWOztZQUNNLElBQUksR0FBRyxFQUFFOztZQUNQLFFBQVEsR0FBRyxnRUFBZ0U7UUFDakYsS0FBSyxJQUFJLENBQUMs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