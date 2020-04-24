import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from './../constants';
import { MultilevelMenuService } from './../multilevel-menu.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./../multilevel-menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/material/divider";
import * as i5 from "@angular/material/list";
import * as i6 from "@angular/material/core";
import * as i7 from "@angular/cdk/bidi";
import * as i8 from "@angular/material/icon";
function ListItemComponent_mat_list_item_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemComponent_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
    var _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-list-item", 4);
    i0.ɵɵlistener("click", function ListItemComponent_mat_list_item_0_Template_mat_list_item_click_0_listener() { i0.ɵɵrestoreView(_r8); var ctx_r7 = i0.ɵɵnextContext(); return ctx_r7.expand(ctx_r7.node); });
    i0.ɵɵtemplate(1, ListItemComponent_mat_list_item_0_ng_container_1_Template, 1, 0, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r0 = i0.ɵɵnextContext();
    var _r2 = i0.ɵɵreference(4);
    i0.ɵɵpropertyInterpolate("title", ctx_r0.node.label);
    i0.ɵɵproperty("matRippleDisabled", ctx_r0.node.disabled)("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r2);
} }
function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
    var _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ng-list-item", 8);
    i0.ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { i0.ɵɵrestoreView(_r12); var ctx_r11 = i0.ɵɵnextContext(2); return ctx_r11.selectedListItem($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var singleNode_r10 = ctx.$implicit;
    var ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeConfiguration", ctx_r9.nodeConfiguration)("node", singleNode_r10.value)("level", ctx_r9.level + 1)("submenuLevel", singleNode_r10.key)("selectedNode", ctx_r9.selectedNode);
} }
function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6);
    i0.ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 5, "ng-list-item", 7);
    i0.ɵɵpipe(2, "keyvalue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@slideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
} }
function ListItemComponent_ng_template_3_a_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 11);
    i0.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_0_ng_container_1_Template, 1, 0, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r13 = i0.ɵɵnextContext(2);
    var _r4 = i0.ɵɵreference(6);
    i0.ɵɵproperty("href", ctx_r13.node.link, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_a_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_ng_container_1_Template, 1, 0, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r14 = i0.ɵɵnextContext(2);
    var _r4 = i0.ɵɵreference(6);
    i0.ɵɵproperty("routerLink", ctx_r14.node.link);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ListItemComponent_ng_template_3_a_0_Template, 2, 2, "a", 9);
    i0.ɵɵtemplate(1, ListItemComponent_ng_template_3_a_1_Template, 2, 2, "a", 10);
} if (rf & 2) {
    var ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r3.node.externalRedirect);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.node.externalRedirect);
} }
function ListItemComponent_ng_template_5_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵelement(1, "i", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r17.getSelectedFaIcon());
} }
function ListItemComponent_ng_template_5_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r18 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r18.getSelectedIcon(), " ");
} }
function ListItemComponent_ng_template_5_mat_icon_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-icon", 24);
} if (rf & 2) {
    var ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("svgIcon", ctx_r19.getSelectedSvgIcon());
} }
function ListItemComponent_ng_template_5_img_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 25);
} if (rf & 2) {
    var ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("src", ctx_r20.getSelectedImageIcon(), i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("alt", ctx_r20.node.label);
} }
function ListItemComponent_ng_template_5_div_8_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, " keyboard_arrow_down ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r22 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("@isExpandedLTR", ctx_r22.expanded ? "yes" : "no");
} }
function ListItemComponent_ng_template_5_div_8_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, " keyboard_arrow_down ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("@isExpandedRTL", ctx_r23.expanded ? "yes" : "no");
} }
function ListItemComponent_ng_template_5_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵtemplate(1, ListItemComponent_ng_template_5_div_8_mat_icon_1_Template, 2, 1, "mat-icon", 27);
    i0.ɵɵtemplate(2, ListItemComponent_ng_template_5_div_8_mat_icon_2_Template, 2, 1, "mat-icon", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    var ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r21.isRtlLayout());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r21.isRtlLayout());
} }
function ListItemComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵelementStart(1, "div", 14);
    i0.ɵɵtemplate(2, ListItemComponent_ng_template_5_span_2_Template, 2, 1, "span", 15);
    i0.ɵɵtemplate(3, ListItemComponent_ng_template_5_mat_icon_3_Template, 2, 1, "mat-icon", 16);
    i0.ɵɵtemplate(4, ListItemComponent_ng_template_5_mat_icon_4_Template, 1, 1, "mat-icon", 17);
    i0.ɵɵtemplate(5, ListItemComponent_ng_template_5_img_5_Template, 1, 2, "img", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 19);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ListItemComponent_ng_template_5_div_8_Template, 3, 2, "div", 20);
} if (rf & 2) {
    var ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("dir", ctx_r5.isRtlLayout() ? "rtl" : "ltr");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r5.getListIcon(ctx_r5.node));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "faicon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "icon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "svgicon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "imageicon");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r5.node.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r5.hasItems());
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
    ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.MultilevelMenuService)); };
    ListItemComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration" }, outputs: { selectedItem: "selectedItem" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 2, consts: [["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click", 4, "ngIf"], [3, "dir", "ngClass", 4, "ngIf"], ["linkTemplate", ""], ["linkLabelOutlet", ""], ["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click"], [4, "ngTemplateOutlet"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"], ["class", "anml-link", 3, "href", 4, "ngIf"], ["class", "anml-link", 3, "routerLink", 4, "ngIf"], [1, "anml-link", 3, "href"], [1, "anml-link", 3, "routerLink"], [1, "anml-data", 3, "dir"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"], [1, "amml-icon-arrow-container"], [4, "ngIf"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ListItemComponent_mat_list_item_0_Template, 2, 5, "mat-list-item", 0);
            i0.ɵɵelement(1, "mat-divider");
            i0.ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 1);
            i0.ɵɵtemplate(3, ListItemComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(5, ListItemComponent_ng_template_5_Template, 9, 8, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.node.hidden);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
        } }, directives: [i3.NgIf, i4.MatDivider, i5.MatListItem, i6.MatRipple, i3.NgClass, i3.NgStyle, i3.NgTemplateOutlet, i7.Dir, i3.NgForOf, ListItemComponent, i1.RouterLinkWithHref, i3.NgSwitch, i3.NgSwitchCase, i8.MatIcon, i5.MatListAvatarCssMatStyler], pipes: [i3.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;position:relative;cursor:pointer}.anml-link[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data[_ngcontent-%COMP%]{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item[_ngcontent-%COMP%]{opacity:.5;text-decoration:none;pointer-events:none}.icon-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.label[_ngcontent-%COMP%]{line-height:48px}.amml-svg-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%], div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"], data: { animation: [
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
export { ListItemComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ListItemComponent, [{
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
    }], function () { return [{ type: i1.Router }, { type: i2.MultilevelMenuService }]; }, { node: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyIsImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7O0lDRW5FLHdCQUE4RDs7OztJQVBoRSx3Q0FPRTtJQURBLDJNQUFzQjtJQUN0QixvR0FBK0M7SUFDakQsaUJBQWdCOzs7O0lBTmQsb0RBQXNCO0lBQ3RCLHdEQUFtQyx1Q0FBQSxrQ0FBQTtJQUlyQixlQUFnQztJQUFoQyxzQ0FBZ0M7Ozs7SUFNOUMsdUNBT2U7SUFEYiw0T0FBeUM7SUFDM0MsaUJBQWU7Ozs7SUFOYiw0REFBdUMsOEJBQUEsMkJBQUEsb0NBQUEscUNBQUE7OztJQUYzQyw4QkFDRTtJQUFBLDBGQU9BOztJQUNGLGlCQUFNOzs7SUFUOEIsdUNBQWEsNkNBQUEsMkJBQUE7SUFDakMsZUFBNEY7SUFBNUYsbUhBQTRGOzs7SUFZeEcsd0JBQWlFOzs7SUFEbkUsNkJBQ0U7SUFBQSxzR0FBa0Q7SUFDcEQsaUJBQUk7Ozs7SUFGK0MsMERBQWtCO0lBQ3JELGVBQW1DO0lBQW5DLHND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SyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDbEQsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQzt3QkFFbkQsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO3dCQUNELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjtxQkFDRixDQUFDO2lCQUNIO2FBQ0Y7O2tCQUVFLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLEtBQUs7O2tCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBncm91cCwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBMaXN0U3R5bGUsIE11bHRpbGV2ZWxOb2RlcyB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGlzdC1pdGVtLmNvbXBvbmVudC5jc3MnXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xyXG4gICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwIH0pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzAnLCBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRMVFInLCBbXHJcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkUlRMJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbGV2ZWwgPSAxO1xyXG4gIEBJbnB1dCgpIHN1Ym1lbnVMZXZlbCA9IDA7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBmaXJzdEluaXRpYWxpemVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgICAgW0NPTlNUQU5ULkFDVElWRV9JVEVNX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXSA9IHRoaXMubm9kZS5kaXNhYmxlZDtcclxuXHJcbiAgICBpZiAodGhpcy5ub2RlLmZhSWNvbiAhPT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLm5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgdGhpcy5ub2RlLmZhSWNvbi5tYXRjaCgvXFxiZmFcXHcoPyEtKS8pID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubm9kZS5mYUljb24gPSBgZmFzICR7dGhpcy5ub2RlLmZhSWNvbn1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXSA9IHRydWU7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubm9kZS5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm5vZGUuZXhwYW5kZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5zZWxlY3RlZE5vZGUuaWQgPT09IHRoaXMubm9kZS5pZCxcclxuICAgICAgW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMubm9kZS5kaXNhYmxlZCxcclxuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXHJcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cclxuICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA6IHN0eWxlcy5jb2xvciA9IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuICBnZXRMaXN0SWNvbihub2RlOiBNdWx0aWxldmVsTm9kZXMpOiBzdHJpbmcge1xyXG4gICAgaWYgKG5vZGUuaWNvbiAhPT0gbnVsbCAmJiBub2RlLmljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgaWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuZmFJY29uICE9PSBudWxsICYmIG5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5mYUljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgZmFpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5pbWFnZUljb24gIT09IG51bGwgJiYgbm9kZS5pbWFnZUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmltYWdlSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpbWFnZWljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLnN2Z0ljb24gIT09IG51bGwgJiYgbm9kZS5zdmdJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5zdmdJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYHN2Z2ljb25gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGBgO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRTZWxlY3RlZFN2Z0ljb24oKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVTdmdJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlU3ZnSWNvbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm5vZGUuc3ZnSWNvbjtcclxuICB9XHJcbiAgZ2V0U2VsZWN0ZWRJY29uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlSWNvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmFjdGl2ZUljb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlLmljb247XHJcbiAgfVxyXG4gIGdldFNlbGVjdGVkRmFJY29uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlRmFJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlRmFJY29uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5mYUljb247XHJcbiAgfVxyXG4gIGdldFNlbGVjdGVkSW1hZ2VJY29uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlSW1hZ2VJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlSW1hZ2VJY29uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5pbWFnZUljb247XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucnRsTGF5b3V0O1xyXG4gIH1cclxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc2VzID0ge1xyXG4gICAgICBbYGxldmVsLSR7dGhpcy5sZXZlbCArIDF9YF06IHRydWUsXHJcbiAgICAgICdhbW1sLXN1Ym1lbnUnOiB0aGlzLmhhc0l0ZW1zKCkgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpXHJcbiAgICB9O1xyXG4gIH1cclxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICBpZiAobm9kZS5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XHJcbiAgICB0aGlzLmZpcnN0SW5pdGlhbGl6ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcclxuICAgICAgJiYgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGVcclxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcclxuICAgICAgJiYgbm9kZS5saW5rXHJcbiAgICApIHtcclxuICAgICAgaWYgKG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCAhPT0gdW5kZWZpbmVkICYmIG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCkge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbm9kZS5saW5rO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub2RlLmxpbmtdLCBub2RlLm5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUub25TZWxlY3RlZCAmJiB0eXBlb2Ygbm9kZS5vblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLml0ZW1zID09PSB1bmRlZmluZWQgfHwgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxtYXQtbGlzdC1pdGVtIG1hdFJpcHBsZSBcclxuICAqbmdJZj1cIiFub2RlLmhpZGRlblwiXHJcbiAgdGl0bGU9XCJ7e25vZGUubGFiZWx9fVwiXHJcbiAgW21hdFJpcHBsZURpc2FibGVkXT1cIm5vZGUuZGlzYWJsZWRcIiBcclxuICBbbmdDbGFzc109XCJzZWxlY3RlZExpc3RDbGFzc2VzXCJcclxuICBbbmdTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiXHJcbiAgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiPlxyXG4gIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJsaW5rVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuPC9tYXQtbGlzdC1pdGVtPlxyXG5cclxuPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XHJcblxyXG48ZGl2ICpuZ0lmPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZFwiIFtAc2xpZGVJbk91dF0gW2Rpcl09XCJpc1J0bExheW91dCgpID8gJ3J0bCcgOiAnbHRyJ1wiIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlbiB8IGtleXZhbHVlIDogbXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmt2RHVtbXlDb21wYXJlckZuXCJcclxuICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWd1cmF0aW9uJyBcclxuICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIiBcclxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxyXG4gICAgW3N1Ym1lbnVMZXZlbF09XCJzaW5nbGVOb2RlLmtleVwiXHJcbiAgICBbc2VsZWN0ZWROb2RlXT0nc2VsZWN0ZWROb2RlJyBcclxuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XHJcbiAgPC9uZy1saXN0LWl0ZW0+XHJcbjwvZGl2PlxyXG5cclxuPG5nLXRlbXBsYXRlICNsaW5rVGVtcGxhdGU+XHJcbiAgPGEgY2xhc3M9XCJhbm1sLWxpbmtcIiAqbmdJZj1cIm5vZGUuZXh0ZXJuYWxSZWRpcmVjdFwiIFtocmVmXT1cIm5vZGUubGlua1wiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxpbmtMYWJlbE91dGxldFwiPjwvbmctY29udGFpbmVyPlxyXG4gIDwvYT5cclxuICA8YSBjbGFzcz1cImFubWwtbGlua1wiICpuZ0lmPVwiIW5vZGUuZXh0ZXJuYWxSZWRpcmVjdFwiIFtyb3V0ZXJMaW5rXT1cIm5vZGUubGlua1wiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxpbmtMYWJlbE91dGxldFwiPjwvbmctY29udGFpbmVyPlxyXG4gIDwvYT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjbGlua0xhYmVsT3V0bGV0PlxyXG4gIDxkaXYgY2xhc3M9XCJhbm1sLWRhdGFcIiBbZGlyXT1cImlzUnRsTGF5b3V0KCkgPyAncnRsJyA6ICdsdHInXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIiBbbmdTd2l0Y2hdPVwiZ2V0TGlzdEljb24obm9kZSlcIj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidmYWljb24nXCIgY2xhc3M9XCJhbW1sLWljb24gYW1tbC1pY29uLWZhXCI+XHJcbiAgICAgICAgPGkgW25nQ2xhc3NdPVwiZ2V0U2VsZWN0ZWRGYUljb24oKVwiPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8bWF0LWljb24gKm5nU3dpdGNoQ2FzZT1cIidpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgICAge3tnZXRTZWxlY3RlZEljb24oKX19XHJcbiAgICAgIDwvbWF0LWljb24+XHJcbiAgICAgIDxtYXQtaWNvbiAqbmdTd2l0Y2hDYXNlPVwiJ3N2Z2ljb24nXCIgc3ZnSWNvbj1cInt7Z2V0U2VsZWN0ZWRTdmdJY29uKCl9fVwiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtc3ZnLWljb25cIj5cclxuICAgICAgPC9tYXQtaWNvbj5cclxuICAgICAgPGltZyBtYXRMaXN0QXZhdGFyICpuZ1N3aXRjaENhc2U9XCInaW1hZ2VpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCIgc3JjPVwie3tnZXRTZWxlY3RlZEltYWdlSWNvbigpfX1cIlxyXG4gICAgICAgIGFsdD1cInt7bm9kZS5sYWJlbH19XCIgLz5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7bm9kZS5sYWJlbH19PC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJhbW1sLWljb24tYXJyb3ctY29udGFpbmVyXCIgKm5nSWY9J2hhc0l0ZW1zKCknPlxyXG4gICAgPG1hdC1pY29uICpuZ0lmPSchaXNSdGxMYXlvdXQoKScgW0Bpc0V4cGFuZGVkTFRSXT1cImV4cGFuZGVkID8gJ3llcycgOiAnbm8nXCI+XHJcbiAgICAgIGtleWJvYXJkX2Fycm93X2Rvd25cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8bWF0LWljb24gKm5nSWY9J2lzUnRsTGF5b3V0KCknIFtAaXNFeHBhbmRlZFJUTF09XCJleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAgICBrZXlib2FyZF9hcnJvd19kb3duXHJcbiAgICA8L21hdC1pY29uPlxyXG4gIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPiJdfQ==