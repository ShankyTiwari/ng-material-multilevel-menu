import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, Component, Input, EventEmitter, Output, NgModule, ContentChild } from '@angular/core';
import * as i1 from '@angular/router';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
    NO: 'no',
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
                                id: id ? id : null,
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MultilevelMenuService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MultilevelMenuService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MultilevelMenuService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

const SlideInOut = trigger('SlideInOut', [
    state('in', style({ height: '*', opacity: 0 })),
    transition(':leave', [
        style({ height: '*', opacity: 0.2 }),
        group([animate(200, style({ height: 0 })), animate('200ms ease-out', style({ opacity: 0 }))]),
    ]),
    transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([animate(200, style({ height: '*' })), animate('400ms ease-out', style({ opacity: 1 }))]),
    ]),
]);
const ExpandedLTR = trigger('ExpandedLTR', [
    state('no', style({ transform: 'rotate(-90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)' })),
    transition('no => yes', animate(200)),
    transition('yes => no', animate(200)),
]);
const ExpandedRTL = trigger('ExpandedRTL', [
    state('no', style({ transform: 'rotate(90deg)' })),
    state('yes', style({ transform: 'rotate(0deg)' })),
    transition('no => yes', animate(200)),
    transition('yes => no', animate(200)),
]);

class CommonUtils {
    static isNullOrUndefinedOrEmpty = function (object) {
        return CommonUtils.isNullOrUndefined(object) || object === '';
    };
    static isNullOrUndefined = function (object) {
        return object === null || object === undefined;
    };
}

