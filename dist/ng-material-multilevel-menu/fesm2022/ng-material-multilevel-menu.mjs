import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, Input, EventEmitter, Output, NgModule, ContentChild } from '@angular/core';
import * as i1 from '@angular/router';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import * as i4 from '@angular/cdk/bidi';
import * as i5 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i6 from '@angular/material/divider';
import * as i7 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';

var ExpandCollapseStatusEnum;
(function (ExpandCollapseStatusEnum) {
    ExpandCollapseStatusEnum["expand"] = "expand";
    ExpandCollapseStatusEnum["collapse"] = "collapse";
    ExpandCollapseStatusEnum["neutral"] = "neutral";
})(ExpandCollapseStatusEnum || (ExpandCollapseStatusEnum = {}));

const CONSTANT = {
    PADDING_AT_START: true,
    DEFAULT_CLASS_NAME: `amml-container`,
    DEFAULT_LIST_CLASS_NAME: `amml-item`,
    SELECTED_LIST_CLASS_NAME: `selected-amml-item`,
    ACTIVE_ITEM_CLASS_NAME: `active-amml-item`,
    DISABLED_ITEM_CLASS_NAME: `disabled-amml-item`,
    SUBMENU_ITEM_CLASS_NAME: `amml-submenu`,
    HAS_SUBMENU_ITEM_CLASS_NAME: `has-amml-submenu`,
    DEFAULT_SELECTED_FONT_COLOR: `#1976d2`,
    DEFAULT_LIST_BACKGROUND_COLOR: `transparent`,
    DEFAULT_LIST_FONT_COLOR: `rgba(0,0,0,.87)`,
    DEFAULT_HREF_TARGET_TYPE: '_self',
    ERROR_MESSAGE: `Invalid data for material Multilevel List Component`,
    POSSIBLE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    YES: 'yes',
    NO: 'no'
};

class MultilevelMenuService {
    foundLinkObject;
    expandCollapseStatus = new Subject();
    expandCollapseStatus$ = this.expandCollapseStatus.asObservable();
    selectedMenuID = new Subject();
    selectedMenuID$ = this.selectedMenuID.asObservable();
    generateId() {
        let text = '';
        for (let i = 0; i < 20; i++) {
            text += CONSTANT.POSSIBLE.charAt(Math.floor(Math.random() * CONSTANT.POSSIBLE.length));
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
    findNodeRecursively({ nodes, link, id }) {
        for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
            const node = nodes[nodeIndex];
            for (const key in node) {
                if (node.hasOwnProperty(key)) {
                    if (encodeURI(node.link) === link) {
                        this.foundLinkObject = node;
                    }
                    else if (node.id === id) {
                        this.foundLinkObject = node;
                    }
                    else {
                        if (node.items !== undefined) {
                            this.findNodeRecursively({
                                nodes: node.items,
                                link: link ? link : null,
                                id: id ? id : null
                            });
                        }
                    }
                }
            }
        }
    }
    getMatchedObjectByUrl(nodes, link) {
        this.findNodeRecursively({ nodes, link });
        return this.foundLinkObject;
    }
    getMatchedObjectById(nodes, id) {
        this.findNodeRecursively({ nodes, id });
        return this.foundLinkObject;
    }
    // overrides key-value pipe's default reordering (by key) by implementing dummy comprarer function
    // https://angular.io/api/common/KeyValuePipe#description
    kvDummyComparerFn() {
        return 0;
    }
    setMenuExpandCollapseStatus(status) {
        this.expandCollapseStatus.next(status ? status : ExpandCollapseStatusEnum.neutral);
    }
    selectMenuByID(menuID) {
        this.selectedMenuID.next(menuID);
        return this.foundLinkObject;
    }
}

const SlideInOut = trigger('SlideInOut', [
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
]);
const ExpandedLTR = trigger('ExpandedLTR', [
    state('no', style({ transform: 'rotate(-90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)', })),
    transition('no => yes', animate(200)),
    transition('yes => no', animate(200))
]);
const ExpandedRTL = trigger('ExpandedRTL', [
    state('no', style({ transform: 'rotate(90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)', })),
    transition('no => yes', animate(200)),
    transition('yes => no', animate(200))
]);

class CommonUtils {
    static isNullOrUndefinedOrEmpty = function (object) {
        return CommonUtils.isNullOrUndefined(object) || object === '';
    };
    static isNullOrUndefined = function (object) {
        return object === null || object === undefined;
    };
}

function ListItemContentComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemContentComponent_ng_template_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemContentComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 6);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_1_ng_container_1_Template, 1, 0, "ng-container", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const _r7 = i0.ɵɵreference(8);
    const _r5 = i0.ɵɵreference(6);
    i0.ɵɵproperty("href", ctx_r2.node.link, i0.ɵɵsanitizeUrl)("target", ctx_r2.getHrefTargetType());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r2.isRtlLayout ? _r7 : _r5);
} }
function ListItemContentComponent_ng_template_3_a_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemContentComponent_ng_template_3_a_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 9);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_3_a_0_ng_container_1_Template, 1, 0, "ng-container", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    const _r7 = i0.ɵɵreference(8);
    const _r5 = i0.ɵɵreference(6);
    i0.ɵɵproperty("routerLink", ctx_r12.node.link);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r12.isRtlLayout ? _r7 : _r5);
} }
function ListItemContentComponent_ng_template_3_a_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemContentComponent_ng_template_3_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 10);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_3_a_1_ng_container_1_Template, 1, 0, "ng-container", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    const _r7 = i0.ɵɵreference(8);
    const _r5 = i0.ɵɵreference(6);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r13.isRtlLayout ? _r7 : _r5);
} }
function ListItemContentComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ListItemContentComponent_ng_template_3_a_0_Template, 2, 2, "a", 7);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_3_a_1_Template, 2, 1, "a", 8);
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", !ctx_r4.node.externalRedirect && ctx_r4.node.link);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r4.node.link);
} }
function ListItemContentComponent_ng_template_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemContentComponent_ng_template_5_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "mat-icon");
    i0.ɵɵtext(2, " keyboard_arrow_down ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r17 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("@ExpandedLTR", ctx_r17.nodeExpandStatus());
} }
function ListItemContentComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_5_ng_container_1_Template, 1, 0, "ng-container", 0);
    i0.ɵɵelementStart(2, "span", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, ListItemContentComponent_ng_template_5_div_4_Template, 3, 1, "div", 13);
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext();
    const _r9 = i0.ɵɵreference(10);
    i0.ɵɵproperty("dir", "ltr");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r9);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r6.node.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r6.node.hasChildren);
} }
function ListItemContentComponent_ng_template_7_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemContentComponent_ng_template_7_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "mat-icon");
    i0.ɵɵtext(2, " keyboard_arrow_down ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r19 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("@ExpandedRTL", ctx_r19.nodeExpandStatus());
} }
function ListItemContentComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_7_ng_container_1_Template, 1, 0, "ng-container", 0);
    i0.ɵɵelementStart(2, "span", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(4, ListItemContentComponent_ng_template_7_div_4_Template, 3, 1, "div", 13);
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    const _r9 = i0.ɵɵreference(10);
    i0.ɵɵproperty("dir", "rtl");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r9);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r8.node.label);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r8.node.hasChildren);
} }
function ListItemContentComponent_ng_template_9_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 20);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", ctx_r20.getSelectedFaIcon());
} }
function ListItemContentComponent_ng_template_9_mat_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", ctx_r21.getSelectedIcon(), " ");
} }
function ListItemContentComponent_ng_template_9_mat_icon_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-icon", 23);
} if (rf & 2) {
    const ctx_r22 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("svgIcon", ctx_r22.getSelectedSvgIcon());
} }
function ListItemContentComponent_ng_template_9_img_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 24);
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(2);
    i0.ɵɵpropertyInterpolate("src", ctx_r23.getSelectedImageIcon(), i0.ɵɵsanitizeUrl);
    i0.ɵɵpropertyInterpolate("alt", ctx_r23.node.label);
} }
function ListItemContentComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_9_span_1_Template, 2, 1, "span", 16);
    i0.ɵɵtemplate(2, ListItemContentComponent_ng_template_9_mat_icon_2_Template, 2, 1, "mat-icon", 17);
    i0.ɵɵtemplate(3, ListItemContentComponent_ng_template_9_mat_icon_3_Template, 1, 1, "mat-icon", 18);
    i0.ɵɵtemplate(4, ListItemContentComponent_ng_template_9_img_4_Template, 1, 2, "img", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngSwitch", ctx_r10.getListIcon(ctx_r10.node));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "faIcon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "icon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "svgIcon");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "imageIcon");
} }
class ListItemContentComponent {
    node;
    isRtlLayout;
    constructor() {
        // NOOP
    }
    ngOnInit() {
        // NOOP
    }
    getListIcon(node) {
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.icon)) {
            return `icon`;
        }
        else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.faIcon)) {
            return `faIcon`;
        }
        else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.imageIcon)) {
            return `imageIcon`;
        }
        else if (!CommonUtils.isNullOrUndefinedOrEmpty(node.svgIcon)) {
            return `svgIcon`;
        }
        else {
            return ``;
        }
    }
    getHrefTargetType() {
        return this.node.hrefTargetType ? this.node.hrefTargetType : CONSTANT.DEFAULT_HREF_TARGET_TYPE;
    }
    getSelectedSvgIcon() {
        return this.node.isSelected && this.node.activeSvgIcon ? this.node.activeSvgIcon : this.node.svgIcon;
    }
    getSelectedIcon() {
        return this.node.isSelected && this.node.activeIcon ? this.node.activeIcon : this.node.icon;
    }
    getSelectedFaIcon() {
        return this.node.isSelected && this.node.activeFaIcon ? this.node.activeFaIcon : this.node.faIcon;
    }
    getSelectedImageIcon() {
        return this.node.isSelected && this.node.activeImageIcon ? this.node.activeImageIcon : this.node.imageIcon;
    }
    nodeExpandStatus() {
        return this.node.expanded ? CONSTANT.YES : CONSTANT.NO;
    }
    static ɵfac = function ListItemContentComponent_Factory(t) { return new (t || ListItemContentComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListItemContentComponent, selectors: [["ng-list-item-content"]], inputs: { node: "node", isRtlLayout: "isRtlLayout" }, decls: 11, vars: 1, consts: [[4, "ngTemplateOutlet"], ["redirectLinkTemplate", ""], ["routerLinkTemplate", ""], ["linkLabelLtrOutlet", ""], ["linkLabelRtlOutlet", ""], ["iconContainer", ""], [1, "anml-link", 3, "href", "target"], ["class", "anml-link", 3, "routerLink", 4, "ngIf"], ["class", "anml-link", 4, "ngIf"], [1, "anml-link", 3, "routerLink"], [1, "anml-link"], [1, "anml-data", 3, "dir"], [1, "label"], ["class", "amml-icon-arrow-container", 4, "ngIf"], [1, "amml-icon-arrow-container"], [1, "icon-container", 3, "ngSwitch"], ["class", "amml-icon amml-icon-fa", 4, "ngSwitchCase"], ["class", "amml-icon", 4, "ngSwitchCase"], ["class", "amml-icon amml-svg-icon", 3, "svgIcon", 4, "ngSwitchCase"], ["matListAvatar", "", "class", "amml-icon", 3, "src", "alt", 4, "ngSwitchCase"], [1, "amml-icon", "amml-icon-fa"], [3, "ngClass"], [1, "amml-icon"], [1, "amml-icon", "amml-svg-icon", 3, "svgIcon"], ["matListAvatar", "", 1, "amml-icon", 3, "src", "alt"]], template: function ListItemContentComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ListItemContentComponent_ng_container_0_Template, 1, 0, "ng-container", 0);
            i0.ɵɵtemplate(1, ListItemContentComponent_ng_template_1_Template, 2, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(3, ListItemContentComponent_ng_template_3_Template, 2, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(5, ListItemContentComponent_ng_template_5_Template, 5, 4, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(7, ListItemContentComponent_ng_template_7_Template, 5, 4, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(9, ListItemContentComponent_ng_template_9_Template, 5, 5, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const _r1 = i0.ɵɵreference(2);
            const _r3 = i0.ɵɵreference(4);
            i0.ɵɵproperty("ngTemplateOutlet", ctx.node.externalRedirect ? _r1 : _r3);
        } }, dependencies: [i3.NgClass, i3.NgIf, i3.NgTemplateOutlet, i3.NgSwitch, i3.NgSwitchCase, i2.MatIcon, i4.Dir, i1.RouterLink], styles: [".amml-item[_ngcontent-%COMP%]{position:relative;cursor:pointer}.anml-link[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data[_ngcontent-%COMP%]{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item[_ngcontent-%COMP%]{opacity:.5;text-decoration:none;pointer-events:none}.icon-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.label[_ngcontent-%COMP%]{line-height:48px;font-weight:400}.amml-svg-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}"], data: { animation: [ExpandedLTR, ExpandedRTL] } });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListItemContentComponent, [{
        type: Component,
        args: [{ selector: 'ng-list-item-content', animations: [ExpandedLTR, ExpandedRTL], template: "<ng-container *ngTemplateOutlet=\"node.externalRedirect ? redirectLinkTemplate : routerLinkTemplate\"></ng-container>\r\n\r\n<ng-template #redirectLinkTemplate>\r\n  <a class=\"anml-link\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\r\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #routerLinkTemplate>\r\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect && node.link\" [routerLink]=\"node.link\">\r\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n  </a>\r\n  <a class=\"anml-link\" *ngIf=\"!node.link\">\r\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelLtrOutlet>\r\n  <div class=\"anml-data\" [dir]=\"'ltr'\">\r\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\r\n    <mat-icon [@ExpandedLTR]=\"nodeExpandStatus()\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelRtlOutlet>\r\n  <div class=\"anml-data\" [dir]=\"'rtl'\">\r\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\r\n    <mat-icon [@ExpandedRTL]=\"nodeExpandStatus()\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #iconContainer>\r\n  <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faIcon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n      </span>\r\n    <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n      {{getSelectedIcon()}}\r\n    </mat-icon>\r\n    <mat-icon *ngSwitchCase=\"'svgIcon'\" class=\"amml-icon amml-svg-icon\"\r\n              svgIcon=\"{{getSelectedSvgIcon()}}\">\r\n    </mat-icon>\r\n    <img *ngSwitchCase=\"'imageIcon'\" matListAvatar class=\"amml-icon\"\r\n         src=\"{{getSelectedImageIcon()}}\" alt=\"{{node.label}}\"/>\r\n  </div>\r\n</ng-template>\r\n\r\n", styles: [".amml-item{position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=rtl] .amml-icon{margin-left:16px}\n"] }]
    }], function () { return []; }, { node: [{
            type: Input
        }], isRtlLayout: [{
            type: Input
        }] }); })();

