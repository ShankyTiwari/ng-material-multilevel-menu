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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9tYXRlcmlhbHMubW9kdWxlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2NvbnN0YW50cy50cyIsIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFJpcHBsZU1vZHVsZSxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFJpcHBsZU1vZHVsZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIHtcclxuICBmb3VuZExpbmtPYmplY3Q6IE11bHRpbGV2ZWxOb2RlcztcclxuICBnZW5lcmF0ZUlkKCk6IHN0cmluZyB7XHJcbiAgICBsZXQgdGV4dCA9ICcnO1xyXG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XHJcbiAgICAgIHRleHQgKz0gcG9zc2libGUuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xyXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuYWRkUmFuZG9tSWQobm9kZS5pdGVtcyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgIGlmIChub2RlLmlkID09PSBub2RlSWQpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuaXRlbXMuc29tZSgobmVzdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmVjdXJzaXZlQ2hlY2tMaW5rKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSwgbGluazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBub2RlSW5kZXggPSAwOyBub2RlSW5kZXggPCBub2Rlcy5sZW5ndGg7IG5vZGVJbmRleCsrKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tub2RlSW5kZXhdO1xyXG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgaWYgKG5vZGUubGluayA9PT0gbGluaykge1xyXG4gICAgICAgICAgICB0aGlzLmZvdW5kTGlua09iamVjdCA9IG5vZGU7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pdGVtcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZS5pdGVtcywgbGluayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKG5vZGU6IE11bHRpbGV2ZWxOb2Rlc1tdLCBsaW5rOiBzdHJpbmcpOiBNdWx0aWxldmVsTm9kZXMge1xyXG4gICAgdGhpcy5yZWN1cnNpdmVDaGVja0xpbmsobm9kZSwgbGluayk7XHJcbiAgICByZXR1cm4gdGhpcy5mb3VuZExpbmtPYmplY3Q7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVCA9IHtcclxuICAgIFBBRERJTkdfQVRfU1RBUlQ6IHRydWUsXHJcbiAgICBERUZBVUxUX0NMQVNTX05BTUU6IGBhbW1sLWNvbnRhaW5lcmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRTogYGFtbWwtaXRlbWAsXHJcbiAgICBTRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUU6IGBzZWxlY3RlZC1hbW1sLWl0ZW1gLFxyXG4gICAgREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SOiBgIzE5NzZkMmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUjogYCNmZmZgLFxyXG4gICAgREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1I6IGByZ2JhKDAsMCwwLC44NylgLFxyXG4gICAgRVJST1JfTUVTU0FHRTogYEludmFsaWQgZGF0YSBmb3IgbWF0ZXJpYWwgTXVsdGlsZXZlbCBMaXN0IENvbXBvbmVudGBcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcywgQmFja2dyb3VuZFN0eWxlIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9J2l0ZW1zLmxlbmd0aCAhPT0gMCc+XHJcbiAgPG1hdC1saXN0PlxyXG4gICAgPG5nLWxpc3QtaXRlbSBcclxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXNcIiBcclxuICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZycgXHJcbiAgICAgIFtub2RlXT0nbm9kZScgXHJcbiAgICAgIFtzZWxlY3RlZE5vZGVdPSdjdXJyZW50Tm9kZScgXHJcbiAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXHJcbiAgICBcIj5cclxuICAgIDwvbmctbGlzdC1pdGVtPlxyXG4gIDwvbWF0LWxpc3Q+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cG9zaXRpb246cmVsYXRpdmV9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9LmFjdGl2ZXtjb2xvcjojMTk3NmQyfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsXHJcbiAgfTtcclxuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHsgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5jaGVja1ZhbGlkZGF0YSgpO1xyXG4gICAgdGhpcy5kZXRlY3RJbnZhbGlkQ29uZmlnKCk7XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSAnJyAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwodGhpcy5yb3V0ZXIudXJsKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcclxuICAgIGlmIChcclxuICAgICAgZm91bmROb2RlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gJydcclxuICAgICkge1xyXG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tWYWxpZGRhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKTtcclxuICAgICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uID09PSBudWxsIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gJycpIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcclxuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xyXG4gICAgICBpZiAoY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSB1bmRlZmluZWQgJiYgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSBudWxsICYmIHR5cGVvZiBjb25maWcucGFkZGluZ0F0U3RhcnQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmZvbnRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gJycgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50Tm9kZSA9IGV2ZW50O1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIHN0YXRlLCBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMsIExpc3RTdHlsZSB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGUgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCIgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxyXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiPlxyXG4gICAgPHNwYW4gKm5nSWY9XCJub2RlLmZhSWNvblwiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtaWNvbi1mYVwiPlxyXG4gICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vZGUuaWNvblwiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgIHt7bm9kZS5pY29ufX1cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPG1hdC1pY29uICpuZ0lmPSdoYXNJdGVtcygpJyBbQGlzRXhwYW5kZWRdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAga2V5Ym9hcmRfYXJyb3dfZG93blxyXG4gIDwvbWF0LWljb24+XHJcbjwvbWF0LWxpc3QtaXRlbT5cclxuXHJcbjxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxyXG5cclxuPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQHNsaWRlSW5PdXRdIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlblwiIFxyXG4gICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nIFxyXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJyBcclxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxyXG4gICAgW3NlbGVjdGVkTm9kZV09J3NlbGVjdGVkTm9kZSdcclxuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XHJcbiAgPC9uZy1saXN0LWl0ZW0+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuYW1tbC1pdGVte2xpbmUtaGVpZ2h0OjQ4cHg7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydDtoZWlnaHQ6NDhweH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0ubGFiZWx7bGluZS1oZWlnaHQ6NDhweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9YF0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXHJcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cclxuICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA6IHN0eWxlcy5jb2xvciA9IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuICBoYXNJdGVtcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc2VzID0ge1xyXG4gICAgICBbJ2xldmVsLScgKyB0aGlzLmxldmVsXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmV4cGFuZGVkICYmIHRoaXMuZ2V0UGFkZGluZ0F0U3RhcnQoKVxyXG4gICAgfTtcclxuICB9XHJcbiAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcclxuICAgICAgJiYgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGVcclxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHNNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFscy5tb2R1bGUnO1xyXG5cclxuaW1wb3J0IHsgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxzTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQsIExpc3RJdGVtQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51TW9kdWxlIHsgfVxyXG4iXSwibmFtZXMiOlsiTmdNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0TGlzdE1vZHVsZSIsIk1hdFJpcHBsZU1vZHVsZSIsIkluamVjdGFibGUiLCJyb3V0ZXIiLCJFdmVudEVtaXR0ZXIiLCJOYXZpZ2F0aW9uRW5kIiwiQ29tcG9uZW50IiwiUm91dGVyIiwiSW5wdXQiLCJPdXRwdXQiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJncm91cCIsImFuaW1hdGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFRQ0EsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsc0JBQWE7NEJBQ2JDLHNCQUFhOzRCQUNiQyx3QkFBZTt5QkFDaEI7d0JBQ0QsWUFBWSxFQUFFLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRTs0QkFDUEYsc0JBQWE7NEJBQ2JDLHNCQUFhOzRCQUNiQyx3QkFBZTt5QkFDaEI7cUJBQ0Y7OzhCQXBCRDs7Ozs7OztBQ0FBOzs7Ozs7UUFRRSwwQ0FBVTs7O1lBQVY7O2dCQUNFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Z0JBQ2QsSUFBTSxRQUFRLEdBQUcsZ0VBQWdFLENBQUM7Z0JBQ2xGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNCLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2lCQUN0RTtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNiOzs7OztRQUNELDJDQUFXOzs7O1lBQVgsVUFBWSxLQUF3QjtnQkFBcEMsaUJBT0M7Z0JBTkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQXFCO29CQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDNUIs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