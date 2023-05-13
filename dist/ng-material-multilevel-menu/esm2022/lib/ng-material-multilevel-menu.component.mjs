import { Component, Output, EventEmitter, Input, ContentChild, TemplateRef, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgMaterialMultilevelMenuComponent, selector: "ng-material-multilevel-menu", inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, queries: [{ propertyName: "listTemplate", first: true, predicate: ["listTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div\r\n    [ngClass]=\"getClassName()\"\r\n    [ngStyle]=\"getGlobalStyle()\"\r\n    *ngIf='!isInvalidData && items.length !== 0'\r\n    [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <mat-list>\r\n        <ng-list-item\r\n            *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfig'\r\n            [node]='node.value'\r\n            [level]=\"1\"\r\n            [submenuLevel]=\"node.key\"\r\n            [selectedNode]='currentNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i6.ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }] });
}
export { NgMaterialMultilevelMenuComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-material-multilevel-menu', template: "<div\r\n    [ngClass]=\"getClassName()\"\r\n    [ngStyle]=\"getGlobalStyle()\"\r\n    *ngIf='!isInvalidData && items.length !== 0'\r\n    [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <mat-list>\r\n        <ng-list-item\r\n            *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n            [nodeConfiguration]='nodeConfig'\r\n            [node]='node.value'\r\n            [level]=\"1\"\r\n            [submenuLevel]=\"node.key\"\r\n            [selectedNode]='currentNode'\r\n            [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n            (selectedItem)=\"selectedListItem($event)\"\r\n            [listTemplate]=\"listTemplate\">\r\n        </ng-list-item>\r\n    </mat-list>\r\n</div>\r\n", styles: [".amml-container .mat-mdc-list.mat-mdc-list-base.mdc-list{padding:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjL2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFJVCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFDTCxZQUFZLEVBQ1osV0FBVyxHQUVkLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFpQyx3QkFBd0IsRUFBYSxNQUFNLGFBQWEsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFFN0MsTUFLYSxpQ0FBaUM7SUFxQ3RCO0lBQXVCO0lBcENsQyxLQUFLLENBQW1CO0lBQ3hCLGFBQWEsR0FBa0IsSUFBSSxDQUFDO0lBQ25DLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztJQUNsRCxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7SUFDbkQsV0FBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO0lBQ2IsWUFBWSxDQUEwQjtJQUVyRSxz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LFlBQW9CLEVBQUUsS0FBYTtRQUMvRCxJQUFJLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMxQyxDQUFDO0lBRU8sd0JBQXdCLENBQUMsWUFBb0IsRUFBRSxLQUFjO1FBQ2pFLElBQUksV0FBVyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNwRSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMxQyxDQUFDO3VHQTlMUSxpQ0FBaUM7MkZBQWpDLGlDQUFpQyxtWEN4QjlDLGt2QkFtQkE7O1NES2EsaUNBQWlDOzJGQUFqQyxpQ0FBaUM7a0JBTDdDLFNBQVM7K0JBQ0ksNkJBQTZCO2lJQUs5QixLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDSSxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDeUMsWUFBWTtzQkFBM0QsWUFBWTt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uSW5pdCxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE91dHB1dCxcclxuICAgIEV2ZW50RW1pdHRlcixcclxuICAgIElucHV0LFxyXG4gICAgQ29udGVudENoaWxkLFxyXG4gICAgVGVtcGxhdGVSZWYsXHJcbiAgICBFbGVtZW50UmVmLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGUsIEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSwgTGlzdFN0eWxlIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcbmltcG9ydCB7IENvbW1vblV0aWxzIH0gZnJvbSAnLi9jb21tb24tdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAgIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZVtdO1xyXG4gICAgQElucHV0KCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcclxuICAgIEBPdXRwdXQoKSBzZWxlY3RlZExhYmVsID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcclxuICAgIEBPdXRwdXQoKSBtZW51SXNSZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVbXT4oKTtcclxuICAgIEBDb250ZW50Q2hpbGQoJ2xpc3RUZW1wbGF0ZScsIHsgc3RhdGljOiB0cnVlIH0pIGxpc3RUZW1wbGF0ZTogVGVtcGxhdGVSZWY8RWxlbWVudFJlZj47XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBzdHJpbmdDb25maWdQcm9wZXJ0aWVzID0gW1xyXG4gICAgICAgICdjbGFzc25hbWUnLFxyXG4gICAgICAgICdiYWNrZ3JvdW5kQ29sb3InLFxyXG4gICAgICAgICdsaXN0QmFja2dyb3VuZENvbG9yJyxcclxuICAgICAgICAnZm9udENvbG9yJyxcclxuICAgICAgICAnc2VsZWN0ZWRMaXN0Rm9udENvbG9yJyxcclxuICAgIF07XHJcblxyXG4gICAgcHJpdmF0ZSBkZXN0cm95ZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGUgPSBudWxsO1xyXG5cclxuICAgIG5vZGVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICAgICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICAgICAgbGlzdEJhY2tncm91bmRDb2xvcjogbnVsbCxcclxuICAgICAgICBmb250Q29sb3I6IG51bGwsXHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgICAgIGludGVyZmFjZVdpdGhSb3V0ZTogbnVsbCxcclxuICAgICAgICBjb2xsYXBzZU9uU2VsZWN0OiBudWxsLFxyXG4gICAgICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZSxcclxuICAgICAgICB1c2VEaXZpZGVyczogdHJ1ZSxcclxuICAgICAgICBydGxMYXlvdXQ6IGZhbHNlLFxyXG4gICAgICAgIGN1c3RvbVRlbXBsYXRlOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIGlzSW52YWxpZERhdGEgPSB0cnVlO1xyXG4gICAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2UpIHt9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVUb1JvdXRlckV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuY2hlY2tDb25maWdBbmREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5pbml0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcclxuICAgICAgICB0aGlzLmluaXRTZWxlY3RlZE1lbnVJRCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNJbnZhbGlkRGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVJc1JlYWR5LmVtaXQodGhpcy5pdGVtcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95ZWQkLmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3Vic2NyaWJlVG9Sb3V0ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbj8uaW50ZXJmYWNlV2l0aFJvdXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHMucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTChldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xyXG5cclxuICAgICAgICBpZiAoIWZvdW5kTm9kZSB8fCBDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkoZm91bmROb2RlLmxpbmspKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XHJcbiAgICAgICAgaWYgKENvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGZvdW5kTm9kZS5kb250RW1pdCkgfHwgZm91bmROb2RlLmRvbnRFbWl0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrQ29uZmlnQW5kRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcclxuICAgICAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tWYWxpZERhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMgPT09IHVuZGVmaW5lZCB8fCAoQXJyYXkuaXNBcnJheSh0aGlzLml0ZW1zKSAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcigoaXRlbSkgPT4gIWl0ZW0uaGlkZGVuKTtcclxuICAgICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcclxuICAgICAgICB0aGlzLmlzSW52YWxpZERhdGEgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb247XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgT2JqZWN0LmtleXMoY29uZmlnKSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0cmluZ0NvbmZpZ1Byb3BlcnRpZXMuc29tZSgoaXRlbSkgPT4gaXRlbSA9PT0gcHJvcGVydHkpXHJcbiAgICAgICAgICAgICAgICA/IHRoaXMuc2V0U3RyaW5nQ29uZmlnUHJvcGVydHkocHJvcGVydHksIGNvbmZpZ1twcm9wZXJ0eV0pXHJcbiAgICAgICAgICAgICAgICA6IHRoaXMuc2V0Qm9vbGVhbkNvbmZpZ1Byb3BlcnR5KHByb3BlcnR5LCBjb25maWdbcHJvcGVydHldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmV4cGFuZENvbGxhcHNlU3RhdHVzJC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKS5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBuZXh0OiAoZXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBleHBhbmRDb2xsYXBzZVN0YXR1cyA/IGV4cGFuZENvbGxhcHNlU3RhdHVzIDogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRTZWxlY3RlZE1lbnVJRCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5zZWxlY3RlZE1lbnVJRCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQkKSkuc3Vic2NyaWJlKChzZWxlY3RlZE1lbnVJRDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE1lbnVJRCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5SWQodGhpcy5pdGVtcywgc2VsZWN0ZWRNZW51SUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0ludmFsaWRDb25maWcgfHwgQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUpXHJcbiAgICAgICAgICAgID8gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FXHJcbiAgICAgICAgICAgIDogYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHbG9iYWxTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZyB8fCBDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yO1xyXG5cclxuICAgICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2RlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcclxuICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gZXZlbnQ7XHJcbiAgICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChldmVudC5kb250RW1pdCkgJiYgZXZlbnQuZG9udEVtaXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXZlbnQuaXRlbXMgPT09IHVuZGVmaW5lZCAmJiAoIWV2ZW50Lm9uU2VsZWN0ZWQgfHwgdHlwZW9mIGV2ZW50Lm9uU2VsZWN0ZWQgIT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgICAgID8gdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudClcclxuICAgICAgICAgICAgOiB0aGlzLnNlbGVjdGVkTGFiZWwuZW1pdChldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRTdHJpbmdDb25maWdQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZ1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRCb29sZWFuQ29uZmlnUHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKENvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgIT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGVDb25maWdbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcbiIsIjxkaXZcclxuICAgIFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZSgpXCJcclxuICAgIFtuZ1N0eWxlXT1cImdldEdsb2JhbFN0eWxlKClcIlxyXG4gICAgKm5nSWY9JyFpc0ludmFsaWREYXRhICYmIGl0ZW1zLmxlbmd0aCAhPT0gMCdcclxuICAgIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIj5cclxuICAgIDxtYXQtbGlzdD5cclxuICAgICAgICA8bmctbGlzdC1pdGVtXHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIGl0ZW1zIHwga2V5dmFsdWU6IG11bHRpbGV2ZWxNZW51U2VydmljZS5rdkR1bW15Q29tcGFyZXJGblwiXHJcbiAgICAgICAgICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWcnXHJcbiAgICAgICAgICAgIFtub2RlXT0nbm9kZS52YWx1ZSdcclxuICAgICAgICAgICAgW2xldmVsXT1cIjFcIlxyXG4gICAgICAgICAgICBbc3VibWVudUxldmVsXT1cIm5vZGUua2V5XCJcclxuICAgICAgICAgICAgW3NlbGVjdGVkTm9kZV09J2N1cnJlbnROb2RlJ1xyXG4gICAgICAgICAgICBbbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzXT0nbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzJ1xyXG4gICAgICAgICAgICAoc2VsZWN0ZWRJdGVtKT1cInNlbGVjdGVkTGlzdEl0ZW0oJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIFtsaXN0VGVtcGxhdGVdPVwibGlzdFRlbXBsYXRlXCI+XHJcbiAgICAgICAgPC9uZy1saXN0LWl0ZW0+XHJcbiAgICA8L21hdC1saXN0PlxyXG48L2Rpdj5cclxuIl19