import { Component, Input } from '@angular/core';
import { ExpandedLTR, ExpandedRTL } from '../../animation';
import { CommonUtils } from '../../common-utils';
import { CONSTANT } from '../../constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/material/icon";
import * as i3 from "@angular/cdk/bidi";
import * as i4 from "@angular/router";
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
        } }, dependencies: [i1.NgClass, i1.NgIf, i1.NgTemplateOutlet, i1.NgSwitch, i1.NgSwitchCase, i2.MatIcon, i3.Dir, i4.RouterLink], styles: [".amml-item[_ngcontent-%COMP%]{position:relative;cursor:pointer}.anml-link[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data[_ngcontent-%COMP%]{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item[_ngcontent-%COMP%]{opacity:.5;text-decoration:none;pointer-events:none}.icon-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.label[_ngcontent-%COMP%]{line-height:48px;font-weight:400}.amml-svg-icon[_ngcontent-%COMP%]{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container[_ngcontent-%COMP%]{direction:ltr;display:flex;align-items:center}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:16px}"], data: { animation: [ExpandedLTR, ExpandedRTL] } });
}
export { ListItemContentComponent };
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ListItemContentComponent, [{
        type: Component,
        args: [{ selector: 'ng-list-item-content', animations: [ExpandedLTR, ExpandedRTL], template: "<ng-container *ngTemplateOutlet=\"node.externalRedirect ? redirectLinkTemplate : routerLinkTemplate\"></ng-container>\r\n\r\n<ng-template #redirectLinkTemplate>\r\n  <a class=\"anml-link\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\r\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #routerLinkTemplate>\r\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect && node.link\" [routerLink]=\"node.link\">\r\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n  </a>\r\n  <a class=\"anml-link\" *ngIf=\"!node.link\">\r\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelLtrOutlet>\r\n  <div class=\"anml-data\" [dir]=\"'ltr'\">\r\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\r\n    <mat-icon [@ExpandedLTR]=\"nodeExpandStatus()\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelRtlOutlet>\r\n  <div class=\"anml-data\" [dir]=\"'rtl'\">\r\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\r\n    <mat-icon [@ExpandedRTL]=\"nodeExpandStatus()\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>\r\n\r\n<ng-template #iconContainer>\r\n  <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faIcon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n      </span>\r\n    <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n      {{getSelectedIcon()}}\r\n    </mat-icon>\r\n    <mat-icon *ngSwitchCase=\"'svgIcon'\" class=\"amml-icon amml-svg-icon\"\r\n              svgIcon=\"{{getSelectedSvgIcon()}}\">\r\n    </mat-icon>\r\n    <img *ngSwitchCase=\"'imageIcon'\" matListAvatar class=\"amml-icon\"\r\n         src=\"{{getSelectedImageIcon()}}\" alt=\"{{node.label}}\"/>\r\n  </div>\r\n</ng-template>\r\n\r\n", styles: [".amml-item{position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=rtl] .amml-icon{margin-left:16px}\n"] }]
    }], function () { return []; }, { node: [{
            type: Input
        }], isRtlLayout: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS1jb250ZW50L2xpc3QtaXRlbS1jb250ZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0tY29udGVudC9saXN0LWl0ZW0tY29udGVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBUyxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7SUNKekMsd0JBQW1IOzs7SUFJL0csd0JBQXVHOzs7SUFEekcsNEJBQXVFO0lBQ3JFLHlHQUF1RztJQUN6RyxpQkFBSTs7Ozs7SUFGaUIseURBQWtCLHNDQUFBO0lBQ3RCLGVBQXVFO0lBQXZFLGlFQUF1RTs7O0lBTXRGLHdCQUF1Rzs7O0lBRHpHLDRCQUEwRjtJQUN4Riw2R0FBdUc7SUFDekcsaUJBQUk7Ozs7O0lBRjZELDhDQUF3QjtJQUN4RSxlQUF1RTtJQUF2RSxrRUFBdUU7OztJQUd0Rix3QkFBdUc7OztJQUR6Ryw2QkFBd0M7SUFDdEMsNkdBQXVHO0lBQ3pHLGlCQUFJOzs7OztJQURhLGVBQXVFO0lBQXZFLGtFQUF1RTs7O0lBSnhGLG1GQUVJO0lBQ0osbUZBRUk7OztJQUxrQix3RUFBeUM7SUFHekMsZUFBZ0I7SUFBaEIsd0NBQWdCOzs7SUFPcEMsd0JBQStEOzs7SUFHakUsK0JBQWdFLGVBQUE7SUFFNUQscUNBQ0Y7SUFBQSxpQkFBVyxFQUFBOzs7SUFGRCxlQUFtQztJQUFuQyx5REFBbUM7OztJQUwvQywrQkFBcUM7SUFDbkMseUdBQStEO0lBQy9ELGdDQUFvQjtJQUFBLFlBQWM7SUFBQSxpQkFBTyxFQUFBO0lBRTNDLHdGQUlNOzs7O0lBUmlCLDJCQUFhO0lBQ25CLGVBQStCO0lBQS9CLHNDQUErQjtJQUMxQixlQUFjO0lBQWQsdUNBQWM7SUFFSSxlQUFzQjtJQUF0Qiw4Q0FBc0I7OztJQVM1RCx3QkFBK0Q7OztJQUdqRSwrQkFBZ0UsZUFBQTtJQUU1RCxxQ0FDRjtJQUFBLGlCQUFXLEVBQUE7OztJQUZELGVBQW1DO0lBQW5DLHlEQUFtQzs7O0lBTC9DLCtCQUFxQztJQUNuQyx5R0FBK0Q7SUFDL0QsZ0NBQW9CO0lBQUEsWUFBYztJQUFBLGlCQUFPLEVBQUE7SUFFM0Msd0ZBSU07Ozs7SUFSaUIsMkJBQWE7SUFDbkIsZUFBK0I7SUFBL0Isc0NBQStCO0lBQzFCLGVBQWM7SUFBZCx1Q0FBYztJQUVJLGVBQXNCO0lBQXRCLDhDQUFzQjs7O0lBUzFELGdDQUE4RDtJQUM1RCx3QkFBdUM7SUFDekMsaUJBQU87OztJQURGLGVBQStCO0lBQS9CLHFEQUErQjs7O0lBRXRDLG9DQUFtRDtJQUNqRCxZQUNGO0lBQUEsaUJBQVc7OztJQURULGVBQ0Y7SUFERSwwREFDRjs7O0lBQ0EsK0JBRVc7OztJQURELGlFQUFrQzs7O0lBRTVDLDBCQUM0RDs7O0lBQXZELGlGQUFnQztJQUFDLG1EQUFvQjs7O0lBWDVELCtCQUEyRDtJQUN2RCwwRkFFTztJQUNULGtHQUVXO0lBQ1gsa0dBRVc7SUFDWCx3RkFDNEQ7SUFDOUQsaUJBQU07OztJQVpzQiw0REFBOEI7SUFDL0MsZUFBc0I7SUFBdEIsdUNBQXNCO0lBR3BCLGVBQW9CO0lBQXBCLHFDQUFvQjtJQUdwQixlQUF1QjtJQUF2Qix3Q0FBdUI7SUFHNUIsZUFBeUI7SUFBekIsMENBQXlCOztBRDlDbkMsTUFNYSx3QkFBd0I7SUFDMUIsSUFBSSxDQUFpQjtJQUNyQixXQUFXLENBQVU7SUFFOUI7UUFDRSxPQUFPO0lBQ1QsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPO0lBQ1QsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFvQjtRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0QsT0FBTyxRQUFRLENBQUM7U0FDakI7YUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoRSxPQUFPLFdBQVcsQ0FBQztTQUNwQjthQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzlELE9BQU8sU0FBUyxDQUFDO1NBQ2xCO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUM7SUFDakcsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdkcsQ0FBQztJQUVELGVBQWU7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDOUYsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNwRyxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUM3RyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUN6RCxDQUFDO2tGQWhEVSx3QkFBd0I7NkRBQXhCLHdCQUF3QjtZQ1pyQywyRkFBbUg7WUFFbkgsMEhBSWM7WUFFZCwwSEFPYztZQUVkLDBIQVVjO1lBRWQsMEhBVWM7WUFFZCwwSEFjYzs7OztZQXZEQyx3RUFBbUY7K2pDRFVwRixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7O1NBRTNCLHdCQUF3Qjt1RkFBeEIsd0JBQXdCO2NBTnBDLFNBQVM7MkJBQ0Usc0JBQXNCLGNBR3BCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztzQ0FHN0IsSUFBSTtrQkFBWixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtNdWx0aWxldmVsTm9kZX0gZnJvbSAnLi4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHtFeHBhbmRlZExUUiwgRXhwYW5kZWRSVEx9IGZyb20gJy4uLy4uL2FuaW1hdGlvbic7XHJcbmltcG9ydCB7Q29tbW9uVXRpbHN9IGZyb20gJy4uLy4uL2NvbW1vbi11dGlscyc7XHJcbmltcG9ydCB7Q09OU1RBTlR9IGZyb20gJy4uLy4uL2NvbnN0YW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbS1jb250ZW50JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1pdGVtLWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xpc3QtaXRlbS1jb250ZW50LmNvbXBvbmVudC5jc3MnXSxcclxuICBhbmltYXRpb25zOiBbRXhwYW5kZWRMVFIsIEV4cGFuZGVkUlRMXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZTtcclxuICBASW5wdXQoKSBpc1J0bExheW91dDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBOT09QXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIE5PT1BcclxuICB9XHJcblxyXG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2RlKTogc3RyaW5nIHtcclxuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KG5vZGUuaWNvbikpIHtcclxuICAgICAgcmV0dXJuIGBpY29uYDtcclxuICAgIH0gZWxzZSBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShub2RlLmZhSWNvbikpIHtcclxuICAgICAgcmV0dXJuIGBmYUljb25gO1xyXG4gICAgfSBlbHNlIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KG5vZGUuaW1hZ2VJY29uKSkge1xyXG4gICAgICByZXR1cm4gYGltYWdlSWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkobm9kZS5zdmdJY29uKSkge1xyXG4gICAgICByZXR1cm4gYHN2Z0ljb25gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGBgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SHJlZlRhcmdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGUuaHJlZlRhcmdldFR5cGUgPyB0aGlzLm5vZGUuaHJlZlRhcmdldFR5cGUgOiBDT05TVEFOVC5ERUZBVUxUX0hSRUZfVEFSR0VUX1RZUEU7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZFN2Z0ljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGUuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlU3ZnSWNvbiA/IHRoaXMubm9kZS5hY3RpdmVTdmdJY29uIDogdGhpcy5ub2RlLnN2Z0ljb247XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZEljb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGUuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlSWNvbiA/IHRoaXMubm9kZS5hY3RpdmVJY29uIDogdGhpcy5ub2RlLmljb247XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZEZhSWNvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVGYUljb24gPyB0aGlzLm5vZGUuYWN0aXZlRmFJY29uIDogdGhpcy5ub2RlLmZhSWNvbjtcclxuICB9XHJcblxyXG4gIGdldFNlbGVjdGVkSW1hZ2VJY29uKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUltYWdlSWNvbiA/IHRoaXMubm9kZS5hY3RpdmVJbWFnZUljb24gOiB0aGlzLm5vZGUuaW1hZ2VJY29uO1xyXG4gIH1cclxuXHJcbiAgbm9kZUV4cGFuZFN0YXR1cygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5leHBhbmRlZCA/IENPTlNUQU5ULllFUyA6IENPTlNUQU5ULk5PO1xyXG4gIH1cclxufVxyXG4iLCI8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibm9kZS5leHRlcm5hbFJlZGlyZWN0ID8gcmVkaXJlY3RMaW5rVGVtcGxhdGUgOiByb3V0ZXJMaW5rVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjcmVkaXJlY3RMaW5rVGVtcGxhdGU+XHJcbiAgPGEgY2xhc3M9XCJhbm1sLWxpbmtcIiBbaHJlZl09XCJub2RlLmxpbmtcIiBbdGFyZ2V0XT1cImdldEhyZWZUYXJnZXRUeXBlKClcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpc1J0bExheW91dCA/IGxpbmtMYWJlbFJ0bE91dGxldCA6IGxpbmtMYWJlbEx0ck91dGxldFwiPjwvbmctY29udGFpbmVyPlxyXG4gIDwvYT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjcm91dGVyTGlua1RlbXBsYXRlPlxyXG4gIDxhIGNsYXNzPVwiYW5tbC1saW5rXCIgKm5nSWY9XCIhbm9kZS5leHRlcm5hbFJlZGlyZWN0ICYmIG5vZGUubGlua1wiIFtyb3V0ZXJMaW5rXT1cIm5vZGUubGlua1wiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImlzUnRsTGF5b3V0ID8gbGlua0xhYmVsUnRsT3V0bGV0IDogbGlua0xhYmVsTHRyT3V0bGV0XCI+PC9uZy1jb250YWluZXI+XHJcbiAgPC9hPlxyXG4gIDxhIGNsYXNzPVwiYW5tbC1saW5rXCIgKm5nSWY9XCIhbm9kZS5saW5rXCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXNSdGxMYXlvdXQgPyBsaW5rTGFiZWxSdGxPdXRsZXQgOiBsaW5rTGFiZWxMdHJPdXRsZXRcIj48L25nLWNvbnRhaW5lcj5cclxuICA8L2E+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48bmctdGVtcGxhdGUgI2xpbmtMYWJlbEx0ck91dGxldD5cclxuICA8ZGl2IGNsYXNzPVwiYW5tbC1kYXRhXCIgW2Rpcl09XCInbHRyJ1wiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImljb25Db250YWluZXJcIj48L25nLWNvbnRhaW5lcj5cclxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57e25vZGUubGFiZWx9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiYW1tbC1pY29uLWFycm93LWNvbnRhaW5lclwiICpuZ0lmPSdub2RlLmhhc0NoaWxkcmVuJz5cclxuICAgIDxtYXQtaWNvbiBbQEV4cGFuZGVkTFRSXT1cIm5vZGVFeHBhbmRTdGF0dXMoKVwiPlxyXG4gICAgICBrZXlib2FyZF9hcnJvd19kb3duXHJcbiAgICA8L21hdC1pY29uPlxyXG4gIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPG5nLXRlbXBsYXRlICNsaW5rTGFiZWxSdGxPdXRsZXQ+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiIFtkaXJdPVwiJ3J0bCdcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpY29uQ29udGFpbmVyXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImFtbWwtaWNvbi1hcnJvdy1jb250YWluZXJcIiAqbmdJZj0nbm9kZS5oYXNDaGlsZHJlbic+XHJcbiAgICA8bWF0LWljb24gW0BFeHBhbmRlZFJUTF09XCJub2RlRXhwYW5kU3RhdHVzKClcIj5cclxuICAgICAga2V5Ym9hcmRfYXJyb3dfZG93blxyXG4gICAgPC9tYXQtaWNvbj5cclxuICA8L2Rpdj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjaWNvbkNvbnRhaW5lcj5cclxuICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIiBbbmdTd2l0Y2hdPVwiZ2V0TGlzdEljb24obm9kZSlcIj5cclxuICAgICAgPHNwYW4gKm5nU3dpdGNoQ2FzZT1cIidmYUljb24nXCIgY2xhc3M9XCJhbW1sLWljb24gYW1tbC1pY29uLWZhXCI+XHJcbiAgICAgICAgPGkgW25nQ2xhc3NdPVwiZ2V0U2VsZWN0ZWRGYUljb24oKVwiPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPG1hdC1pY29uICpuZ1N3aXRjaENhc2U9XCInaWNvbidcIiBjbGFzcz1cImFtbWwtaWNvblwiPlxyXG4gICAgICB7e2dldFNlbGVjdGVkSWNvbigpfX1cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8bWF0LWljb24gKm5nU3dpdGNoQ2FzZT1cIidzdmdJY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtc3ZnLWljb25cIlxyXG4gICAgICAgICAgICAgIHN2Z0ljb249XCJ7e2dldFNlbGVjdGVkU3ZnSWNvbigpfX1cIj5cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8aW1nICpuZ1N3aXRjaENhc2U9XCInaW1hZ2VJY29uJ1wiIG1hdExpc3RBdmF0YXIgY2xhc3M9XCJhbW1sLWljb25cIlxyXG4gICAgICAgICBzcmM9XCJ7e2dldFNlbGVjdGVkSW1hZ2VJY29uKCl9fVwiIGFsdD1cInt7bm9kZS5sYWJlbH19XCIvPlxyXG4gIDwvZGl2PlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuIl19