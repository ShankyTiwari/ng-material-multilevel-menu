import { __decorate, __metadata } from 'tslib';
import { CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, Injectable, EventEmitter, Input, Output, Component, NgModule } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/router';
import * as ɵngcc2 from '@angular/common';
import * as ɵngcc3 from '@angular/material/divider';
import * as ɵngcc4 from '@angular/material/list';
import * as ɵngcc5 from '@angular/material/core';
import * as ɵngcc6 from '@angular/cdk/bidi';
import * as ɵngcc7 from '@angular/material/icon';

function ListItemComponent_mat_list_item_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function ListItemComponent_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
    var _r8 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "mat-list-item", 4);
    ɵngcc0.ɵɵlistener("click", function ListItemComponent_mat_list_item_0_Template_mat_list_item_click_0_listener() { ɵngcc0.ɵɵrestoreView(_r8); var ctx_r7 = ɵngcc0.ɵɵnextContext(); return ctx_r7.expand(ctx_r7.node); });
    ɵngcc0.ɵɵtemplate(1, ListItemComponent_mat_list_item_0_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    var _r2 = ɵngcc0.ɵɵreference(4);
    ɵngcc0.ɵɵpropertyInterpolate("title", ctx_r0.node.label);
    ɵngcc0.ɵɵproperty("matRippleDisabled", ctx_r0.node.disabled)("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r2);
} }
function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
    var _r12 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ng-list-item", 8);
    ɵngcc0.ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r12); var ctx_r11 = ɵngcc0.ɵɵnextContext(2); return ctx_r11.selectedListItem($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var singleNode_r10 = ctx.$implicit;
    var ctx_r9 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("nodeConfiguration", ctx_r9.nodeConfiguration)("node", singleNode_r10.value)("level", ctx_r9.level + 1)("submenuLevel", singleNode_r10.key)("selectedNode", ctx_r9.selectedNode)("nodeExpandCollapseStatus", ctx_r9.nodeExpandCollapseStatus);
} }
function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 6);
    ɵngcc0.ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 6, "ng-list-item", 7);
    ɵngcc0.ɵɵpipe(2, "keyvalue");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("@slideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
} }
function ListItemComponent_ng_template_3_a_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_a_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 11);
    ɵngcc0.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_0_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r13 = ɵngcc0.ɵɵnextContext(2);
    var _r4 = ɵngcc0.ɵɵreference(6);
    ɵngcc0.ɵɵproperty("href", ctx_r13.node.link, ɵngcc0.ɵɵsanitizeUrl)("target", ctx_r13.getHrefTargetType());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_a_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "a", 12);
    ɵngcc0.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r14 = ɵngcc0.ɵɵnextContext(2);
    var _r4 = ɵngcc0.ɵɵreference(6);
    ɵngcc0.ɵɵproperty("routerLink", ctx_r14.node.link);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵtemplate(0, ListItemComponent_ng_template_3_a_0_Template, 2, 3, "a", 9);
    ɵngcc0.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_Template, 2, 2, "a", 10);
} if (rf & 2) {
    var ctx_r3 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngIf", ctx_r3.node.externalRedirect);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r3.node.externalRedirect);
} }
function ListItemComponent_ng_template_5_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "span", 21);
    ɵngcc0.ɵɵelement(1, "i", 22);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r17 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngClass", ctx_r17.getSelectedFaIcon());
} }
function ListItemComponent_ng_template_5_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon", 23);
    ɵngcc0.ɵɵtext(1);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r18 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵtextInterpolate1(" ", ctx_r18.getSelectedIcon(), " ");
} }
function ListItemComponent_ng_template_5_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "mat-icon", 24);
} if (rf & 2) {
    var ctx_r19 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵpropertyInterpolate("svgIcon", ctx_r19.getSelectedSvgIcon());
} }
function ListItemComponent_ng_template_5_img_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelement(0, "img", 25);
} if (rf & 2) {
    var ctx_r20 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵpropertyInterpolate("src", ctx_r20.getSelectedImageIcon(), ɵngcc0.ɵɵsanitizeUrl);
    ɵngcc0.ɵɵpropertyInterpolate("alt", ctx_r20.node.label);
} }
function ListItemComponent_ng_template_5_div_8_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon");
    ɵngcc0.ɵɵtext(1, " keyboard_arrow_down ");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r22 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("@isExpandedLTR", ctx_r22.expanded ? "yes" : "no");
} }
function ListItemComponent_ng_template_5_div_8_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "mat-icon");
    ɵngcc0.ɵɵtext(1, " keyboard_arrow_down ");
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r23 = ɵngcc0.ɵɵnextContext(3);
    ɵngcc0.ɵɵproperty("@isExpandedRTL", ctx_r23.expanded ? "yes" : "no");
} }
function ListItemComponent_ng_template_5_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 26);
    ɵngcc0.ɵɵtemplate(1, ListItemComponent_ng_template_5_div_8_mat_icon_1_Template, 2, 1, "mat-icon", 27);
    ɵngcc0.ɵɵtemplate(2, ListItemComponent_ng_template_5_div_8_mat_icon_2_Template, 2, 1, "mat-icon", 27);
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r21 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", !ctx_r21.isRtlLayout());
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r21.isRtlLayout());
} }
function ListItemComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 13);
    ɵngcc0.ɵɵelementStart(1, "div", 14);
    ɵngcc0.ɵɵtemplate(2, ListItemComponent_ng_template_5_span_2_Template, 2, 1, "span", 15);
    ɵngcc0.ɵɵtemplate(3, ListItemComponent_ng_template_5_mat_icon_3_Template, 2, 1, "mat-icon", 16);
    ɵngcc0.ɵɵtemplate(4, ListItemComponent_ng_template_5_mat_icon_4_Template, 1, 1, "mat-icon", 17);
    ɵngcc0.ɵɵtemplate(5, ListItemComponent_ng_template_5_img_5_Template, 1, 2, "img", 18);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementStart(6, "span", 19);
    ɵngcc0.ɵɵtext(7);
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵtemplate(8, ListItemComponent_ng_template_5_div_8_Template, 3, 2, "div", 20);
} if (rf & 2) {
    var ctx_r5 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("dir", ctx_r5.isRtlLayout() ? "rtl" : "ltr");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitch", ctx_r5.getListIcon(ctx_r5.node));
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "faicon");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "icon");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "svgicon");
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngSwitchCase", "imageicon");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵtextInterpolate(ctx_r5.node.label);
    ɵngcc0.ɵɵadvance(1);
    ɵngcc0.ɵɵproperty("ngIf", ctx_r5.hasItems());
} }
function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template(rf, ctx) { if (rf & 1) {
    var _r4 = ɵngcc0.ɵɵgetCurrentView();
    ɵngcc0.ɵɵelementStart(0, "ng-list-item", 3);
    ɵngcc0.ɵɵlistener("selectedItem", function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template_ng_list_item_selectedItem_0_listener($event) { ɵngcc0.ɵɵrestoreView(_r4); var ctx_r3 = ɵngcc0.ɵɵnextContext(2); return ctx_r3.selectedListItem($event); });
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var node_r2 = ctx.$implicit;
    var ctx_r1 = ɵngcc0.ɵɵnextContext(2);
    ɵngcc0.ɵɵproperty("nodeConfiguration", ctx_r1.nodeConfig)("node", node_r2.value)("level", 1)("submenuLevel", node_r2.key)("selectedNode", ctx_r1.currentNode)("nodeExpandCollapseStatus", ctx_r1.nodeExpandCollapseStatus);
} }
function NgMaterialMultilevelMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵngcc0.ɵɵelementStart(0, "div", 1);
    ɵngcc0.ɵɵelementStart(1, "mat-list");
    ɵngcc0.ɵɵtemplate(2, NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template, 1, 6, "ng-list-item", 2);
    ɵngcc0.ɵɵpipe(3, "keyvalue");
    ɵngcc0.ɵɵelementEnd();
    ɵngcc0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = ɵngcc0.ɵɵnextContext();
    ɵngcc0.ɵɵproperty("ngClass", ctx_r0.getClassName())("ngStyle", ctx_r0.getGlobalStyle())("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    ɵngcc0.ɵɵadvance(2);
    ɵngcc0.ɵɵproperty("ngForOf", ɵngcc0.ɵɵpipeBind2(3, 4, ctx_r0.items, ctx_r0.multilevelMenuService.kvDummyComparerFn));
} }
var ExpandCollapseStatusEnum;
(function (ExpandCollapseStatusEnum) {
    ExpandCollapseStatusEnum["expand"] = "expand";
    ExpandCollapseStatusEnum["collapse"] = "collapse";
})(ExpandCollapseStatusEnum || (ExpandCollapseStatusEnum = {}));

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
    DEFAULT_HREF_TARGET_TYPE: '_self',
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
MultilevelMenuService.ɵfac = function MultilevelMenuService_Factory(t) { return new (t || MultilevelMenuService)(); };
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MultilevelMenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
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
        this.nodeExpandCollapseStatus = null;
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
        this.setExpandCollapseStatus();
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
    ListItemComponent.prototype.getHrefTargetType = function () {
        if (this.node.hrefTargetType) {
            return this.node.hrefTargetType;
        }
        return CONSTANT.DEFAULT_HREF_TARGET_TYPE;
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
    ListItemComponent.prototype.setExpandCollapseStatus = function () {
        if (this.nodeExpandCollapseStatus !== null && this.nodeExpandCollapseStatus !== undefined) {
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.expand) {
                this.expanded = true;
            }
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.collapse) {
                this.expanded = false;
            }
        }
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
            this.router.navigate([node.link], node.navigationExtras);
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
        Input(),
        __metadata("design:type", String)
    ], ListItemComponent.prototype, "nodeExpandCollapseStatus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ListItemComponent.prototype, "selectedItem", void 0);
    ListItemComponent = __decorate([ __metadata("design:paramtypes", [Router,
            MultilevelMenuService])
    ], ListItemComponent);
ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Router), ɵngcc0.ɵɵdirectiveInject(MultilevelMenuService)); };
ListItemComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { level: "level", submenuLevel: "submenuLevel", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", node: "node", selectedNode: "selectedNode" }, outputs: { selectedItem: "selectedItem" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 7, vars: 2, consts: [["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click", 4, "ngIf"], [3, "dir", "ngClass", 4, "ngIf"], ["linkTemplate", ""], ["linkLabelOutlet", ""], ["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click"], [4, "ngTemplateOutlet"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "selectedItem"], ["class", "anml-link", 3, "href", "target", 4, "ngIf"], ["class", "anml-link", 3, "routerLink", 4, "ngIf"], [1, "anml-link", 3, "href", "target"], [1, "anml-link", 3, "routerLink"], [1, "anml-data", 3, "dir"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"], [1, "amml-icon-arrow-container"], [4, "ngIf"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, ListItemComponent_mat_list_item_0_Template, 2, 5, "mat-list-item", 0);
        ɵngcc0.ɵɵelement(1, "mat-divider");
        ɵngcc0.ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 1);
        ɵngcc0.ɵɵtemplate(3, ListItemComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, ɵngcc0.ɵɵtemplateRefExtractor);
        ɵngcc0.ɵɵtemplate(5, ListItemComponent_ng_template_5_Template, 9, 8, "ng-template", null, 3, ɵngcc0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", !ctx.node.hidden);
        ɵngcc0.ɵɵadvance(2);
        ɵngcc0.ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
    } }, directives: [ɵngcc2.NgIf, ɵngcc3.MatDivider, ɵngcc4.MatListItem, ɵngcc5.MatRipple, ɵngcc2.NgClass, ɵngcc2.NgStyle, ɵngcc2.NgTemplateOutlet, ɵngcc6.Dir, ɵngcc2.NgForOf, ListItemComponent, ɵngcc1.RouterLinkWithHref, ɵngcc2.NgSwitch, ɵngcc2.NgSwitchCase, ɵngcc7.MatIcon, ɵngcc4.MatListAvatarCssMatStyler], pipes: [ɵngcc2.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;position:relative;cursor:pointer}.anml-link[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data[_ngcontent-%COMP%]{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item[_ngcontent-%COMP%]{opacity:.5;text-decoration:none;pointer-events:none}.icon-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.label[_ngcontent-%COMP%]{line-height:48px;font-weight:400}.amml-svg-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%], div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"], data: { animation: [
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
                state('yes', style({ transform: 'rotate(0deg)' })),
                transition('no => yes', animate(200)),
                transition('yes => no', animate(200))
            ]),
            trigger('isExpandedRTL', [
                state('no', style({ transform: 'rotate(90deg)' })),
                state('yes', style({ transform: 'rotate(0deg)' })),
                transition('no => yes', animate(200)),
                transition('yes => no', animate(200))
            ])
        ] } });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ListItemComponent, [{
        type: Component,
        args: [{
                selector: 'ng-list-item',
                template: "<mat-list-item matRipple \r\n  *ngIf=\"!node.hidden\"\r\n  title=\"{{node.label}}\"\r\n  [matRippleDisabled]=\"node.disabled\" \r\n  [ngClass]=\"selectedListClasses\"\r\n  [ngStyle]=\"getListStyle()\"\r\n  (click)=\"expand(node)\">\r\n  <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n    [nodeConfiguration]='nodeConfiguration' \r\n    [node]=\"singleNode.value\" \r\n    [level]=\"level + 1\"\r\n    [submenuLevel]=\"singleNode.key\"\r\n    [selectedNode]='selectedNode' \r\n    [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n\r\n<ng-template #linkTemplate>\r\n  <a class=\"anml-link\" *ngIf=\"node.externalRedirect\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\r\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\r\n  </a>\r\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect\" [routerLink]=\"node.link\">\r\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelOutlet>\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{getSelectedIcon()}}\r\n      </mat-icon>\r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\r\n        alt=\"{{node.label}}\" />\r\n    </div>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()' [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>",
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
                        state('yes', style({ transform: 'rotate(0deg)' })),
                        transition('no => yes', animate(200)),
                        transition('yes => no', animate(200))
                    ]),
                    trigger('isExpandedRTL', [
                        state('no', style({ transform: 'rotate(90deg)' })),
                        state('yes', style({ transform: 'rotate(0deg)' })),
                        transition('no => yes', animate(200)),
                        transition('yes => no', animate(200))
                    ])
                ],
                styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
            }]
    }], function () { return [{ type: ɵngcc1.Router }, { type: MultilevelMenuService }]; }, { level: [{
            type: Input
        }], submenuLevel: [{
            type: Input
        }], nodeConfiguration: [{
            type: Input
        }], nodeExpandCollapseStatus: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }], node: [{
            type: Input
        }], selectedNode: [{
            type: Input
        }] }); })();
    return ListItemComponent;
}());

