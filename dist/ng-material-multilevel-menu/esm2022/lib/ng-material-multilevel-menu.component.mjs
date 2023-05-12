import { Component, Output, EventEmitter, Input, ContentChild, TemplateRef, } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { ExpandCollapseStatusEnum, } from "./app.model";
import { CONSTANT } from "./constants";
import { MultilevelMenuService } from "./multilevel-menu.service";
import { CommonUtils } from "./common-utils";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./multilevel-menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/material/list";
import * as i6 from "./list-item/list-item.component";
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
        customTemplate: false,
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
            this.configuration.interfaceWithRoute !== null &&
            this.configuration.interfaceWithRoute) {
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.urlAfterRedirects);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    }
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            !CommonUtils.isNullOrUndefinedOrEmpty(foundNode.link)
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            if (!CommonUtils.isNullOrUndefined(foundNode.dontEmit) &&
                !foundNode.dontEmit) {
                this.selectedListItem(foundNode);
            }
        }
    }
    checkValidData() {
        if (this.items === undefined ||
            (Array.isArray(this.items) && this.items.length === 0)) {
            console.warn(CONSTANT.ERROR_MESSAGE);
            return;
        }
        this.items = this.items.filter((n) => !n.hidden);
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
                typeof config.paddingAtStart === "boolean") {
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
                typeof config.interfaceWithRoute === "boolean") {
                this.nodeConfig.interfaceWithRoute = config.interfaceWithRoute;
            }
            if (!CommonUtils.isNullOrUndefined(config.collapseOnSelect) &&
                typeof config.collapseOnSelect === "boolean") {
                this.nodeConfig.collapseOnSelect = config.collapseOnSelect;
            }
            if (!CommonUtils.isNullOrUndefined(config.highlightOnSelect) &&
                typeof config.highlightOnSelect === "boolean") {
                this.nodeConfig.highlightOnSelect = config.highlightOnSelect;
            }
            if (!CommonUtils.isNullOrUndefined(config.useDividers) &&
                typeof config.useDividers === "boolean") {
                this.nodeConfig.useDividers = config.useDividers;
            }
            if (!CommonUtils.isNullOrUndefined(config.rtlLayout) &&
                typeof config.rtlLayout === "boolean") {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
            if (!CommonUtils.isNullOrUndefined(config.customTemplate) &&
                typeof config.customTemplate === "boolean") {
                this.nodeConfig.customTemplate = config.customTemplate;
            }
        }
        this.checkValidData();
    }
    initExpandCollapseStatus() {
        this.expandCollapseStatusSubscription =
            this.multilevelMenuService.expandCollapseStatus$.subscribe((expandCollapseStatus) => {
                this.nodeExpandCollapseStatus = expandCollapseStatus
                    ? expandCollapseStatus
                    : ExpandCollapseStatusEnum.neutral;
            }, () => {
                this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
            });
    }
    initSelectedMenuID() {
        this.selectMenuByIDSubscription =
            this.multilevelMenuService.selectedMenuID$.subscribe((selectedMenuID) => {
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
        if (!this.isInvalidConfig &&
            !CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.classname)) {
            return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
        }
        return CONSTANT.DEFAULT_CLASS_NAME;
    }
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            const styles = {
                backgroundColor: null,
            };
            if (!CommonUtils.isNullOrUndefinedOrEmpty(this.configuration.backgroundColor)) {
                styles.backgroundColor = this.configuration.backgroundColor;
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
        if (event.items === undefined &&
            (!event.onSelected || typeof event.onSelected !== "function")) {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgMaterialMultilevelMenuComponent, selector: "ng-material-multilevel-menu", inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, queries: [{ propertyName: "listTemplate", first: true, predicate: ["listTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\"\r\n      [listTemplate] = \"listTemplate\"\r\n    >\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i6.ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }] });
}
export { NgMaterialMultilevelMenuComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: "ng-material-multilevel-menu", template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\"\r\n      [listTemplate] = \"listTemplate\"\r\n    >\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.MultilevelMenuService }]; }, propDecorators: { items: [{
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
                args: ["listTemplate", { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjL2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFJVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFDTCxZQUFZLEVBQ1osV0FBVyxHQUVaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUlMLHdCQUF3QixHQUN6QixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFFN0MsTUFLYSxpQ0FBaUM7SUFpQ2xDO0lBQ0Q7SUEvQkEsS0FBSyxDQUFtQjtJQUN4QixhQUFhLEdBQWtCLElBQUksQ0FBQztJQUNuQyxZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7SUFDbEQsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO0lBQ25ELFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBb0IsQ0FBQztJQUU3RCxZQUFZLENBQTBCO0lBRXRDLGdDQUFnQyxHQUFpQixJQUFJLENBQUM7SUFDdEQsMEJBQTBCLEdBQWlCLElBQUksQ0FBQztJ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LENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoRCxDQUFDO3VHQWxPVSxpQ0FBaUM7MkZBQWpDLGlDQUFpQyxtWEM3QjlDLDhwQkFnQkE7O1NEYWEsaUNBQWlDOzJGQUFqQyxpQ0FBaUM7a0JBTDdDLFNBQVM7K0JBQ0UsNkJBQTZCO2lJQU85QixLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDSSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFFUCxZQUFZO3NCQURYLFlBQVk7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5wdXQsXHJcbiAgQ29udGVudENoaWxkLFxyXG4gIFRlbXBsYXRlUmVmLFxyXG4gIEVsZW1lbnRSZWYsXHJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQge1xyXG4gIEJhY2tncm91bmRTdHlsZSxcclxuICBDb25maWd1cmF0aW9uLFxyXG4gIE11bHRpbGV2ZWxOb2RlLFxyXG4gIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSxcclxufSBmcm9tIFwiLi9hcHAubW9kZWxcIjtcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSBcIi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ29tbW9uVXRpbHMgfSBmcm9tIFwiLi9jb21tb24tdXRpbHNcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcIm5nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudVwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCIuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuY3NzXCJdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95XHJcbntcclxuICBASW5wdXQoKSBpdGVtczogTXVsdGlsZXZlbE5vZGVbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRMYWJlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGU+KCk7XHJcbiAgQE91dHB1dCgpIG1lbnVJc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZVtdPigpO1xyXG4gIEBDb250ZW50Q2hpbGQoXCJsaXN0VGVtcGxhdGVcIiwgeyBzdGF0aWM6IHRydWUgfSlcclxuICBsaXN0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xyXG5cclxuICBleHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICBzZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGUgPSBudWxsO1xyXG5cclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxyXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcclxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZSxcclxuICAgIHVzZURpdmlkZXJzOiB0cnVlLFxyXG4gICAgcnRsTGF5b3V0OiBmYWxzZSxcclxuICAgIGN1c3RvbVRlbXBsYXRlOiBmYWxzZSxcclxuICB9O1xyXG4gIGlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgaXNJbnZhbGlkRGF0YSA9IHRydWU7XHJcbiAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPVxyXG4gICAgRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkge1xyXG4gICAgLy8gTk9PUFxyXG4gIH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xyXG4gICAgdGhpcy5pbml0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcclxuICAgIHRoaXMuaW5pdFNlbGVjdGVkTWVudUlEKCk7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkRGF0YSkge1xyXG4gICAgICB0aGlzLm1lbnVJc1JlYWR5LmVtaXQodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KHRoaXMuY29uZmlndXJhdGlvbikgJiZcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTChldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwodGhpcy5yb3V0ZXIudXJsKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwoXHJcbiAgICAgIHRoaXMuaXRlbXMsXHJcbiAgICAgIHVybFxyXG4gICAgKTtcclxuICAgIGlmIChcclxuICAgICAgZm91bmROb2RlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShmb3VuZE5vZGUubGluaylcclxuICAgICAgLy8gJiYgIWZvdW5kTm9kZS5kaXNhYmxlZCAvLyBQcmV2ZW50IHJvdXRlIHJlZGlyZWN0aW9uIGZvciBkaXNhYmxlZCBtZW51XHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IGZvdW5kTm9kZTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChmb3VuZE5vZGUuZG9udEVtaXQpICYmXHJcbiAgICAgICAgIWZvdW5kTm9kZS5kb250RW1pdFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja1ZhbGlkRGF0YSgpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgIChBcnJheS5pc0FycmF5KHRoaXMuaXRlbXMpICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKVxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKChuKSA9PiAhbi5oaWRkZW4pO1xyXG4gICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XHJcbiAgICB0aGlzLmlzSW52YWxpZERhdGEgPSBmYWxzZTtcclxuICB9XHJcbiAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkIHtcclxuICAgIGlmIChDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uKSkge1xyXG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb247XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLnBhZGRpbmdBdFN0YXJ0KSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcucGFkZGluZ0F0U3RhcnQgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShjb25maWcubGlzdEJhY2tncm91bmRDb2xvcikpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcubGlzdEJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KGNvbmZpZy5mb250Q29sb3IpKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkoY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcikpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUpICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QpICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSBcImJvb2xlYW5cIlxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0KSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy51c2VEaXZpZGVycykgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLnVzZURpdmlkZXJzID09PSBcImJvb2xlYW5cIlxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcudXNlRGl2aWRlcnMgPSBjb25maWcudXNlRGl2aWRlcnM7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKFxyXG4gICAgICAgICFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcucnRsTGF5b3V0KSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcucnRsTGF5b3V0ID09PSBcImJvb2xlYW5cIlxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0ID0gY29uZmlnLnJ0bExheW91dDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5jdXN0b21UZW1wbGF0ZSkgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmN1c3RvbVRlbXBsYXRlID09PSBcImJvb2xlYW5cIlxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuY3VzdG9tVGVtcGxhdGUgPSBjb25maWcuY3VzdG9tVGVtcGxhdGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY2hlY2tWYWxpZERhdGEoKTtcclxuICB9XHJcbiAgaW5pdEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5leHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbiA9XHJcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmV4cGFuZENvbGxhcHNlU3RhdHVzJC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKGV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0pID0+IHtcclxuICAgICAgICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gZXhwYW5kQ29sbGFwc2VTdGF0dXNcclxuICAgICAgICAgICAgPyBleHBhbmRDb2xsYXBzZVN0YXR1c1xyXG4gICAgICAgICAgICA6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgfVxyXG4gIGluaXRTZWxlY3RlZE1lbnVJRCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0TWVudUJ5SURTdWJzY3JpcHRpb24gPVxyXG4gICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5zZWxlY3RlZE1lbnVJRCQuc3Vic2NyaWJlKFxyXG4gICAgICAgIChzZWxlY3RlZE1lbnVJRDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBpZiAoc2VsZWN0ZWRNZW51SUQpIHtcclxuICAgICAgICAgICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5SWQoXHJcbiAgICAgICAgICAgICAgdGhpcy5pdGVtcyxcclxuICAgICAgICAgICAgICBzZWxlY3RlZE1lbnVJRFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoZm91bmROb2RlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gIH1cclxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuaXNJbnZhbGlkQ29uZmlnICYmXHJcbiAgICAgICFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSlcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgIH1cclxuICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgfVxyXG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChcclxuICAgICAgICAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KFxyXG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvclxyXG4gICAgICAgIClcclxuICAgICAgKSB7XHJcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0eWxlcztcclxuICAgIH1cclxuICB9XHJcbiAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dDtcclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShldmVudDogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcclxuICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XHJcbiAgICB0aGlzLmN1cnJlbnROb2RlID0gZXZlbnQ7XHJcbiAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGV2ZW50LmRvbnRFbWl0KSAmJiBldmVudC5kb250RW1pdCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIGV2ZW50Lml0ZW1zID09PSB1bmRlZmluZWQgJiZcclxuICAgICAgKCFldmVudC5vblNlbGVjdGVkIHx8IHR5cGVvZiBldmVudC5vblNlbGVjdGVkICE9PSBcImZ1bmN0aW9uXCIpXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGFiZWwuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy5leHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5zZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZSgpXCIgW25nU3R5bGVdPVwiZ2V0R2xvYmFsU3R5bGUoKVwiICpuZ0lmPSchaXNJbnZhbGlkRGF0YSAmJiBpdGVtcy5sZW5ndGggIT09IDAnIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIj5cclxuICA8bWF0LWxpc3Q+XHJcbiAgICA8bmctbGlzdC1pdGVtXHJcbiAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIGl0ZW1zIHwga2V5dmFsdWU6IG11bHRpbGV2ZWxNZW51U2VydmljZS5rdkR1bW15Q29tcGFyZXJGblwiXHJcbiAgICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWcnXHJcbiAgICAgIFtub2RlXT0nbm9kZS52YWx1ZSdcclxuICAgICAgW2xldmVsXT1cIjFcIlxyXG4gICAgICBbc3VibWVudUxldmVsXT1cIm5vZGUua2V5XCJcclxuICAgICAgW3NlbGVjdGVkTm9kZV09J2N1cnJlbnROb2RlJ1xyXG4gICAgICBbbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzXT0nbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzJ1xyXG4gICAgICAoc2VsZWN0ZWRJdGVtKT1cInNlbGVjdGVkTGlzdEl0ZW0oJGV2ZW50KVwiXHJcbiAgICAgIFtsaXN0VGVtcGxhdGVdID0gXCJsaXN0VGVtcGxhdGVcIlxyXG4gICAgPlxyXG4gICAgPC9uZy1saXN0LWl0ZW0+XHJcbiAgPC9tYXQtbGlzdD5cclxuPC9kaXY+XHJcbiJdfQ==