class ListItemContentComponent {
    node;
    isRtlLayout;
    getListIcon(node) {
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.icon)) {
            return `icon`;
        }
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.faIcon)) {
            return `faIcon`;
        }
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.imageIcon)) {
            return `imageIcon`;
        }
        if (!CommonUtils.isNullOrUndefinedOrEmpty(node.svgIcon)) {
            return `svgIcon`;
        }
        return ``;
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemContentComponent, selector: "ng-list-item-content", inputs: { node: "node", isRtlLayout: "isRtlLayout" }, ngImport: i0, template: "<ng-container *ngTemplateOutlet=\"node.externalRedirect ? redirectLinkTemplate : routerLinkTemplate\"></ng-container>\r\n<ng-template #redirectLinkTemplate>\r\n    <a\r\n        class=\"anml-link\"\r\n        [href]=\"node.link\"\r\n        [target]=\"getHrefTargetType()\">\r\n        <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n    </a>\r\n</ng-template>\r\n<ng-template #routerLinkTemplate>\r\n    <a\r\n        class=\"anml-link\"\r\n        *ngIf=\"!node.externalRedirect && node.link\"\r\n        [routerLink]=\"node.link\">\r\n        <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n    </a>\r\n    <a\r\n        class=\"anml-link\"\r\n        *ngIf=\"!node.link\">\r\n        <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n    </a>\r\n</ng-template>\r\n<ng-template #linkLabelLtrOutlet>\r\n    <div\r\n        class=\"anml-data\"\r\n        [dir]=\"'ltr'\">\r\n        <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n        <span class=\"label\">{{node.label}}</span>\r\n    </div>\r\n    <div\r\n        class=\"amml-icon-arrow-container\"\r\n        *ngIf='node.hasChildren'>\r\n        <mat-icon [@ExpandedLTR]=\"nodeExpandStatus()\">keyboard_arrow_down</mat-icon>\r\n    </div>\r\n</ng-template>\r\n<ng-template #linkLabelRtlOutlet>\r\n    <div\r\n        class=\"anml-data\"\r\n        [dir]=\"'rtl'\">\r\n        <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n        <span class=\"label\">{{node.label}}</span>\r\n    </div>\r\n    <div\r\n        class=\"amml-icon-arrow-container\"\r\n        *ngIf='node.hasChildren'>\r\n        <mat-icon [@ExpandedRTL]=\"nodeExpandStatus()\">keyboard_arrow_down</mat-icon>\r\n    </div>\r\n</ng-template>\r\n<ng-template #iconContainer>\r\n    <div\r\n        class=\"icon-container\"\r\n        [ngSwitch]=\"getListIcon(node)\">\r\n        <span\r\n            *ngSwitchCase=\"'faIcon'\"\r\n            class=\"amml-icon amml-icon-fa\">\r\n            <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n        </span>\r\n        <mat-icon\r\n            *ngSwitchCase=\"'icon'\"\r\n            class=\"amml-icon\">\r\n            {{getSelectedIcon()}}\r\n        </mat-icon>\r\n        <mat-icon\r\n            *ngSwitchCase=\"'svgIcon'\"\r\n            class=\"amml-icon amml-svg-icon\"\r\n            svgIcon=\"{{getSelectedSvgIcon()}}\">\r\n        </mat-icon>\r\n        <img\r\n            *ngSwitchCase=\"'imageIcon'\"\r\n            matListAvatar\r\n            class=\"amml-icon\"\r\n            src=\"{{getSelectedImageIcon()}}\"\r\n            alt=\"{{node.label}}\">\r\n    </div>\r\n</ng-template>\r\n", styles: [".amml-item{position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=rtl] .amml-icon{margin-left:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], animations: [ExpandedLTR, ExpandedRTL] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item-content', animations: [ExpandedLTR, ExpandedRTL], template: "<ng-container *ngTemplateOutlet=\"node.externalRedirect ? redirectLinkTemplate : routerLinkTemplate\"></ng-container>\r\n<ng-template #redirectLinkTemplate>\r\n    <a\r\n        class=\"anml-link\"\r\n        [href]=\"node.link\"\r\n        [target]=\"getHrefTargetType()\">\r\n        <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n    </a>\r\n</ng-template>\r\n<ng-template #routerLinkTemplate>\r\n    <a\r\n        class=\"anml-link\"\r\n        *ngIf=\"!node.externalRedirect && node.link\"\r\n        [routerLink]=\"node.link\">\r\n        <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n    </a>\r\n    <a\r\n        class=\"anml-link\"\r\n        *ngIf=\"!node.link\">\r\n        <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\r\n    </a>\r\n</ng-template>\r\n<ng-template #linkLabelLtrOutlet>\r\n    <div\r\n        class=\"anml-data\"\r\n        [dir]=\"'ltr'\">\r\n        <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n        <span class=\"label\">{{node.label}}</span>\r\n    </div>\r\n    <div\r\n        class=\"amml-icon-arrow-container\"\r\n        *ngIf='node.hasChildren'>\r\n        <mat-icon [@ExpandedLTR]=\"nodeExpandStatus()\">keyboard_arrow_down</mat-icon>\r\n    </div>\r\n</ng-template>\r\n<ng-template #linkLabelRtlOutlet>\r\n    <div\r\n        class=\"anml-data\"\r\n        [dir]=\"'rtl'\">\r\n        <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\r\n        <span class=\"label\">{{node.label}}</span>\r\n    </div>\r\n    <div\r\n        class=\"amml-icon-arrow-container\"\r\n        *ngIf='node.hasChildren'>\r\n        <mat-icon [@ExpandedRTL]=\"nodeExpandStatus()\">keyboard_arrow_down</mat-icon>\r\n    </div>\r\n</ng-template>\r\n<ng-template #iconContainer>\r\n    <div\r\n        class=\"icon-container\"\r\n        [ngSwitch]=\"getListIcon(node)\">\r\n        <span\r\n            *ngSwitchCase=\"'faIcon'\"\r\n            class=\"amml-icon amml-icon-fa\">\r\n            <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n        </span>\r\n        <mat-icon\r\n            *ngSwitchCase=\"'icon'\"\r\n            class=\"amml-icon\">\r\n            {{getSelectedIcon()}}\r\n        </mat-icon>\r\n        <mat-icon\r\n            *ngSwitchCase=\"'svgIcon'\"\r\n            class=\"amml-icon amml-svg-icon\"\r\n            svgIcon=\"{{getSelectedSvgIcon()}}\">\r\n        </mat-icon>\r\n        <img\r\n            *ngSwitchCase=\"'imageIcon'\"\r\n            matListAvatar\r\n            class=\"amml-icon\"\r\n            src=\"{{getSelectedImageIcon()}}\"\r\n            alt=\"{{node.label}}\">\r\n    </div>\r\n</ng-template>\r\n", styles: [".amml-item{position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=rtl] .amml-icon{margin-left:16px}\n"] }]
        }], propDecorators: { node: [{
                type: Input
            }], isRtlLayout: [{
                type: Input
            }] } });

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
    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (!CommonUtils.isNullOrUndefined(this.node.faIcon) && this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }
        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter((n) => !n.hidden) : [];
        this.node.hasChildren = this.hasItems();
        if (!CommonUtils.isNullOrUndefined(this.selectedNode)) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
        this.setExpandCollapseStatus();
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
        return {
            color: this.getColor(),
            backgroundColor: this.getBackgroundColor(),
        };
    }
    getColorStyle() {
        return { color: this.getColor() };
    }
    getBackgroundStyle() {
        return { backgroundColor: this.getBackgroundColor() };
    }
    getColor() {
        return this.isSelected
            ? this.nodeConfiguration.selectedListFontColor !== null
                ? this.nodeConfiguration.selectedListFontColor
                : CONSTANT.DEFAULT_SELECTED_FONT_COLOR
            : this.nodeConfiguration.fontColor !== null
                ? this.nodeConfiguration.fontColor
                : CONSTANT.DEFAULT_LIST_FONT_COLOR;
    }
    getBackgroundColor() {
        return this.nodeConfiguration.listBackgroundColor !== null
            ? this.nodeConfiguration.listBackgroundColor
            : CONSTANT.DEFAULT_LIST_BACKGROUND_COLOR;
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
            [CONSTANT.HAS_SUBMENU_ITEM_CLASS_NAME]: this.hasItems(),
        };
    }
    setExpandCollapseStatus() {
        if (CommonUtils.isNullOrUndefined(this.nodeExpandCollapseStatus)) {
            return;
        }
        if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.expand) {
            this.setExpandStatus(true);
        }
        if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.collapse) {
            this.setExpandStatus(false);
        }
    }
    setExpandStatus(value) {
        this.expanded = value;
        if (!this.nodeConfiguration.customTemplate) {
            return;
        }
        this.node.expanded = value;
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
        if (this.nodeConfiguration.interfaceWithRoute && node.link) {
            void this.router.navigate([node.link], node.navigationExtras).then();
            return;
        }
        if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
            return;
        }
        if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    }
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, deps: [{ token: i1.Router }, { token: MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemComponent, selector: "ng-list-item", inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", listTemplate: "listTemplate" }, outputs: { selectedItem: "selectedItem" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"amml-menu-container\">\r\n    <!-- Base Template rendering condition starts -->\r\n    <div\r\n        *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getListStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container\r\n            [ngTemplateOutlet]=\"listTemplate\"\r\n            [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n        </ng-container>\r\n    </div>\r\n    <!-- Base Template rendering condition ends -->\r\n    <!-- Recursive Template calls begins -->\r\n    <div\r\n        *ngIf=\"hasItems() && expanded\"\r\n        [@SlideInOut]\r\n        [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\"\r\n        [ngClass]=\"classes\">\r\n        <ng-list-item\r\n            *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfiguration'\r\n            [node]=\"singleNode.value\"\r\n            [level]=\"level + 1\"\r\n            [submenuLevel]=\"singleNode.key\"\r\n            [selectedNode]='selectedNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n    <mat-list-item\r\n        matRipple\r\n        *ngIf=\"!node.hidden\"\r\n        title=\"{{node.label}}\"\r\n        [matRippleDisabled]=\"node.disabled\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getBackgroundStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n    </mat-list-item>\r\n    <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n<ng-template #linkTemplate>\r\n    <ng-list-item-content\r\n        class=\"filled\"\r\n        [node]=\"node\"\r\n        [isRtlLayout]=\"isRtlLayout()\"\r\n        [ngStyle]=\"getColorStyle()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "component", type: i6.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "directive", type: i7.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "component", type: ListItemContentComponent, selector: "ng-list-item-content", inputs: ["node", "isRtlLayout"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }], animations: [SlideInOut] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item', animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\r\n    <!-- Base Template rendering condition starts -->\r\n    <div\r\n        *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getListStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container\r\n            [ngTemplateOutlet]=\"listTemplate\"\r\n            [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n        </ng-container>\r\n    </div>\r\n    <!-- Base Template rendering condition ends -->\r\n    <!-- Recursive Template calls begins -->\r\n    <div\r\n        *ngIf=\"hasItems() && expanded\"\r\n        [@SlideInOut]\r\n        [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\"\r\n        [ngClass]=\"classes\">\r\n        <ng-list-item\r\n            *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfiguration'\r\n            [node]=\"singleNode.value\"\r\n            [level]=\"level + 1\"\r\n            [submenuLevel]=\"singleNode.key\"\r\n            [selectedNode]='selectedNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n    <mat-list-item\r\n        matRipple\r\n        *ngIf=\"!node.hidden\"\r\n        title=\"{{node.label}}\"\r\n        [matRippleDisabled]=\"node.disabled\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getBackgroundStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n    </mat-list-item>\r\n    <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n<ng-template #linkTemplate>\r\n    <ng-list-item-content\r\n        class=\"filled\"\r\n        [node]=\"node\"\r\n        [isRtlLayout]=\"isRtlLayout()\"\r\n        [ngStyle]=\"getColorStyle()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: MultilevelMenuService }]; }, propDecorators: { node: [{
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
            }] } });

class MaterialsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, imports: [MatIconModule, MatListModule, MatRippleModule], exports: [MatIconModule, MatListModule, MatRippleModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, imports: [MatIconModule, MatListModule, MatRippleModule, MatIconModule, MatListModule, MatRippleModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatIconModule, MatListModule, MatRippleModule],
                    declarations: [],
                    exports: [MatIconModule, MatListModule, MatRippleModule],
                }]
        }] });

class NgMaterialMultilevelMenuComponent {
    router;
    multilevelMenuService;
    items;
    configuration = null;
    selectedItem = new EventEmitter();
    selectedLabel = new EventEmitter();
    menuIsReady = new EventEmitter();
    listTemplate;
    stringConfigProperties = [
        'classname',
        'backgroundColor',
        'listBackgroundColor',
        'fontColor',
        'selectedListFontColor',
    ];
    destroyed$ = new Subject();
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
        customTemplate: false,
    };
    isInvalidConfig = true;
    isInvalidData = true;
    nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
    }
    ngOnInit() {
        this.subscribeToRouterEvents();
    }
    ngOnChanges() {
        this.checkConfigAndData();
        this.initExpandCollapseStatus();
        this.initSelectedMenuID();
        if (!this.isInvalidData) {
            this.menuIsReady.emit(this.items);
        }
    }
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    subscribeToRouterEvents() {
        if (this.configuration?.interfaceWithRoute === false) {
            return;
        }
        this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.updateNodeByURL(event.urlAfterRedirects);
            }
        });
        this.updateNodeByURL(this.router.url);
    }
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (!foundNode || CommonUtils.isNullOrUndefinedOrEmpty(foundNode.link)) {
            return;
        }
        this.currentNode = foundNode;
        if (CommonUtils.isNullOrUndefined(foundNode.dontEmit) || foundNode.dontEmit) {
            return;
        }
        this.selectedListItem(foundNode);
    }
    checkConfigAndData() {
        this.detectInvalidConfig();
        this.checkValidData();
    }
    checkValidData() {
        if (this.items === undefined || (Array.isArray(this.items) && this.items.length === 0)) {
            console.warn(CONSTANT.ERROR_MESSAGE);
            return;
        }
        this.items = this.items.filter((item) => !item.hidden);
        this.multilevelMenuService.addRandomId(this.items);
        this.isInvalidData = false;
    }
    detectInvalidConfig() {
        if (CommonUtils.isNullOrUndefinedOrEmpty(this.configuration)) {
            this.isInvalidConfig = true;
            return;
        }
        this.isInvalidConfig = false;
        const config = this.configuration;
        for (const property of Object.keys(config)) {
            this.stringConfigProperties.some((item) => item === property)
                ? this.setStringConfigProperty(property, config[property])
                : this.setBooleanConfigProperty(property, config[property]);
        }
    }
    initExpandCollapseStatus() {
        this.multilevelMenuService.expandCollapseStatus$.pipe(takeUntil(this.destroyed$)).subscribe({
            next: (expandCollapseStatus) => {
                this.nodeExpandCollapseStatus = expandCollapseStatus ? expandCollapseStatus : ExpandCollapseStatusEnum.neutral;
            },
            error: () => {
                this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
            },
        });
    }
    initSelectedMenuID() {
        this.multilevelMenuService.selectedMenuID$.pipe(takeUntil(this.destroyed$)).subscribe((selectedMenuID) => {
            if (selectedMenuID) {
                const foundNode = this.multilevelMenuService.getMatchedObjectById(this.items, selectedMenuID);
                if (!foundNode) {
                    return;
                }
                this.currentNode = foundNode;
                this.selectedListItem(foundNode);
            }
        });
    }
    getClassName() {
        return this.isInvalidConfig || CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.classname)
            ? CONSTANT.DEFAULT_CLASS_NAME
            : `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
    }
    getGlobalStyle() {
        const styles = {
            backgroundColor: null,
        };
        if (this.isInvalidConfig || CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.backgroundColor)) {
            return styles;
        }
        styles.backgroundColor = this.configuration.backgroundColor;
        return styles;
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
        event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')
            ? this.selectedItem.emit(event)
            : this.selectedLabel.emit(event);
    }
    setStringConfigProperty(propertyName, value) {
        if (CommonUtils.isNullOrUndefinedOrEmpty(value)) {
            return;
        }
        this.nodeConfig[propertyName] = value;
    }
    setBooleanConfigProperty(propertyName, value) {
        if (CommonUtils.isNullOrUndefined(value) || typeof value !== 'boolean') {
            return;
        }
        this.nodeConfig[propertyName] = value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, deps: [{ token: i1.Router }, { token: MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgMaterialMultilevelMenuComponent, selector: "ng-material-multilevel-menu", inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, queries: [{ propertyName: "listTemplate", first: true, predicate: ["listTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div\r\n    [ngClass]=\"getClassName()\"\r\n    [ngStyle]=\"getGlobalStyle()\"\r\n    *ngIf='!isInvalidData && items.length !== 0'\r\n    [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <mat-list>\r\n        <ng-list-item\r\n            *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfig'\r\n            [node]='node.value'\r\n            [level]=\"1\"\r\n            [submenuLevel]=\"node.key\"\r\n            [selectedNode]='currentNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-material-multilevel-menu', template: "<div\r\n    [ngClass]=\"getClassName()\"\r\n    [ngStyle]=\"getGlobalStyle()\"\r\n    *ngIf='!isInvalidData && items.length !== 0'\r\n    [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <mat-list>\r\n        <ng-list-item\r\n            *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfig'\r\n            [node]='node.value'\r\n            [level]=\"1\"\r\n            [submenuLevel]=\"node.key\"\r\n            [selectedNode]='currentNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: MultilevelMenuService }]; }, propDecorators: { items: [{
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
            }] } });

class NgMaterialMultilevelMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent, ListItemContentComponent], imports: [CommonModule, MaterialsModule, RouterModule], exports: [NgMaterialMultilevelMenuComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, imports: [CommonModule, MaterialsModule, RouterModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MaterialsModule, RouterModule],
                    declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent, ListItemContentComponent],
                    exports: [NgMaterialMultilevelMenuComponent],
                }]
        }] });

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandCollapseStatusEnum, ExpandedLTR, ExpandedRTL, MultilevelMenuService, NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, SlideInOut };
//# sourceMappingURL=eddie666-ng-material-multilevel-menu.mjs.map
