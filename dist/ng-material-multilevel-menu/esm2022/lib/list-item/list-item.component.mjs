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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemComponent, selector: "ng-list-item", inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", listTemplate: "listTemplate" }, outputs: { selectedItem: "selectedItem" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"amml-menu-container\">\r\n  <!-- Base Template rendering condition starts -->\r\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n       [ngClass]=\"selectedListClasses\"\r\n       [ngStyle]=\"getListStyle()\"\r\n       (click)=\"expand(node)\">\r\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\r\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n    </ng-container>\r\n  </div>\r\n  <!-- Base Template rendering condition ends -->\r\n\r\n  <!-- Recursive Template calls begins -->\r\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n                  [nodeConfiguration]='nodeConfiguration'\r\n                  [node]=\"singleNode.value\"\r\n                  [level]=\"level + 1\"\r\n                  [submenuLevel]=\"singleNode.key\"\r\n                  [selectedNode]='selectedNode'\r\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n                  (selectedItem)=\"selectedListItem($event)\"\r\n                  [listTemplate]=\"listTemplate\">\r\n    </ng-list-item>\r\n  </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n  <mat-list-item matRipple\r\n                 *ngIf=\"!node.hidden\"\r\n                 title=\"{{node.label}}\"\r\n                 [matRippleDisabled]=\"node.disabled\"\r\n                 [ngClass]=\"selectedListClasses\"\r\n                 [ngStyle]=\"getListStyle()\"\r\n                 (click)=\"expand(node)\">\r\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n  </mat-list-item>\r\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n\r\n<ng-template #linkTemplate>\r\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [isRtlLayout]=\"isRtlLayout()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "component", type: i6.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "directive", type: i7.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "component", type: i8.ListItemContentComponent, selector: "ng-list-item-content", inputs: ["node", "isRtlLayout"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }], animations: [SlideInOut] });
}
export { ListItemComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item', animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\r\n  <!-- Base Template rendering condition starts -->\r\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n       [ngClass]=\"selectedListClasses\"\r\n       [ngStyle]=\"getListStyle()\"\r\n       (click)=\"expand(node)\">\r\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\r\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n    </ng-container>\r\n  </div>\r\n  <!-- Base Template rendering condition ends -->\r\n\r\n  <!-- Recursive Template calls begins -->\r\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n                  [nodeConfiguration]='nodeConfiguration'\r\n                  [node]=\"singleNode.value\"\r\n                  [level]=\"level + 1\"\r\n                  [submenuLevel]=\"singleNode.key\"\r\n                  [selectedNode]='selectedNode'\r\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n                  (selectedItem)=\"selectedListItem($event)\"\r\n                  [listTemplate]=\"listTemplate\">\r\n    </ng-list-item>\r\n  </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n  <mat-list-item matRipple\r\n                 *ngIf=\"!node.hidden\"\r\n                 title=\"{{node.label}}\"\r\n                 [matRippleDisabled]=\"node.disabled\"\r\n                 [ngClass]=\"selectedListClasses\"\r\n                 [ngStyle]=\"getListStyle()\"\r\n                 (click)=\"expand(node)\">\r\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n  </mat-list-item>\r\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n\r\n<ng-template #linkTemplate>\r\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [isRtlLayout]=\"isRtlLayout()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQWMsTUFBTSxlQUFlLENBQUM7QUFDbkgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBNEMsd0JBQXdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7OztBQUU1QyxNQU1hLGlCQUFpQjtJQW1CUjtJQUNEO0lBbkJWLElBQUksQ0FBaUI7SUFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsWUFBWSxDQUFpQjtJQUM3QixpQkFBaUIsR0FBa0IsSUFBSSxDQUFDO0lBQ3hDLHdCQUF3QixHQUE2QixJQUFJLENBQUM7SUFDMUQsWUFBWSxHQUE0QixJQUFJLENBQUM7SUFFNUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO0lBRTVELFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFFekIsWUFBWSxDQUFtQjtJQUMvQixPQUFPLENBQStCO0lBQ3RDLG1CQUFtQixDQUErQjtJQUVsRCxZQUFvQixNQUFjLEVBQ2YscUJBQTRDO1FBRDNDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzdELElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUN6QixDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLElBQUk7WUFDeEMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRSxLQUFLO1lBQzFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsS0FBSztTQUN6QyxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0YsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXhDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckc7UUFDRCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUVqRixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzlDO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsSUFBSSxDQUFDLEtBQUssaUJBQWlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN6RixJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQWdCO1FBQy9CLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDdEI7WUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7U0FDckc7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFO2dCQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3ZCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekIsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxJQUFJO1lBQ3hDLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDcEQsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEUsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDdkQsQ0FBQyxTQUFTLElBQUksQ0FBQyxLQUFLLGlCQUFpQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJO1NBQ2hFLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZO1FBQ1YsTUFBTSxNQUFNLEdBQUc7WUFDYixVQUFVLEVBQUUsUUFBUSxDQUFDLDZCQUE2QjtZQUNsRCxLQUFLLEVBQUUsUUFBUSxDQUFDLHVCQUF1QjtTQUN4QyxDQUFDO1FBQ0YsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLEtBQUssSUFBSSxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO1NBQ2hFO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLDJCQUEyQixDQUFDO1NBQ3JIO2FBQU0sSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUNwRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUM7U0FDakQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQzFDLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSTtZQUNqQyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDL0UsQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQ3hELENBQUM7SUFDSixDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7WUFDakUsSUFBSSxJQUFJLENBQUMsd0JBQXdCLEtBQUssd0JBQXdCLENBQUMsTUFBTSxFQUFFO2dCQUNyRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFO29CQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQzNCO2FBQ0Y7WUFDRCxJQUFJLElBQUksQ0FBQyx3QkFBd0IsS0FBSyx3QkFBd0IsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2dCQUN0QixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDNUI7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFvQjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDLE9BQU8sQ0FBQztRQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixLQUFLLElBQUk7ZUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQjtlQUN6QyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7ZUFDdkIsSUFBSSxDQUFDLElBQUksRUFDWjtZQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2pFO2FBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsS0FBSyxVQUFVLEVBQUU7WUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBb0I7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzt1R0E1SlUsaUJBQWlCOzJGQUFqQixpQkFBaUIsc1ZDZjlCLGlsRUE2Q0EsZzJDRDlCYSxpQkFBaUIsMFhBRmhCLENBQUMsVUFBVSxDQUFDOztTQUViLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQU43QixTQUFTOytCQUNFLGNBQWMsY0FHWixDQUFDLFVBQVUsQ0FBQztpSUFHZixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGUsIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSB9IGZyb20gJy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTbGlkZUluT3V0IH0gZnJvbSAnLi4vYW5pbWF0aW9uJztcclxuaW1wb3J0IHtDb21tb25VdGlsc30gZnJvbSAnLi4vY29tbW9uLXV0aWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbGlzdC1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9saXN0LWl0ZW0uY29tcG9uZW50LmNzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFtTbGlkZUluT3V0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbm9kZTogTXVsdGlsZXZlbE5vZGU7XHJcbiAgQElucHV0KCkgbGV2ZWwgPSAxO1xyXG4gIEBJbnB1dCgpIHN1Ym1lbnVMZXZlbCA9IDA7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZTtcclxuICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQElucHV0KCkgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBudWxsO1xyXG4gIEBJbnB1dCgpIGxpc3RUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj4gPSBudWxsO1xyXG5cclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcclxuXHJcbiAgaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gIGV4cGFuZGVkID0gZmFsc2U7XHJcbiAgZmlyc3RJbml0aWFsaXplciA9IGZhbHNlO1xyXG5cclxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2RlW107XHJcbiAgY2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBzZWxlY3RlZExpc3RDbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgICAgICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLm5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXRlbXMgPyB0aGlzLm5vZGUuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKSA6IFtdO1xyXG4gICAgdGhpcy5ub2RlLmhhc0NoaWxkcmVuID0gdGhpcy5oYXNJdGVtcygpO1xyXG5cclxuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5zZWxlY3RlZE5vZGUpKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV0gPSB0aGlzLm5vZGUuZGlzYWJsZWQ7XHJcblxyXG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZCh0aGlzLm5vZGUuZmFJY29uKSAmJlxyXG4gICAgICB0aGlzLm5vZGUuZmFJY29uLm1hdGNoKC9cXGJmYVxcdyg/IS0pLykgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5ub2RlLmZhSWNvbiA9IGBmYXMgJHt0aGlzLm5vZGUuZmFJY29ufWA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdID0gdHJ1ZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5ub2RlLmV4cGFuZGVkID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMubm9kZS5leHBhbmRlZDtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5zZWxlY3RlZE5vZGUuaWQgPT09IHRoaXMubm9kZS5pZCxcclxuICAgICAgW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMubm9kZS5kaXNhYmxlZCxcclxuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIHRoaXMubm9kZS5pc1NlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkO1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0O1xyXG4gIH1cclxuXHJcbiAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgIGJhY2tncm91bmQ6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SLFxyXG4gICAgICBjb2xvcjogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1JcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsKSB7XHJcbiAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCA/XHJcbiAgICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgOiBzdHlsZXMuY29sb3IgPSBDT05TVEFOVC5ERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yICE9PSBudWxsKSB7XHJcbiAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcblxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnJ0bExheW91dDtcclxuICB9XHJcblxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsICsgMX1gXTogdHJ1ZSxcclxuICAgICAgW0NPTlNUQU5ULlNVQk1FTlVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5oYXNJdGVtcygpICYmIHRoaXMuZ2V0UGFkZGluZ0F0U3RhcnQoKSxcclxuICAgICAgW0NPTlNUQU5ULkhBU19TVUJNRU5VX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuaGFzSXRlbXMoKVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQge1xyXG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZCh0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cykpIHtcclxuICAgICAgaWYgKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID09PSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0uZXhwYW5kKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY3VzdG9tVGVtcGxhdGUpIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9PT0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLmNvbGxhcHNlKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmN1c3RvbVRlbXBsYXRlKSB7XHJcbiAgICAgICAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZSk6IHZvaWQge1xyXG4gICAgaWYgKG5vZGUuZGlzYWJsZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMubm9kZS5leHBhbmRlZCA9ICB0aGlzLmV4cGFuZGVkO1xyXG4gICAgdGhpcy5maXJzdEluaXRpYWxpemVyID0gdHJ1ZTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsXHJcbiAgICAgICYmIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlXHJcbiAgICAgICYmIG5vZGUubGluayAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICYmIG5vZGUubGlua1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub2RlLmxpbmtdLCBub2RlLm5hdmlnYXRpb25FeHRyYXMpLnRoZW4oKTtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5vblNlbGVjdGVkICYmIHR5cGVvZiBub2RlLm9uU2VsZWN0ZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZSk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChub2RlKTtcclxuICB9XHJcblxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJhbW1sLW1lbnUtY29udGFpbmVyXCI+XHJcbiAgPCEtLSBCYXNlIFRlbXBsYXRlIHJlbmRlcmluZyBjb25kaXRpb24gc3RhcnRzIC0tPlxyXG4gIDxkaXYgKm5nSWY9XCJub2RlQ29uZmlndXJhdGlvbi5jdXN0b21UZW1wbGF0ZSAmJiAhbm9kZS5oaWRkZW47ZWxzZSBiYXNlVGVtcGxhdGVcIlxyXG4gICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiXHJcbiAgICAgICBbbmdTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiXHJcbiAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XHJcbiAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxpc3RUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogbm9kZSwgY29uZmlndXJhdGlvbjogbm9kZUNvbmZpZ3VyYXRpb259XCI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L2Rpdj5cclxuICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBlbmRzIC0tPlxyXG5cclxuICA8IS0tIFJlY3Vyc2l2ZSBUZW1wbGF0ZSBjYWxscyBiZWdpbnMgLS0+XHJcbiAgPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQFNsaWRlSW5PdXRdIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIiBbbmdDbGFzc109XCJjbGFzc2VzXCI+XHJcbiAgICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlbiB8IGtleXZhbHVlIDogbXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmt2RHVtbXlDb21wYXJlckZuXCJcclxuICAgICAgICAgICAgICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nXHJcbiAgICAgICAgICAgICAgICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIlxyXG4gICAgICAgICAgICAgICAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcclxuICAgICAgICAgICAgICAgICAgW3N1Ym1lbnVMZXZlbF09XCJzaW5nbGVOb2RlLmtleVwiXHJcbiAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXHJcbiAgICAgICAgICAgICAgICAgIFtub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXNdPSdub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMnXHJcbiAgICAgICAgICAgICAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgICAgW2xpc3RUZW1wbGF0ZV09XCJsaXN0VGVtcGxhdGVcIj5cclxuICAgIDwvbmctbGlzdC1pdGVtPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPCEtLSBSZWN1cnNpdmUgVGVtcGxhdGUgY2FsbHMgZW5kcyAtLT5cclxuXHJcbjwhLS0gQmFzZSBUZW1wbGF0ZSBzdGFydHMgZnJvbSBoZXJlIC0tPlxyXG48bmctdGVtcGxhdGUgI2Jhc2VUZW1wbGF0ZT5cclxuICA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGVcclxuICAgICAgICAgICAgICAgICAqbmdJZj1cIiFub2RlLmhpZGRlblwiXHJcbiAgICAgICAgICAgICAgICAgdGl0bGU9XCJ7e25vZGUubGFiZWx9fVwiXHJcbiAgICAgICAgICAgICAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cIm5vZGUuZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxyXG4gICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCJcclxuICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibGlua1RlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XHJcbiAgPC9tYXQtbGlzdC1pdGVtPlxyXG4gIDxtYXQtZGl2aWRlciAqbmdJZj1cIm5vZGVDb25maWd1cmF0aW9uLnVzZURpdmlkZXJzXCI+PC9tYXQtZGl2aWRlcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjbGlua1RlbXBsYXRlPlxyXG4gIDxuZy1saXN0LWl0ZW0tY29udGVudCBjbGFzcz1cImZpbGxlZFwiIFtub2RlXT1cIm5vZGVcIiBbaXNSdGxMYXlvdXRdPVwiaXNSdGxMYXlvdXQoKVwiPjwvbmctbGlzdC1pdGVtLWNvbnRlbnQ+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==