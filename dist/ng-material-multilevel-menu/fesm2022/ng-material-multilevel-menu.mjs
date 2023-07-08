import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Component, Input, EventEmitter, Output, NgModule, ContentChild } from '@angular/core';
import * as i1 from '@angular/router';
import { NavigationEnd, RouterModule } from '@angular/router';
import { trigger, state, style, transition, group, animate } from '@angular/animations';
import { Subject } from 'rxjs';
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
    static { this.isNullOrUndefinedOrEmpty = function (object) {
        return CommonUtils.isNullOrUndefined(object) || object === '';
    }; }
    static { this.isNullOrUndefined = function (object) {
        return object === null || object === undefined;
    }; }
}

class MultilevelMenuService {
    constructor() {
        this.expandCollapseStatus = new Subject();
        this.expandCollapseStatus$ = this.expandCollapseStatus.asObservable();
        this.selectedMenuID = new Subject();
        this.selectedMenuID$ = this.selectedMenuID.asObservable();
    }
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

class ListItemContentComponent {
    constructor() {
        this.nodeConfiguration = null;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemContentComponent, selector: "ng-list-item-content", inputs: { node: "node", isRtlLayout: "isRtlLayout", listContentStyle: "listContentStyle", nodeConfiguration: "nodeConfiguration" }, ngImport: i0, template: "<ng-container *ngTemplateOutlet=\"node.externalRedirect ? redirectLinkTemplate : routerLinkTemplate\"></ng-container>\n\n<ng-template #redirectLinkTemplate>\n  <a class=\"anml-link\" [href]=\"node.link\" [target]=\"getHrefTargetType()\" [ngStyle]=\"listContentStyle\">\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #routerLinkTemplate>\n  <ng-container *ngIf=\"node.link && nodeConfiguration.interfaceWithRoute; else defaultContentContainer\">\n    <a class=\"anml-link\" [routerLink]=\"node.link\" [ngStyle]=\"listContentStyle\">\n      <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\n    </a>\n  </ng-container>\n</ng-template>\n\n<ng-template #defaultContentContainer>\n  <a class=\"anml-link\" [ngStyle]=\"listContentStyle\">\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #linkLabelLtrOutlet>\n  <div class=\"anml-data\" [dir]=\"'ltr'\">\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\n    <mat-icon [@ExpandedLTR]=\"nodeExpandStatus()\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</ng-template>\n\n<ng-template #linkLabelRtlOutlet>\n  <div class=\"anml-data\" [dir]=\"'rtl'\">\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\n    <mat-icon [@ExpandedRTL]=\"nodeExpandStatus()\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</ng-template>\n\n<ng-template #iconContainer>\n  <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faIcon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\n      </span>\n    <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n      {{getSelectedIcon()}}\n    </mat-icon>\n    <mat-icon *ngSwitchCase=\"'svgIcon'\" class=\"amml-icon amml-svg-icon\"\n              svgIcon=\"{{getSelectedSvgIcon()}}\">\n    </mat-icon>\n    <img *ngSwitchCase=\"'imageIcon'\" class=\"amml-icon amml-img-icon\"\n         src=\"{{getSelectedImageIcon()}}\" alt=\"{{node.label}}\"/>\n  </div>\n</ng-template>\n\n", styles: [".amml-item{position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-img-icon{flex-shrink:0;width:40px;height:40px;border-radius:50%;-o-object-fit:cover;object-fit:cover}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=rtl] .amml-icon{margin-left:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], animations: [ExpandedLTR, ExpandedRTL] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item-content', animations: [ExpandedLTR, ExpandedRTL], template: "<ng-container *ngTemplateOutlet=\"node.externalRedirect ? redirectLinkTemplate : routerLinkTemplate\"></ng-container>\n\n<ng-template #redirectLinkTemplate>\n  <a class=\"anml-link\" [href]=\"node.link\" [target]=\"getHrefTargetType()\" [ngStyle]=\"listContentStyle\">\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #routerLinkTemplate>\n  <ng-container *ngIf=\"node.link && nodeConfiguration.interfaceWithRoute; else defaultContentContainer\">\n    <a class=\"anml-link\" [routerLink]=\"node.link\" [ngStyle]=\"listContentStyle\">\n      <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\n    </a>\n  </ng-container>\n</ng-template>\n\n<ng-template #defaultContentContainer>\n  <a class=\"anml-link\" [ngStyle]=\"listContentStyle\">\n    <ng-container *ngTemplateOutlet=\"isRtlLayout ? linkLabelRtlOutlet : linkLabelLtrOutlet\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #linkLabelLtrOutlet>\n  <div class=\"anml-data\" [dir]=\"'ltr'\">\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\n    <mat-icon [@ExpandedLTR]=\"nodeExpandStatus()\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</ng-template>\n\n<ng-template #linkLabelRtlOutlet>\n  <div class=\"anml-data\" [dir]=\"'rtl'\">\n    <ng-container *ngTemplateOutlet=\"iconContainer\"></ng-container>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='node.hasChildren'>\n    <mat-icon [@ExpandedRTL]=\"nodeExpandStatus()\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</ng-template>\n\n<ng-template #iconContainer>\n  <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faIcon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\n      </span>\n    <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n      {{getSelectedIcon()}}\n    </mat-icon>\n    <mat-icon *ngSwitchCase=\"'svgIcon'\" class=\"amml-icon amml-svg-icon\"\n              svgIcon=\"{{getSelectedSvgIcon()}}\">\n    </mat-icon>\n    <img *ngSwitchCase=\"'imageIcon'\" class=\"amml-icon amml-img-icon\"\n         src=\"{{getSelectedImageIcon()}}\" alt=\"{{node.label}}\"/>\n  </div>\n</ng-template>\n\n", styles: [".amml-item{position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-img-icon{flex-shrink:0;width:40px;height:40px;border-radius:50%;-o-object-fit:cover;object-fit:cover}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=rtl] .amml-icon{margin-left:16px}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { node: [{
                type: Input
            }], isRtlLayout: [{
                type: Input
            }], listContentStyle: [{
                type: Input
            }], nodeConfiguration: [{
                type: Input
            }] } });

class ListItemComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.nodeExpandCollapseStatus = null;
        this.listTemplate = null;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, deps: [{ token: i1.Router }, { token: MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemComponent, selector: "ng-list-item", inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", listTemplate: "listTemplate" }, outputs: { selectedItem: "selectedItem" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"amml-menu-container\">\n  <!-- Base Template rendering condition starts -->\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\n       [ngClass]=\"selectedListClasses\"\n       (click)=\"expand(node)\">\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\n    </ng-container>\n  </div>\n  <!-- Base Template rendering condition ends -->\n\n  <!-- Recursive Template calls begins -->\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n                  [nodeConfiguration]='nodeConfiguration'\n                  [node]=\"singleNode.value\"\n                  [level]=\"level + 1\"\n                  [submenuLevel]=\"singleNode.key\"\n                  [selectedNode]='selectedNode'\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n                  (selectedItem)=\"selectedListItem($event)\"\n                  [listTemplate]=\"listTemplate\">\n    </ng-list-item>\n  </div>\n</div>\n<!-- Recursive Template calls ends -->\n\n<!-- Base Template starts from here -->\n<ng-template #baseTemplate>\n  <mat-list-item matRipple\n                 *ngIf=\"!node.hidden\"\n                 title=\"{{node.label}}\"\n                 [matRippleDisabled]=\"node.disabled\"\n                 [ngClass]=\"selectedListClasses\"\n                 (click)=\"expand(node)\">\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\n  </mat-list-item>\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\n</ng-template>\n\n<ng-template #linkTemplate>\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [nodeConfiguration]=\"nodeConfiguration\" [isRtlLayout]=\"isRtlLayout()\" [listContentStyle]=\"getListStyle()\"></ng-list-item-content>\n</ng-template>\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "component", type: i6.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "directive", type: i7.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "component", type: ListItemContentComponent, selector: "ng-list-item-content", inputs: ["node", "isRtlLayout", "listContentStyle", "nodeConfiguration"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }], animations: [SlideInOut] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item', animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\n  <!-- Base Template rendering condition starts -->\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\n       [ngClass]=\"selectedListClasses\"\n       (click)=\"expand(node)\">\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\n    </ng-container>\n  </div>\n  <!-- Base Template rendering condition ends -->\n\n  <!-- Recursive Template calls begins -->\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n                  [nodeConfiguration]='nodeConfiguration'\n                  [node]=\"singleNode.value\"\n                  [level]=\"level + 1\"\n                  [submenuLevel]=\"singleNode.key\"\n                  [selectedNode]='selectedNode'\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n                  (selectedItem)=\"selectedListItem($event)\"\n                  [listTemplate]=\"listTemplate\">\n    </ng-list-item>\n  </div>\n</div>\n<!-- Recursive Template calls ends -->\n\n<!-- Base Template starts from here -->\n<ng-template #baseTemplate>\n  <mat-list-item matRipple\n                 *ngIf=\"!node.hidden\"\n                 title=\"{{node.label}}\"\n                 [matRippleDisabled]=\"node.disabled\"\n                 [ngClass]=\"selectedListClasses\"\n                 (click)=\"expand(node)\">\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\n  </mat-list-item>\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\n</ng-template>\n\n<ng-template #linkTemplate>\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [nodeConfiguration]=\"nodeConfiguration\" [isRtlLayout]=\"isRtlLayout()\" [listContentStyle]=\"getListStyle()\"></ng-list-item-content>\n</ng-template>\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, imports: [MatIconModule,
            MatListModule,
            MatRippleModule], exports: [MatIconModule,
            MatListModule,
            MatRippleModule] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, imports: [MatIconModule,
            MatListModule,
            MatRippleModule, MatIconModule,
            MatListModule,
            MatRippleModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: MaterialsModule, decorators: [{
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
        }] });

class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.selectedItem = new EventEmitter();
        this.selectedLabel = new EventEmitter();
        this.menuIsReady = new EventEmitter();
        this.expandCollapseStatusSubscription = null;
        this.selectMenuByIDSubscription = null;
        this.currentNode = null;
        this.nodeConfig = {
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
        this.isInvalidConfig = true;
        this.isInvalidData = true;
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, deps: [{ token: i1.Router }, { token: MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgMaterialMultilevelMenuComponent, selector: "ng-material-multilevel-menu", inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, queries: [{ propertyName: "listTemplate", first: true, predicate: ["listTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate] = \"listTemplate\"\n    >\n    </ng-list-item>\n  </mat-list>\n</div>\n", styles: [".amml-container .mat-list-base{padding-top:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-material-multilevel-menu', template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate] = \"listTemplate\"\n    >\n    </ng-list-item>\n  </mat-list>\n</div>\n", styles: [".amml-container .mat-list-base{padding-top:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, declarations: [NgMaterialMultilevelMenuComponent,
            ListItemComponent,
            ListItemContentComponent], imports: [CommonModule,
            MaterialsModule,
            RouterModule], exports: [NgMaterialMultilevelMenuComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, imports: [CommonModule,
            MaterialsModule,
            RouterModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, decorators: [{
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
        }] });

/*
 * Public API Surface of ng-material-multilevel-menu
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ExpandCollapseStatusEnum, ExpandedLTR, ExpandedRTL, MultilevelMenuService, NgMaterialMultilevelMenuComponent, NgMaterialMultilevelMenuModule, SlideInOut };
//# sourceMappingURL=ng-material-multilevel-menu.mjs.map