var MaterialsModule = /** @class */ (function () {
    function MaterialsModule() {
    }
MaterialsModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: MaterialsModule });
MaterialsModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function MaterialsModule_Factory(t) { return new (t || MaterialsModule)(); }, imports: [[
            MatIconModule,
            MatListModule,
            MatRippleModule,
        ],
        MatIconModule,
        MatListModule,
        MatRippleModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(MaterialsModule, { imports: function () { return [MatIconModule,
        MatListModule,
        MatRippleModule]; }, exports: function () { return [MatIconModule,
        MatListModule,
        MatRippleModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(MaterialsModule, [{
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
    }], function () { return []; }, null); })();
    return MaterialsModule;
}());

var NgMaterialMultilevelMenuComponent = /** @class */ (function () {
    function NgMaterialMultilevelMenuComponent(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.expandCollapseStatus = null;
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
        this.nodeExpandCollapseStatus = null;
    }
    NgMaterialMultilevelMenuComponent.prototype.ngOnChanges = function () {
        this.detectInvalidConfig();
        this.detectExpandCollapseStatus();
    };
    NgMaterialMultilevelMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe(function (event) {
                if (event instanceof NavigationEnd) {
                    _this.updateNodeByURL(event.urlAfterRedirects);
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
        }
        this.checkValidData();
    };
    NgMaterialMultilevelMenuComponent.prototype.detectExpandCollapseStatus = function () {
        if (this.expandCollapseStatus !== null &&
            this.expandCollapseStatus !== undefined) {
            this.nodeExpandCollapseStatus = this.expandCollapseStatus;
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
        Input(),
        __metadata("design:type", String)
    ], NgMaterialMultilevelMenuComponent.prototype, "expandCollapseStatus", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgMaterialMultilevelMenuComponent.prototype, "selectedItem", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NgMaterialMultilevelMenuComponent.prototype, "selectedLabel", void 0);
    NgMaterialMultilevelMenuComponent = __decorate([ __metadata("design:paramtypes", [Router,
            MultilevelMenuService])
    ], NgMaterialMultilevelMenuComponent);
NgMaterialMultilevelMenuComponent.ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { return new (t || NgMaterialMultilevelMenuComponent)(ɵngcc0.ɵɵdirectiveInject(ɵngcc1.Router), ɵngcc0.ɵɵdirectiveInject(MultilevelMenuService)); };
NgMaterialMultilevelMenuComponent.ɵcmp = ɵngcc0.ɵɵdefineComponent({ type: NgMaterialMultilevelMenuComponent, selectors: [["ng-material-multilevel-menu"]], inputs: { configuration: "configuration", expandCollapseStatus: "expandCollapseStatus", items: "items" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel" }, features: [ɵngcc0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "dir", 4, "ngIf"], [3, "ngClass", "ngStyle", "dir"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "selectedItem"]], template: function NgMaterialMultilevelMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵtemplate(0, NgMaterialMultilevelMenuComponent_div_0_Template, 4, 7, "div", 0);
    } if (rf & 2) {
        ɵngcc0.ɵɵproperty("ngIf", ctx.items.length !== 0);
    } }, directives: [ɵngcc2.NgIf, ɵngcc2.NgClass, ɵngcc2.NgStyle, ɵngcc6.Dir, ɵngcc4.MatList, ɵngcc2.NgForOf, ListItemComponent], pipes: [ɵngcc2.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%]{line-height:48px}.active[_ngcontent-%COMP%]{color:#1976d2}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:15px}div[dir=ltr][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:15px}div[dir=rtl][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"] });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgMaterialMultilevelMenuComponent, [{
        type: Component,
        args: [{
                selector: 'ng-material-multilevel-menu',
                template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\r\n    \">\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n",
                styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
            }]
    }], function () { return [{ type: ɵngcc1.Router }, { type: MultilevelMenuService }]; }, { configuration: [{
            type: Input
        }], expandCollapseStatus: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }], selectedLabel: [{
            type: Output
        }], items: [{
            type: Input
        }] }); })();
    return NgMaterialMultilevelMenuComponent;
}());

var NgMaterialMultilevelMenuModule = /** @class */ (function () {
    function NgMaterialMultilevelMenuModule() {
    }
NgMaterialMultilevelMenuModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
NgMaterialMultilevelMenuModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); }, imports: [[
            CommonModule,
            MaterialsModule,
            RouterModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: function () { return [NgMaterialMultilevelMenuComponent,
        ListItemComponent]; }, imports: function () { return [CommonModule,
        MaterialsModule,
        RouterModule]; }, exports: function () { return [NgMaterialMultilevelMenuComponent]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(NgMaterialMultilevelMenuModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MaterialsModule,
                    RouterModule,
                ],
                declarations: [
                    NgMaterialMultilevelMenuComponent,
                    ListItemComponent,
                ],
                exports: [NgMaterialMultilevelMenuComponent]
            }]
    }], function () { return []; }, null); })();
    return NgMaterialMultilevelMenuModule;
}());

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandCollapseStatusEnum, NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, MaterialsModule as ɵa, MultilevelMenuService as ɵb, ListItemComponent as ɵc };


//# sourceMappingURL=ng-material-multilevel-menu.js.map