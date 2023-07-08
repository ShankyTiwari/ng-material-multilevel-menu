import { Component, Output, EventEmitter, Input, ContentChild } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { ExpandCollapseStatusEnum } from './app.model';
import { CONSTANT } from './constants';
import { CommonUtils } from './common-utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./multilevel-menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/material/list";
import * as i6 from "./list-item/list-item.component";
export class NgMaterialMultilevelMenuComponent {
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
        if (!this.isInvalidData) {
            this.menuIsReady.emit(this.items);
        }
    }
    ngOnInit() {
        this.initSelectedMenuID();
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
            this.currentNode = { node: foundNode };
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
        this.currentNode = { node: event };
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, deps: [{ token: i1.Router }, { token: i2.MultilevelMenuService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: NgMaterialMultilevelMenuComponent, selector: "ng-material-multilevel-menu", inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel", menuIsReady: "menuIsReady" }, queries: [{ propertyName: "listTemplate", first: true, predicate: ["listTemplate"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate] = \"listTemplate\"\n    >\n    </ng-list-item>\n  </mat-list>\n</div>\n", styles: [".amml-container .mat-list-base{padding-top:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"], dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i4.Dir, selector: "[dir]", inputs: ["dir"], outputs: ["dirChange"], exportAs: ["dir"] }, { kind: "component", type: i5.MatList, selector: "mat-list", exportAs: ["matList"] }, { kind: "component", type: i6.ListItemComponent, selector: "ng-list-item", inputs: ["node", "level", "submenuLevel", "selectedNode", "nodeConfiguration", "nodeExpandCollapseStatus", "listTemplate"], outputs: ["selectedItem"] }, { kind: "pipe", type: i3.KeyValuePipe, name: "keyvalue" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng-material-multilevel-menu', template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate] = \"listTemplate\"\n    >\n    </ng-list-item>\n  </mat-list>\n</div>\n", styles: [".amml-container .mat-list-base{padding-top:unset}.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjL2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFrRCx3QkFBd0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFPM0MsTUFBTSxPQUFPLGlDQUFpQztJQTRCNUMsWUFBb0IsTUFBYyxFQUNmLHFCQUE0QztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQTNCdEQsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDbEQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUNuRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBRzdELHFDQUFnQyxHQUFpQixJQUFJLENBQUM7UUFDdEQsK0JBQTBCLEdBQWlCLElBQUksQ0FBQztRQUNoRCxnQkFBVyxH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QTNLVSxpQ0FBaUM7a0dBQWpDLGlDQUFpQyxtWENiOUMsOG5CQWdCQTs7MkZESGEsaUNBQWlDO2tCQUw3QyxTQUFTOytCQUNFLDZCQUE2QjtpSUFLOUIsS0FBSztzQkFBYixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ3VDLFlBQVk7c0JBQXpELFlBQVk7dUJBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kU3R5bGUsIENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHtDb21tb25VdGlsc30gZnJvbSAnLi9jb21tb24tdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZVtdO1xuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGU+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZExhYmVsID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcbiAgQE91dHB1dCgpIG1lbnVJc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZVtdPigpO1xuICBAQ29udGVudENoaWxkKCdsaXN0VGVtcGxhdGUnLCB7c3RhdGljOiB0cnVlfSkgbGlzdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcblxuICBleHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgc2VsZWN0TWVudUJ5SURTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIGN1cnJlbnROb2RlOiB7IG5vZGU6IE11bHRpbGV2ZWxOb2RlIH0gPSBudWxsO1xuXG4gIG5vZGVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXG4gICAgbGlzdEJhY2tncm91bmRDb2xvcjogbnVsbCxcbiAgICBmb250Q29sb3I6IG51bGwsXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxuICAgIGludGVyZmFjZVdpdGhSb3V0ZTogbnVsbCxcbiAgICBjb2xsYXBzZU9uU2VsZWN0OiBudWxsLFxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZSxcbiAgICB1c2VEaXZpZGVyczogdHJ1ZSxcbiAgICBydGxMYXlvdXQ6IGZhbHNlLFxuICAgIGN1c3RvbVRlbXBsYXRlOiBmYWxzZVxuICB9O1xuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xuICBpc0ludmFsaWREYXRhID0gdHJ1ZTtcbiAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgICAgICAgICBwdWJsaWMgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2UpIHtcbiAgICAvLyBOT09QXG4gIH1cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5kZXRlY3RJbnZhbGlkQ29uZmlnKCk7XG4gICAgdGhpcy5pbml0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkRGF0YSkge1xuICAgICAgdGhpcy5tZW51SXNSZWFkeS5lbWl0KHRoaXMuaXRlbXMpO1xuICAgIH1cbiAgfVxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRTZWxlY3RlZE1lbnVJRCgpO1xuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KHRoaXMuY29uZmlndXJhdGlvbikgJiZcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSkge1xuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xuICAgIH1cbiAgfVxuICB1cGRhdGVOb2RlQnlVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcbiAgICBpZiAoZm91bmROb2RlICE9PSB1bmRlZmluZWQgJiYgIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShmb3VuZE5vZGUubGluaylcbiAgICAgIC8vICYmICFmb3VuZE5vZGUuZGlzYWJsZWQgLy8gUHJldmVudCByb3V0ZSByZWRpcmVjdGlvbiBmb3IgZGlzYWJsZWQgbWVudVxuICAgICkge1xuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IHsgbm9kZTogZm91bmROb2RlfTtcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoZm91bmROb2RlLmRvbnRFbWl0KSAmJiAhZm91bmROb2RlLmRvbnRFbWl0KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjaGVja1ZhbGlkRGF0YSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IChBcnJheS5pc0FycmF5KHRoaXMuaXRlbXMpICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSkge1xuICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pO1xuICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xuICAgIHRoaXMuaXNJbnZhbGlkRGF0YSA9IGZhbHNlO1xuICB9XG4gIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZCB7XG4gICAgaWYgKENvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eSh0aGlzLmNvbmZpZ3VyYXRpb24pKSB7XG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5wYWRkaW5nQXRTdGFydCkgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5wYWRkaW5nQXRTdGFydCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcbiAgICAgIH1cbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yKSkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcubGlzdEJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkoY29uZmlnLmZvbnRDb2xvcikpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yKSkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcbiAgICAgIH1cbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSkgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcbiAgICAgIH1cbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QpICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcuY29sbGFwc2VPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID0gY29uZmlnLmNvbGxhcHNlT25TZWxlY3Q7XG4gICAgICB9XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCkgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcbiAgICAgIH1cbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLnVzZURpdmlkZXJzKSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLnVzZURpdmlkZXJzID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnVzZURpdmlkZXJzID0gY29uZmlnLnVzZURpdmlkZXJzO1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcucnRsTGF5b3V0KSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLnJ0bExheW91dCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQgPSBjb25maWcucnRsTGF5b3V0O1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcuY3VzdG9tVGVtcGxhdGUpICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcuY3VzdG9tVGVtcGxhdGUgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuY3VzdG9tVGVtcGxhdGUgPSBjb25maWcuY3VzdG9tVGVtcGxhdGU7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2hlY2tWYWxpZERhdGEoKTtcbiAgfVxuICBpbml0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XG4gICAgdGhpcy5leHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbiA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmV4cGFuZENvbGxhcHNlU3RhdHVzJFxuICAgICAgLnN1YnNjcmliZSggKGV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0pID0+IHtcbiAgICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gZXhwYW5kQ29sbGFwc2VTdGF0dXMgPyBleHBhbmRDb2xsYXBzZVN0YXR1cyA6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xuICAgIH0sICgpID0+IHtcbiAgICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XG4gICAgfSk7XG4gIH1cbiAgaW5pdFNlbGVjdGVkTWVudUlEKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0TWVudUJ5SURTdWJzY3JpcHRpb24gPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5zZWxlY3RlZE1lbnVJRCQuc3Vic2NyaWJlKCAoc2VsZWN0ZWRNZW51SUQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHNlbGVjdGVkTWVudUlEKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeUlkKHRoaXMuaXRlbXMsIHNlbGVjdGVkTWVudUlEKTtcbiAgICAgICAgaWYgKGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnICYmICFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSkpIHtcbiAgICAgIHJldHVybiBgJHtDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUV9ICR7dGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZX1gO1xuICAgIH1cbiAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xuICB9XG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxuICAgICAgfTtcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IpKSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICB9XG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0O1xuICB9XG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2RlKTogdm9pZCB7XG4gICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcbiAgICB0aGlzLmN1cnJlbnROb2RlID0geyBub2RlOiBldmVudCB9O1xuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnQuZG9udEVtaXQpICYmIGV2ZW50LmRvbnRFbWl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICghZXZlbnQub25TZWxlY3RlZCB8fCB0eXBlb2YgZXZlbnQub25TZWxlY3RlZCAhPT0gJ2Z1bmN0aW9uJykgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZExhYmVsLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZSgpXCIgW25nU3R5bGVdPVwiZ2V0R2xvYmFsU3R5bGUoKVwiICpuZ0lmPSchaXNJbnZhbGlkRGF0YSAmJiBpdGVtcy5sZW5ndGggIT09IDAnIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIj5cbiAgPG1hdC1saXN0PlxuICAgIDxuZy1saXN0LWl0ZW1cbiAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIGl0ZW1zIHwga2V5dmFsdWU6IG11bHRpbGV2ZWxNZW51U2VydmljZS5rdkR1bW15Q29tcGFyZXJGblwiXG4gICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlnJ1xuICAgICAgW25vZGVdPSdub2RlLnZhbHVlJ1xuICAgICAgW2xldmVsXT1cIjFcIlxuICAgICAgW3N1Ym1lbnVMZXZlbF09XCJub2RlLmtleVwiXG4gICAgICBbc2VsZWN0ZWROb2RlXT0nY3VycmVudE5vZGUnXG4gICAgICBbbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzXT0nbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzJ1xuICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIlxuICAgICAgW2xpc3RUZW1wbGF0ZV0gPSBcImxpc3RUZW1wbGF0ZVwiXG4gICAgPlxuICAgIDwvbmctbGlzdC1pdGVtPlxuICA8L21hdC1saXN0PlxuPC9kaXY+XG4iXX0=