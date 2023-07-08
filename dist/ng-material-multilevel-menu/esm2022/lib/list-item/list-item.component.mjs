import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExpandCollapseStatusEnum } from '../app.model';
import { CONSTANT } from '../constants';
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
export class ListItemComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: ListItemComponent, selector: "ng-list-item", inputs: { node: "node", level: "level", submenuLevel: "submenuLevel", selectedNode: "selectedNode", nodeConfiguration: "nodeConfiguration", nodeExpandCollapseStatus: "nodeExpandCollapseStatus", listTemplate: "listTemplate" }, outputs: { selectedItem: "selectedItem" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"amml-menu-container\">\n  <!-- Base Template rendering condition starts -->\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\n       [ngClass]=\"selectedListClasses\"\n       (click)=\"expand(node)\">\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\n    </ng-container>\n  </div>\n  <!-- Base Template rendering condition ends -->\n\n  <!-- Recursive Template calls begins -->\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n                  [nodeConfiguration]='nodeConfiguration'\n                  [node]=\"singleNode.value\"\n                  [level]=\"level + 1\"\n                  [submenuLevel]=\"singleNode.key\"\n                  [selectedNode]='selectedNode'\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n                  (selectedItem)=\"selectedListItem($event)\"\n                  [listTemplate]=\"listTemplate\">\n    </ng-list-item>\n  </div>\n</div>\n<!-- Recursive Template calls ends -->\n\n<!-- Base Template starts from here -->\n<ng-template #baseTemplate>\n  <mat-list-item matRipple\n                 *ngIf=\"!node.hidden\"\n                 title=\"{{node.label}}\"\n                 [matRippleDisabled]=\"node.disabled\"\n                 [ngClass]=\"selectedListClasses\"\n                 (click)=\"expand(node)\">\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\n  </mat-list-item>\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\n</ng-template>\n\n<ng-template #linkTemplate>\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [nodeConfiguration]=\"nodeConfiguration\" [isRtlLayout]=\"isRtlLayout()\" [listContentStyle]=\"getListStyle()\"></ng-list-item-content>\n</ng-template>\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }, { kind: "component", type: i6.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "directive", type: i7.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "component", type: ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "component", type: i8.ListItemContentComponent, selector: "ng-list-item-content", inputs: ["node", "isRtlLayout", "listContentStyle", "nodeConfiguration"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }], animations: [SlideInOut] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: ListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-list-item', animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\n  <!-- Base Template rendering condition starts -->\n  <div *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\n       [ngClass]=\"selectedListClasses\"\n       (click)=\"expand(node)\">\n    <ng-container [ngTemplateOutlet]=\"listTemplate\"\n                  [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\n    </ng-container>\n  </div>\n  <!-- Base Template rendering condition ends -->\n\n  <!-- Recursive Template calls begins -->\n  <div *ngIf=\"hasItems() && expanded\" [@SlideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n    <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n                  [nodeConfiguration]='nodeConfiguration'\n                  [node]=\"singleNode.value\"\n                  [level]=\"level + 1\"\n                  [submenuLevel]=\"singleNode.key\"\n                  [selectedNode]='selectedNode'\n                  [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n                  (selectedItem)=\"selectedListItem($event)\"\n                  [listTemplate]=\"listTemplate\">\n    </ng-list-item>\n  </div>\n</div>\n<!-- Recursive Template calls ends -->\n\n<!-- Base Template starts from here -->\n<ng-template #baseTemplate>\n  <mat-list-item matRipple\n                 *ngIf=\"!node.hidden\"\n                 title=\"{{node.label}}\"\n                 [matRippleDisabled]=\"node.disabled\"\n                 [ngClass]=\"selectedListClasses\"\n                 (click)=\"expand(node)\">\n    <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\n  </mat-list-item>\n  <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\n</ng-template>\n\n<ng-template #linkTemplate>\n  <ng-list-item-content class=\"filled\" [node]=\"node\" [nodeConfiguration]=\"nodeConfiguration\" [isRtlLayout]=\"isRtlLayout()\" [listContentStyle]=\"getListStyle()\"></ng-list-item-content>\n</ng-template>\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFlBQVksRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFHbkgsT0FBTyxFQUE0Qyx3QkFBd0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7O0FBUTVDLE1BQU0sT0FBTyxpQkFBaUI7SUFtQjVCLFlBQW9CLE1BQWMsRUFDZixxQkFBNEM7UUFEM0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFsQnRELFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBQ3hDLDZCQUF3QixHQUE2QixJQUFJLENBQUM7UUFDMUQsaUJBQVksR0FBNEIsSUFBSSxDQUFDO1FBRTVDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFFNUQsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLEtBQUss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LElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7OEdBNUpVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHNWQ2Y5QixtL0RBMkNBLG0xQ0Q1QmEsaUJBQWlCLG1hQUZoQixDQUFDLFVBQVUsQ0FBQzs7MkZBRWIsaUJBQWlCO2tCQU43QixTQUFTOytCQUNFLGNBQWMsY0FHWixDQUFDLFVBQVUsQ0FBQztpSUFHZixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGUsIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSB9IGZyb20gJy4uL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBTbGlkZUluT3V0IH0gZnJvbSAnLi4vYW5pbWF0aW9uJztcbmltcG9ydCB7Q29tbW9uVXRpbHN9IGZyb20gJy4uL2NvbW1vbi11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saXN0LWl0ZW0uY29tcG9uZW50LmNzcyddLFxuICBhbmltYXRpb25zOiBbU2xpZGVJbk91dF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlO1xuICBASW5wdXQoKSBsZXZlbCA9IDE7XG4gIEBJbnB1dCgpIHN1Ym1lbnVMZXZlbCA9IDA7XG4gIEBJbnB1dCgpIHNlbGVjdGVkTm9kZTogTXVsdGlsZXZlbE5vZGU7XG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgQElucHV0KCkgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBudWxsO1xuICBASW5wdXQoKSBsaXN0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+ID0gbnVsbDtcblxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcblxuICBpc1NlbGVjdGVkID0gZmFsc2U7XG4gIGV4cGFuZGVkID0gZmFsc2U7XG4gIGZpcnN0SW5pdGlhbGl6ZXIgPSBmYWxzZTtcblxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2RlW107XG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlKSB7XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XG4gICAgdGhpcy5ub2RlLmhhc0NoaWxkcmVuID0gdGhpcy5oYXNJdGVtcygpO1xuXG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZCh0aGlzLnNlbGVjdGVkTm9kZSkpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcbiAgICB9XG4gICAgdGhpcy5zZXRFeHBhbmRDb2xsYXBzZVN0YXR1cygpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV0gPSB0aGlzLm5vZGUuZGlzYWJsZWQ7XG5cbiAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMubm9kZS5mYUljb24pICYmXG4gICAgICB0aGlzLm5vZGUuZmFJY29uLm1hdGNoKC9cXGJmYVxcdyg/IS0pLykgPT09IG51bGwpIHtcbiAgICAgIHRoaXMubm9kZS5mYUljb24gPSBgZmFzICR7dGhpcy5ub2RlLmZhSWNvbn1gO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXSA9IHRydWU7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm5vZGUuZXhwYW5kZWQgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMubm9kZS5leHBhbmRlZDtcbiAgICB9XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gIH1cblxuICBzZXRTZWxlY3RlZENsYXNzKGlzRm91bmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNGb3VuZCkge1xuICAgICAgaWYgKCF0aGlzLmZpcnN0SW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmhpZ2hsaWdodE9uU2VsZWN0IHx8IHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xuICAgICAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IHRoaXMuaXNTZWxlY3RlZCxcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5zZWxlY3RlZE5vZGUuaWQgPT09IHRoaXMubm9kZS5pZCxcbiAgICAgIFtDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLm5vZGUuZGlzYWJsZWQsXG4gICAgICBbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF06IHRydWUsXG4gICAgfTtcbiAgICB0aGlzLm5vZGUuaXNTZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZDtcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcbiAgfVxuXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0O1xuICB9XG5cbiAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZSB7XG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXG4gICAgICBjb2xvcjogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1JcbiAgICB9O1xuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCA/XG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG5cbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDA7XG4gIH1cblxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5ydGxMYXlvdXQ7XG4gIH1cblxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsICsgMX1gXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TVUJNRU5VX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KCksXG4gICAgICBbQ09OU1RBTlQuSEFTX1NVQk1FTlVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5oYXNJdGVtcygpXG4gICAgfTtcbiAgfVxuXG4gIHNldEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQge1xuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMpKSB7XG4gICAgICBpZiAodGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPT09IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5leHBhbmQpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmN1c3RvbVRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID09PSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0uY29sbGFwc2UpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jdXN0b21UZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2RlKTogdm9pZCB7XG4gICAgaWYgKG5vZGUuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gIHRoaXMuZXhwYW5kZWQ7XG4gICAgdGhpcy5maXJzdEluaXRpYWxpemVyID0gdHJ1ZTtcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcbiAgICAgICYmIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxuICAgICAgJiYgbm9kZS5saW5rXG4gICAgKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSwgbm9kZS5uYXZpZ2F0aW9uRXh0cmFzKS50aGVuKCk7XG4gICAgfSBlbHNlIGlmIChub2RlLm9uU2VsZWN0ZWQgJiYgdHlwZW9mIG5vZGUub25TZWxlY3RlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xuICB9XG5cbn1cbiIsIjxkaXYgY2xhc3M9XCJhbW1sLW1lbnUtY29udGFpbmVyXCI+XG4gIDwhLS0gQmFzZSBUZW1wbGF0ZSByZW5kZXJpbmcgY29uZGl0aW9uIHN0YXJ0cyAtLT5cbiAgPGRpdiAqbmdJZj1cIm5vZGVDb25maWd1cmF0aW9uLmN1c3RvbVRlbXBsYXRlICYmICFub2RlLmhpZGRlbjtlbHNlIGJhc2VUZW1wbGF0ZVwiXG4gICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiXG4gICAgICAgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibGlzdFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogbm9kZSwgY29uZmlndXJhdGlvbjogbm9kZUNvbmZpZ3VyYXRpb259XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBlbmRzIC0tPlxuXG4gIDwhLS0gUmVjdXJzaXZlIFRlbXBsYXRlIGNhbGxzIGJlZ2lucyAtLT5cbiAgPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQFNsaWRlSW5PdXRdIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIiBbbmdDbGFzc109XCJjbGFzc2VzXCI+XG4gICAgPG5nLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgc2luZ2xlTm9kZSBvZiBub2RlQ2hpbGRyZW4gfCBrZXl2YWx1ZSA6IG11bHRpbGV2ZWxNZW51U2VydmljZS5rdkR1bW15Q29tcGFyZXJGblwiXG4gICAgICAgICAgICAgICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlndXJhdGlvbidcbiAgICAgICAgICAgICAgICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2xldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICBbc3VibWVudUxldmVsXT1cInNpbmdsZU5vZGUua2V5XCJcbiAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXG4gICAgICAgICAgICAgICAgICBbbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzXT0nbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzJ1xuICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgW2xpc3RUZW1wbGF0ZV09XCJsaXN0VGVtcGxhdGVcIj5cbiAgICA8L25nLWxpc3QtaXRlbT5cbiAgPC9kaXY+XG48L2Rpdj5cbjwhLS0gUmVjdXJzaXZlIFRlbXBsYXRlIGNhbGxzIGVuZHMgLS0+XG5cbjwhLS0gQmFzZSBUZW1wbGF0ZSBzdGFydHMgZnJvbSBoZXJlIC0tPlxuPG5nLXRlbXBsYXRlICNiYXNlVGVtcGxhdGU+XG4gIDxtYXQtbGlzdC1pdGVtIG1hdFJpcHBsZVxuICAgICAgICAgICAgICAgICAqbmdJZj1cIiFub2RlLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICBbbWF0UmlwcGxlRGlzYWJsZWRdPVwibm9kZS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxuICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxpbmtUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICA8L21hdC1saXN0LWl0ZW0+XG4gIDxtYXQtZGl2aWRlciAqbmdJZj1cIm5vZGVDb25maWd1cmF0aW9uLnVzZURpdmlkZXJzXCI+PC9tYXQtZGl2aWRlcj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjbGlua1RlbXBsYXRlPlxuICA8bmctbGlzdC1pdGVtLWNvbnRlbnQgY2xhc3M9XCJmaWxsZWRcIiBbbm9kZV09XCJub2RlXCIgW25vZGVDb25maWd1cmF0aW9uXT1cIm5vZGVDb25maWd1cmF0aW9uXCIgW2lzUnRsTGF5b3V0XT1cImlzUnRsTGF5b3V0KClcIiBbbGlzdENvbnRlbnRTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiPjwvbmctbGlzdC1pdGVtLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuIl19