import { NgIf, NgClass, NgStyle, NgSwitch, NgSwitchCase, NgForOf, KeyValuePipe, CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵelementStart, ɵɵelement, ɵɵelementEnd, ɵɵnextContext, ɵɵadvance, ɵɵproperty, ɵɵtext, ɵɵtextInterpolate1, ɵɵpropertyInterpolate, ɵɵsanitizeUrl, ɵɵtemplate, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵtextInterpolate, ɵɵpipe, ɵɵpipeBind2, EventEmitter, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵNgOnChangesFeature, Component, Input, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Router, RouterLinkWithHref, NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatListAvatarCssMatStyler, MatListModule, MatList } from '@angular/material/list';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { Dir } from '@angular/cdk/bidi';
import { MatIcon, MatIconModule } from '@angular/material/icon';

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
    MultilevelMenuService.ɵfac = function MultilevelMenuService_Factory(t) { return new (t || MultilevelMenuService)(); };
    MultilevelMenuService.ɵprov = ɵɵdefineInjectable({ token: MultilevelMenuService, factory: MultilevelMenuService.ɵfac, providedIn: 'root' });
    return MultilevelMenuService;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(MultilevelMenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

function ListItemComponent_mat_list_item_0_span_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 12);
    ɵɵelement(1, "i", 13);
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ctx_r2.getSelectedFaIcon());
} }
function ListItemComponent_mat_list_item_0_mat_icon_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon", 14);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r3 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r3.getSelectedIcon(), " ");
} }
function ListItemComponent_mat_list_item_0_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "mat-icon", 15);
} if (rf & 2) {
    var ctx_r4 = ɵɵnextContext(2);
    ɵɵpropertyInterpolate("svgIcon", ctx_r4.getSelectedSvgIcon());
} }
function ListItemComponent_mat_list_item_0_img_7_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "img", 16);
} if (rf & 2) {
    var ctx_r5 = ɵɵnextContext(2);
    ɵɵpropertyInterpolate("src", ctx_r5.getSelectedImageIcon(), ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("alt", ctx_r5.node.label);
} }
function ListItemComponent_mat_list_item_0_div_10_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, " keyboard_arrow_down ");
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r7 = ɵɵnextContext(3);
    ɵɵproperty("@isExpandedLTR", ctx_r7.expanded ? "yes" : "no");
} }
function ListItemComponent_mat_list_item_0_div_10_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, " keyboard_arrow_down ");
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r8 = ɵɵnextContext(3);
    ɵɵproperty("@isExpandedRTL", ctx_r8.expanded ? "yes" : "no");
} }
function ListItemComponent_mat_list_item_0_div_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 17);
    ɵɵtemplate(1, ListItemComponent_mat_list_item_0_div_10_mat_icon_1_Template, 2, 1, "mat-icon", 18);
    ɵɵtemplate(2, ListItemComponent_mat_list_item_0_div_10_mat_icon_2_Template, 2, 1, "mat-icon", 18);
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r6 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r6.isRtlLayout());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r6.isRtlLayout());
} }
function ListItemComponent_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
    var _r10 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-list-item", 2);
    ɵɵlistener("click", function ListItemComponent_mat_list_item_0_Template_mat_list_item_click_0_listener() { ɵɵrestoreView(_r10); var ctx_r9 = ɵɵnextContext(); return ctx_r9.expand(ctx_r9.node); });
    ɵɵelementStart(1, "div", 3);
    ɵɵelementStart(2, "a", 4);
    ɵɵelementStart(3, "div", 5);
    ɵɵtemplate(4, ListItemComponent_mat_list_item_0_span_4_Template, 2, 1, "span", 6);
    ɵɵtemplate(5, ListItemComponent_mat_list_item_0_mat_icon_5_Template, 2, 1, "mat-icon", 7);
    ɵɵtemplate(6, ListItemComponent_mat_list_item_0_mat_icon_6_Template, 1, 1, "mat-icon", 8);
    ɵɵtemplate(7, ListItemComponent_mat_list_item_0_img_7_Template, 1, 2, "img", 9);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(8, "span", 10);
    ɵɵtext(9);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(10, ListItemComponent_mat_list_item_0_div_10_Template, 3, 2, "div", 11);
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = ɵɵnextContext();
    ɵɵpropertyInterpolate("title", ctx_r0.node.label);
    ɵɵproperty("matRippleDisabled", ctx_r0.node.disabled)("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
    ɵɵadvance(1);
    ɵɵproperty("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    ɵɵadvance(1);
    ɵɵproperty("routerLink", ctx_r0.node.link);
    ɵɵadvance(1);
    ɵɵproperty("ngSwitch", ctx_r0.getListIcon(ctx_r0.node));
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "faicon");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "icon");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "svgicon");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "imageicon");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.node.label);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r0.hasItems());
} }
function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
    var _r14 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ng-list-item", 21);
    ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { ɵɵrestoreView(_r14); var ctx_r13 = ɵɵnextContext(2); return ctx_r13.selectedListItem($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    var singleNode_r12 = ctx.$implicit;
    var ctx_r11 = ɵɵnextContext(2);
    ɵɵproperty("nodeConfiguration", ctx_r11.nodeConfiguration)("node", singleNode_r12.value)("level", ctx_r11.level + 1)("submenuLevel", singleNode_r12.key)("selectedNode", ctx_r11.selectedNode);
} }
function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 19);
    ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 5, "ng-list-item", 20);
    ɵɵpipe(2, "keyvalue");
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵɵnextContext();
    ɵɵproperty("@slideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
} }
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
    ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(MultilevelMenuService)); };
    ListItemComponent.ɵcmp = ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration" }, outputs: { selectedItem: "selectedItem" }, features: [ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [["matRipple", "", 3, "matRippleDisabled", "ngClass", "title", "ngStyle", "click", 4, "ngIf"], [3, "dir", "ngClass", 4, "ngIf"], ["matRipple", "", 3, "matRippleDisabled", "ngClass", "title", "ngStyle", "click"], [1, "anml-data", 3, "dir"], [1, "menu-link", 3, "routerLink"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"], [1, "amml-icon-arrow-container"], [4, "ngIf"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
            ɵɵtemplate(0, ListItemComponent_mat_list_item_0_Template, 11, 13, "mat-list-item", 0);
            ɵɵelement(1, "mat-divider");
            ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 1);
        } if (rf & 2) {
            ɵɵproperty("ngIf", !ctx.node.hidden);
            ɵɵadvance(2);
            ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
        } }, directives: [NgIf, MatDivider, MatListItem, MatRipple, NgClass, NgStyle, Dir, RouterLinkWithHref, NgSwitch, NgSwitchCase, MatIcon, MatListAvatarCssMatStyler, NgForOf, ListItemComponent], pipes: [KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;position:relative;cursor:pointer}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start;height:48px}.disabled-amml-item[_ngcontent-%COMP%]{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%], .label[_ngcontent-%COMP%]{line-height:48px}.amml-svg-icon[_ngcontent-%COMP%]{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%], div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"], data: { animation: [
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
            ] } });
    return ListItemComponent;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(ListItemComponent, [{
        type: Component,
        args: [{
                selector: 'ng-list-item',
                templateUrl: './list-item.component.html',
                styleUrls: ['./list-item.component.css'],
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
                ]
            }]
    }], function () { return [{ type: Router }, { type: MultilevelMenuService }]; }, { node: [{
            type: Input
        }], level: [{
            type: Input
        }], submenuLevel: [{
            type: Input
        }], selectedNode: [{
            type: Input
        }], nodeConfiguration: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }] }); })();

var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
    MaterialsModule.ɵmod = ɵɵdefineNgModule({ type: MaterialsModule });
    MaterialsModule.ɵinj = ɵɵdefineInjector({ factory: function MaterialsModule_Factory(t) { return new (t || MaterialsModule)(); }, imports: [[
                MatIconModule,
                MatListModule,
                MatRippleModule,
            ],
            MatIconModule,
            MatListModule,
            MatRippleModule] });
    return MaterialsModule;
}());
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(MaterialsModule, { imports: [MatIconModule,
        MatListModule,
        MatRippleModule], exports: [MatIconModule,
        MatListModule,
        MatRippleModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(MaterialsModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();

function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template(rf, ctx) { if (rf & 1) {
    var _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ng-list-item", 3);
    ɵɵlistener("selectedItem", function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template_ng_list_item_selectedItem_0_listener($event) { ɵɵrestoreView(_r4); var ctx_r3 = ɵɵnextContext(2); return ctx_r3.selectedListItem($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    var node_r2 = ctx.$implicit;
    var ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("nodeConfiguration", ctx_r1.nodeConfig)("node", node_r2.value)("level", 1)("submenuLevel", node_r2.key)("selectedNode", ctx_r1.currentNode);
} }
function NgMaterialMultilevelMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 1);
    ɵɵelementStart(1, "mat-list");
    ɵɵtemplate(2, NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template, 1, 5, "ng-list-item", 2);
    ɵɵpipe(3, "keyvalue");
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.getClassName())("ngStyle", ctx_r0.getGlobalStyle())("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(3, 4, ctx_r0.items, ctx_r0.multilevelMenuService.kvDummyComparerFn));
} }
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
    NgMaterialMultilevelMenuComponent.ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { return new (t || NgMaterialMultilevelMenuComponent)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(MultilevelMenuService)); };
    NgMaterialMultilevelMenuComponent.ɵcmp = ɵɵdefineComponent({ type: NgMaterialMultilevelMenuComponent, selectors: [["ng-material-multilevel-menu"]], inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "dir", 4, "ngIf"], [3, "ngClass", "ngStyle", "dir"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"]], template: function NgMaterialMultilevelMenuComponent_Template(rf, ctx) { if (rf & 1) {
            ɵɵtemplate(0, NgMaterialMultilevelMenuComponent_div_0_Template, 4, 7, "div", 0);
        } if (rf & 2) {
            ɵɵproperty("ngIf", ctx.items.length !== 0);
        } }, directives: [NgIf, NgClass, NgStyle, Dir, MatList, NgForOf, ListItemComponent], pipes: [KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%]{line-height:48px}.active[_ngcontent-%COMP%]{color:#1976d2}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:15px}div[dir=ltr][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:15px}div[dir=rtl][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"] });
    return NgMaterialMultilevelMenuComponent;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgMaterialMultilevelMenuComponent, [{
        type: Component,
        args: [{
                selector: 'ng-material-multilevel-menu',
                templateUrl: './ng-material-multilevel-menu.component.html',
                styleUrls: ['./ng-material-multilevel-menu.component.css'],
            }]
    }], function () { return [{ type: Router }, { type: MultilevelMenuService }]; }, { items: [{
            type: Input
        }], configuration: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }], selectedLabel: [{
            type: Output
        }] }); })();

var NgMaterialMultilevelMenuModule = /** @class */ (function () {
    function NgMaterialMultilevelMenuModule() {
    }
    NgMaterialMultilevelMenuModule.ɵmod = ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
    NgMaterialMultilevelMenuModule.ɵinj = ɵɵdefineInjector({ factory: function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); }, imports: [[
                CommonModule,
                MaterialsModule,
                RouterModule,
            ]] });
    return NgMaterialMultilevelMenuModule;
}());
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent], imports: [CommonModule,
        MaterialsModule,
        RouterModule], exports: [NgMaterialMultilevelMenuComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgMaterialMultilevelMenuModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MaterialsModule,
                    RouterModule,
                ],
                declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
                exports: [NgMaterialMultilevelMenuComponent]
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule };
//# sourceMappingURL=ng-material-multilevel-menu.js.map
