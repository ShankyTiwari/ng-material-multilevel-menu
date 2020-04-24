import { NgIf, NgClass, NgStyle, NgTemplateOutlet, NgForOf, NgSwitch, NgSwitchCase, KeyValuePipe, CommonModule } from '@angular/common';
import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵelementContainer, ɵɵgetCurrentView, ɵɵelementStart, ɵɵlistener, ɵɵrestoreView, ɵɵnextContext, ɵɵtemplate, ɵɵelementEnd, ɵɵreference, ɵɵpropertyInterpolate, ɵɵproperty, ɵɵadvance, ɵɵpipe, ɵɵpipeBind2, ɵɵsanitizeUrl, ɵɵelement, ɵɵtext, ɵɵtextInterpolate1, ɵɵtextInterpolate, EventEmitter, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵNgOnChangesFeature, ɵɵtemplateRefExtractor, Component, Input, Output, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { Router, RouterLinkWithHref, NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { MatDivider } from '@angular/material/divider';
import { MatListItem, MatListAvatarCssMatStyler, MatListModule, MatList } from '@angular/material/list';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import { Dir } from '@angular/cdk/bidi';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import * as ɵngcc0 from '@angular/core';
const CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: `amml-container`,
    DEFAULT_LIST_CLASS_NAME: `amml-item`,
    SELECTED_LIST_CLASS_NAME: `selected-amml-item`,
    ACTIVE_ITEM_CLASS_NAME: `active-amml-item`,
    DISABLED_ITEM_CLASS_NAME: `disabled-amml-item`,
    DEFAULT_SELECTED_FONT_COLOR: `#1976d2`,
    DEFAULT_LIST_BACKGROUND_COLOR: `transparent`,
    DEFAULT_LIST_FONT_COLOR: `rgba(0,0,0,.87)`,
    ERROR_MESSAGE: `Invalid data for material Multilevel List Component`
};

