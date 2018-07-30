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
                interfaceWithRoute: null
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
                            /** @type {?} */
                            var foundNode = _this.multilevelMenuService.getMatchedObjectByUrl(_this.items, event.url);
                            if (foundNode !== undefined &&
                                foundNode.link !== undefined &&
                                foundNode.link !== null &&
                                foundNode.link !== '') {
                                _this.currentNode = foundNode;
                                _this.selectedListItem(foundNode);
                            }
                        }
                    });
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
                this.selectedItem.emit(event);
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
                    this.isSelected = true;
                    this.expanded = true;
                }
                else {
                    this.isSelected = false;
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
                console.log(this.nodeConfiguration);
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
                if (this.nodeConfiguration.interfaceWithRoute !== null
                    && this.nodeConfiguration.interfaceWithRoute
                    && node.link !== undefined) {
                    if (node.externalRedirect !== undefined && node.externalRedirect) {
                        window.location.href = node.link;
                    }
                    else {
                        this.router.navigate([node.link]);
                    }
                }
                else if (node.items === undefined) {
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
                        template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\">\n    <span *ngIf=\"node.faIcon\" class=\"amml-icon amml-icon-fa\">\n      <i [ngClass]=\"node.faIcon\"></i>\n    </span>\n    <mat-icon *ngIf=\"node.icon\" class=\"amml-icon\">\n      {{node.icon}}\n    </mat-icon>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <mat-icon *ngIf='hasItems()' [@isExpanded]=\"hasItems() && expanded ? 'yes' : 'no'\">\n    keyboard_arrow_down\n  </mat-icon>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\" \n    [nodeConfiguration]='nodeConfiguration' \n    [node]='singleNode' \n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9tYXRlcmlhbHMubW9kdWxlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2NvbnN0YW50cy50cyIsIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFJpcHBsZU1vZHVsZSxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFJpcHBsZU1vZHVsZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcclxuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcclxuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgdGV4dCA9ICcnO1xyXG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCBub2Rlcy5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgaWYgKG5vZGUubGluayA9PT0gbGluaykge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xyXG4gICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZSwgbGluayk7XHJcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVCA9IHtcclxuICAgIFBBRERJTkdfQVRfU1RBUlQ6IHRydWUsXHJcbiAgICBERUZBVUxUX0NMQVNTX05BTUU6IGBhbW1sLWNvbnRhaW5lcmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRTogYGFtbWwtaXRlbWAsXHJcbiAgICBTRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUU6IGBzZWxlY3RlZC1hbW1sLWl0ZW1gLFxyXG4gICAgREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SOiBgIzE5NzZkMmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUjogYCNmZmZgLFxyXG4gICAgREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1I6IGByZ2JhKDAsMCwwLC44NylgLFxyXG4gICAgRVJST1JfTUVTU0FHRTogYEludmFsaWQgZGF0YSBmb3IgbWF0ZXJpYWwgTXVsdGlsZXZlbCBMaXN0IENvbXBvbmVudGBcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcywgQmFja2dyb3VuZFN0eWxlIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9J2l0ZW1zLmxlbmd0aCAhPT0gMCc+XHJcbiAgPG1hdC1saXN0PlxyXG4gICAgPG5nLWxpc3QtaXRlbSBcclxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXNcIiBcclxuICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZycgXHJcbiAgICAgIFtub2RlXT0nbm9kZScgXHJcbiAgICAgIFtzZWxlY3RlZE5vZGVdPSdjdXJyZW50Tm9kZScgXHJcbiAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXHJcbiAgICBcIj5cclxuICAgIDwvbmctbGlzdC1pdGVtPlxyXG4gIDwvbWF0LWxpc3Q+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cG9zaXRpb246cmVsYXRpdmV9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9LmFjdGl2ZXtjb2xvcjojMTk3NmQyfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsXHJcbiAgfTtcclxuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHsgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5jaGVja1ZhbGlkZGF0YSgpO1xyXG4gICAgdGhpcy5kZXRlY3RJbnZhbGlkQ29uZmlnKCk7XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSAnJyAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKHRoaXMuaXRlbXMsIGV2ZW50LnVybCk7XHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICBmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgIGZvdW5kTm9kZS5saW5rICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxyXG4gICAgICAgICAgICAgIGZvdW5kTm9kZS5saW5rICE9PSAnJ1xyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNoZWNrVmFsaWRkYXRhKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XHJcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcclxuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucGFkZGluZ0F0U3RhcnQgPSBjb25maWcucGFkZGluZ0F0U3RhcnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRX0gJHt0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xyXG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBzdGF0ZSwgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBMaXN0U3R5bGUgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1saXN0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1saXN0LWl0ZW0gbWF0UmlwcGxlIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIiAqbmdJZj1cIiFub2RlLmhpZGRlblwiIChjbGljayk9XCJleHBhbmQobm9kZSlcIlxyXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiPlxyXG4gICAgPHNwYW4gKm5nSWY9XCJub2RlLmZhSWNvblwiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtaWNvbi1mYVwiPlxyXG4gICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vZGUuaWNvblwiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgIHt7bm9kZS5pY29ufX1cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPG1hdC1pY29uICpuZ0lmPSdoYXNJdGVtcygpJyBbQGlzRXhwYW5kZWRdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAga2V5Ym9hcmRfYXJyb3dfZG93blxyXG4gIDwvbWF0LWljb24+XHJcbjwvbWF0LWxpc3QtaXRlbT5cclxuXHJcbjxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxyXG5cclxuPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQHNsaWRlSW5PdXRdIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlblwiIFxyXG4gICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nIFxyXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJyBcclxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxyXG4gICAgW3NlbGVjdGVkTm9kZV09J3NlbGVjdGVkTm9kZSdcclxuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XHJcbiAgPC9uZy1saXN0LWl0ZW0+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuYW1tbC1pdGVte2xpbmUtaGVpZ2h0OjQ4cHg7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydDtoZWlnaHQ6NDhweH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0ubGFiZWx7bGluZS1oZWlnaHQ6NDhweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9YF0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFsnbGV2ZWwtJyArIHRoaXMubGV2ZWxdOiB0cnVlLFxyXG4gICAgICAnYW1tbC1zdWJtZW51JzogdGhpcy5oYXNJdGVtcygpICYmIHRoaXMuZXhwYW5kZWQgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpXHJcbiAgICB9O1xyXG4gIH1cclxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgKSB7XHJcbiAgICAgIGlmIChub2RlLmV4dGVybmFsUmVkaXJlY3QgIT09IHVuZGVmaW5lZCAmJiBub2RlLmV4dGVybmFsUmVkaXJlY3QpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG5vZGUubGluaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1hdGVyaWFsc01vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWxzLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgfSBmcm9tICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRlcmlhbHNNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCwgTGlzdEl0ZW1Db21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJOZ01vZHVsZSIsIk1hdEljb25Nb2R1bGUiLCJNYXRMaXN0TW9kdWxlIiwiTWF0UmlwcGxlTW9kdWxlIiwiSW5qZWN0YWJsZSIsInJvdXRlciIsIkV2ZW50RW1pdHRlciIsIk5hdmlnYXRpb25FbmQiLCJDb21wb25lbnQiLCJSb3V0ZXIiLCJJbnB1dCIsIk91dHB1dCIsInRyaWdnZXIiLCJzdGF0ZSIsInN0eWxlIiwidHJhbnNpdGlvbiIsImdyb3VwIiwiYW5pbWF0ZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O29CQVFDQSxXQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxzQkFBYTs0QkFDYkMsc0JBQWE7NEJBQ2JDLHdCQUFlO3lCQUNoQjt3QkFDRCxZQUFZLEVBQUUsRUFBRTt3QkFDaEIsT0FBTyxFQUFFOzRCQUNQRixzQkFBYTs0QkFDYkMsc0JBQWE7NEJBQ2JDLHdCQUFlO3lCQUNoQjtxQkFDRjs7OEJBcEJEOzs7Ozs7O0FDQUE7Ozs7OztRQVFFLDBDQUFVOzs7WUFBVjs7Z0JBQ0UsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztnQkFDZCxJQUFNLFFBQVEsR0FBRyxnRUFBZ0UsQ0FBQztnQkFDbEYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3RFO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2I7Ozs7O1FBQ0QsMkNBQVc7Ozs7WUFBWCxVQUFZLEtBQXdCO2dCQUFwQyxpQkFPQztnQkFOQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBcUI7b0JBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUM1QixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO3dCQUM1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