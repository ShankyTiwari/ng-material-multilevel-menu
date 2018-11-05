(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/router'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-material-multilevel-menu', ['exports', '@angular/core', '@angular/material', '@angular/router', '@angular/animations', '@angular/common'], factory) :
    (factory((global['ng-material-multilevel-menu'] = {}),global.ng.core,global.ng.material,global.ng.router,global.ng.animations,global.ng.common));
}(this, (function (exports,i0,material,router,animations,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MaterialsModule = (function () {
        function MaterialsModule() {
        }
        MaterialsModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            material.MatIconModule,
                            material.MatListModule,
                            material.MatRippleModule,
                        ],
                        declarations: [],
                        exports: [
                            material.MatIconModule,
                            material.MatListModule,
                            material.MatRippleModule,
                        ]
                    },] },
        ];
        return MaterialsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var MultilevelMenuService = (function () {
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */ MultilevelMenuService.ngInjectableDef = i0.defineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
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
    var NgMaterialMultilevelMenuComponent = (function () {
        function NgMaterialMultilevelMenuComponent(router$$1, multilevelMenuService) {
            this.router = router$$1;
            this.multilevelMenuService = multilevelMenuService;
            this.configuration = null;
            this.selectedItem = new i0.EventEmitter();
            this.selectedLabel = new i0.EventEmitter();
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
                        if (event instanceof router.NavigationEnd) {
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
            { type: i0.Component, args: [{
                        selector: 'ng-material-multilevel-menu',
                        template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node'\n      [selectedNode]='currentNode'\n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>",
                        styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"],
                    },] },
        ];
        NgMaterialMultilevelMenuComponent.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: MultilevelMenuService }
            ];
        };
        NgMaterialMultilevelMenuComponent.propDecorators = {
            items: [{ type: i0.Input }],
            configuration: [{ type: i0.Input }],
            selectedItem: [{ type: i0.Output }],
            selectedLabel: [{ type: i0.Output }]
        };
        return NgMaterialMultilevelMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var ListItemComponent = (function () {
        function ListItemComponent(router$$1, multilevelMenuService) {
            this.router = router$$1;
            this.multilevelMenuService = multilevelMenuService;
            this.level = 1;
            this.nodeConfiguration = null;
            this.selectedItem = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'ng-list-item',
                        template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\" title=\"{{node.label}}\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"node.faIcon\"></i>\n      </span>\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n        {{node.icon}}\n      </mat-icon>\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{node.imageIcon}}\" alt=\"{{node.label}}\"/>\n    </div>    \n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <ng-container *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"hasItems() && expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"hasItems() && expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </ng-container>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\"\n    [nodeConfiguration]='nodeConfiguration'\n    [node]='singleNode'\n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
                        styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"],
                        animations: [
                            animations.trigger('slideInOut', [
                                animations.state('in', animations.style({ height: '*', opacity: 0 })),
                                animations.transition(':leave', [
                                    animations.style({ height: '*', opacity: 0.2 }),
                                    animations.group([
                                        animations.animate(300, animations.style({ height: 0 })),
                                        animations.animate('200ms ease-out', animations.style({ opacity: 0 }))
                                    ])
                                ]),
                                animations.transition(':enter', [
                                    animations.style({ height: '0', opacity: 0 }),
                                    animations.group([
                                        animations.animate(200, animations.style({ height: '*' })),
                                        animations.animate('400ms ease-out', animations.style({ opacity: 1 }))
                                    ])
                                ])
                            ]),
                            animations.trigger('isExpandedLTR', [
                                animations.state('no', animations.style({ transform: 'rotate(-90deg)' })),
                                animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                                animations.transition('no => yes', animations.animate(300)),
                                animations.transition('yes => no', animations.animate(300))
                            ]),
                            animations.trigger('isExpandedRTL', [
                                animations.state('no', animations.style({ transform: 'rotate(90deg)' })),
                                animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                                animations.transition('no => yes', animations.animate(300)),
                                animations.transition('yes => no', animations.animate(300))
                            ])
                        ]
                    },] },
        ];
        ListItemComponent.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: MultilevelMenuService }
            ];
        };
        ListItemComponent.propDecorators = {
            node: [{ type: i0.Input }],
            level: [{ type: i0.Input }],
            selectedNode: [{ type: i0.Input }],
            nodeConfiguration: [{ type: i0.Input }],
            selectedItem: [{ type: i0.Output }]
        };
        return ListItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
     */
    var NgMaterialMultilevelMenuModule = (function () {
        function NgMaterialMultilevelMenuModule() {
        }
        NgMaterialMultilevelMenuModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
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

    exports.NgMaterialMultilevelMenuModule = NgMaterialMultilevelMenuModule;
    exports.ɵd = ListItemComponent;
    exports.ɵa = MaterialsModule;
    exports.ɵc = MultilevelMenuService;
    exports.ɵb = NgMaterialMultilevelMenuComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9tYXRlcmlhbHMubW9kdWxlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2NvbnN0YW50cy50cyIsIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFJpcHBsZU1vZHVsZSxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFJpcHBsZU1vZHVsZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcclxuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcclxuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgdGV4dCA9ICcnO1xyXG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCBub2Rlcy5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgaWYgKGVuY29kZVVSSShub2RlLmxpbmspID09PSBsaW5rKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm91bmRMaW5rT2JqZWN0ID0gbm9kZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLml0ZW1zLCBsaW5rKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXRjaGVkT2JqZWN0QnlVcmwobm9kZTogTXVsdGlsZXZlbE5vZGVzW10sIGxpbms6IHN0cmluZyk6IE11bHRpbGV2ZWxOb2RlcyB7XHJcbiAgICB0aGlzLnJlY3Vyc2l2ZUNoZWNrTGluayhub2RlLCBsaW5rKTtcclxuICAgIHJldHVybiB0aGlzLmZvdW5kTGlua09iamVjdDtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IENPTlNUQU5UID0ge1xyXG4gICAgUEFERElOR19BVF9TVEFSVDogdHJ1ZSxcclxuICAgIERFRkFVTFRfQ0xBU1NfTkFNRTogYGFtbWwtY29udGFpbmVyYCxcclxuICAgIERFRkFVTFRfTElTVF9DTEFTU19OQU1FOiBgYW1tbC1pdGVtYCxcclxuICAgIFNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRTogYHNlbGVjdGVkLWFtbWwtaXRlbWAsXHJcbiAgICBERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I6IGAjMTk3NmQyYCxcclxuICAgIERFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SOiBgdHJhbnNwYXJlbnRgLFxyXG4gICAgREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1I6IGByZ2JhKDAsMCwwLC44NylgLFxyXG4gICAgRVJST1JfTUVTU0FHRTogYEludmFsaWQgZGF0YSBmb3IgbWF0ZXJpYWwgTXVsdGlsZXZlbCBMaXN0IENvbXBvbmVudGBcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcywgQmFja2dyb3VuZFN0eWxlIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9J2l0ZW1zLmxlbmd0aCAhPT0gMCcgW2Rpcl09XCJpc1J0bExheW91dCgpID8gJ3J0bCcgOiAnbHRyJ1wiPlxyXG4gIDxtYXQtbGlzdD5cclxuICAgIDxuZy1saXN0LWl0ZW1cclxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXNcIlxyXG4gICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlnJ1xyXG4gICAgICBbbm9kZV09J25vZGUnXHJcbiAgICAgIFtzZWxlY3RlZE5vZGVdPSdjdXJyZW50Tm9kZSdcclxuICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcclxuICAgIFwiPlxyXG4gICAgPC9uZy1saXN0LWl0ZW0+XHJcbiAgPC9tYXQtbGlzdD5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLmFtbWwtaXRlbXtsaW5lLWhlaWdodDo0OHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtwb3NpdGlvbjpyZWxhdGl2ZX0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0fS5hbW1sLWljb24tZmF7Zm9udC1zaXplOjIwcHh9LmFtbWwtaWNvbntsaW5lLWhlaWdodDo0OHB4fS5hY3RpdmV7Y29sb3I6IzE5NzZkMn1kaXZbZGlyPWx0cl0gLmFtbWwtaWNvbnttYXJnaW4tcmlnaHQ6MTVweH1kaXZbZGlyPWx0cl0gLmFtbWwtc3VibWVudXttYXJnaW4tbGVmdDoxNnB4fWRpdltkaXI9cnRsXSAuYW1tbC1pY29ue21hcmdpbi1sZWZ0OjE1cHh9ZGl2W2Rpcj1ydGxdIC5hbW1sLXN1Ym1lbnV7bWFyZ2luLXJpZ2h0OjE2cHh9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaXRlbXM6IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRMYWJlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIGN1cnJlbnROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHBhZGRpbmdBdFN0YXJ0OiB0cnVlLFxyXG4gICAgbGlzdEJhY2tncm91bmRDb2xvcjogbnVsbCxcclxuICAgIGZvbnRDb2xvcjogbnVsbCxcclxuICAgIHNlbGVjdGVkTGlzdEZvbnRDb2xvcjogbnVsbCxcclxuICAgIGludGVyZmFjZVdpdGhSb3V0ZTogbnVsbCxcclxuICAgIGNvbGxhcHNlT25TZWxlY3Q6IG51bGwsXHJcbiAgICBoaWdobGlnaHRPblNlbGVjdDogZmFsc2UsXHJcbiAgICBydGxMYXlvdXQ6IGZhbHNlLFxyXG4gIH07XHJcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7IH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZGRhdGEoKTtcclxuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xyXG4gIH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gJycgJiZcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKGV2ZW50LnVybCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKHRoaXMuaXRlbXMsIHVybCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IG51bGwgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09ICcnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IGZvdW5kTm9kZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNoZWNrVmFsaWRkYXRhKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XHJcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcclxuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucGFkZGluZ0F0U3RhcnQgPSBjb25maWcucGFkZGluZ0F0U3RhcnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLnJ0bExheW91dCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5ydGxMYXlvdXQgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcucnRsTGF5b3V0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0ID0gY29uZmlnLnJ0bExheW91dDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRX0gJHt0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xyXG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0O1xyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcclxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICghZXZlbnQub25TZWxlY3RlZCB8fCB0eXBlb2YgZXZlbnQub25TZWxlY3RlZCAhPT0gJ2Z1bmN0aW9uJykgKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZExhYmVsLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBzdGF0ZSwgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBMaXN0U3R5bGUgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1saXN0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1saXN0LWl0ZW0gbWF0UmlwcGxlIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIiAqbmdJZj1cIiFub2RlLmhpZGRlblwiIChjbGljayk9XCJleHBhbmQobm9kZSlcIiB0aXRsZT1cInt7bm9kZS5sYWJlbH19XCJcclxuICBbbmdTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJhbm1sLWRhdGFcIiBbZGlyXT1cImlzUnRsTGF5b3V0KCkgPyAncnRsJyA6ICdsdHInXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIiBbbmdTd2l0Y2hdPVwiZ2V0TGlzdEljb24obm9kZSlcIj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidmYWljb24nXCIgY2xhc3M9XCJhbW1sLWljb24gYW1tbC1pY29uLWZhXCI+XHJcbiAgICAgICAgPGkgW25nQ2xhc3NdPVwibm9kZS5mYUljb25cIj48L2k+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICAgPG1hdC1pY29uICpuZ1N3aXRjaENhc2U9XCInaWNvbidcIiBjbGFzcz1cImFtbWwtaWNvblwiPlxyXG4gICAgICAgIHt7bm9kZS5pY29ufX1cclxuICAgICAgPC9tYXQtaWNvbj5cclxuICAgICAgPGltZyBtYXRMaXN0QXZhdGFyICpuZ1N3aXRjaENhc2U9XCInaW1hZ2VpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCIgc3JjPVwie3tub2RlLmltYWdlSWNvbn19XCIgYWx0PVwie3tub2RlLmxhYmVsfX1cIi8+XHJcbiAgICA8L2Rpdj4gICAgXHJcbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj0naGFzSXRlbXMoKSc+XHJcbiAgICA8bWF0LWljb24gKm5nSWY9JyFpc1J0bExheW91dCgpJyBbQGlzRXhwYW5kZWRMVFJdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAgICBrZXlib2FyZF9hcnJvd19kb3duXHJcbiAgICA8L21hdC1pY29uPlxyXG4gICAgPG1hdC1pY29uICpuZ0lmPSdpc1J0bExheW91dCgpJyAgW0Bpc0V4cGFuZGVkUlRMXT1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWQgPyAneWVzJyA6ICdubydcIj5cclxuICAgICAga2V5Ym9hcmRfYXJyb3dfZG93blxyXG4gICAgPC9tYXQtaWNvbj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9tYXQtbGlzdC1pdGVtPlxyXG5cclxuPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XHJcblxyXG48ZGl2ICpuZ0lmPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZFwiIFtAc2xpZGVJbk91dF0gW2Rpcl09XCJpc1J0bExheW91dCgpID8gJ3J0bCcgOiAnbHRyJ1wiIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlblwiXHJcbiAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlndXJhdGlvbidcclxuICAgIFtub2RlXT0nc2luZ2xlTm9kZSdcclxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxyXG4gICAgW3NlbGVjdGVkTm9kZV09J3NlbGVjdGVkTm9kZSdcclxuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XHJcbiAgPC9uZy1saXN0LWl0ZW0+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuYW1tbC1pdGVte2xpbmUtaGVpZ2h0OjQ4cHg7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydDtoZWlnaHQ6NDhweH0uYW1tbC1pY29uLWZhe2ZvbnQtc2l6ZToyMHB4fS5hbW1sLWljb24sLmxhYmVse2xpbmUtaGVpZ2h0OjQ4cHh9ZGl2W2Rpcj1sdHJdIC5hbW1sLWljb257bWFyZ2luLXJpZ2h0OjE2cHh9ZGl2W2Rpcj1sdHJdLmFtbWwtc3VibWVudSxkaXZbZGlyPXJ0bF0gLmFtbWwtaWNvbnttYXJnaW4tbGVmdDoxNnB4fWRpdltkaXI9cnRsXS5hbW1sLXN1Ym1lbnV7bWFyZ2luLXJpZ2h0OjE2cHh9YF0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkTFRSJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgIClcclxuICAgIF0pLFxyXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZFJUTCcsIFtcclxuICAgICAgc3RhdGUoJ25vJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBmaXJzdEluaXRpYWxpemVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZE5vZGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkTm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkQ2xhc3ModGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UucmVjdXJzaXZlQ2hlY2tJZCh0aGlzLm5vZGUsIHRoaXMuc2VsZWN0ZWROb2RlLmlkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGlzRm91bmQpIHtcclxuICAgICAgaWYgKCF0aGlzLmZpcnN0SW5pdGlhbGl6ZXIpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmhpZ2hsaWdodE9uU2VsZWN0IHx8IHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXHJcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cclxuICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA6IHN0eWxlcy5jb2xvciA9IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuICBnZXRMaXN0SWNvbihub2RlOiBNdWx0aWxldmVsTm9kZXMpOiBzdHJpbmcge1xyXG4gICAgaWYgKG5vZGUuaWNvbiAhPT0gbnVsbCAmJiBub2RlLmljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgaWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuZmFJY29uICE9PSBudWxsICYmIG5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5mYUljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgZmFpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5pbWFnZUljb24gIT09IG51bGwgJiYgbm9kZS5pbWFnZUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmltYWdlSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpbWFnZWljb25gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGBgO1xyXG4gICAgfVxyXG4gIH1cclxuICBoYXNJdGVtcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnJ0bExheW91dDtcclxuICB9XHJcbiAgc2V0Q2xhc3NlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xhc3NlcyA9IHtcclxuICAgICAgWydsZXZlbC0nICsgdGhpcy5sZXZlbF06IHRydWUsXHJcbiAgICAgICdhbW1sLXN1Ym1lbnUnOiB0aGlzLmhhc0l0ZW1zKCkgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpXHJcbiAgICB9O1xyXG4gIH1cclxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XHJcbiAgICB0aGlzLmZpcnN0SW5pdGlhbGl6ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcclxuICAgICAgJiYgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGVcclxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcclxuICAgICAgJiYgbm9kZS5saW5rXHJcbiAgICApIHtcclxuICAgICAgaWYgKG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCAhPT0gdW5kZWZpbmVkICYmIG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbm9kZS5saW5rO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub2RlLmxpbmtdKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub2RlLm9uU2VsZWN0ZWQgJiYgdHlwZW9mIG5vZGUub25TZWxlY3RlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBub2RlLm9uU2VsZWN0ZWQobm9kZSk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHNNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFscy5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxzTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQsIExpc3RJdGVtQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51TW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0TGlzdE1vZHVsZSIsIk1hdFJpcHBsZU1vZHVsZSIsIkluamVjdGFibGUiLCJyb3V0ZXIiLCJFdmVudEVtaXR0ZXIiLCJOYXZpZ2F0aW9uRW5kIiwiQ29tcG9uZW50IiwiUm91dGVyIiwiSW5wdXQiLCJPdXRwdXQiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJncm91cCIsImFuaW1hdGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQVFBO1NBYWdDOztvQkFiL0JBLFdBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BDLHNCQUFhOzRCQUNiQyxzQkFB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