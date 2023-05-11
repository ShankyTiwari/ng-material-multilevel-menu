import { Component, Output, EventEmitter, Input, ContentChild, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ExpandCollapseStatusEnum } from './app.model';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
import { CommonUtils } from './common-utils';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgMaterialMultilevelMenuComponent, selector: "ng-material-multilevel-menu", inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, queries: [{ propertyName: "listTemplate", first: true, predicate: ["listTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\"\r\n      [listTemplate] = \"listTemplate\"\r\n    >\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i6.ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }] });
}
export { NgMaterialMultilevelMenuComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-material-multilevel-menu', template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\"\r\n      [listTemplate] = \"listTemplate\"\r\n    >\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
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
                args: ['listTemplate', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjL2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBa0Qsd0JBQXdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRSxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBRTNDLE1BS2EsaUNBQWlDO0lBNEJ4QjtJQUNEO0lBNUJWLEtBQUssQ0FBbUI7SUFDeEIsYUFBYSxHQUFrQixJQUFJLENBQUM7SUFDbkMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFrQixDQUFDO0lBQ2xELGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztJQUNuRCxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7SUFDZixZQUFZLENBQTBCO0lBRXBGLGdDQUFnQyxHQUFpQixJQUFJLENBQUM7SUFDdEQsMEJBQTBCLEdBQWlCLElBQUksQ0FBQztJ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QUFJLENBQUMsZ0NBQWdDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hELENBQUM7dUdBNUtVLGlDQUFpQzsyRkFBakMsaUNBQWlDLG1YQ2I5Qyw4cEJBZ0JBOztTREhhLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQUw3QyxTQUFTOytCQUNFLDZCQUE2QjtpSUFLOUIsS0FBSztzQkFBYixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ3VDLFlBQVk7c0JBQXpELFlBQVk7dUJBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBCYWNrZ3JvdW5kU3R5bGUsIENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuaW1wb3J0IHtDb21tb25VdGlsc30gZnJvbSAnLi9jb21tb24tdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBpdGVtczogTXVsdGlsZXZlbE5vZGVbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRMYWJlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGU+KCk7XHJcbiAgQE91dHB1dCgpIG1lbnVJc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZVtdPigpO1xyXG4gIEBDb250ZW50Q2hpbGQoJ2xpc3RUZW1wbGF0ZScsIHtzdGF0aWM6IHRydWV9KSBsaXN0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xyXG5cclxuICBleHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICBzZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGUgPSBudWxsO1xyXG5cclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxyXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcclxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZSxcclxuICAgIHVzZURpdmlkZXJzOiB0cnVlLFxyXG4gICAgcnRsTGF5b3V0OiBmYWxzZSxcclxuICAgIGN1c3RvbVRlbXBsYXRlOiBmYWxzZVxyXG4gIH07XHJcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICBpc0ludmFsaWREYXRhID0gdHJ1ZTtcclxuICBub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgICAgICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSkge1xyXG4gICAgLy8gTk9PUFxyXG4gIH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xyXG4gICAgdGhpcy5pbml0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcclxuICAgIHRoaXMuaW5pdFNlbGVjdGVkTWVudUlEKCk7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkRGF0YSkge1xyXG4gICAgICB0aGlzLm1lbnVJc1JlYWR5LmVtaXQodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uKSAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGVOb2RlQnlVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xyXG4gICAgaWYgKGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmICFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkoZm91bmROb2RlLmxpbmspXHJcbiAgICAgIC8vICYmICFmb3VuZE5vZGUuZGlzYWJsZWQgLy8gUHJldmVudCByb3V0ZSByZWRpcmVjdGlvbiBmb3IgZGlzYWJsZWQgbWVudVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XHJcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoZm91bmROb2RlLmRvbnRFbWl0KSAmJiAhZm91bmROb2RlLmRvbnRFbWl0KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tWYWxpZERhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IChBcnJheS5pc0FycmF5KHRoaXMuaXRlbXMpICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XHJcbiAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcclxuICAgIHRoaXMuaXNJbnZhbGlkRGF0YSA9IGZhbHNlO1xyXG4gIH1cclxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKENvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eSh0aGlzLmNvbmZpZ3VyYXRpb24pKSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcclxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcucGFkZGluZ0F0U3RhcnQpICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5wYWRkaW5nQXRTdGFydCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnBhZGRpbmdBdFN0YXJ0ID0gY29uZmlnLnBhZGRpbmdBdFN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yKSkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkoY29uZmlnLmZvbnRDb2xvcikpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuZm9udENvbG9yID0gY29uZmlnLmZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yKSkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSkgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9IGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcuY29sbGFwc2VPblNlbGVjdCkgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID0gY29uZmlnLmNvbGxhcHNlT25TZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QpICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLnVzZURpdmlkZXJzKSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcudXNlRGl2aWRlcnMgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy51c2VEaXZpZGVycyA9IGNvbmZpZy51c2VEaXZpZGVycztcclxuICAgICAgfVxyXG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5ydGxMYXlvdXQpICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5ydGxMYXlvdXQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQgPSBjb25maWcucnRsTGF5b3V0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmN1c3RvbVRlbXBsYXRlKSAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuY3VzdG9tVGVtcGxhdGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jdXN0b21UZW1wbGF0ZSA9IGNvbmZpZy5jdXN0b21UZW1wbGF0ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5jaGVja1ZhbGlkRGF0YSgpO1xyXG4gIH1cclxuICBpbml0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZXhwYW5kQ29sbGFwc2VTdGF0dXMkXHJcbiAgICAgIC5zdWJzY3JpYmUoIChleHBhbmRDb2xsYXBzZVN0YXR1czogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtKSA9PiB7XHJcbiAgICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gZXhwYW5kQ29sbGFwc2VTdGF0dXMgPyBleHBhbmRDb2xsYXBzZVN0YXR1cyA6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xyXG4gICAgfSwgKCkgPT4ge1xyXG4gICAgICB0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGluaXRTZWxlY3RlZE1lbnVJRCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0TWVudUJ5SURTdWJzY3JpcHRpb24gPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5zZWxlY3RlZE1lbnVJRCQuc3Vic2NyaWJlKCAoc2VsZWN0ZWRNZW51SUQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoc2VsZWN0ZWRNZW51SUQpIHtcclxuICAgICAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlJZCh0aGlzLml0ZW1zLCBzZWxlY3RlZE1lbnVJRCk7XHJcbiAgICAgICAgaWYgKGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnICYmICFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSkpIHtcclxuICAgICAgcmV0dXJuIGAke0NPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRX0gJHt0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gIH1cclxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xyXG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcikpIHtcclxuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0eWxlcztcclxuICAgIH1cclxuICB9XHJcbiAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dDtcclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShldmVudDogTXVsdGlsZXZlbE5vZGUpOiB2b2lkIHtcclxuICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XHJcbiAgICB0aGlzLmN1cnJlbnROb2RlID0gZXZlbnQ7XHJcbiAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGV2ZW50LmRvbnRFbWl0KSAmJiBldmVudC5kb250RW1pdCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQuaXRlbXMgPT09IHVuZGVmaW5lZCAmJiAoIWV2ZW50Lm9uU2VsZWN0ZWQgfHwgdHlwZW9mIGV2ZW50Lm9uU2VsZWN0ZWQgIT09ICdmdW5jdGlvbicpICkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGV2ZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbC5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnNlbGVjdE1lbnVCeUlEU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9JyFpc0ludmFsaWREYXRhICYmIGl0ZW1zLmxlbmd0aCAhPT0gMCcgW2Rpcl09XCJpc1J0bExheW91dCgpID8gJ3J0bCcgOiAnbHRyJ1wiPlxyXG4gIDxtYXQtbGlzdD5cclxuICAgIDxuZy1saXN0LWl0ZW1cclxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXMgfCBrZXl2YWx1ZTogbXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmt2RHVtbXlDb21wYXJlckZuXCJcclxuICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZydcclxuICAgICAgW25vZGVdPSdub2RlLnZhbHVlJ1xyXG4gICAgICBbbGV2ZWxdPVwiMVwiXHJcbiAgICAgIFtzdWJtZW51TGV2ZWxdPVwibm9kZS5rZXlcIlxyXG4gICAgICBbc2VsZWN0ZWROb2RlXT0nY3VycmVudE5vZGUnXHJcbiAgICAgIFtub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXNdPSdub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMnXHJcbiAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCJcclxuICAgICAgW2xpc3RUZW1wbGF0ZV0gPSBcImxpc3RUZW1wbGF0ZVwiXHJcbiAgICA+XHJcbiAgICA8L25nLWxpc3QtaXRlbT5cclxuICA8L21hdC1saXN0PlxyXG48L2Rpdj5cclxuIl19