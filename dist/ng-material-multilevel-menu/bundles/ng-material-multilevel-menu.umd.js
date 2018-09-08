(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/router'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-material-multilevel-menu', ['exports', '@angular/core', '@angular/material', '@angular/router', '@angular/animations', '@angular/common'], factory) :
    (factory((global['ng-material-multilevel-menu'] = {}),global.ng.core,global.ng.material,global.ng.router,global.ng.animations,global.ng.common));
}(this, (function (exports,i0,material,router,animations,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                            if (node.link === link) {
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CONSTANT = {
        PADDING_AT_START: true,
        DEFAULT_CLASS_NAME: "amml-container",
        DEFAULT_LIST_CLASS_NAME: "amml-item",
        SELECTED_LIST_CLASS_NAME: "selected-amml-item",
        DEFAULT_SELECTED_FONT_COLOR: "#1976d2",
        DEFAULT_LIST_BACKGROUND_COLOR: "#fff",
        DEFAULT_LIST_FONT_COLOR: "rgba(0,0,0,.87)",
        ERROR_MESSAGE: "Invalid data for material Multilevel List Component"
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgMaterialMultilevelMenuComponent = (function () {
        function NgMaterialMultilevelMenuComponent(router$$1, multilevelMenuService) {
            this.router = router$$1;
            this.multilevelMenuService = multilevelMenuService;
            this.configuration = null;
            this.selectedItem = new i0.EventEmitter();
            this.nodeConfig = {
                paddingAtStart: true,
                listBackgroundColor: null,
                fontColor: null,
                selectedListFontColor: null,
                interfaceWithRoute: null,
                collapseOnSelect: null,
                highlightOnSelect: false
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
         * @param {?} event
         * @return {?}
         */
        NgMaterialMultilevelMenuComponent.prototype.selectedListItem = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                this.currentNode = event;
                if (event.items === undefined && !event.onSelected) {
                    this.selectedItem.emit(event);
                }
            };
        NgMaterialMultilevelMenuComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-material-multilevel-menu',
                        template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0'>\n  <mat-list>\n    <ng-list-item \n      *ngFor=\"let node of items\" \n      [nodeConfiguration]='nodeConfig' \n      [node]='node' \n      [selectedNode]='currentNode' \n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>",
                        styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.amml-submenu{margin-left:16px}.active{color:#1976d2}"],
                    },] },
        ];
        /** @nocollapse */
        NgMaterialMultilevelMenuComponent.ctorParameters = function () {
            return [
                { type: router.Router },
                { type: MultilevelMenuService }
            ];
        };
        NgMaterialMultilevelMenuComponent.propDecorators = {
            items: [{ type: i0.Input }],
            configuration: [{ type: i0.Input }],
            selectedItem: [{ type: i0.Output }]
        };
        return NgMaterialMultilevelMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
                    this.expanded = true;
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
        ListItemComponent.prototype.setClasses = /**
         * @return {?}
         */
            function () {
                this.classes = (_a = {},
                    _a['level-' + this.level] = true,
                    _a['amml-submenu'] = this.hasItems() && this.expanded && this.getPaddingAtStart(),
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
                this.setClasses();
                if (node.onSelected) {
                    node.onSelected(node);
                    this.selectedListItem(node);
                }
                else if (this.nodeConfiguration.interfaceWithRoute !== null
                    && this.nodeConfiguration.interfaceWithRoute
                    && node.link !== undefined) {
                    if (node.externalRedirect !== undefined && node.externalRedirect) {
                        window.location.href = node.link;
                    }
                    else {
                        this.router.navigate([node.link]);
                    }
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
                        template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\" title=\"{{node.label}}\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\">\n    <span *ngIf=\"node.faIcon\" class=\"amml-icon amml-icon-fa\">\n      <i [ngClass]=\"node.faIcon\"></i>\n    </span>\n    <mat-icon *ngIf=\"node.icon\" class=\"amml-icon\">\n      {{node.icon}}\n    </mat-icon>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <mat-icon *ngIf='hasItems()' [@isExpanded]=\"hasItems() && expanded ? 'yes' : 'no'\">\n    keyboard_arrow_down\n  </mat-icon>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\" \n    [nodeConfiguration]='nodeConfiguration' \n    [node]='singleNode' \n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
                        styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.label{line-height:48px}.amml-submenu{margin-left:16px}"],
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
                            animations.trigger('isExpanded', [
                                animations.state('no', animations.style({ transform: 'rotate(-90deg)' })),
                                animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                                animations.transition('no => yes', animations.animate(300)),
                                animations.transition('yes => no', animations.animate(300))
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgMaterialMultilevelMenuModule = NgMaterialMultilevelMenuModule;
    exports.ɵd = ListItemComponent;
    exports.ɵa = MaterialsModule;
    exports.ɵc = MultilevelMenuService;
    exports.ɵb = NgMaterialMultilevelMenuComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9tYXRlcmlhbHMubW9kdWxlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2NvbnN0YW50cy50cyIsIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFJpcHBsZU1vZHVsZSxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFJpcHBsZU1vZHVsZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcclxuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcclxuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgdGV4dCA9ICcnO1xyXG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCBub2Rlcy5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgaWYgKG5vZGUubGluayA9PT0gbGluaykge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xyXG4gICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZSwgbGluayk7XHJcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVCA9IHtcclxuICAgIFBBRERJTkdfQVRfU1RBUlQ6IHRydWUsXHJcbiAgICBERUZBVUxUX0NMQVNTX05BTUU6IGBhbW1sLWNvbnRhaW5lcmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRTogYGFtbWwtaXRlbWAsXHJcbiAgICBTRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUU6IGBzZWxlY3RlZC1hbW1sLWl0ZW1gLFxyXG4gICAgREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SOiBgIzE5NzZkMmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUjogYCNmZmZgLFxyXG4gICAgREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1I6IGByZ2JhKDAsMCwwLC44NylgLFxyXG4gICAgRVJST1JfTUVTU0FHRTogYEludmFsaWQgZGF0YSBmb3IgbWF0ZXJpYWwgTXVsdGlsZXZlbCBMaXN0IENvbXBvbmVudGBcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcywgQmFja2dyb3VuZFN0eWxlIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9J2l0ZW1zLmxlbmd0aCAhPT0gMCc+XHJcbiAgPG1hdC1saXN0PlxyXG4gICAgPG5nLWxpc3QtaXRlbSBcclxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXNcIiBcclxuICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZycgXHJcbiAgICAgIFtub2RlXT0nbm9kZScgXHJcbiAgICAgIFtzZWxlY3RlZE5vZGVdPSdjdXJyZW50Tm9kZScgXHJcbiAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXHJcbiAgICBcIj5cclxuICAgIDwvbmctbGlzdC1pdGVtPlxyXG4gIDwvbWF0LWxpc3Q+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cG9zaXRpb246cmVsYXRpdmV9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9LmFjdGl2ZXtjb2xvcjojMTk3NmQyfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxyXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcclxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZVxyXG4gIH07XHJcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7IH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZGRhdGEoKTtcclxuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xyXG4gIH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gJycgJiZcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKGV2ZW50LnVybCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKHRoaXMuaXRlbXMsIHVybCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IG51bGwgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09ICcnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IGZvdW5kTm9kZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNoZWNrVmFsaWRkYXRhKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XHJcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcclxuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucGFkZGluZ0F0U3RhcnQgPSBjb25maWcucGFkZGluZ0F0U3RhcnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRX0gJHt0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xyXG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcclxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICFldmVudC5vblNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBzdGF0ZSwgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBMaXN0U3R5bGUgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1saXN0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1saXN0LWl0ZW0gbWF0UmlwcGxlIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIiAqbmdJZj1cIiFub2RlLmhpZGRlblwiIChjbGljayk9XCJleHBhbmQobm9kZSlcIiB0aXRsZT1cInt7bm9kZS5sYWJlbH19XCJcclxuICBbbmdTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJhbm1sLWRhdGFcIj5cclxuICAgIDxzcGFuICpuZ0lmPVwibm9kZS5mYUljb25cIiBjbGFzcz1cImFtbWwtaWNvbiBhbW1sLWljb24tZmFcIj5cclxuICAgICAgPGkgW25nQ2xhc3NdPVwibm9kZS5mYUljb25cIj48L2k+XHJcbiAgICA8L3NwYW4+XHJcbiAgICA8bWF0LWljb24gKm5nSWY9XCJub2RlLmljb25cIiBjbGFzcz1cImFtbWwtaWNvblwiPlxyXG4gICAgICB7e25vZGUuaWNvbn19XHJcbiAgICA8L21hdC1pY29uPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7bm9kZS5sYWJlbH19PC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxtYXQtaWNvbiAqbmdJZj0naGFzSXRlbXMoKScgW0Bpc0V4cGFuZGVkXT1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWQgPyAneWVzJyA6ICdubydcIj5cclxuICAgIGtleWJvYXJkX2Fycm93X2Rvd25cclxuICA8L21hdC1pY29uPlxyXG48L21hdC1saXN0LWl0ZW0+XHJcblxyXG48bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cclxuXHJcbjxkaXYgKm5nSWY9XCJoYXNJdGVtcygpICYmIGV4cGFuZGVkXCIgW0BzbGlkZUluT3V0XSBbbmdDbGFzc109XCJjbGFzc2VzXCI+XHJcbiAgPG5nLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgc2luZ2xlTm9kZSBvZiBub2RlQ2hpbGRyZW5cIiBcclxuICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWd1cmF0aW9uJyBcclxuICAgIFtub2RlXT0nc2luZ2xlTm9kZScgXHJcbiAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcclxuICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXHJcbiAgICAoc2VsZWN0ZWRJdGVtKT1cInNlbGVjdGVkTGlzdEl0ZW0oJGV2ZW50KVwiPlxyXG4gIDwvbmctbGlzdC1pdGVtPlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLmFtbWwtaXRlbXtsaW5lLWhlaWdodDo0OHB4O3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjpwb2ludGVyfS5hbm1sLWRhdGF7d2lkdGg6MTAwJTt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3RhcnQ7aGVpZ2h0OjQ4cHh9LmFtbWwtaWNvbntsaW5lLWhlaWdodDo0OHB4O21hcmdpbi1yaWdodDoxNXB4fS5hbW1sLWljb24tZmF7Zm9udC1zaXplOjIwcHh9LmxhYmVse2xpbmUtaGVpZ2h0OjQ4cHh9LmFtbWwtc3VibWVudXttYXJnaW4tbGVmdDoxNnB4fWBdLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ3NsaWRlSW5PdXQnLCBbXHJcbiAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAgfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMC4yIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMzAwLCBzdHlsZSh7IGhlaWdodDogMCB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCcyMDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnMCcsIG9wYWNpdHk6IDAgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgyMDAsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSlcclxuICAgIF0pLFxyXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZCcsIFtcclxuICAgICAgc3RhdGUoJ25vJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTkwZGVnKScgfSkpLFxyXG4gICAgICBzdGF0ZSgneWVzJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLCB9KSksXHJcblxyXG4gICAgICB0cmFuc2l0aW9uKCdubyA9PiB5ZXMnLFxyXG4gICAgICAgIGFuaW1hdGUoMzAwKVxyXG4gICAgICApLFxyXG4gICAgICB0cmFuc2l0aW9uKCd5ZXMgPT4gbm8nLFxyXG4gICAgICAgIGFuaW1hdGUoMzAwKVxyXG4gICAgICApXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbGV2ZWwgPSAxO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVzW107XHJcbiAgY2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBzZWxlY3RlZExpc3RDbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGV4cGFuZGVkID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZE5vZGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkTm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkQ2xhc3ModGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UucmVjdXJzaXZlQ2hlY2tJZCh0aGlzLm5vZGUsIHRoaXMuc2VsZWN0ZWROb2RlLmlkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGlzRm91bmQpIHtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFsnbGV2ZWwtJyArIHRoaXMubGV2ZWxdOiB0cnVlLFxyXG4gICAgICAnYW1tbC1zdWJtZW51JzogdGhpcy5oYXNJdGVtcygpICYmIHRoaXMuZXhwYW5kZWQgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpXHJcbiAgICB9O1xyXG4gIH1cclxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmIChub2RlLm9uU2VsZWN0ZWQpIHtcclxuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsXHJcbiAgICAgICYmIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlXHJcbiAgICAgICYmIG5vZGUubGluayAhPT0gdW5kZWZpbmVkXHJcbiAgICApIHtcclxuICAgICAgaWYgKG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCAhPT0gdW5kZWZpbmVkICYmIG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbm9kZS5saW5rO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub2RlLmxpbmtdKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub2RlLml0ZW1zID09PSB1bmRlZmluZWQgfHwgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdGVyaWFsc01vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWxzLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgfSBmcm9tICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRlcmlhbHNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCwgTGlzdEl0ZW1Db21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJOZ01vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0UmlwcGxlTW9kdWxlIiwiSW5qZWN0YWJsZSIsInJvdXRlciIsIkV2ZW50RW1pdHRlciIsIk5hdmlnYXRpb25FbmQiLCJDb21wb25lbnQiLCJSb3V0ZXIiLCJJbnB1dCIsIk91dHB1dCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImdyb3VwIiwiYW5pbWF0ZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O29CQVFDQSxXQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxzQkFBYTs0QkFDYkMsc0JBQWE7NEJBQ2JDLHdCQUFlO3lCQUNoQjt3QkFDRCxZQUFZLEVBQUUsRUFBRTt3QkFDaEIsT0FBTyxFQUFFOzRCQUNQRixzQkFBYTs0QkFDYkMsc0JBQWE7NEJBQ2JDLHdCQUFlO3lCQUNoQjtxQkFDRjs7OEJBcEJEOzs7Ozs7O0FDQUE7Ozs7OztRQVFFLDBDQUFVOzs7WUFBVjs7Z0JBQ0UsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztnQkFDZCxJQUFNLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQztnQkFDbEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3RFO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2I7Ozs7O1FBQ0QsMkNBQVc7Ozs7WUFBWCxVQUFZLEtBQXdCO2dCQUFwQyxpQkFPQztnQkFOQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVB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