class MultilevelMenuService {
    generateId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    addRandomId(nodes) {
        nodes.forEach((node) => {
            node.id = this.generateId();
            if (node.items !== undefined) {
                this.addRandomId(node.items);
            }
        });
    }
    recursiveCheckId(node, nodeId) {
        if (node.id === nodeId) {
            return true;
        }
        else {
            if (node.items !== undefined) {
                return node.items.some((nestedNode) => {
                    return this.recursiveCheckId(nestedNode, nodeId);
                });
            }
        }
    }
    recursiveCheckLink(nodes, link) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            const node = nodes[nodeIndex];
            for (const key in node) {
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
    }
    getMatchedObjectByUrl(node, link) {
        this.recursiveCheckLink(node, link);
        return this.foundLinkObject;
    }
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    kvDummyComparerFn() {
        return 0;
    }
}
MultilevelMenuService.ɵfac = function MultilevelMenuService_Factory(t) { return new (t || MultilevelMenuService)(); };
MultilevelMenuService.ɵprov = ɵɵdefineInjectable({ token: MultilevelMenuService, factory: MultilevelMenuService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(MultilevelMenuService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

function ListItemComponent_mat_list_item_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function ListItemComponent_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r8 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "mat-list-item", 4);
    ɵɵlistener("click", function ListItemComponent_mat_list_item_0_Template_mat_list_item_click_0_listener() { ɵɵrestoreView(_r8); const ctx_r7 = ɵɵnextContext(); return ctx_r7.expand(ctx_r7.node); });
    ɵɵtemplate(1, ListItemComponent_mat_list_item_0_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    const _r2 = ɵɵreference(4);
    ɵɵpropertyInterpolate("title", ctx_r0.node.label);
    ɵɵproperty("matRippleDisabled", ctx_r0.node.disabled)("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r2);
} }
function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r12 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ng-list-item", 8);
    ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { ɵɵrestoreView(_r12); const ctx_r11 = ɵɵnextContext(2); return ctx_r11.selectedListItem($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const singleNode_r10 = ctx.$implicit;
    const ctx_r9 = ɵɵnextContext(2);
    ɵɵproperty("nodeConfiguration", ctx_r9.nodeConfiguration)("node", singleNode_r10.value)("level", ctx_r9.level + 1)("submenuLevel", singleNode_r10.key)("selectedNode", ctx_r9.selectedNode);
} }
function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 5, "ng-list-item", 7);
    ɵɵpipe(2, "keyvalue");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("@slideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
} }
function ListItemComponent_ng_template_3_a_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_a_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "a", 11);
    ɵɵtemplate(1, ListItemComponent_ng_template_3_a_0_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(2);
    const _r4 = ɵɵreference(6);
    ɵɵproperty("href", ctx_r13.node.link, ɵɵsanitizeUrl);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_a_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_a_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "a", 12);
    ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_ng_container_1_Template, 1, 0, "ng-container", 5);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r14 = ɵɵnextContext(2);
    const _r4 = ɵɵreference(6);
    ɵɵproperty("routerLink", ctx_r14.node.link);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, ListItemComponent_ng_template_3_a_0_Template, 2, 2, "a", 9);
    ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_Template, 2, 2, "a", 10);
} if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    ɵɵproperty("ngIf", ctx_r3.node.externalRedirect);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r3.node.externalRedirect);
} }
function ListItemComponent_ng_template_5_span_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "span", 21);
    ɵɵelement(1, "i", 22);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r17 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ctx_r17.getSelectedFaIcon());
} }
function ListItemComponent_ng_template_5_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon", 23);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r18 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", ctx_r18.getSelectedIcon(), " ");
} }
function ListItemComponent_ng_template_5_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "mat-icon", 24);
} if (rf & 2) {
    const ctx_r19 = ɵɵnextContext(2);
    ɵɵpropertyInterpolate("svgIcon", ctx_r19.getSelectedSvgIcon());
} }
function ListItemComponent_ng_template_5_img_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "img", 25);
} if (rf & 2) {
    const ctx_r20 = ɵɵnextContext(2);
    ɵɵpropertyInterpolate("src", ctx_r20.getSelectedImageIcon(), ɵɵsanitizeUrl);
    ɵɵpropertyInterpolate("alt", ctx_r20.node.label);
} }
function ListItemComponent_ng_template_5_div_8_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, " keyboard_arrow_down ");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r22 = ɵɵnextContext(3);
    ɵɵproperty("@isExpandedLTR", ctx_r22.expanded ? "yes" : "no");
} }
function ListItemComponent_ng_template_5_div_8_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "mat-icon");
    ɵɵtext(1, " keyboard_arrow_down ");
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = ɵɵnextContext(3);
    ɵɵproperty("@isExpandedRTL", ctx_r23.expanded ? "yes" : "no");
} }
function ListItemComponent_ng_template_5_div_8_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 26);
    ɵɵtemplate(1, ListItemComponent_ng_template_5_div_8_mat_icon_1_Template, 2, 1, "mat-icon", 27);
    ɵɵtemplate(2, ListItemComponent_ng_template_5_div_8_mat_icon_2_Template, 2, 1, "mat-icon", 27);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !ctx_r21.isRtlLayout());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r21.isRtlLayout());
} }
function ListItemComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 13);
    ɵɵelementStart(1, "div", 14);
    ɵɵtemplate(2, ListItemComponent_ng_template_5_span_2_Template, 2, 1, "span", 15);
    ɵɵtemplate(3, ListItemComponent_ng_template_5_mat_icon_3_Template, 2, 1, "mat-icon", 16);
    ɵɵtemplate(4, ListItemComponent_ng_template_5_mat_icon_4_Template, 1, 1, "mat-icon", 17);
    ɵɵtemplate(5, ListItemComponent_ng_template_5_img_5_Template, 1, 2, "img", 18);
    ɵɵelementEnd();
    ɵɵelementStart(6, "span", 19);
    ɵɵtext(7);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(8, ListItemComponent_ng_template_5_div_8_Template, 3, 2, "div", 20);
} if (rf & 2) {
    const ctx_r5 = ɵɵnextContext();
    ɵɵproperty("dir", ctx_r5.isRtlLayout() ? "rtl" : "ltr");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitch", ctx_r5.getListIcon(ctx_r5.node));
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "faicon");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "icon");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "svgicon");
    ɵɵadvance(1);
    ɵɵproperty("ngSwitchCase", "imageicon");
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r5.node.label);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", ctx_r5.hasItems());
} }
class ListItemComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
        };
    }
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    }
    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (this.node.faIcon !== null &&
            this.node.faIcon !== undefined &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }
        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }
    setSelectedClass(isFound) {
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
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: this.selectedNode.id === this.node.id,
            [CONSTANT.DISABLED_ITEM_CLASS_NAME]: this.node.disabled,
            [`level-${this.level}-submenulevel-${this.submenuLevel}`]: true,
        };
        this.setClasses();
    }
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    }
    getListStyle() {
        const styles = {
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
    }
    getListIcon(node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return `icon`;
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return `faicon`;
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return `imageicon`;
        }
        else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
            return `svgicon`;
        }
        else {
            return ``;
        }
    }
    getSelectedSvgIcon() {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    }
    getSelectedIcon() {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    }
    getSelectedFaIcon() {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    }
    getSelectedImageIcon() {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    }
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    isRtlLayout() {
        return this.nodeConfiguration.rtlLayout;
    }
    setClasses() {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            'amml-submenu': this.hasItems() && this.getPaddingAtStart()
        };
    }
    expand(node) {
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
    }
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
}
ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { ɵngcc0.ɵɵinvalidFactory(); };
ListItemComponent.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: ListItemComponent, features: [ɵngcc0.ɵɵNgOnChangesFeature] });
ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(MultilevelMenuService)); };
ListItemComponent.ɵcmp = ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration" }, outputs: { selectedItem: "selectedItem" }, features: [ɵɵNgOnChangesFeature], decls: 7, vars: 2, consts: [["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click", 4, "ngIf"], [3, "dir", "ngClass", 4, "ngIf"], ["linkTemplate", ""], ["linkLabelOutlet", ""], ["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click"], [4, "ngTemplateOutlet"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"], ["class", "anml-link", 3, "href", 4, "ngIf"], ["class", "anml-link", 3, "routerLink", 4, "ngIf"], [1, "anml-link", 3, "href"], [1, "anml-link", 3, "routerLink"], [1, "anml-data", 3, "dir"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"], [1, "amml-icon-arrow-container"], [4, "ngIf"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, ListItemComponent_mat_list_item_0_Template, 2, 5, "mat-list-item", 0);
        ɵɵelement(1, "mat-divider");
        ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 1);
        ɵɵtemplate(3, ListItemComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, ɵɵtemplateRefExtractor);
        ɵɵtemplate(5, ListItemComponent_ng_template_5_Template, 9, 8, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵɵproperty("ngIf", !ctx.node.hidden);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
    } }, directives: [NgIf, MatDivider, MatListItem, MatRipple, NgClass, NgStyle, NgTemplateOutlet, Dir, NgForOf, ListItemComponent, RouterLinkWithHref, NgSwitch, NgSwitchCase, MatIcon, MatListAvatarCssMatStyler], pipes: [KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;position:relative;cursor:pointer}.anml-link[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data[_ngcontent-%COMP%]{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item[_ngcontent-%COMP%]{opacity:.5;text-decoration:none;pointer-events:none}.icon-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.label[_ngcontent-%COMP%]{line-height:48px}.amml-svg-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%], div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"], data: { animation: [
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

class MaterialsModule {
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
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "ng-list-item", 3);
    ɵɵlistener("selectedItem", function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template_ng_list_item_selectedItem_0_listener($event) { ɵɵrestoreView(_r4); const ctx_r3 = ɵɵnextContext(2); return ctx_r3.selectedListItem($event); });
    ɵɵelementEnd();
} if (rf & 2) {
    const node_r2 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
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
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ctx_r0.getClassName())("ngStyle", ctx_r0.getGlobalStyle())("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ɵɵpipeBind2(3, 4, ctx_r0.items, ctx_r0.multilevelMenuService.kvDummyComparerFn));
} }
class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
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
    ngOnChanges() {
        this.detectInvalidConfig();
    }
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.url);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    }
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    }
    checkValidData() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
        }
    }
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            const config = this.configuration;
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
    }
    getClassName() {
        if (this.isInvalidConfig) {
            return CONSTANT.DEFAULT_CLASS_NAME;
        }
        else {
            if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
            }
            else {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
        }
    }
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            const styles = {
                background: null
            };
            if (this.configuration.backgroundColor !== '' &&
                this.configuration.backgroundColor !== null &&
                this.configuration.backgroundColor !== undefined) {
                styles.background = this.configuration.backgroundColor;
            }
            return styles;
        }
    }
    isRtlLayout() {
        return this.nodeConfig.rtlLayout;
    }
    selectedListItem(event) {
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    }
}
NgMaterialMultilevelMenuComponent.ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { ɵngcc0.ɵɵinvalidFactory(); };
NgMaterialMultilevelMenuComponent.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: NgMaterialMultilevelMenuComponent, features: [ɵngcc0.ɵɵNgOnChangesFeature] });
NgMaterialMultilevelMenuComponent.ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { return new (t || NgMaterialMultilevelMenuComponent)(ɵɵdirectiveInject(Router), ɵɵdirectiveInject(MultilevelMenuService)); };
NgMaterialMultilevelMenuComponent.ɵcmp = ɵɵdefineComponent({ type: NgMaterialMultilevelMenuComponent, selectors: [["ng-material-multilevel-menu"]], inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel" }, features: [ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "dir", 4, "ngIf"], [3, "ngClass", "ngStyle", "dir"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"]], template: function NgMaterialMultilevelMenuComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, NgMaterialMultilevelMenuComponent_div_0_Template, 4, 7, "div", 0);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.items.length !== 0);
    } }, directives: [NgIf, NgClass, NgStyle, Dir, MatList, NgForOf, ListItemComponent], pipes: [KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%]{line-height:48px}.active[_ngcontent-%COMP%]{color:#1976d2}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:15px}div[dir=ltr][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:15px}div[dir=rtl][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"] });

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

class NgMaterialMultilevelMenuModule {
}
NgMaterialMultilevelMenuModule.ɵmod = ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
NgMaterialMultilevelMenuModule.ɵinj = ɵɵdefineInjector({ factory: function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); }, imports: [[
            CommonModule,
            MaterialsModule,
            RouterModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: [NgMaterialMultilevelMenuComponent,
        ListItemComponent], imports: [CommonModule,
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
                declarations: [
                    NgMaterialMultilevelMenuComponent,
                    ListItemComponent,
                ],
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