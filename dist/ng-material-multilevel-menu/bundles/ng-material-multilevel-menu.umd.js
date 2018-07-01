(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('rxjs/internal/BehaviorSubject'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-material-multilevel-menu', ['exports', '@angular/core', '@angular/material', 'rxjs/internal/BehaviorSubject', '@angular/animations', '@angular/common'], factory) :
    (factory((global['ng-material-multilevel-menu'] = {}),global.ng.core,global.ng.material,global.rxjs['internal/BehaviorSubject'],global.ng.animations,global.ng.common));
}(this, (function (exports,i0,material,BehaviorSubject,animations,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
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
     * @suppress {checkTypes} checked by tsc
     */
    var MultilevelMenuService = (function () {
        function MultilevelMenuService() {
            this.isLastItemClikedStorage = new BehaviorSubject.BehaviorSubject(false);
            this.isLastItemCliked = this.isLastItemClikedStorage.asObservable();
        }
        /**
         * @return {?}
         */
        MultilevelMenuService.prototype.generateId = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ text = '';
                var /** @type {?} */ possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (var /** @type {?} */ i = 0; i < 20; i++) {
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
                nodes.forEach(function (node, index) {
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
         * @param {?} isCliked
         * @return {?}
         */
        MultilevelMenuService.prototype.updateClickedItem = /**
         * @param {?} isCliked
         * @return {?}
         */
            function (isCliked) {
                this.isLastItemClikedStorage.next(isCliked);
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
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ CONSTANT = {
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
     * @suppress {checkTypes} checked by tsc
     */
    var NgMaterialMultilevelMenuComponent = (function () {
        function NgMaterialMultilevelMenuComponent(multilevelMenuService) {
            this.multilevelMenuService = multilevelMenuService;
            this.configuration = null;
            this.selectedItem = new i0.EventEmitter();
            this.nodeConfig = {
                paddingAtStart: true,
                listBackgroundColor: null,
                fontColor: null,
                selectedListFontColor: null
            };
            this.isInvalidConfig = true;
            this.isLastItemCliked = false;
        }
        /**
         * @return {?}
         */
        NgMaterialMultilevelMenuComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.checkValiddata();
                this.detectInvalidConfig();
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
                    var /** @type {?} */ config = this.configuration;
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
                    var /** @type {?} */ styles = {
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
     * @suppress {checkTypes} checked by tsc
     */
    var ListItemComponent = (function () {
        function ListItemComponent(multilevelMenuService) {
            this.multilevelMenuService = multilevelMenuService;
            this.level = 1;
            this.nodeConfiguration = null;
            this.selectedItem = new i0.EventEmitter();
            this.isSelected = false;
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
                var _this = this;
                this.nodeChildren = this.node && this.node.items ? this.node.items.filter(function (n) { return !n.hidden; }) : [];
                if (this.selectedNode !== undefined) {
                    this.multilevelMenuService.isLastItemCliked.subscribe(function (isClicked) {
                        if (isClicked) {
                            if (_this.multilevelMenuService.recursiveCheckId(_this.node, _this.selectedNode.id)) {
                                _this.isSelected = true;
                            }
                            else {
                                _this.isSelected = false;
                            }
                            _this.selectedListClasses = (_a = {},
                                _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
                                _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = _this.isSelected,
                                _a);
                        }
                        var _a;
                    });
                }
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
                var /** @type {?} */ styles = {
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
                    _a['amml-submenu'] = this.hasItems() && this.node.expanded && this.getPaddingAtStart(),
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
                node.expanded = !node.expanded;
                if (node.items === undefined) {
                    delete node.expanded;
                    this.selectedListItem(node);
                }
                this.setClasses();
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
                this.multilevelMenuService.updateClickedItem(true);
                this.selectedItem.emit(node);
            };
        ListItemComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-list-item',
                        template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\">\n    <span *ngIf=\"node.faIcon\" class=\"amml-icon amml-icon-fa\">\n      <i [ngClass]=\"node.faIcon\"></i>\n    </span>\n    <mat-icon *ngIf=\"node.icon\" class=\"amml-icon\">\n      {{node.icon}}\n    </mat-icon>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <mat-icon *ngIf='hasItems()' [@isExpanded]=\"hasItems() && node.expanded ? 'yes' : 'no'\">\n    keyboard_arrow_down\n  </mat-icon>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && node.expanded\" [@slideInOut] [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\" \n    [nodeConfiguration]='nodeConfiguration' \n    [node]='singleNode' \n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
                        styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.label{line-height:48px}.amml-submenu{margin-left:16px}"],
                        animations: [
                            animations.trigger('slideInOut', [
                                animations.state('in', animations.style({ height: '*', opacity: 0 })),
                                animations.transition(':leave', [
                                    animations.style({ height: '*', opacity: 1 }),
                                    animations.group([
                                        animations.animate(300, animations.style({ height: 0 })),
                                        animations.animate('200ms ease-in-out', animations.style({ 'opacity': '0' }))
                                    ])
                                ]),
                                animations.transition(':enter', [
                                    animations.style({ height: '0', opacity: 0 }),
                                    animations.group([
                                        animations.animate(300, animations.style({ height: '*' })),
                                        animations.animate('400ms ease-in-out', animations.style({ 'opacity': '1' }))
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
     * @suppress {checkTypes} checked by tsc
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
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NgMaterialMultilevelMenuModule = NgMaterialMultilevelMenuModule;
    exports.ɵd = ListItemComponent;
    exports.ɵa = MaterialsModule;
    exports.ɵc = MultilevelMenuService;
    exports.ɵb = NgMaterialMultilevelMenuComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9tYXRlcmlhbHMubW9kdWxlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlLnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2NvbnN0YW50cy50cyIsIm5nOi8vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7XHJcbiAgTWF0SWNvbk1vZHVsZSxcclxuICBNYXRMaXN0TW9kdWxlLFxyXG4gIE1hdFJpcHBsZU1vZHVsZSxcclxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICBNYXRMaXN0TW9kdWxlLFxyXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgTWF0TGlzdE1vZHVsZSxcclxuICAgIE1hdFJpcHBsZU1vZHVsZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbHNNb2R1bGUgeyB9XHJcbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBNdWx0aWxldmVsTWVudVNlcnZpY2Uge1xuICBpc0xhc3RJdGVtQ2xpa2VkU3RvcmFnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuICBpc0xhc3RJdGVtQ2xpa2VkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5pc0xhc3RJdGVtQ2xpa2VkU3RvcmFnZS5hc09ic2VydmFibGUoKTtcbiAgZ2VuZXJhdGVJZCgpOiBzdHJpbmcge1xuICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgY29uc3QgcG9zc2libGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjA7IGkrKykge1xuICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgfVxuICAgIHJldHVybiB0ZXh0O1xuICB9XG4gIGFkZFJhbmRvbUlkKG5vZGVzOiBNdWx0aWxldmVsTm9kZXNbXSk6IHZvaWQge1xuICAgIG5vZGVzLmZvckVhY2goKG5vZGU6IE11bHRpbGV2ZWxOb2RlcywgaW5kZXgpID0+IHtcbiAgICAgIG5vZGUuaWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcbiAgICAgIGlmIChub2RlLml0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5hZGRSYW5kb21JZChub2RlLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZWN1cnNpdmVDaGVja0lkKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcywgbm9kZUlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAobm9kZS5pZCA9PT0gbm9kZUlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5vZGUuaXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbm9kZS5pdGVtcy5zb21lKChuZXN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXMpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVDaGVja0lkKG5lc3RlZE5vZGUsIG5vZGVJZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB1cGRhdGVDbGlja2VkSXRlbShpc0NsaWtlZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNMYXN0SXRlbUNsaWtlZFN0b3JhZ2UubmV4dChpc0NsaWtlZCk7XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBDT05TVEFOVCA9IHtcclxuICAgIFBBRERJTkdfQVRfU1RBUlQ6IHRydWUsXHJcbiAgICBERUZBVUxUX0NMQVNTX05BTUU6IGBhbW1sLWNvbnRhaW5lcmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRTogYGFtbWwtaXRlbWAsXHJcbiAgICBTRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUU6IGBzZWxlY3RlZC1hbW1sLWl0ZW1gLFxyXG4gICAgREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SOiBgIzE5NzZkMmAsXHJcbiAgICBERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUjogYCNmZmZgLFxyXG4gICAgREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1I6IGByZ2JhKDAsMCwwLC44NylgLFxyXG4gICAgRVJST1JfTUVTU0FHRTogYEludmFsaWQgZGF0YSBmb3IgbWF0ZXJpYWwgTXVsdGlsZXZlbCBMaXN0IENvbXBvbmVudGBcclxufTtcclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBCYWNrZ3JvdW5kU3R5bGUgfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZSgpXCIgW25nU3R5bGVdPVwiZ2V0R2xvYmFsU3R5bGUoKVwiICpuZ0lmPSdpdGVtcy5sZW5ndGggIT09IDAnPlxyXG4gIDxtYXQtbGlzdD5cclxuICAgIDxuZy1saXN0LWl0ZW0gXHJcbiAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIGl0ZW1zXCIgXHJcbiAgICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWcnIFxyXG4gICAgICBbbm9kZV09J25vZGUnIFxyXG4gICAgICBbc2VsZWN0ZWROb2RlXT0nY3VycmVudE5vZGUnIFxyXG4gICAgICAoc2VsZWN0ZWRJdGVtKT1cInNlbGVjdGVkTGlzdEl0ZW0oJGV2ZW50KVxyXG4gICAgXCI+XHJcbiAgICA8L25nLWxpc3QtaXRlbT5cclxuICA8L21hdC1saXN0PlxyXG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmFtbWwtaXRlbXtsaW5lLWhlaWdodDo0OHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtwb3NpdGlvbjpyZWxhdGl2ZX0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0fS5hbW1sLWljb257bGluZS1oZWlnaHQ6NDhweDttYXJnaW4tcmlnaHQ6MTVweH0uYW1tbC1pY29uLWZhe2ZvbnQtc2l6ZToyMHB4fS5hbW1sLXN1Ym1lbnV7bWFyZ2luLWxlZnQ6MTZweH0uYWN0aXZle2NvbG9yOiMxOTc2ZDJ9YF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcbiAgQElucHV0KCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgIGZvbnRDb2xvcjogbnVsbCxcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGxcbiAgfTtcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcbiAgaXNMYXN0SXRlbUNsaWtlZCA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXG4gICkgeyB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2hlY2tWYWxpZGRhdGEoKTtcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcbiAgfVxuICBjaGVja1ZhbGlkZGF0YSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKTtcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xuICAgIH1cbiAgfVxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gPT09IG51bGwgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSAnJykge1xuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IGZhbHNlO1xuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnBhZGRpbmdBdFN0YXJ0ID0gY29uZmlnLnBhZGRpbmdBdFN0YXJ0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmZvbnRDb2xvciAhPT0gJycgJiZcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gJycgJiZcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA9IGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xuICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBgJHtDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUV9ICR7dGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0R2xvYmFsU3R5bGUoKTogQmFja2dyb3VuZFN0eWxlIHtcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIGJhY2tncm91bmQgOiBudWxsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICB9XG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGV2ZW50KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIHN0YXRlLCBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuLy4uL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcblxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBMaXN0U3R5bGUgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbGlzdC1pdGVtJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGUgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCIgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XG4gIDxkaXYgY2xhc3M9XCJhbm1sLWRhdGFcIj5cbiAgICA8c3BhbiAqbmdJZj1cIm5vZGUuZmFJY29uXCIgY2xhc3M9XCJhbW1sLWljb24gYW1tbC1pY29uLWZhXCI+XG4gICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cbiAgICA8L3NwYW4+XG4gICAgPG1hdC1pY29uICpuZ0lmPVwibm9kZS5pY29uXCIgY2xhc3M9XCJhbW1sLWljb25cIj5cbiAgICAgIHt7bm9kZS5pY29ufX1cbiAgICA8L21hdC1pY29uPlxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57e25vZGUubGFiZWx9fTwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxtYXQtaWNvbiAqbmdJZj0naGFzSXRlbXMoKScgW0Bpc0V4cGFuZGVkXT1cImhhc0l0ZW1zKCkgJiYgbm9kZS5leHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxuICAgIGtleWJvYXJkX2Fycm93X2Rvd25cbiAgPC9tYXQtaWNvbj5cbjwvbWF0LWxpc3QtaXRlbT5cblxuPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG5cbjxkaXYgKm5nSWY9XCJoYXNJdGVtcygpICYmIG5vZGUuZXhwYW5kZWRcIiBbQHNsaWRlSW5PdXRdIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cbiAgPG5nLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgc2luZ2xlTm9kZSBvZiBub2RlQ2hpbGRyZW5cIiBcbiAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlndXJhdGlvbicgXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJyBcbiAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcbiAgICBbc2VsZWN0ZWROb2RlXT0nc2VsZWN0ZWROb2RlJ1xuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XG4gIDwvbmctbGlzdC1pdGVtPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmFtbWwtaXRlbXtsaW5lLWhlaWdodDo0OHB4O3Bvc2l0aW9uOnJlbGF0aXZlO2N1cnNvcjpwb2ludGVyfS5hbm1sLWRhdGF7d2lkdGg6MTAwJTt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3RhcnQ7aGVpZ2h0OjQ4cHh9LmFtbWwtaWNvbntsaW5lLWhlaWdodDo0OHB4O21hcmdpbi1yaWdodDoxNXB4fS5hbW1sLWljb24tZmF7Zm9udC1zaXplOjIwcHh9LmxhYmVse2xpbmUtaGVpZ2h0OjQ4cHh9LmFtbWwtc3VibWVudXttYXJnaW4tbGVmdDoxNnB4fWBdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcbiAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAxIH0pLFxuICAgICAgICBncm91cChbXG4gICAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcbiAgICAgICAgICBhbmltYXRlKCcyMDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHsgJ29wYWNpdHknOiAnMCcgfSkpXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIGFuaW1hdGUoMzAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLWluLW91dCcsIHN0eWxlKHsgJ29wYWNpdHknOiAnMScgfSkpXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWQnLCBbXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXG4gICAgICBzdGF0ZSgneWVzJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLCB9KSksXG5cbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXG4gICAgICAgIGFuaW1hdGUoMzAwKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXG4gICAgICAgIGFuaW1hdGUoMzAwKVxuICAgICAgKVxuICAgIF0pXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gIEBJbnB1dCgpIGxldmVsID0gMTtcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xuICBpc1NlbGVjdGVkID0gZmFsc2U7XG4gIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVzW107XG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcbiAgICB9O1xuICB9XG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmlzTGFzdEl0ZW1DbGlrZWQuc3Vic2NyaWJlKCAoaXNDbGlja2VkOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmIChpc0NsaWNrZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UucmVjdXJzaXZlQ2hlY2tJZCh0aGlzLm5vZGUsIHRoaXMuc2VsZWN0ZWROb2RlLmlkKSkge1xuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcbiAgICAgICAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXG4gICAgICAgICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5wYWRkaW5nQXRTdGFydCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxuICAgIH07XG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cbiAgICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgOiBzdHlsZXMuY29sb3IgPSBDT05TVEFOVC5ERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgc2V0Q2xhc3NlcygpIHtcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICBbJ2xldmVsLScgKyB0aGlzLmxldmVsXTogdHJ1ZSxcbiAgICAgICdhbW1sLXN1Ym1lbnUnOiB0aGlzLmhhc0l0ZW1zKCkgJiYgdGhpcy5ub2RlLmV4cGFuZGVkICYmIHRoaXMuZ2V0UGFkZGluZ0F0U3RhcnQoKVxuICAgIH07XG4gIH1cbiAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xuICAgIG5vZGUuZXhwYW5kZWQgPSAhbm9kZS5leHBhbmRlZDtcbiAgICBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWxldGUgbm9kZS5leHBhbmRlZDtcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcbiAgICB9XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gIH1cbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcbiAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS51cGRhdGVDbGlja2VkSXRlbSh0cnVlKTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdGVyaWFsc01vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWxzLm1vZHVsZSc7XG5cbmltcG9ydCB7IE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQsIExpc3RJdGVtQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIk5nTW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdExpc3RNb2R1bGUiLCJNYXRSaXBwbGVNb2R1bGUiLCJCZWhhdmlvclN1YmplY3QiLCJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJ0cmlnZ2VyIiwic3RhdGUiLCJzdHlsZSIsInRyYW5zaXRpb24iLCJncm91cCIsImFuaW1hdGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztvQkFRQ0EsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsc0JBQWE7NEJBQ2JDLHNCQUFhOzRCQUNiQyx3QkFBZTt5QkFDaEI7d0JBQ0QsWUFBWSxFQUFFLEVBQUU7d0JBQ2hCLE9BQU8sRUFBRTs0QkFDUEYsc0JBQWE7NEJBQ2JDLHNCQUFhOzRCQUNiQyx3QkFBZTt5QkFDaEI7cUJBQ0Y7OzhCQXBCRDs7Ozs7OztBQ0FBOzsyQ0FVNEIsSUFBSUMsK0JBQWUsQ0FBQyxLQUFLLENBQUM7b0NBQ1osSUFBSSxDQUFDLHVCQUF1QixDQUFDLFlBQVksRUFBRTs7Ozs7UUFDbkYsMENBQVU7OztZQUFWO2dCQUNFLHFCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7Z0JBQ2QscUJBQU0sUUFBUSxHQUFHLGdFQUFnRSxDQUFDO2dCQUNsRixLQUFLLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7aUJBQ3RFO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2I7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