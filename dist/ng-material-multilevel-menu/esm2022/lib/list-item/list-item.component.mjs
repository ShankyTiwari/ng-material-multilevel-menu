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
    set selectedNode(value) {
        this._selectedNode = value;
        if (value)
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.node.id));
    }
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
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
        };
    }
    get selectedNode() { return this._selectedNode; }
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        this.node.hasChildren = this.hasItems();
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
            this.expanded = true;
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.node.items === undefined;
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
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: this.selectedNode.node.id === this.node.id,
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
        return this.nodeChildren && this.nodeChildren.length > 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFlBQVksRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFHbkgsT0FBTyxFQUE0Qyx3QkFBd0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7O0FBUTVDLE1BQU0sT0FBTyxpQkFBaUI7SUFNNUIsSUFBYSxZQUFZLENBQUMsS0FBNkI7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBRyxLQUFLO1lBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQWVBLFlBQW9CLE1BQWMsRUFDZixxQkFBNEM7UUFEM0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUF0QnRELFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixp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QUFDLElBQW9CO1FBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7OEdBOUpVLGlCQUFpQjtrR0FBakIsaUJBQWlCLHNWQ2Y5QixtL0RBMkNBLG0xQ0Q1QmEsaUJBQWlCLG1hQUZoQixDQUFDLFVBQVUsQ0FBQzs7MkZBRWIsaUJBQWlCO2tCQU43QixTQUFTOytCQUNFLGNBQWMsY0FHWixDQUFDLFVBQVUsQ0FBQztpSUFLZixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ08sWUFBWTtzQkFBeEIsS0FBSztnQkFNRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBRUksWUFBWTtzQkFBckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGUsIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSB9IGZyb20gJy4uL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XG5pbXBvcnQgeyBTbGlkZUluT3V0IH0gZnJvbSAnLi4vYW5pbWF0aW9uJztcbmltcG9ydCB7Q29tbW9uVXRpbHN9IGZyb20gJy4uL2NvbW1vbi11dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saXN0LWl0ZW0uY29tcG9uZW50LmNzcyddLFxuICBhbmltYXRpb25zOiBbU2xpZGVJbk91dF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG5cdF9zZWxlY3RlZE5vZGU6IHtub2RlOiBNdWx0aWxldmVsTm9kZX07XG4gIFxuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZTtcbiAgQElucHV0KCkgbGV2ZWwgPSAxO1xuICBASW5wdXQoKSBzdWJtZW51TGV2ZWwgPSAwO1xuICBASW5wdXQoKSBzZXQgc2VsZWN0ZWROb2RlKHZhbHVlOiB7bm9kZTogTXVsdGlsZXZlbE5vZGV9KSB7XG5cdFx0dGhpcy5fc2VsZWN0ZWROb2RlID0gdmFsdWU7XG4gICAgaWYodmFsdWUpXG4gICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUubm9kZS5pZCkpO1xuXHR9XG5cbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xuICBASW5wdXQoKSBub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSA9IG51bGw7XG4gIEBJbnB1dCgpIGxpc3RUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj4gPSBudWxsO1xuXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2RlPigpO1xuXG4gIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgZXhwYW5kZWQgPSBmYWxzZTtcblxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2RlW107XG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlKSB7XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG5cdGdldCBzZWxlY3RlZE5vZGUoKTogIHtub2RlOiBNdWx0aWxldmVsTm9kZX0geyByZXR1cm4gdGhpcy5fc2VsZWN0ZWROb2RlO31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXRlbXMgPyB0aGlzLm5vZGUuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKSA6IFtdO1xuICAgIHRoaXMubm9kZS5oYXNDaGlsZHJlbiA9IHRoaXMuaGFzSXRlbXMoKTtcblxuICAgIHRoaXMuc2V0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdID0gdGhpcy5ub2RlLmRpc2FibGVkO1xuXG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZCh0aGlzLm5vZGUuZmFJY29uKSAmJlxuICAgICAgdGhpcy5ub2RlLmZhSWNvbi5tYXRjaCgvXFxiZmFcXHcoPyEtKS8pID09PSBudWxsKSB7XG4gICAgICB0aGlzLm5vZGUuZmFJY29uID0gYGZhcyAke3RoaXMubm9kZS5mYUljb259YDtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF0gPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5ub2RlLmV4cGFuZGVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm5vZGUuZXhwYW5kZWQ7XG4gICAgfVxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGlzRm91bmQpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5oaWdobGlnaHRPblNlbGVjdCB8fCB0aGlzLnNlbGVjdGVkTm9kZS5ub2RlLml0ZW1zID09PSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xuICAgICAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IHRoaXMuaXNTZWxlY3RlZCxcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5zZWxlY3RlZE5vZGUubm9kZS5pZCA9PT0gdGhpcy5ub2RlLmlkLFxuICAgICAgW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMubm9kZS5kaXNhYmxlZCxcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXTogdHJ1ZSxcbiAgICB9O1xuICAgIHRoaXMubm9kZS5pc1NlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkO1xuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xuICB9XG5cbiAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQ7XG4gIH1cblxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcbiAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxuICAgIH07XG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cbiAgICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgOiBzdHlsZXMuY29sb3IgPSBDT05TVEFOVC5ERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I7XG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XG4gICAgfVxuICAgIHJldHVybiBzdHlsZXM7XG4gIH1cblxuICBoYXNJdGVtcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4gJiYgdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgfVxuXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnJ0bExheW91dDtcbiAgfVxuXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWwgKyAxfWBdOiB0cnVlLFxuICAgICAgW0NPTlNUQU5ULlNVQk1FTlVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5oYXNJdGVtcygpICYmIHRoaXMuZ2V0UGFkZGluZ0F0U3RhcnQoKSxcbiAgICAgIFtDT05TVEFOVC5IQVNfU1VCTUVOVV9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLmhhc0l0ZW1zKClcbiAgICB9O1xuICB9XG5cbiAgc2V0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZCh0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cykpIHtcbiAgICAgIGlmICh0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9PT0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLmV4cGFuZCkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY3VzdG9tVGVtcGxhdGUpIHtcbiAgICAgICAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPT09IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5jb2xsYXBzZSkge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmN1c3RvbVRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcbiAgICBpZiAobm9kZS5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcbiAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSAgdGhpcy5leHBhbmRlZDtcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcbiAgICAgICYmIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxuICAgICAgJiYgbm9kZS5saW5rXG4gICAgKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSwgbm9kZS5uYXZpZ2F0aW9uRXh0cmFzKS50aGVuKCk7XG4gICAgfSBlbHNlIGlmIChub2RlLm9uU2VsZWN0ZWQgJiYgdHlwZW9mIG5vZGUub25TZWxlY3RlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xuICB9XG5cbn1cbiIsIjxkaXYgY2xhc3M9XCJhbW1sLW1lbnUtY29udGFpbmVyXCI+XG4gIDwhLS0gQmFzZSBUZW1wbGF0ZSByZW5kZXJpbmcgY29uZGl0aW9uIHN0YXJ0cyAtLT5cbiAgPGRpdiAqbmdJZj1cIm5vZGVDb25maWd1cmF0aW9uLmN1c3RvbVRlbXBsYXRlICYmICFub2RlLmhpZGRlbjtlbHNlIGJhc2VUZW1wbGF0ZVwiXG4gICAgICAgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiXG4gICAgICAgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiPlxuICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwibGlzdFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogbm9kZSwgY29uZmlndXJhdGlvbjogbm9kZUNvbmZpZ3VyYXRpb259XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gIDwvZGl2PlxuICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBlbmRzIC0tPlxuXG4gIDwhLS0gUmVjdXJzaXZlIFRlbXBsYXRlIGNhbGxzIGJlZ2lucyAtLT5cbiAgPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQFNsaWRlSW5PdXRdIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIiBbbmdDbGFzc109XCJjbGFzc2VzXCI+XG4gICAgPG5nLWxpc3QtaXRlbSAqbmdGb3I9XCJsZXQgc2luZ2xlTm9kZSBvZiBub2RlQ2hpbGRyZW4gfCBrZXl2YWx1ZSA6IG11bHRpbGV2ZWxNZW51U2VydmljZS5rdkR1bW15Q29tcGFyZXJGblwiXG4gICAgICAgICAgICAgICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlndXJhdGlvbidcbiAgICAgICAgICAgICAgICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIlxuICAgICAgICAgICAgICAgICAgW2xldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICAgICAgICBbc3VibWVudUxldmVsXT1cInNpbmdsZU5vZGUua2V5XCJcbiAgICAgICAgICAgICAgICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXG4gICAgICAgICAgICAgICAgICBbbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzXT0nbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzJ1xuICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgW2xpc3RUZW1wbGF0ZV09XCJsaXN0VGVtcGxhdGVcIj5cbiAgICA8L25nLWxpc3QtaXRlbT5cbiAgPC9kaXY+XG48L2Rpdj5cbjwhLS0gUmVjdXJzaXZlIFRlbXBsYXRlIGNhbGxzIGVuZHMgLS0+XG5cbjwhLS0gQmFzZSBUZW1wbGF0ZSBzdGFydHMgZnJvbSBoZXJlIC0tPlxuPG5nLXRlbXBsYXRlICNiYXNlVGVtcGxhdGU+XG4gIDxtYXQtbGlzdC1pdGVtIG1hdFJpcHBsZVxuICAgICAgICAgICAgICAgICAqbmdJZj1cIiFub2RlLmhpZGRlblwiXG4gICAgICAgICAgICAgICAgIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxuICAgICAgICAgICAgICAgICBbbWF0UmlwcGxlRGlzYWJsZWRdPVwibm9kZS5kaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxuICAgICAgICAgICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxpbmtUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICA8L21hdC1saXN0LWl0ZW0+XG4gIDxtYXQtZGl2aWRlciAqbmdJZj1cIm5vZGVDb25maWd1cmF0aW9uLnVzZURpdmlkZXJzXCI+PC9tYXQtZGl2aWRlcj5cbjwvbmctdGVtcGxhdGU+XG5cbjxuZy10ZW1wbGF0ZSAjbGlua1RlbXBsYXRlPlxuICA8bmctbGlzdC1pdGVtLWNvbnRlbnQgY2xhc3M9XCJmaWxsZWRcIiBbbm9kZV09XCJub2RlXCIgW25vZGVDb25maWd1cmF0aW9uXT1cIm5vZGVDb25maWd1cmF0aW9uXCIgW2lzUnRsTGF5b3V0XT1cImlzUnRsTGF5b3V0KClcIiBbbGlzdENvbnRlbnRTdHlsZV09XCJnZXRMaXN0U3R5bGUoKVwiPjwvbmctbGlzdC1pdGVtLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuIl19