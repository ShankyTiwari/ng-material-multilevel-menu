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
function ListItemComponent_mat_list_item_0_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵelement(1, "i", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r2.getSelectedFaIcon());
} }
function ListItemComponent_mat_list_item_0_mat_icon_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.getSelectedIcon(), " ");
} }
function ListItemComponent_mat_list_item_0_mat_icon_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-icon", 15);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("svgIcon", ctx_r4.getSelectedSvgIcon());
} }
function ListItemComponent_mat_list_item_0_img_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 16);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("src", ctx_r5.getSelectedImageIcon(), i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("alt", ctx_r5.node.label);
} }
function ListItemComponent_mat_list_item_0_div_10_mat_icon_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, " keyboard_arrow_down ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("@isExpandedLTR", ctx_r7.expanded ? "yes" : "no");
} }
function ListItemComponent_mat_list_item_0_div_10_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1, " keyboard_arrow_down ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("@isExpandedRTL", ctx_r8.expanded ? "yes" : "no");
} }
function ListItemComponent_mat_list_item_0_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtemplate(1, ListItemComponent_mat_list_item_0_div_10_mat_icon_1_Template, 2, 1, "mat-icon", 18);
    i0.ɵɵtemplate(2, ListItemComponent_mat_list_item_0_div_10_mat_icon_2_Template, 2, 1, "mat-icon", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r6.isRtlLayout());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.isRtlLayout());
} }
function ListItemComponent_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-list-item", 2);
    i0.ɵɵlistener("click", function ListItemComponent_mat_list_item_0_Template_mat_list_item_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r9 = i0.ɵɵnextContext(); return ctx_r9.expand(ctx_r9.node); });
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵelementStart(2, "a", 4);
    i0.ɵɵelementStart(3, "div", 5);
    i0.ɵɵtemplate(4, ListItemComponent_mat_list_item_0_span_4_Template, 2, 1, "span", 6);
    i0.ɵɵtemplate(5, ListItemComponent_mat_list_item_0_mat_icon_5_Template, 2, 1, "mat-icon", 7);
    i0.ɵɵtemplate(6, ListItemComponent_mat_list_item_0_mat_icon_6_Template, 1, 1, "mat-icon", 8);
    i0.ɵɵtemplate(7, ListItemComponent_mat_list_item_0_img_7_Template, 1, 2, "img", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 10);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, ListItemComponent_mat_list_item_0_div_10_Template, 3, 2, "div", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵpropertyInterpolate("title", ctx_r0.node.label);
    i0.ɵɵproperty("matRippleDisabled", ctx_r0.node.disabled)("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", ctx_r0.node.link);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r0.getListIcon(ctx_r0.node));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "faicon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "icon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "svgicon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "imageicon");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.node.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasItems());
} }
function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ng-list-item", 21);
    i0.ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(2); return ctx_r13.selectedListItem($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const singleNode_r12 = ctx.$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeConfiguration", ctx_r11.nodeConfiguration)("node", singleNode_r12.value)("level", ctx_r11.level + 1)("submenuLevel", singleNode_r12.key)("selectedNode", ctx_r11.selectedNode);
} }
function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19);
    i0.ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 5, "ng-list-item", 20);
    i0.ɵɵpipe(2, "keyvalue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@slideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
} }
export class ListItemComponent {
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
ListItemComponent.ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.MultilevelMenuService)); };
ListItemComponent.ɵcmp = i0.ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration" }, outputs: { selectedItem: "selectedItem" }, features: [i0.ɵɵNgOnChangesFeature], decls: 3, vars: 2, consts: [["matRipple", "", 3, "matRippleDisabled", "ngClass", "title", "ngStyle", "click", 4, "ngIf"], [3, "dir", "ngClass", 4, "ngIf"], ["matRipple", "", 3, "matRippleDisabled", "ngClass", "title", "ngStyle", "click"], [1, "anml-data", 3, "dir"], [1, "menu-link", 3, "routerLink"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"], [1, "amml-icon-arrow-container"], [4, "ngIf"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ListItemComponent_mat_list_item_0_Template, 11, 13, "mat-list-item", 0);
        i0.ɵɵelement(1, "mat-divider");
        i0.ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.node.hidden);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
    } }, directives: [i3.NgIf, i4.MatDivider, i5.MatListItem, i6.MatRipple, i3.NgClass, i3.NgStyle, i7.Dir, i1.RouterLinkWithHref, i3.NgSwitch, i3.NgSwitchCase, i8.MatIcon, i5.MatListAvatarCssMatStyler, i3.NgForOf, ListItemComponent], pipes: [i3.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;position:relative;cursor:pointer}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start;height:48px}.disabled-amml-item[_ngcontent-%COMP%]{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%], .label[_ngcontent-%COMP%]{line-height:48px}.amml-svg-icon[_ngcontent-%COMP%]{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%], div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"], data: { animation: [
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyIsImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7Ozs7O0lDQzdELGdDQUNFO0lBQUEsd0JBQXVDO0lBQ3pDLGlCQUFPOzs7SUFERixlQUErQjtJQUEvQixvREFBK0I7OztJQUVwQyxvQ0FDRTtJQUFBLFlBQ0Y7SUFBQSxpQkFBVzs7O0lBRFQsZUFDRjtJQURFLHlEQUNGOzs7SUFDQSwrQkFDVzs7O0lBRHlCLGdFQUFrQzs7O0lBRXRFLDBCQUNGOzs7SUFEbUUsZ0ZBQWdDO0lBQUMsa0RBQW9COzs7SUFNMUgsZ0NBQ0U7SUFBQSxxQ0FDRjtJQUFBLGlCQUFXOzs7SUFGc0IsK0RBQTBDOzs7SUFHM0UsZ0NBQ0U7SUFBQSxxQ0FDRjtJQUFBLGlCQUFXOzs7SUFGc0IsK0RBQTBDOzs7SUFKN0UsK0JBQ0U7SUFBQSxvR0FDRTtJQUVGLG9HQUNFO0lBRUosaUJBQU07OztJQU5NLGVBQXNCO0lBQXRCLDRDQUFzQjtJQUd0QixlQUFxQjtJQUFyQiwyQ0FBcUI7Ozs7SUF2Qm5DLHdDQUdFO0lBRkEsOE1BQXNCO0lBRXRCLDhCQUNFO0lBQUEsNEJBQ0U7SUFBQSw4QkFDRTtJQUFBLG9GQUNFO0lBRUYsNEZBQ0U7SUFFRiw0RkFDQTtJQUNBLGtGQUNGO0lBQUEsaUJBQU07SUFDUixpQkFBSTtJQUNKLGdDQUFvQjtJQUFBLFlBQWM7SUFBQSxpQkFBTztJQUMzQyxpQkFBTTtJQUNOLHFGQUNFO0lBT0osaUJBQWdCOzs7SUExQlMsb0RBQXNCO0lBRHRCLHdEQUFtQyx1Q0FBQSxrQ0FBQTtJQUduQyxlQUFxQztJQUFyQywwREFBcUM7SUFDdkQsZUFBd0I7SUFBeEIsNkNBQXdCO0lBQ0csZUFBOEI7SUFBOUIsMERBQThCO0lBQ2xELGVBQXdCO0lBQXhCLHVDQUF3QjtJQUdwQixlQUFzQjtJQUF0QixxQ0FBc0I7SUFHdEIsZUFBeUI7SUFBekIsd0NBQXlCO0lBRWhCLGVBQTJCO0lBQTNCLDBDQUEyQjtJQUc5QixlQUFjO0lBQWQsdUNBQWM7SUFFRyxlQUFrQjtJQUFsQix3Q0FBa0I7Ozs7SUFhekQsd0NBT2U7SUFEYiw4T0FBeUM7SUFDM0MsaUJBQWU7Ozs7SUFOYiw2REFBdUMsOEJBQUEsNEJBQUEsb0NBQUEsc0NBQUE7OztJQUYzQywrQkFDRTtJQUFBLDJGQU9BOztJQUNGLGlCQUFNOzs7SUFUOEIsdUNBQWEsNkNBQUEsMkJBQUE7SUFDakMsZUFBNEY7SUFBNUYsbUhBQTRGOztBRHVCNUcsTUFBTSxPQUFPLGlCQUFpQjtJQWE1QixZQUNVLE1BQWMsRUFDZixxQkFBNEM7UUFEM0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFiNUMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLHNCQUFpQixHQUFrQixJQUFJLENBQUM7UUFDdkMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3RCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSW5CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBS3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUN6QixDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLElBQUk7WUFDeEMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRSxLQUFLO1lBQzFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsS0FBSztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUNqRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JHO0lBQ0gsQ0FBQztJQUNELFFBQVE7UUFDTixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFakYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3pGLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0QsZ0JBQWdCLENBQUMsT0FBZ0I7UUFDL0IsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDcEg7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzthQUN2QjtTQUNGO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQ3pCLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsSUFBSTtZQUN4QyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQ3BELENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hFLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ3ZELENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxpQkFBaUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsSUFBSTtTQUNoRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlELENBQUM7SUFDRCxZQUFZO1FBQ1YsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVLEVBQUUsUUFBUSxDQUFDLDZCQUE2QjtZQUNsRCxLQUFLLEVBQUUsUUFBUSxDQUFDLHVCQUF1QjtTQUN4QyxDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEtBQUssSUFBSSxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLDJCQUEyQixDQUFDO1NBQ3JIO2FBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7U0FDakQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQXFCO1FBQy9CLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDckUsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDbEYsT0FBTyxRQUFRLENBQUM7U0FDakI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFFO1lBQzNGLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO2FBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtZQUNyRixPQUFPLFNBQVMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFDRCxrQkFBa0I7UUFDaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQzlDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDaEM7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFDRCxlQUFlO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDN0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUNELG9CQUFvQjtRQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUNsQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDckQsQ0FBQztJQUNELFdBQVc7UUFDVCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7SUFDMUMsQ0FBQztJQUNELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJO1lBQ2pDLGNBQWMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1NBQzVELENBQUM7SUFDSixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQXFCO1FBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsS0FBSyxJQUFJO2VBQ2pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0I7ZUFDekMsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTO2VBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQ1o7WUFDQSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNoRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2xDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQzFEO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFO1lBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxJQUFxQjtRQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDOztrRkEvSlUsaUJBQWlCO3NEQUFqQixpQkFBaUI7UUN2RDlCLHdGQUdFO1FBMEJGLDhCQUEyQjtRQUUzQixrRUFDRTs7UUFoQzJGLHVDQUFvQjtRQStCNUcsZUFBOEI7UUFBOUIscURBQThCO3VORHdCdEIsaUJBQWlCLCs0QkExQ2hCO1lBQ1YsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDcEIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQyxVQUFVLENBQUMsUUFBUSxFQUFFO29CQUNuQixLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQztvQkFDcEMsS0FBSyxDQUFDO3dCQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2xDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDakQsQ0FBQztpQkFDSCxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7b0JBQ25CLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO29CQUNsQyxLQUFLLENBQUM7d0JBQ0osT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDcEMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNqRCxDQUFDO2lCQUNILENBQUM7YUFDSCxDQUFDO1lBQ0YsT0FBTyxDQUFDLGVBQWUsRUFBRTtnQkFDdkIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDO2dCQUVuRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7Z0JBQ0QsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO2FBQ0YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUM7Z0JBRW5ELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjtnQkFDRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7YUFDRixDQUFDO1NBQ0g7a0RBRVUsaUJBQWlCO2NBOUM3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2dCQUN4QyxVQUFVLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDcEIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUMvQyxVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQzs0QkFDcEMsS0FBSyxDQUFDO2dDQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0NBQ2xDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDakQsQ0FBQzt5QkFDSCxDQUFDO3dCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ25CLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDOzRCQUNsQyxLQUFLLENBQUM7Z0NBQ0osT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQ0FDcEMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNqRCxDQUFDO3lCQUNILENBQUM7cUJBQ0gsQ0FBQztvQkFDRixPQUFPLENBQUMsZUFBZSxFQUFFO3dCQUN2QixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7d0JBQ25ELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUM7d0JBRW5ELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjt3QkFDRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7cUJBQ0YsQ0FBQztvQkFDRixPQUFPLENBQUMsZUFBZSxFQUFFO3dCQUN2QixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDO3dCQUVuRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7d0JBQ0QsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO3FCQUNGLENBQUM7aUJBQ0g7YUFDRjs7a0JBRUUsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIGdyb3VwLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi8uLi9hcHAubW9kZWwnO1xuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuLy4uL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saXN0LWl0ZW0uY29tcG9uZW50LmNzcyddLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcbiAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAgfSkpLFxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXG4gICAgICAgIGdyb3VwKFtcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpLFxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnMCcsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgIGdyb3VwKFtcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXG4gICAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRMVFInLCBbXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXG4gICAgICBzdGF0ZSgneWVzJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLCB9KSksXG5cbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXG4gICAgICAgIGFuaW1hdGUoMjAwKVxuICAgICAgKSxcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXG4gICAgICAgIGFuaW1hdGUoMjAwKVxuICAgICAgKVxuICAgIF0pLFxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRSVEwnLCBbXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0pKSxcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcblxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcbiAgICAgICAgYW5pbWF0ZSgyMDApXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcbiAgICAgICAgYW5pbWF0ZSgyMDApXG4gICAgICApXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgbm9kZTogTXVsdGlsZXZlbE5vZGVzO1xuICBASW5wdXQoKSBsZXZlbCA9IDE7XG4gIEBJbnB1dCgpIHN1Ym1lbnVMZXZlbCA9IDA7XG4gIEBJbnB1dCgpIHNlbGVjdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzO1xuICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcbiAgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xuICBzZWxlY3RlZExpc3RDbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xuICBleHBhbmRlZCA9IGZhbHNlO1xuICBmaXJzdEluaXRpYWxpemVyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IGZhbHNlLFxuICAgIH07XG4gIH1cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZE5vZGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkTm9kZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZENsYXNzKHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLnJlY3Vyc2l2ZUNoZWNrSWQodGhpcy5ub2RlLCB0aGlzLnNlbGVjdGVkTm9kZS5pZCkpO1xuICAgIH1cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXSA9IHRoaXMubm9kZS5kaXNhYmxlZDtcblxuICAgIGlmICh0aGlzLm5vZGUuZmFJY29uICE9PSBudWxsICYmXG4gICAgICB0aGlzLm5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHRoaXMubm9kZS5mYUljb24ubWF0Y2goL1xcYmZhXFx3KD8hLSkvKSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5ub2RlLmZhSWNvbiA9IGBmYXMgJHt0aGlzLm5vZGUuZmFJY29ufWA7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdID0gdHJ1ZTtcbiAgICBpZiAodHlwZW9mIHRoaXMubm9kZS5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy5ub2RlLmV4cGFuZGVkO1xuICAgIH1cbiAgICB0aGlzLnNldENsYXNzZXMoKTtcbiAgfVxuICBzZXRTZWxlY3RlZENsYXNzKGlzRm91bmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNGb3VuZCkge1xuICAgICAgaWYgKCF0aGlzLmZpcnN0SW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmhpZ2hsaWdodE9uU2VsZWN0IHx8IHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxuICAgICAgW0NPTlNUQU5ULkFDVElWRV9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLnNlbGVjdGVkTm9kZS5pZCA9PT0gdGhpcy5ub2RlLmlkLFxuICAgICAgW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMubm9kZS5kaXNhYmxlZCxcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXTogdHJ1ZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xuICB9XG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0ID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xuICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgIGJhY2tncm91bmQ6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SLFxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXG4gICAgfTtcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsKSB7XG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xuICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA6IHN0eWxlcy5jb2xvciA9IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjtcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yICE9PSBudWxsKSB7XG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlcztcbiAgfVxuICBnZXRMaXN0SWNvbihub2RlOiBNdWx0aWxldmVsTm9kZXMpOiBzdHJpbmcge1xuICAgIGlmIChub2RlLmljb24gIT09IG51bGwgJiYgbm9kZS5pY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5pY29uICE9PSAnJykge1xuICAgICAgcmV0dXJuIGBpY29uYDtcbiAgICB9IGVsc2UgaWYgKG5vZGUuZmFJY29uICE9PSBudWxsICYmIG5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5mYUljb24gIT09ICcnKSB7XG4gICAgICByZXR1cm4gYGZhaWNvbmA7XG4gICAgfSBlbHNlIGlmIChub2RlLmltYWdlSWNvbiAhPT0gbnVsbCAmJiBub2RlLmltYWdlSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaW1hZ2VJY29uICE9PSAnJykge1xuICAgICAgcmV0dXJuIGBpbWFnZWljb25gO1xuICAgIH0gZWxzZSBpZiAobm9kZS5zdmdJY29uICE9PSBudWxsICYmIG5vZGUuc3ZnSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuc3ZnSWNvbiAhPT0gJycpIHtcbiAgICAgIHJldHVybiBgc3ZnaWNvbmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgYDtcbiAgICB9XG4gIH1cbiAgZ2V0U2VsZWN0ZWRTdmdJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZVN2Z0ljb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlU3ZnSWNvbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9kZS5zdmdJY29uO1xuICB9XG4gIGdldFNlbGVjdGVkSWNvbigpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVJY29uKSB7XG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmFjdGl2ZUljb247XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vZGUuaWNvbjtcbiAgfVxuICBnZXRTZWxlY3RlZEZhSWNvbigpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVGYUljb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlRmFJY29uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2RlLmZhSWNvbjtcbiAgfVxuICBnZXRTZWxlY3RlZEltYWdlSWNvbigpIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVJbWFnZUljb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlSW1hZ2VJY29uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2RlLmltYWdlSWNvbjtcbiAgfVxuICBoYXNJdGVtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5ydGxMYXlvdXQ7XG4gIH1cbiAgc2V0Q2xhc3NlcygpOiB2b2lkIHtcbiAgICB0aGlzLmNsYXNzZXMgPSB7XG4gICAgICBbYGxldmVsLSR7dGhpcy5sZXZlbCArIDF9YF06IHRydWUsXG4gICAgICAnYW1tbC1zdWJtZW51JzogdGhpcy5oYXNJdGVtcygpICYmIHRoaXMuZ2V0UGFkZGluZ0F0U3RhcnQoKVxuICAgIH07XG4gIH1cbiAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xuICAgIGlmIChub2RlLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB0aGlzLmZpcnN0SW5pdGlhbGl6ZXIgPSB0cnVlO1xuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxuICAgICAgJiYgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGVcbiAgICAgICYmIG5vZGUubGluayAhPT0gdW5kZWZpbmVkXG4gICAgICAmJiBub2RlLmxpbmtcbiAgICApIHtcbiAgICAgIGlmIChub2RlLmV4dGVybmFsUmVkaXJlY3QgIT09IHVuZGVmaW5lZCAmJiBub2RlLmV4dGVybmFsUmVkaXJlY3QpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSwgbm9kZS5uYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGUub25TZWxlY3RlZCAmJiB0eXBlb2Ygbm9kZS5vblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBub2RlLm9uU2VsZWN0ZWQobm9kZSk7XG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XG4gICAgfSBlbHNlIGlmIChub2RlLml0ZW1zID09PSB1bmRlZmluZWQgfHwgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XG4gICAgfVxuICB9XG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChub2RlKTtcbiAgfVxufVxuIiwiPG1hdC1saXN0LWl0ZW0gbWF0UmlwcGxlIFttYXRSaXBwbGVEaXNhYmxlZF09XCJub2RlLmRpc2FibGVkXCIgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCJcbiAgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxuICBbbmdTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiPlxuICA8ZGl2IGNsYXNzPVwiYW5tbC1kYXRhXCIgW2Rpcl09XCJpc1J0bExheW91dCgpID8gJ3J0bCcgOiAnbHRyJ1wiPlxuICAgIDxhIFtyb3V0ZXJMaW5rXT1cIm5vZGUubGlua1wiIGNsYXNzPVwibWVudS1saW5rXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIiBbbmdTd2l0Y2hdPVwiZ2V0TGlzdEljb24obm9kZSlcIj5cbiAgICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidmYWljb24nXCIgY2xhc3M9XCJhbW1sLWljb24gYW1tbC1pY29uLWZhXCI+XG4gICAgICAgICAgPGkgW25nQ2xhc3NdPVwiZ2V0U2VsZWN0ZWRGYUljb24oKVwiPjwvaT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8bWF0LWljb24gKm5nU3dpdGNoQ2FzZT1cIidpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCI+XG4gICAgICAgICAge3tnZXRTZWxlY3RlZEljb24oKX19XG4gICAgICAgIDwvbWF0LWljb24+XG4gICAgICAgIDxtYXQtaWNvbiAqbmdTd2l0Y2hDYXNlPVwiJ3N2Z2ljb24nXCIgc3ZnSWNvbj1cInt7Z2V0U2VsZWN0ZWRTdmdJY29uKCl9fVwiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtc3ZnLWljb25cIj5cbiAgICAgICAgPC9tYXQtaWNvbj5cbiAgICAgICAgPGltZyBtYXRMaXN0QXZhdGFyICpuZ1N3aXRjaENhc2U9XCInaW1hZ2VpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCIgc3JjPVwie3tnZXRTZWxlY3RlZEltYWdlSWNvbigpfX1cIiBhbHQ9XCJ7e25vZGUubGFiZWx9fVwiLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvYT5cbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYW1tbC1pY29uLWFycm93LWNvbnRhaW5lclwiICpuZ0lmPSdoYXNJdGVtcygpJz5cbiAgICA8bWF0LWljb24gKm5nSWY9JyFpc1J0bExheW91dCgpJyBbQGlzRXhwYW5kZWRMVFJdPVwiZXhwYW5kZWQgPyAneWVzJyA6ICdubydcIj5cbiAgICAgIGtleWJvYXJkX2Fycm93X2Rvd25cbiAgICA8L21hdC1pY29uPlxuICAgIDxtYXQtaWNvbiAqbmdJZj0naXNSdGxMYXlvdXQoKScgIFtAaXNFeHBhbmRlZFJUTF09XCJleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxuICAgICAga2V5Ym9hcmRfYXJyb3dfZG93blxuICAgIDwvbWF0LWljb24+XG4gIDwvZGl2PlxuPC9tYXQtbGlzdC1pdGVtPlxuXG48bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cblxuPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQHNsaWRlSW5PdXRdIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIiBbbmdDbGFzc109XCJjbGFzc2VzXCI+XG4gIDxuZy1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IHNpbmdsZU5vZGUgb2Ygbm9kZUNoaWxkcmVuIHwga2V5dmFsdWUgOiBtdWx0aWxldmVsTWVudVNlcnZpY2Uua3ZEdW1teUNvbXBhcmVyRm5cIlxuICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWd1cmF0aW9uJ1xuICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIlxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxuICAgIFtzdWJtZW51TGV2ZWxdPVwic2luZ2xlTm9kZS5rZXlcIlxuICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXG4gICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIj5cbiAgPC9uZy1saXN0LWl0ZW0+XG48L2Rpdj5cbiJdfQ==