(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/core'), require('@angular/material/icon'), require('@angular/material/list'), require('@angular/router'), require('@angular/animations')) :
    typeof define === 'function' && define.amd ? define('ng-material-multilevel-menu', ['exports', '@angular/core', '@angular/common', '@angular/material/core', '@angular/material/icon', '@angular/material/list', '@angular/router', '@angular/animations'], factory) :
    (global = global || self, factory(global['ng-material-multilevel-menu'] = {}, global.ng.core, global.ng.common, global.ng.material.core, global.ng.material.icon, global.ng.material.list, global.ng.router, global.ng.animations));
}(this, function (exports, core, common, core$1, icon, list, router, animations) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MaterialsModule = /** @class */ (function () {
        function MaterialsModule() {
        }
        MaterialsModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            icon.MatIconModule,
                            list.MatListModule,
                            core$1.MatRippleModule,
                        ],
                        declarations: [],
                        exports: [
                            icon.MatIconModule,
                            list.MatListModule,
                            core$1.MatRippleModule,
                        ]
                    },] }
        ];
        return MaterialsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            nodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                node.id = _this.generateId();
                if (node.items !== undefined) {
                    _this.addRandomId(node.items);
                }
            }));
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
                    return node.items.some((/**
                     * @param {?} nestedNode
                     * @return {?}
                     */
                    function (nestedNode) {
                        return _this.recursiveCheckId(nestedNode, nodeId);
                    }));
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
        // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
        // https://angular.io/api/common/KeyValuePipe#description
        // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
        // https://angular.io/api/common/KeyValuePipe#description
        /**
         * @return {?}
         */
        MultilevelMenuService.prototype.kvDummyComparerFn = 
        // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
        // https://angular.io/api/common/KeyValuePipe#description
        /**
         * @return {?}
         */
        function () {
            return 0;
        };
        MultilevelMenuService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */ MultilevelMenuService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
        return MultilevelMenuService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgMaterialMultilevelMenuComponent = /** @class */ (function () {
        function NgMaterialMultilevelMenuComponent(router, multilevelMenuService) {
            this.router = router;
            this.multilevelMenuService = multilevelMenuService;
            this.configuration = null;
            this.selectedItem = new core.EventEmitter();
            this.selectedLabel = new core.EventEmitter();
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
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event instanceof router.NavigationEnd) {
                        _this.updateNodeByURL(event.url);
                    }
                }));
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
                foundNode.link !== ''
            // && !foundNode.disabled // Prevent route redirection for disabled menu
            ) {
                this.currentNode = foundNode;
                this.selectedListItem(foundNode);
            }
        };
        /**
         * @return {?}
         */
        NgMaterialMultilevelMenuComponent.prototype.checkValidData = /**
         * @return {?}
         */
        function () {
            if (this.items.length === 0) {
                console.warn(CONSTANT.ERROR_MESSAGE);
            }
            else {
                this.items = this.items.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) { return !n.hidden; }));
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
                this.checkValidData();
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
            { type: core.Component, args: [{
                        selector: 'ng-material-multilevel-menu',
                        template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      (selectedItem)=\"selectedListItem($event)\r\n    \">\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n",
                        styles: [".amml-item{line-height:48px;display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:-webkit-box;display:flex;-webkit-box-pack:start;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
                    }] }
        ];
        /** @nocollapse */
        NgMaterialMultilevelMenuComponent.ctorParameters = function () { return [
            { type: router.Router },
            { type: MultilevelMenuService }
        ]; };
        NgMaterialMultilevelMenuComponent.propDecorators = {
            items: [{ type: core.Input }],
            configuration: [{ type: core.Input }],
            selectedItem: [{ type: core.Output }],
            selectedLabel: [{ type: core.Output }]
        };
        return NgMaterialMultilevelMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ListItemComponent = /** @class */ (function () {
        function ListItemComponent(router, multilevelMenuService) {
            var _a;
            this.router = router;
            this.multilevelMenuService = multilevelMenuService;
            this.level = 1;
            this.submenuLevel = 0;
            this.nodeConfiguration = null;
            this.selectedItem = new core.EventEmitter();
            this.isSelected = false;
            this.expanded = false;
            this.firstInitializer = false;
            this.selectedListClasses = (_a = {},
                _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
                _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = false,
                _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = false,
                _a);
        }
        /**
         * @return {?}
         */
        ListItemComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.nodeChildren = this.node && this.node.items ? this.node.items.filter((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return !n.hidden; })) : [];
            if (this.selectedNode !== undefined && this.selectedNode !== null) {
                this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
            }
        };
        /**
         * @return {?}
         */
        ListItemComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
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
        /**
         * @param {?} isFound
         * @return {?}
         */
        ListItemComponent.prototype.setSelectedClass = /**
         * @param {?} isFound
         * @return {?}
         */
        function (isFound) {
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
            else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
                return "svgicon";
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
            var _a;
            this.classes = (_a = {},
                _a["level-" + (this.level + 1)] = true,
                _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
                _a);
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
            { type: core.Component, args: [{
                        selector: 'ng-list-item',
                        template: "<mat-list-item matRipple [matRippleDisabled]=\"node.disabled\" [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\"\r\n  (click)=\"expand(node)\" title=\"{{node.label}}\"\r\n  [ngStyle]=\"getListStyle()\">\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"node.faIcon\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{node.icon}}\r\n      </mat-icon>\r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{node.svgIcon}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{node.imageIcon}}\" alt=\"{{node.label}}\"/>\r\n    </div>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n    [nodeConfiguration]='nodeConfiguration'\r\n    [node]=\"singleNode.value\"\r\n    [level]=\"level + 1\"\r\n    [submenuLevel]=\"singleNode.key\"\r\n    [selectedNode]='selectedNode'\r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n",
                        animations: [
                            animations.trigger('slideInOut', [
                                animations.state('in', animations.style({ height: '*', opacity: 0 })),
                                animations.transition(':leave', [
                                    animations.style({ height: '*', opacity: 0.2 }),
                                    animations.group([
                                        animations.animate(200, animations.style({ height: 0 })),
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
                                animations.transition('no => yes', animations.animate(200)),
                                animations.transition('yes => no', animations.animate(200))
                            ]),
                            animations.trigger('isExpandedRTL', [
                                animations.state('no', animations.style({ transform: 'rotate(90deg)' })),
                                animations.state('yes', animations.style({ transform: 'rotate(0deg)', })),
                                animations.transition('no => yes', animations.animate(200)),
                                animations.transition('yes => no', animations.animate(200))
                            ])
                        ],
                        styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:-webkit-box;display:flex;-webkit-box-pack:start;justify-content:flex-start;height:48px}.disabled-amml-item{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}.amml-svg-icon{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container{direction:ltr;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
                    }] }
        ];
        /** @nocollapse */
        ListItemComponent.ctorParameters = function () { return [
            { type: router.Router },
            { type: MultilevelMenuService }
        ]; };
        ListItemComponent.propDecorators = {
            node: [{ type: core.Input }],
            level: [{ type: core.Input }],
            submenuLevel: [{ type: core.Input }],
            selectedNode: [{ type: core.Input }],
            nodeConfiguration: [{ type: core.Input }],
            selectedItem: [{ type: core.Output }]
        };
        return ListItemComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgMaterialMultilevelMenuModule = /** @class */ (function () {
        function NgMaterialMultilevelMenuModule() {
        }
        NgMaterialMultilevelMenuModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialsModule
                        ],
                        declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
                        exports: [NgMaterialMultilevelMenuComponent]
                    },] }
        ];
        return NgMaterialMultilevelMenuModule;
    }());

    exports.NgMaterialMultilevelMenuModule = NgMaterialMultilevelMenuModule;
    exports.ɵa = MaterialsModule;
    exports.ɵb = NgMaterialMultilevelMenuComponent;
    exports.ɵc = MultilevelMenuService;
    exports.ɵd = ListItemComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ng-material-multilevel-menu.umd.js.map
