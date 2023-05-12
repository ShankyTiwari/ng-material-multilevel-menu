import { Component, Input, Output, EventEmitter, TemplateRef, } from "@angular/core";
import { Router } from "@angular/router";
import { ExpandCollapseStatusEnum, } from "../app.model";
import { CONSTANT } from "../constants";
import { MultilevelMenuService } from "../multilevel-menu.service";
import { SlideInOut } from "../animation";
import { CommonUtils } from "../common-utils";
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
        this.nodeChildren =
            this.node && this.node.items
                ? this.node.items.filter((n) => !n.hidden)
                : [];
        this.node.hasChildren = this.hasItems();
        if (!CommonUtils.isNullOrUndefined(this.selectedNode)) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
        this.setExpandCollapseStatus();
    }
    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] =
            this.node.disabled;
        if (!CommonUtils.isNullOrUndefined(this.node.faIcon) &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }
        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === "boolean") {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }
    setSelectedClass(isFound) {
        if (isFound) {
            if (!this.firstInitializer) {
                this.expanded = true;
            }
            this.isSelected =
                this.nodeConfiguration.highlightOnSelect ||
                    this.selectedNode.items === undefined;
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
        if (this.nodeConfiguration.interfaceWithRoute !== null &&
            this.nodeConfiguration.interfaceWithRoute &&
            node.link !== undefined &&
            node.link) {
            this.router.navigate([node.link], node.navigationExtras).then();
        }
        else if (node.onSelected && typeof node.onSelected === "function") {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (node.items === undefined ||
            this.nodeConfiguration.collapseOnSelect) {
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
            args: [{ selector: "ng-list-item", animations: [SlideInOut], template: "<div class=\"amml-menu-container\">\r\n    <!-- Base Template rendering condition starts -->\r\n    <div\r\n        *ngIf=\"nodeConfiguration.customTemplate && !node.hidden;else baseTemplate\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getListStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container\r\n            [ngTemplateOutlet]=\"listTemplate\"\r\n            [ngTemplateOutletContext]=\"{item: node, configuration: nodeConfiguration}\">\r\n        </ng-container>\r\n    </div>\r\n    <!-- Base Template rendering condition ends -->\r\n    <!-- Recursive Template calls begins -->\r\n    <div\r\n        *ngIf=\"hasItems() && expanded\"\r\n        [@SlideInOut]\r\n        [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\"\r\n        [ngClass]=\"classes\">\r\n        <ng-list-item\r\n            *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfiguration'\r\n            [node]=\"singleNode.value\"\r\n            [level]=\"level + 1\"\r\n            [submenuLevel]=\"singleNode.key\"\r\n            [selectedNode]='selectedNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </div>\r\n</div>\r\n<!-- Recursive Template calls ends -->\r\n<!-- Base Template starts from here -->\r\n<ng-template #baseTemplate>\r\n    <mat-list-item\r\n        matRipple\r\n        *ngIf=\"!node.hidden\"\r\n        title=\"{{node.label}}\"\r\n        [matRippleDisabled]=\"node.disabled\"\r\n        [ngClass]=\"selectedListClasses\"\r\n        [ngStyle]=\"getBackgroundStyle()\"\r\n        (click)=\"expand(node)\">\r\n        <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n    </mat-list-item>\r\n    <mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\r\n</ng-template>\r\n<ng-template #linkTemplate>\r\n    <ng-list-item-content\r\n        class=\"filled\"\r\n        [node]=\"node\"\r\n        [isRtlLayout]=\"isRtlLayout()\"\r\n        [ngStyle]=\"getColorStyle()\"></ng-list-item-content>\r\n</ng-template>\r\n", styles: [".filled{width:100%}div[dir=rtl].amml-submenu{margin-right:16px}div[dir=ltr].amml-submenu{margin-left:16px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51L3NyYy9saWIvbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFdBQVcsR0FFWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUlMLHdCQUF3QixHQUd6QixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7Ozs7Ozs7O0FBRTlDLE1BTWEsaUJBQWlCO0lBb0JsQjtJQUNEO0lBcEJBLElBQUksQ0FBaUI7SUFDckIsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDakIsWUFBWSxDQUFpQjtJQUM3QixpQkFBaUIsR0FBa0IsSUFBSSxDQUFDO0lBQ3hDLHdCQUF3QixHQUE2QixJQUFJLENBQUM7SUFDMUQsWUFBWSxHQUE0QixJQUFJLENBQUM7SUFFNUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO0lBRTVELFVBQVUsR0FBRyxLQUFLLENBQUM7SUFD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QUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakU7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsRUFBRTtZQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjthQUFNLElBQ0wsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFDdkM7WUFDQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBb0I7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQzt1R0FoTVUsaUJBQWlCOzJGQUFqQixpQkFBaUIsc1ZDL0I5QixzckVBc0RBLGcyQ0R2QmEsaUJBQWlCLDBYQUZoQixDQUFDLFVBQVUsQ0FBQzs7U0FFYixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFON0IsU0FBUzsrQkFDRSxjQUFjLGNBR1osQ0FBQyxVQUFVLENBQUM7aUlBR2YsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLHdCQUF3QjtzQkFBaEMsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgRWxlbWVudFJlZixcclxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbmZpZ3VyYXRpb24sXHJcbiAgTGlzdFN0eWxlLFxyXG4gIE11bHRpbGV2ZWxOb2RlLFxyXG4gIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSxcclxuICBDb2xvclN0eWxlLFxyXG4gIEJhY2tncm91bmRTdHlsZSxcclxufSBmcm9tIFwiLi4vYXBwLm1vZGVsXCI7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tIFwiLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2xpZGVJbk91dCB9IGZyb20gXCIuLi9hbmltYXRpb25cIjtcclxuaW1wb3J0IHsgQ29tbW9uVXRpbHMgfSBmcm9tIFwiLi4vY29tbW9uLXV0aWxzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJuZy1saXN0LWl0ZW1cIixcclxuICB0ZW1wbGF0ZVVybDogXCIuL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiLi9saXN0LWl0ZW0uY29tcG9uZW50LmNzc1wiXSxcclxuICBhbmltYXRpb25zOiBbU2xpZGVJbk91dF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZTtcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc3VibWVudUxldmVsID0gMDtcclxuICBASW5wdXQoKSBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlO1xyXG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBASW5wdXQoKSBub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSA9IG51bGw7XHJcbiAgQElucHV0KCkgbGlzdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPiA9IG51bGw7XHJcblxyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2RlPigpO1xyXG5cclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBmaXJzdEluaXRpYWxpemVyID0gZmFsc2U7XHJcblxyXG4gIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLm5vZGVDaGlsZHJlbiA9XHJcbiAgICAgIHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXRlbXNcclxuICAgICAgICA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIoKG4pID0+ICFuLmhpZGRlbilcclxuICAgICAgICA6IFtdO1xyXG4gICAgdGhpcy5ub2RlLmhhc0NoaWxkcmVuID0gdGhpcy5oYXNJdGVtcygpO1xyXG5cclxuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQodGhpcy5zZWxlY3RlZE5vZGUpKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyhcclxuICAgICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKFxyXG4gICAgICAgICAgdGhpcy5ub2RlLFxyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZE5vZGUuaWRcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldEV4cGFuZENvbGxhcHNlU3RhdHVzKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdID1cclxuICAgICAgdGhpcy5ub2RlLmRpc2FibGVkO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMubm9kZS5mYUljb24pICYmXHJcbiAgICAgIHRoaXMubm9kZS5mYUljb24ubWF0Y2goL1xcYmZhXFx3KD8hLSkvKSA9PT0gbnVsbFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMubm9kZS5mYUljb24gPSBgZmFzICR7dGhpcy5ub2RlLmZhSWNvbn1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tcclxuICAgICAgYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YFxyXG4gICAgXSA9IHRydWU7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubm9kZS5leHBhbmRlZCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMubm9kZS5leHBhbmRlZDtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5oaWdobGlnaHRPblNlbGVjdCB8fFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuc2VsZWN0ZWROb2RlLmlkID09PSB0aGlzLm5vZGUuaWQsXHJcbiAgICAgIFtDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLm5vZGUuZGlzYWJsZWQsXHJcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXTogdHJ1ZSxcclxuICAgIH07XHJcbiAgICB0aGlzLm5vZGUuaXNTZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZDtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5wYWRkaW5nQXRTdGFydDtcclxuICB9XHJcblxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29sb3I6IHRoaXMuZ2V0Q29sb3IoKSxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmdldEJhY2tncm91bmRDb2xvcigpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldENvbG9yU3R5bGUoKTogQ29sb3JTdHlsZSB7XHJcbiAgICByZXR1cm4geyBjb2xvcjogdGhpcy5nZXRDb2xvcigpIH07XHJcbiAgfVxyXG5cclxuICBnZXRCYWNrZ3JvdW5kU3R5bGUoKTogQmFja2dyb3VuZFN0eWxlIHtcclxuICAgIHJldHVybiB7IGJhY2tncm91bmRDb2xvcjogdGhpcy5nZXRCYWNrZ3JvdW5kQ29sb3IoKSB9O1xyXG4gIH1cclxuXHJcbiAgZ2V0Q29sb3IoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmlzU2VsZWN0ZWRcclxuICAgICAgPyB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbFxyXG4gICAgICAgID8gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3JcclxuICAgICAgICA6IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUlxyXG4gICAgICA6IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yICE9PSBudWxsXHJcbiAgICAgID8gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3JcclxuICAgICAgOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUjtcclxuICB9XHJcblxyXG4gIGdldEJhY2tncm91bmRDb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbFxyXG4gICAgICA/IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvclxyXG4gICAgICA6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SO1xyXG4gIH1cclxuXHJcbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMDtcclxuICB9XHJcblxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucnRsTGF5b3V0O1xyXG4gIH1cclxuXHJcbiAgc2V0Q2xhc3NlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xhc3NlcyA9IHtcclxuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWwgKyAxfWBdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU1VCTUVOVV9JVEVNX0NMQVNTX05BTUVdOlxyXG4gICAgICAgIHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KCksXHJcbiAgICAgIFtDT05TVEFOVC5IQVNfU1VCTUVOVV9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLmhhc0l0ZW1zKCksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc2V0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XHJcbiAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzKSkge1xyXG4gICAgICBpZiAodGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPT09IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5leHBhbmQpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jdXN0b21UZW1wbGF0ZSkge1xyXG4gICAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID09PSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0uY29sbGFwc2UpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY3VzdG9tVGVtcGxhdGUpIHtcclxuICAgICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2RlKTogdm9pZCB7XHJcbiAgICBpZiAobm9kZS5kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xyXG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xyXG4gICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiZcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgJiZcclxuICAgICAgbm9kZS5saW5rICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgbm9kZS5saW5rXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10sIG5vZGUubmF2aWdhdGlvbkV4dHJhcykudGhlbigpO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLm9uU2VsZWN0ZWQgJiYgdHlwZW9mIG5vZGUub25TZWxlY3RlZCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChcclxuICAgICAgbm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJhbW1sLW1lbnUtY29udGFpbmVyXCI+XHJcbiAgICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBzdGFydHMgLS0+XHJcbiAgICA8ZGl2XHJcbiAgICAgICAgKm5nSWY9XCJub2RlQ29uZmlndXJhdGlvbi5jdXN0b21UZW1wbGF0ZSAmJiAhbm9kZS5oaWRkZW47ZWxzZSBiYXNlVGVtcGxhdGVcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCJcclxuICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJsaXN0VGVtcGxhdGVcIlxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie2l0ZW06IG5vZGUsIGNvbmZpZ3VyYXRpb246IG5vZGVDb25maWd1cmF0aW9ufVwiPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIEJhc2UgVGVtcGxhdGUgcmVuZGVyaW5nIGNvbmRpdGlvbiBlbmRzIC0tPlxyXG4gICAgPCEtLSBSZWN1cnNpdmUgVGVtcGxhdGUgY2FsbHMgYmVnaW5zIC0tPlxyXG4gICAgPGRpdlxyXG4gICAgICAgICpuZ0lmPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZFwiXHJcbiAgICAgICAgW0BTbGlkZUluT3V0XVxyXG4gICAgICAgIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICAgICAgICA8bmctbGlzdC1pdGVtXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlbiB8IGtleXZhbHVlIDogbXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmt2RHVtbXlDb21wYXJlckZuXCJcclxuICAgICAgICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nXHJcbiAgICAgICAgICAgIFtub2RlXT1cInNpbmdsZU5vZGUudmFsdWVcIlxyXG4gICAgICAgICAgICBbbGV2ZWxdPVwibGV2ZWwgKyAxXCJcclxuICAgICAgICAgICAgW3N1Ym1lbnVMZXZlbF09XCJzaW5nbGVOb2RlLmtleVwiXHJcbiAgICAgICAgICAgIFtzZWxlY3RlZE5vZGVdPSdzZWxlY3RlZE5vZGUnXHJcbiAgICAgICAgICAgIFtub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXNdPSdub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMnXHJcbiAgICAgICAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCJcclxuICAgICAgICAgICAgW2xpc3RUZW1wbGF0ZV09XCJsaXN0VGVtcGxhdGVcIj5cclxuICAgICAgICA8L25nLWxpc3QtaXRlbT5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPCEtLSBSZWN1cnNpdmUgVGVtcGxhdGUgY2FsbHMgZW5kcyAtLT5cclxuPCEtLSBCYXNlIFRlbXBsYXRlIHN0YXJ0cyBmcm9tIGhlcmUgLS0+XHJcbjxuZy10ZW1wbGF0ZSAjYmFzZVRlbXBsYXRlPlxyXG4gICAgPG1hdC1saXN0LWl0ZW1cclxuICAgICAgICBtYXRSaXBwbGVcclxuICAgICAgICAqbmdJZj1cIiFub2RlLmhpZGRlblwiXHJcbiAgICAgICAgdGl0bGU9XCJ7e25vZGUubGFiZWx9fVwiXHJcbiAgICAgICAgW21hdFJpcHBsZURpc2FibGVkXT1cIm5vZGUuZGlzYWJsZWRcIlxyXG4gICAgICAgIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldEJhY2tncm91bmRTdHlsZSgpXCJcclxuICAgICAgICAoY2xpY2spPVwiZXhwYW5kKG5vZGUpXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImxpbmtUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgPC9tYXQtbGlzdC1pdGVtPlxyXG4gICAgPG1hdC1kaXZpZGVyICpuZ0lmPVwibm9kZUNvbmZpZ3VyYXRpb24udXNlRGl2aWRlcnNcIj48L21hdC1kaXZpZGVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG48bmctdGVtcGxhdGUgI2xpbmtUZW1wbGF0ZT5cclxuICAgIDxuZy1saXN0LWl0ZW0tY29udGVudFxyXG4gICAgICAgIGNsYXNzPVwiZmlsbGVkXCJcclxuICAgICAgICBbbm9kZV09XCJub2RlXCJcclxuICAgICAgICBbaXNSdGxMYXlvdXRdPVwiaXNSdGxMYXlvdXQoKVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiZ2V0Q29sb3JTdHlsZSgpXCI+PC9uZy1saXN0LWl0ZW0tY29udGVudD5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19