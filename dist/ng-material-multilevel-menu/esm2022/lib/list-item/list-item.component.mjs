import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExpandCollapseStatusEnum } from '../app.model';
import { CONSTANT } from '../constants';
import { MultilevelMenuService } from '../multilevel-menu.service';
import { SlideInOut } from '../animation';
import { CommonUtils } from '../common-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../multilevel-menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/material/list";
import * as i6 from "@angular/material/divider";
import * as i7 from "@angular/material/core";
import * as i8 from "./list-item-content/list-item-content.component";
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemComponent, selector: "ng-list-item", inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", listTemplate: "listTemplate" }, outputs: { selectedItem: "selectedItem" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"amml-menu-container\">\r\n    <!-- Base Template rendering condition starts -->\r\n    <div\r\n        *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getListStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container\r\n            [ngTemplateOutlet]=\"listTemplate\"\r\n            [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n        </ng-container>\r\n    </div>\r\n    <!-- Base Template rendering condition ends -->\r\n    <!-- Recursive Template calls begins -->\r\n    <div\r\n        *ngIf=\"hasItems() && expanded\"\r\n        [@SlideInOut]\r\n        [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\"\r\n        [ngClass]=\"classes\">\r\n        <ng-list-item\r\n            *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfiguration'\r\n            [node]=\"singleNode.value\"\r\n            [level]=\"level + 1\"\r\n            [submenuLevel]=\"singleNode.key\"\r\n            [selectedNode]='selectedNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n    <mat-list-item\r\n        matRipple\r\n        *ngIf=\"!node.hidden\"\r\n        title=\"{{node.label}}\"\r\n        [matRippleDisabled]=\"node.disabled\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getBackgroundStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n    </mat-list-item>\r\n    <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n<ng-template #linkTemplate>\r\n    <ng-list-item-content\r\n        class=\"filled\"\r\n        [node]=\"node\"\r\n        [isRtlLayout]=\"isRtlLayout()\"\r\n        [ngStyle]=\"getColorStyle()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "component", type: i6.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "directive", type: i7.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "component", type: i8.ListItemContentComponent, selector: "ng-list-item-content", inputs: ["node", "isRtlLayout"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }], animations: [SlideInOut] });
}
export { ListItemComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item', animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\r\n    <!-- Base Template rendering condition starts -->\r\n    <div\r\n        *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getListStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container\r\n            [ngTemplateOutlet]=\"listTemplate\"\r\n            [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n        </ng-container>\r\n    </div>\r\n    <!-- Base Template rendering condition ends -->\r\n    <!-- Recursive Template calls begins -->\r\n    <div\r\n        *ngIf=\"hasItems() && expanded\"\r\n        [@SlideInOut]\r\n        [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\"\r\n        [ngClass]=\"classes\">\r\n        <ng-list-item\r\n            *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfiguration'\r\n            [node]=\"singleNode.value\"\r\n            [level]=\"level + 1\"\r\n            [submenuLevel]=\"singleNode.key\"\r\n            [selectedNode]='selectedNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n    <mat-list-item\r\n        matRipple\r\n        *ngIf=\"!node.hidden\"\r\n        title=\"{{node.label}}\"\r\n        [matRippleDisabled]=\"node.disabled\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getBackgroundStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n    </mat-list-item>\r\n    <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n<ng-template #linkTemplate>\r\n    <ng-list-item-content\r\n        class=\"filled\"\r\n        [node]=\"node\"\r\n        [isRtlLayout]=\"isRtlLayout()\"\r\n        [ngStyle]=\"getColorStyle()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.MultilevelMenuService }]; }, propDecorators: { node: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBNEMsd0JBQXdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7OztBQUU5QyxNQU1hLGlCQUFpQjtJQW1CTjtJQUF1QjtJQWxCbEMsSUFBSSxDQUFpQjtJQUNyQixLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUNqQixZQUFZLENBQWlCO0lBQzdCLGlCQUFpQixHQUFrQixJQUFJLENBQUM7SUFDeEMsd0JBQXdCLEdBQTZCLElBQUksQ0FBQztJQUMxRCxZQUFZLEdBQTRCLElBQUksQ0FBQztJQUU1QyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7SUFFNUQsVUFBVSxHQUFHLEtBQUssQ0FBQztJ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QUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUU7WUFDckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQW9CO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7dUdBakxRLGlCQUFpQjsyRkFBakIsaUJBQWlCLHNWQ2Y5QixzckVBc0RBLGcyQ0R2Q2EsaUJBQWlCLDBYQUZkLENBQUMsVUFBVSxDQUFDOztTQUVmLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQU43QixTQUFTOytCQUNJLGNBQWMsY0FHWixDQUFDLFVBQVUsQ0FBQztpSUFHZixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGUsIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSB9IGZyb20gJy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTbGlkZUluT3V0IH0gZnJvbSAnLi4vYW5pbWF0aW9uJztcclxuaW1wb3J0IHsgQ29tbW9uVXRpbHMgfSBmcm9tICcuLi9jb21tb24tdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2xpc3QtaXRlbS5jb21wb25lbnQuY3NzJ10sXHJcbiAgICBhbmltYXRpb25zOiBbU2xpZGVJbk91dF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICAgIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlO1xyXG4gICAgQElucHV0KCkgbGV2ZWwgPSAxO1xyXG4gICAgQElucHV0KCkgc3VibWVudUxldmVsID0gMDtcclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkTm9kZTogTXVsdGlsZXZlbE5vZGU7XHJcbiAgICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBsaXN0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+ID0gbnVsbDtcclxuXHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcclxuXHJcbiAgICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICBleHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgZmlyc3RJbml0aWFsaXplciA9IGZhbHNlO1xyXG5cclxuICAgIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVbXTtcclxuICAgIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgICBzZWxlY3RlZExpc3RDbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcclxuICAgICAgICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IGZhbHNlLFxyXG4gICAgICAgICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IGZhbHNlLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV0gPSB0aGlzLm5vZGUuZGlzYWJsZWQ7XHJcblxyXG4gICAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5ub2RlLmZhSWNvbikgJiYgdGhpcy5ub2RlLmZhSWNvbi5tYXRjaCgvXFxiZmFcXHcoPyEtKS8pID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5mYUljb24gPSBgZmFzICR7dGhpcy5ub2RlLmZhSWNvbn1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubm9kZS5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm5vZGUuZXhwYW5kZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIoKG4pID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgICAgICB0aGlzLm5vZGUuaGFzQ2hpbGRyZW4gPSB0aGlzLmhhc0l0ZW1zKCk7XHJcblxyXG4gICAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5zZWxlY3RlZE5vZGUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRFeHBhbmRDb2xsYXBzZVN0YXR1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmIChpc0ZvdW5kKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5maXJzdEluaXRpYWxpemVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmhpZ2hsaWdodE9uU2VsZWN0IHx8IHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcclxuICAgICAgICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IHRoaXMuaXNTZWxlY3RlZCxcclxuICAgICAgICAgICAgW0NPTlNUQU5ULkFDVElWRV9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLnNlbGVjdGVkTm9kZS5pZCA9PT0gdGhpcy5ub2RlLmlkLFxyXG4gICAgICAgICAgICBbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5ub2RlLmRpc2FibGVkLFxyXG4gICAgICAgICAgICBbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF06IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm5vZGUuaXNTZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZDtcclxuICAgICAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5wYWRkaW5nQXRTdGFydDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2xvcjogdGhpcy5nZXRDb2xvcigpLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuZ2V0QmFja2dyb3VuZENvbG9yKCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDb2xvclN0eWxlKCk6IExpc3RTdHlsZSB7XHJcbiAgICAgICAgcmV0dXJuIHsgY29sb3I6IHRoaXMuZ2V0Q29sb3IoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJhY2tncm91bmRTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgICAgIHJldHVybiB7IGJhY2tncm91bmRDb2xvcjogdGhpcy5nZXRCYWNrZ3JvdW5kQ29sb3IoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q29sb3IoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1NlbGVjdGVkXHJcbiAgICAgICAgICAgID8gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGxcclxuICAgICAgICAgICAgICAgID8gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3JcclxuICAgICAgICAgICAgICAgIDogQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SXHJcbiAgICAgICAgICAgIDogdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGxcclxuICAgICAgICAgICAgPyB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvclxyXG4gICAgICAgICAgICA6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QmFja2dyb3VuZENvbG9yKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbFxyXG4gICAgICAgICAgICA/IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvclxyXG4gICAgICAgICAgICA6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SO1xyXG4gICAgfVxyXG5cclxuICAgIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVDaGlsZHJlbi5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnJ0bExheW91dDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xhc3NlcyA9IHtcclxuICAgICAgICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWwgKyAxfWBdOiB0cnVlLFxyXG4gICAgICAgICAgICBbQ09OU1RBTlQuU1VCTUVOVV9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLmhhc0l0ZW1zKCkgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpLFxyXG4gICAgICAgICAgICBbQ09OU1RBTlQuSEFTX1NVQk1FTlVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5oYXNJdGVtcygpLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKENvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPT09IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5leHBhbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRFeHBhbmRTdGF0dXModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9PT0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLmNvbGxhcHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RXhwYW5kU3RhdHVzKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRFeHBhbmRTdGF0dXModmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGVDb25maWd1cmF0aW9uLmN1c3RvbVRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKG5vZGUuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gdGhpcy5leHBhbmRlZDtcclxuICAgICAgICB0aGlzLmZpcnN0SW5pdGlhbGl6ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICYmIG5vZGUubGluaykge1xyXG4gICAgICAgICAgICB2b2lkIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub2RlLmxpbmtdLCBub2RlLm5hdmlnYXRpb25FeHRyYXMpLnRoZW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG5vZGUub25TZWxlY3RlZCAmJiB0eXBlb2Ygbm9kZS5vblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xyXG4gICAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJhbW1sLW1lbnUtY29udGFpbmVyXCI+XHJcbiAgICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBzdGFydHMgLS0+XHJcbiAgICA8ZGl2XHJcbiAgICAgICAgKm5nSWY9XCJub2RlQ29uZmlndXJhdGlvbi5jdXN0b21UZW1wbGF0ZSAmJiAhbm9kZS5oaWRkZW47ZWxzZSBiYXNlVGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCJcclxuICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJsaXN0VGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW06IG5vZGUsIGNvbmZpZ3VyYXRpb246IG5vZGVDb25maWd1cmF0aW9ufVwiPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBlbmRzIC0tPlxyXG4gICAgPCEtLSBSZWN1cnNpdmUgVGVtcGxhdGUgY2FsbHMgYmVnaW5zIC0tPlxyXG4gICAgPGRpdlxyXG4gICAgICAgICpuZ0lmPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZFwiXHJcbiAgICAgICAgW0BTbGlkZUluT3V0XVxyXG4gICAgICAgIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICAgICAgICA8bmctbGlzdC1pdGVtXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlbiB8IGtleXZhbHVlIDogbXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmt2RHVtbXlDb21wYXJlckZuXCJcclxuICAgICAgICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nXHJcbiAgICAgICAgICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIlxyXG4gICAgICAgICAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcclxuICAgICAgICAgICAgW3N1Ym1lbnVMZXZlbF09XCJzaW5nbGVOb2RlLmtleVwiXHJcbiAgICAgICAgICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXHJcbiAgICAgICAgICAgIFtub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXNdPSdub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMnXHJcbiAgICAgICAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgW2xpc3RUZW1wbGF0ZV09XCJsaXN0VGVtcGxhdGVcIj5cclxuICAgICAgICA8L25nLWxpc3QtaXRlbT5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPCEtLSBSZWN1cnNpdmUgVGVtcGxhdGUgY2FsbHMgZW5kcyAtLT5cclxuPCEtLSBCYXNlIFRlbXBsYXRlIHN0YXJ0cyBmcm9tIGhlcmUgLS0+XHJcbjxuZy10ZW1wbGF0ZSAjYmFzZVRlbXBsYXRlPlxyXG4gICAgPG1hdC1saXN0LWl0ZW1cclxuICAgICAgICBtYXRSaXBwbGVcclxuICAgICAgICAqbmdJZj1cIiFub2RlLmhpZGRlblwiXHJcbiAgICAgICAgdGl0bGU9XCJ7e25vZGUubGFiZWx9fVwiXHJcbiAgICAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cIm5vZGUuZGlzYWJsZWRcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmRTdHlsZSgpXCJcclxuICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxpbmtUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9tYXQtbGlzdC1pdGVtPlxyXG4gICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwibm9kZUNvbmZpZ3VyYXRpb24udXNlRGl2aWRlcnNcIj48L21hdC1kaXZpZGVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG48bmctdGVtcGxhdGUgI2xpbmtUZW1wbGF0ZT5cclxuICAgIDxuZy1saXN0LWl0ZW0tY29udGVudFxyXG4gICAgICAgIGNsYXNzPVwiZmlsbGVkXCJcclxuICAgICAgICBbbm9kZV09XCJub2RlXCJcclxuICAgICAgICBbaXNSdGxMYXlvdXRdPVwiaXNSdGxMYXlvdXQoKVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiZ2V0Q29sb3JTdHlsZSgpXCI+PC9uZy1saXN0LWl0ZW0tY29udGVudD5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19