const _c0$1 = function (a0, a1) { return { item: a0, configuration: a1 }; };
function ListItemComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵlistener("click", function ListItemComponent_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r6.expand(ctx_r6.node)); });
    i0.ɵɵelementContainer(1, 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.selectedListClasses)("ngStyle", ctx_r0.getListStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", ctx_r0.listTemplate)("ngTemplateOutletContext", i0.ɵɵpureFunction2(4, _c0$1, ctx_r0.node, ctx_r0.nodeConfiguration));
} }
function ListItemComponent_div_2_ng_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ng-list-item", 9);
    i0.ɵɵlistener("selectedItem", function ListItemComponent_div_2_ng_list_item_1_Template_ng_list_item_selectedItem_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r10.selectedListItem($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const singleNode_r9 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeConfiguration", ctx_r8.nodeConfiguration)("node", singleNode_r9.value)("level", ctx_r8.level + 1)("submenuLevel", singleNode_r9.key)("selectedNode", ctx_r8.selectedNode)("nodeExpandCollapseStatus", ctx_r8.nodeExpandCollapseStatus)("listTemplate", ctx_r8.listTemplate);
} }
function ListItemComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, ListItemComponent_div_2_ng_list_item_1_Template, 1, 7, "ng-list-item", 8);
    i0.ɵɵpipe(2, "keyvalue");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@SlideInOut", undefined)("dir", ctx_r1.isRtlLayout() ? "rtl" : "ltr")("ngClass", ctx_r1.classes);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(2, 4, ctx_r1.nodeChildren, ctx_r1.multilevelMenuService.kvDummyComparerFn));
} }
function ListItemComponent_ng_template_3_mat_list_item_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ListItemComponent_ng_template_3_mat_list_item_0_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-list-item", 12);
    i0.ɵɵlistener("click", function ListItemComponent_ng_template_3_mat_list_item_0_Template_mat_list_item_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r15 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r15.expand(ctx_r15.node)); });
    i0.ɵɵtemplate(1, ListItemComponent_ng_template_3_mat_list_item_0_ng_container_1_Template, 1, 0, "ng-container", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    const _r4 = i0.ɵɵreference(6);
    i0.ɵɵpropertyInterpolate("title", ctx_r12.node.label);
    i0.ɵɵproperty("matRippleDisabled", ctx_r12.node.disabled)("ngClass", ctx_r12.selectedListClasses)("ngStyle", ctx_r12.getListStyle());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r4);
} }
function ListItemComponent_ng_template_3_mat_divider_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-divider");
} }
function ListItemComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ListItemComponent_ng_template_3_mat_list_item_0_Template, 2, 5, "mat-list-item", 10);
    i0.ɵɵtemplate(1, ListItemComponent_ng_template_3_mat_divider_1_Template, 1, 0, "mat-divider", 11);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", !ctx_r3.node.hidden);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r3.nodeConfiguration.useDividers);
} }
function ListItemComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ng-list-item-content", 14);
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵproperty("node", ctx_r5.node)("isRtlLayout", ctx_r5.isRtlLayout());
} }
class ListItemComponent {
    router;
    multilevelMenuService;
    node;
    level = 1;
    submenuLevel = 0;
    selectedNode;
    nodeConfiguration = null;
    nodeExpandCollapseStatus = null;
    listTemplate = null;
    selectedItem = new EventEmitter();
    isSelected = false;
    expanded = false;
    firstInitializer = false;
    nodeChildren;
    classes;
    selectedListClasses;
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
        };
    }
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        this.node.hasChildren = this.hasItems();
        if (!CommonUtils.isNullOrUndefined(this.selectedNode)) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
        this.setExpandCollapseStatus();
    }
    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (!CommonUtils.isNullOrUndefined(this.node.faIcon) &&
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
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined;
        }
        else {
            this.isSelected = false;
            if (this.nodeConfiguration.collapseOnSelect) {
                this.node.expanded = false;
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
        this.node.isSelected = this.isSelected;
        this.setClasses();
    }
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart;
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
    hasItems() {
        return this.nodeChildren.length > 0;
    }
    isRtlLayout() {
        return this.nodeConfiguration.rtlLayout;
    }
    setClasses() {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            [CONSTANT.SUBMENU_ITEM_CLASS_NAME]: this.hasItems() && this.getPaddingAtStart(),
            [CONSTANT.HAS_SUBMENU_ITEM_CLASS_NAME]: this.hasItems()
        };
    }
    setExpandCollapseStatus() {
        if (!CommonUtils.isNullOrUndefined(this.nodeExpandCollapseStatus)) {
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.expand) {
                this.expanded = true;
                if (this.nodeConfiguration.customTemplate) {
                    this.node.expanded = true;
                }
            }
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.collapse) {
                this.expanded = false;
                if (this.nodeConfiguration.customTemplate) {
                    this.node.expanded = false;
                }
            }
        }
    }
    expand(node) {
        if (node.disabled) {
            return;
        }
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        this.expanded = !this.expanded;
        this.node.expanded = this.expanded;
        this.firstInitializer = true;
        this.setClasses();
        if (this.nodeConfiguration.interfaceWithRoute !== null
            && this.nodeConfiguration.interfaceWithRoute
            && node.link !== undefined
            && node.link) {
            this.router.navigate([node.link], node.navigationExtras).then();
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
    static ɵfac = function ListItemComponent_Factory(t) { return new (t || ListItemComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(MultilevelMenuService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ListItemComponent, selectors: [["ng-list-item"]], inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", listTemplate: "listTemplate" }, outputs: { selectedItem: "selectedItem" }, features: [i0.ɵɵNgOnChangesFeature], decls: 7, vars: 3, consts: [[1, "amml-menu-container"], [3, "ngClass", "ngStyle", "click", 4, "ngIf", "ngIfElse"], [3, "dir", "ngClass", 4, "ngIf"], ["baseTemplate", ""], ["linkTemplate", ""], [3, "ngClass", "ngStyle", "click"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [3, "dir", "ngClass"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "listTemplate", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "listTemplate", "selectedItem"], ["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click", 4, "ngIf"], [4, "ngIf"], ["matRipple", "", 3, "title", "matRippleDisabled", "ngClass", "ngStyle", "click"], [4, "ngTemplateOutlet"], [1, "filled", 3, "node", "isRtlLayout"]], template: function ListItemComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, ListItemComponent_div_1_Template, 2, 7, "div", 1);
            i0.ɵɵtemplate(2, ListItemComponent_div_2_Template, 3, 7, "div", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, ListItemComponent_ng_template_3_Template, 2, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵtemplate(5, ListItemComponent_ng_template_5_Template, 1, 2, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const _r2 = i0.ɵɵreference(4);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.nodeConfiguration.customTemplate && !ctx.node.hidden)("ngIfElse", _r2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.hasItems() && ctx.expanded);
        } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i3.NgTemplateOutlet, i3.NgStyle, i4.Dir, i5.MatListItem, i6.MatDivider, i7.MatRipple, ListItemComponent, ListItemContentComponent, i3.KeyValuePipe], styles: [".filled[_ngcontent-%COMP%]{width:100%}div[dir=rtl].amml-submenu[_ngcontent-%COMP%]{margin-right:16px}div[dir=ltr].amml-submenu[_ngcontent-%COMP%]{margin-left:16px}"], data: { animation: [SlideInOut] } });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListItemComponent, [{
        type: Component,
        args: [{ selector: 'ng-list-item', animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\r\n  <!-- Base Template rendering condition starts -->\r\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n       [ngClass]=\"selectedListClasses\"\r\n       [ngStyle]=\"getListStyle()\"\r\n       (click)=\"expand(node)\">\r\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\r\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n    </ng-container>\r\n  </div>\r\n  <!-- Base Template rendering condition ends -->\r\n\r\n  <!-- Recursive Template calls begins -->\r\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n                  [nodeConfiguration]='nodeConfiguration'\r\n                  [node]=\"singleNode.value\"\r\n                  [level]=\"level + 1\"\r\n                  [submenuLevel]=\"singleNode.key\"\r\n                  [selectedNode]='selectedNode'\r\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n                  (selectedItem)=\"selectedListItem($event)\"\r\n                  [listTemplate]=\"listTemplate\">\r\n    </ng-list-item>\r\n  </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n  <mat-list-item matRipple\r\n                 *ngIf=\"!node.hidden\"\r\n                 title=\"{{node.label}}\"\r\n                 [matRippleDisabled]=\"node.disabled\"\r\n                 [ngClass]=\"selectedListClasses\"\r\n                 [ngStyle]=\"getListStyle()\"\r\n                 (click)=\"expand(node)\">\r\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n  </mat-list-item>\r\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n\r\n<ng-template #linkTemplate>\r\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [isRtlLayout]=\"isRtlLayout()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"] }]
    }], function () { return [{ type: i1.Router }, { type: MultilevelMenuService }]; }, { node: [{
            type: Input
        }], level: [{
            type: Input
        }], submenuLevel: [{
            type: Input
        }], selectedNode: [{
            type: Input
        }], nodeConfiguration: [{
            type: Input
        }], nodeExpandCollapseStatus: [{
            type: Input
        }], listTemplate: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }] }); })();

