(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/router'), require('@angular/animations'), require('@angular/material/core'), require('@angular/material/icon'), require('@angular/material/list')) :
    typeof define === 'function' && define.amd ? define('ng-material-multilevel-menu', ['exports', '@angular/common', '@angular/core', '@angular/router', '@angular/animations', '@angular/material/core', '@angular/material/icon', '@angular/material/list'], factory) :
    (global = global || self, factory(global['ng-material-multilevel-menu'] = {}, global.ng.common, global.ng.core, global.ng.router, global.ng.animations, global.ng.material.core, global.ng.material.icon, global.ng.material.list));
}(this, (function (exports, common, core, router, animations, core$1, icon, list) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var LinkComponent = /** @class */ (function () {
        function LinkComponent() {
        }
        LinkComponent.prototype.ngOnInit = function () {
        };
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean)
        ], LinkComponent.prototype, "isLinkExternal", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String)
        ], LinkComponent.prototype, "link", void 0);
        LinkComponent = __decorate([
            core.Component({
                selector: 'ng-link',
                template: "<a *ngIf=\"isLinkExternal\" [href]=\"link\">\n  <ng-container *ngTemplateOutlet=\"tempOutlet\"></ng-container>\n</a>\n\n<a *ngIf=\"!isLinkExternal\" [routerLink]=\"link\">\n  <ng-container *ngTemplateOutlet=\"tempOutlet\"></ng-container>\n</a>\n\n<ng-template #tempOutlet>\n  <ng-content></ng-content>\n</ng-template>\n",
                styles: [":host{width:100%}a{text-decoration:none;color:inherit}"]
            }),
            __metadata("design:paramtypes", [])
        ], LinkComponent);
        return LinkComponent;
    }());

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
        MultilevelMenuService.ɵprov = core.ɵɵdefineInjectable({ factory: function MultilevelMenuService_Factory() { return new MultilevelMenuService(); }, token: MultilevelMenuService, providedIn: "root" });
        MultilevelMenuService = __decorate([
            core.Injectable({
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
            { type: router.Router },
            { type: MultilevelMenuService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ListItemComponent.prototype, "node", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ListItemComponent.prototype, "level", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ListItemComponent.prototype, "submenuLevel", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ListItemComponent.prototype, "selectedNode", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], ListItemComponent.prototype, "nodeConfiguration", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], ListItemComponent.prototype, "selectedItem", void 0);
        ListItemComponent = __decorate([
            core.Component({
                selector: 'ng-list-item',
                template: "<mat-list-item matRipple [matRippleDisabled]=\"node.disabled\" [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\"\n  (click)=\"expand(node)\" title=\"{{node.label}}\" [ngStyle]=\"getListStyle()\">\n  <ng-link [link]=\"node.link\" [isLinkExternal]=\"node?.externalRedirect\">\n    <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n      <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n        <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n          <i [ngClass]=\"getSelectedFaIcon()\"></i>\n        </span>\n        <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n          {{getSelectedIcon()}}\n        </mat-icon>\n        <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\n        </mat-icon>\n        <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\n          alt=\"{{node.label}}\" />\n      </div>\n      <span class=\"label\">{{node.label}}</span>\n    </div>\n  </ng-link>\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()' [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n    [nodeConfiguration]='nodeConfiguration' [node]=\"singleNode.value\" [level]=\"level + 1\"\n    [submenuLevel]=\"singleNode.key\" [selectedNode]='selectedNode' (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
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
                styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start;height:48px}.disabled-amml-item{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}.amml-svg-icon{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
            }),
            __metadata("design:paramtypes", [router.Router,
                MultilevelMenuService])
        ], ListItemComponent);
        return ListItemComponent;
    }());

    var MaterialsModule = /** @class */ (function () {
        function MaterialsModule() {
        }
        MaterialsModule = __decorate([
            core.NgModule({
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
            })
        ], MaterialsModule);
        return MaterialsModule;
    }());

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
        NgMaterialMultilevelMenuComponent.prototype.ngOnChanges = function () {
            this.detectInvalidConfig();
        };
        NgMaterialMultilevelMenuComponent.prototype.ngOnInit = function () {
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
            { type: router.Router },
            { type: MultilevelMenuService }
        ]; };
        __decorate([
            core.Input(),
            __metadata("design:type", Array)
        ], NgMaterialMultilevelMenuComponent.prototype, "items", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], NgMaterialMultilevelMenuComponent.prototype, "configuration", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], NgMaterialMultilevelMenuComponent.prototype, "selectedItem", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", Object)
        ], NgMaterialMultilevelMenuComponent.prototype, "selectedLabel", void 0);
        NgMaterialMultilevelMenuComponent = __decorate([
            core.Component({
                selector: 'ng-material-multilevel-menu',
                template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>\n",
                styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
            }),
            __metadata("design:paramtypes", [router.Router,
                MultilevelMenuService])
        ], NgMaterialMultilevelMenuComponent);
        return NgMaterialMultilevelMenuComponent;
    }());

    var NgMaterialMultilevelMenuModule = /** @class */ (function () {
        function NgMaterialMultilevelMenuModule() {
        }
        NgMaterialMultilevelMenuModule = __decorate([
            core.NgModule({
                imports: [
                    common.CommonModule,
                    MaterialsModule,
                    router.RouterModule,
                ],
                declarations: [
                    NgMaterialMultilevelMenuComponent,
                    ListItemComponent,
                    LinkComponent
                ],
                exports: [NgMaterialMultilevelMenuComponent]
            })
        ], NgMaterialMultilevelMenuModule);
        return NgMaterialMultilevelMenuModule;
    }());

    exports.NgMaterialMultilevelMenuComponent = NgMaterialMultilevelMenuComponent;
    exports.NgMaterialMultilevelMenuModule = NgMaterialMultilevelMenuModule;
    exports.ɵa = MaterialsModule;
    exports.ɵb = MultilevelMenuService;
    exports.ɵc = ListItemComponent;
    exports.ɵd = LinkComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-material-multilevel-menu.umd.js.map
