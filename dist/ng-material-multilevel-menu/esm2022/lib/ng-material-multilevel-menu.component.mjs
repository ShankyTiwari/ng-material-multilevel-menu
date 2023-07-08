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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjL2xpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUEyQixNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFrRCx3QkFBd0IsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7Ozs7QUFPM0MsTUFBTSxPQUFPLGlDQUFpQztJQTRCNUMsWUFBb0IsTUFBYyxFQUNmLHFCQUE0QztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQTNCdEQsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDbEQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUNuRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBRzdELHFDQUFnQyxHQUFpQixJQUFJLENBQUM7UUFDdEQsK0JBQTBCLEdBQWlCLElBQUksQ0FBQztRQUNoRCxnQkFBVyxH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VSxpQ0FBaUM7a0dBQWpDLGlDQUFpQyxtWENiOUMsOG5CQWdCQTs7MkZESGEsaUNBQWlDO2tCQUw3QyxTQUFTOytCQUNFLDZCQUE2QjtpSUFLOUIsS0FBSztzQkFBYixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0ksWUFBWTtzQkFBckIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ3VDLFlBQVk7c0JBQXpELFlBQVk7dUJBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kU3R5bGUsIENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHtDb21tb25VdGlsc30gZnJvbSAnLi9jb21tb24tdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZVtdO1xuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGU+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZExhYmVsID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZT4oKTtcbiAgQE91dHB1dCgpIG1lbnVJc1JlYWR5ID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZVtdPigpO1xuICBAQ29udGVudENoaWxkKCdsaXN0VGVtcGxhdGUnLCB7c3RhdGljOiB0cnVlfSkgbGlzdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxFbGVtZW50UmVmPjtcblxuICBleHBhbmRDb2xsYXBzZVN0YXR1c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgc2VsZWN0TWVudUJ5SURTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIGN1cnJlbnROb2RlOiBNdWx0aWxldmVsTm9kZSA9IG51bGw7XG5cbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgIGZvbnRDb2xvcjogbnVsbCxcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxuICAgIGNvbGxhcHNlT25TZWxlY3Q6IG51bGwsXG4gICAgaGlnaGxpZ2h0T25TZWxlY3Q6IGZhbHNlLFxuICAgIHVzZURpdmlkZXJzOiB0cnVlLFxuICAgIHJ0bExheW91dDogZmFsc2UsXG4gICAgY3VzdG9tVGVtcGxhdGU6IGZhbHNlXG4gIH07XG4gIGlzSW52YWxpZENvbmZpZyA9IHRydWU7XG4gIGlzSW52YWxpZERhdGEgPSB0cnVlO1xuICBub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZSkge1xuICAgIC8vIE5PT1BcbiAgfVxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcbiAgICB0aGlzLmluaXRFeHBhbmRDb2xsYXBzZVN0YXR1cygpO1xuICAgIHRoaXMuaW5pdFNlbGVjdGVkTWVudUlEKCk7XG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZERhdGEpIHtcbiAgICAgIHRoaXMubWVudUlzUmVhZHkuZW1pdCh0aGlzLml0ZW1zKTtcbiAgICB9XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkodGhpcy5jb25maWd1cmF0aW9uKSAmJlxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlKSB7XG4gICAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTChldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xuICAgIGlmIChmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCAmJiAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KGZvdW5kTm9kZS5saW5rKVxuICAgICAgLy8gJiYgIWZvdW5kTm9kZS5kaXNhYmxlZCAvLyBQcmV2ZW50IHJvdXRlIHJlZGlyZWN0aW9uIGZvciBkaXNhYmxlZCBtZW51XG4gICAgKSB7XG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChmb3VuZE5vZGUuZG9udEVtaXQpICYmICFmb3VuZE5vZGUuZG9udEVtaXQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoZWNrVmFsaWREYXRhKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLml0ZW1zID09PSB1bmRlZmluZWQgfHwgKEFycmF5LmlzQXJyYXkodGhpcy5pdGVtcykgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDApKSB7XG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XG4gICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XG4gICAgdGhpcy5pc0ludmFsaWREYXRhID0gZmFsc2U7XG4gIH1cbiAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkIHtcbiAgICBpZiAoQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KHRoaXMuY29uZmlndXJhdGlvbikpIHtcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLnBhZGRpbmdBdFN0YXJ0KSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnBhZGRpbmdBdFN0YXJ0ID0gY29uZmlnLnBhZGRpbmdBdFN0YXJ0O1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZE9yRW1wdHkoY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IpKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eShjb25maWcuZm9udENvbG9yKSkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuZm9udENvbG9yID0gY29uZmlnLmZvbnRDb2xvcjtcbiAgICAgIH1cbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IpKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlKSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcuY29sbGFwc2VPblNlbGVjdCkgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPSBjb25maWcuY29sbGFwc2VPblNlbGVjdDtcbiAgICAgIH1cbiAgICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0KSAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xuICAgICAgfVxuICAgICAgaWYgKCFDb21tb25VdGlscy5pc051bGxPclVuZGVmaW5lZChjb25maWcudXNlRGl2aWRlcnMpICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcudXNlRGl2aWRlcnMgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcudXNlRGl2aWRlcnMgPSBjb25maWcudXNlRGl2aWRlcnM7XG4gICAgICB9XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5ydGxMYXlvdXQpICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcucnRsTGF5b3V0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dCA9IGNvbmZpZy5ydGxMYXlvdXQ7XG4gICAgICB9XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkKGNvbmZpZy5jdXN0b21UZW1wbGF0ZSkgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jdXN0b21UZW1wbGF0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jdXN0b21UZW1wbGF0ZSA9IGNvbmZpZy5jdXN0b21UZW1wbGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jaGVja1ZhbGlkRGF0YSgpO1xuICB9XG4gIGluaXRFeHBhbmRDb2xsYXBzZVN0YXR1cygpOiB2b2lkIHtcbiAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZXhwYW5kQ29sbGFwc2VTdGF0dXMkXG4gICAgICAuc3Vic2NyaWJlKCAoZXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSkgPT4ge1xuICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBleHBhbmRDb2xsYXBzZVN0YXR1cyA/IGV4cGFuZENvbGxhcHNlU3RhdHVzIDogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcbiAgICB9KTtcbiAgfVxuICBpbml0U2VsZWN0ZWRNZW51SUQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbiA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLnNlbGVjdGVkTWVudUlEJC5zdWJzY3JpYmUoIChzZWxlY3RlZE1lbnVJRDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0ZWRNZW51SUQpIHtcbiAgICAgICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5SWQodGhpcy5pdGVtcywgc2VsZWN0ZWRNZW51SUQpO1xuICAgICAgICBpZiAoZm91bmROb2RlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZyAmJiAhQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWRPckVtcHR5KHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUpKSB7XG4gICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcbiAgICB9XG4gICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgfVxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xuICAgIGlmICghdGhpcy5pc0ludmFsaWRDb25maWcpIHtcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcbiAgICAgIH07XG4gICAgICBpZiAoIUNvbW1vblV0aWxzLmlzTnVsbE9yVW5kZWZpbmVkT3JFbXB0eSh0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yKSkge1xuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgfVxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dDtcbiAgfVxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZSk6IHZvaWQge1xuICAgIHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID0gRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XG4gICAgdGhpcy5jdXJyZW50Tm9kZSA9IGV2ZW50O1xuICAgIGlmICghQ29tbW9uVXRpbHMuaXNOdWxsT3JVbmRlZmluZWQoZXZlbnQuZG9udEVtaXQpICYmIGV2ZW50LmRvbnRFbWl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICghZXZlbnQub25TZWxlY3RlZCB8fCB0eXBlb2YgZXZlbnQub25TZWxlY3RlZCAhPT0gJ2Z1bmN0aW9uJykgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZExhYmVsLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8ZGl2IFtuZ0NsYXNzXT1cImdldENsYXNzTmFtZSgpXCIgW25nU3R5bGVdPVwiZ2V0R2xvYmFsU3R5bGUoKVwiICpuZ0lmPSchaXNJbnZhbGlkRGF0YSAmJiBpdGVtcy5sZW5ndGggIT09IDAnIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIj5cbiAgPG1hdC1saXN0PlxuICAgIDxuZy1saXN0LWl0ZW1cbiAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIGl0ZW1zIHwga2V5dmFsdWU6IG11bHRpbGV2ZWxNZW51U2VydmljZS5rdkR1bW15Q29tcGFyZXJGblwiXG4gICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlnJ1xuICAgICAgW25vZGVdPSdub2RlLnZhbHVlJ1xuICAgICAgW2xldmVsXT1cIjFcIlxuICAgICAgW3N1Ym1lbnVMZXZlbF09XCJub2RlLmtleVwiXG4gICAgICBbc2VsZWN0ZWROb2RlXT0nY3VycmVudE5vZGUnXG4gICAgICBbbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzXT0nbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzJ1xuICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIlxuICAgICAgW2xpc3RUZW1wbGF0ZV0gPSBcImxpc3RUZW1wbGF0ZVwiXG4gICAgPlxuICAgIDwvbmctbGlzdC1pdGVtPlxuICA8L21hdC1saXN0PlxuPC9kaXY+XG4iXX0=