class MaterialsModule {
    static ɵfac = function MaterialsModule_Factory(t) { return new (t || MaterialsModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: MaterialsModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [MatIconModule,
            MatListModule,
            MatRippleModule, MatIconModule,
            MatListModule,
            MatRippleModule] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MaterialsModule, [{
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
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(MaterialsModule, { imports: [MatIconModule,
        MatListModule,
        MatRippleModule], exports: [MatIconModule,
        MatListModule,
        MatRippleModule] }); })();

const _c0 = ["listTemplate"];
function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ng-list-item", 3);
    i0.ɵɵlistener("selectedItem", function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template_ng_list_item_selectedItem_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.selectedListItem($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeConfiguration", ctx_r1.nodeConfig)("node", node_r2.value)("level", 1)("submenuLevel", node_r2.key)("selectedNode", ctx_r1.currentNode)("nodeExpandCollapseStatus", ctx_r1.nodeExpandCollapseStatus)("listTemplate", ctx_r1.listTemplate);
} }
function NgMaterialMultilevelMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1)(1, "mat-list");
    i0.ɵɵtemplate(2, NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template, 1, 7, "ng-list-item", 2);
    i0.ɵɵpipe(3, "keyvalue");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.getClassName())("ngStyle", ctx_r0.getGlobalStyle())("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(3, 4, ctx_r0.items, ctx_r0.multilevelMenuService.kvDummyComparerFn));
} }
class NgMaterialMultilevelMenuComponent {
    router;
    multilevelMenuService;
    items;
    configuration = null;
    selectedItem = new EventEmitter();
    selectedLabel = new EventEmitter();
    menuIsReady = new EventEmitter();
    listTemplate;
    expandCollapseStatusSubscription = null;
    selectMenuByIDSubscription = null;
    currentNode = null;
    nodeConfig = {
        paddingAtStart: true,
        listBackgroundColor: null,
        fontColor: null,
        selectedListFontColor: null,
        interfaceWithRoute: null,
        collapseOnSelect: null,
        highlightOnSelect: false,
        useDividers: true,
        rtlLayout: false,
        customTemplate: false
    };
    isInvalidConfig = true;
    isInvalidData = true;
    nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        // NOOP
    }
    ngOnChanges() {
        this.detectInvalidConfig();
        this.initExpandCollapseStatus();
        this.initSelectedMenuID();
        if (!this.isInvalidData) {
            this.menuIsReady.emit(this.items);
        }
    }
    ngOnInit() {
        if (!CommonUtils.isNullOrUndefinedOrEmpty(this.configuration) &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.urlAfterRedirects);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    }
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined && !CommonUtils.isNullOrUndefinedOrEmpty(foundNode.link)
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            if (!CommonUtils.isNullOrUndefined(foundNode.dontEmit) && !foundNode.dontEmit) {
                this.selectedListItem(foundNode);
            }
        }
    }
    checkValidData() {
        if (this.items === undefined || (Array.isArray(this.items) && this.items.length === 0)) {
            console.warn(CONSTANT.ERROR_MESSAGE);
            return;
        }
        this.items = this.items.filter(n => !n.hidden);
        this.multilevelMenuService.addRandomId(this.items);
        this.isInvalidData = false;
    }
    detectInvalidConfig() {
        if (CommonUtils.isNullOrUndefinedOrEmpty(this.configuration)) {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            const config = this.configuration;
            if (!CommonUtils.isNullOrUndefined(config.paddingAtStart) &&
                typeof config.paddingAtStart === 'boolean') {
                this.nodeConfig.paddingAtStart = config.paddingAtStart;
            }
            if (!CommonUtils.isNullOrUndefinedOrEmpty(config.listBackgroundColor)) {
                this.nodeConfig.listBackgroundColor = config.listBackgroundColor;
            }
            if (!CommonUtils.isNullOrUndefinedOrEmpty(config.fontColor)) {
                this.nodeConfig.fontColor = config.fontColor;
            }
            if (!CommonUtils.isNullOrUndefinedOrEmpty(config.selectedListFontColor)) {
                this.nodeConfig.selectedListFontColor = config.selectedListFontColor;
            }
            if (!CommonUtils.isNullOrUndefined(config.interfaceWithRoute) &&
                typeof config.interfaceWithRoute === 'boolean') {
                this.nodeConfig.interfaceWithRoute = config.interfaceWithRoute;
            }
            if (!CommonUtils.isNullOrUndefined(config.collapseOnSelect) &&
                typeof config.collapseOnSelect === 'boolean') {
                this.nodeConfig.collapseOnSelect = config.collapseOnSelect;
            }
            if (!CommonUtils.isNullOrUndefined(config.highlightOnSelect) &&
                typeof config.highlightOnSelect === 'boolean') {
                this.nodeConfig.highlightOnSelect = config.highlightOnSelect;
            }
            if (!CommonUtils.isNullOrUndefined(config.useDividers) &&
                typeof config.useDividers === 'boolean') {
                this.nodeConfig.useDividers = config.useDividers;
            }
            if (!CommonUtils.isNullOrUndefined(config.rtlLayout) &&
                typeof config.rtlLayout === 'boolean') {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
            if (!CommonUtils.isNullOrUndefined(config.customTemplate) &&
                typeof config.customTemplate === 'boolean') {
                this.nodeConfig.customTemplate = config.customTemplate;
            }
        }
        this.checkValidData();
    }
    initExpandCollapseStatus() {
        this.expandCollapseStatusSubscription = this.multilevelMenuService.expandCollapseStatus$
            .subscribe((expandCollapseStatus) => {
            this.nodeExpandCollapseStatus = expandCollapseStatus ? expandCollapseStatus : ExpandCollapseStatusEnum.neutral;
        }, () => {
            this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        });
    }
    initSelectedMenuID() {
        this.selectMenuByIDSubscription = this.multilevelMenuService.selectedMenuID$.subscribe((selectedMenuID) => {
            if (selectedMenuID) {
                const foundNode = this.multilevelMenuService.getMatchedObjectById(this.items, selectedMenuID);
                if (foundNode !== undefined) {
                    this.currentNode = foundNode;
                    this.selectedListItem(foundNode);
                }
            }
        });
    }
    getClassName() {
        if (!this.isInvalidConfig && !CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.classname)) {
            return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
        }
        return CONSTANT.DEFAULT_CLASS_NAME;
    }
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            const styles = {
                background: null
            };
            if (!CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.backgroundColor)) {
                styles.background = this.configuration.backgroundColor;
            }
            return styles;
        }
    }
    isRtlLayout() {
        return this.nodeConfig.rtlLayout;
    }
    selectedListItem(event) {
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
        this.currentNode = event;
        if (!CommonUtils.isNullOrUndefined(event.dontEmit) && event.dontEmit) {
            return;
        }
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    }
    ngOnDestroy() {
        this.expandCollapseStatusSubscription.unsubscribe();
        this.selectMenuByIDSubscription.unsubscribe();
    }
    static ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { return new (t || NgMaterialMultilevelMenuComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(MultilevelMenuService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NgMaterialMultilevelMenuComponent, selectors: [["ng-material-multilevel-menu"]], contentQueries: function NgMaterialMultilevelMenuComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, _c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.listTemplate = _t.first);
        } }, inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "dir", 4, "ngIf"], [3, "ngClass", "ngStyle", "dir"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "listTemplate", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "nodeExpandCollapseStatus", "listTemplate", "selectedItem"]], template: function NgMaterialMultilevelMenuComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, NgMaterialMultilevelMenuComponent_div_0_Template, 4, 7, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.isInvalidData && ctx.items.length !== 0);
        } }, dependencies: [i3.NgClass, i3.NgForOf, i3.NgIf, i3.NgStyle, i4.Dir, i5.MatList, ListItemComponent, i3.KeyValuePipe], styles: [".amml-container[_ngcontent-%COMP%]   .mat-mdc-list.mat-mdc-list-base.mdc-list[_ngcontent-%COMP%]{padding:unset}.amml-item[_ngcontent-%COMP%]{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%]{line-height:48px}.active[_ngcontent-%COMP%]{color:#1976d2}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:15px}div[dir=ltr][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:15px}div[dir=rtl][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgMaterialMultilevelMenuComponent, [{
        type: Component,
        args: [{ selector: 'ng-material-multilevel-menu', template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\"\r\n      [listTemplate] = \"listTemplate\"\r\n    >\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
    }], function () { return [{ type: i1.Router }, { type: MultilevelMenuService }]; }, { items: [{
            type: Input
        }], configuration: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }], selectedLabel: [{
            type: Output
        }], menuIsReady: [{
            type: Output
        }], listTemplate: [{
            type: ContentChild,
            args: ['listTemplate', { static: true }]
        }] }); })();

class NgMaterialMultilevelMenuModule {
    static ɵfac = function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
            MaterialsModule,
            RouterModule] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NgMaterialMultilevelMenuModule, [{
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
                    ListItemContentComponent,
                ],
                exports: [NgMaterialMultilevelMenuComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: [NgMaterialMultilevelMenuComponent,
        ListItemComponent,
        ListItemContentComponent], imports: [CommonModule,
        MaterialsModule,
        RouterModule], exports: [NgMaterialMultilevelMenuComponent] }); })();

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandCollapseStatusEnum, ExpandedLTR, ExpandedRTL, MultilevelMenuService, NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, SlideInOut };
//# sourceMappingURL=ng-material-multilevel-menu.mjs.map
