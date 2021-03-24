import { Component, Output, EventEmitter, Input, ContentChild, TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ExpandCollapseStatusEnum } from './app.model';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
export class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.selectedItem = new EventEmitter();
        this.selectedLabel = new EventEmitter();
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
            customTemplate: false,
        };
        this.isInvalidConfig = true;
        this.isInvalidData = true;
        this.nodeExpandCollapseStatus = ExpandCollapseStatusEnum.neutral;
    }
    ngOnChanges() {
        this.detectInvalidConfig();
        this.initExpandCollapseStatus();
        this.initSelectedMenuID();
    }
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
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
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            if (foundNode.dontEmit !== undefined && foundNode.dontEmit !== null && !foundNode.dontEmit) {
                this.selectedListItem(foundNode);
            }
        }
    }
    checkValidData() {
        if (this.items === undefined || (Array.isArray(this.items) && this.items.length === 0)) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
            this.isInvalidData = false;
        }
    }
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            const config = this.configuration;
            if (config.paddingAtStart !== undefined && config.paddingAtStart !== null && typeof config.paddingAtStart === 'boolean') {
                this.nodeConfig.paddingAtStart = config.paddingAtStart;
            }
            if (config.listBackgroundColor !== '' &&
                config.listBackgroundColor !== null &&
                config.listBackgroundColor !== undefined) {
                this.nodeConfig.listBackgroundColor = config.listBackgroundColor;
            }
            if (config.fontColor !== '' &&
                config.fontColor !== null &&
                config.fontColor !== undefined) {
                this.nodeConfig.fontColor = config.fontColor;
            }
            if (config.selectedListFontColor !== '' &&
                config.selectedListFontColor !== null &&
                config.selectedListFontColor !== undefined) {
                this.nodeConfig.selectedListFontColor = config.selectedListFontColor;
            }
            if (config.interfaceWithRoute !== null &&
                config.interfaceWithRoute !== undefined &&
                typeof config.interfaceWithRoute === 'boolean') {
                this.nodeConfig.interfaceWithRoute = config.interfaceWithRoute;
            }
            if (config.collapseOnSelect !== null &&
                config.collapseOnSelect !== undefined &&
                typeof config.collapseOnSelect === 'boolean') {
                this.nodeConfig.collapseOnSelect = config.collapseOnSelect;
            }
            if (config.highlightOnSelect !== null &&
                config.highlightOnSelect !== undefined &&
                typeof config.highlightOnSelect === 'boolean') {
                this.nodeConfig.highlightOnSelect = config.highlightOnSelect;
            }
            if (config.useDividers !== null &&
                config.useDividers !== undefined &&
                typeof config.useDividers === 'boolean') {
                this.nodeConfig.useDividers = config.useDividers;
            }
            if (config.rtlLayout !== null &&
                config.rtlLayout !== undefined &&
                typeof config.rtlLayout === 'boolean') {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
            if (config.customTemplate !== null &&
                config.customTemplate !== undefined &&
                typeof config.customTemplate === 'boolean') {
                this.nodeConfig.customTemplate = config.customTemplate;
            }
        }
        this.checkValidData();
    }
    initExpandCollapseStatus() {
        this.expandCollapseStatusSubscription = this.multilevelMenuService.expandCollapseStatus$.subscribe((expandCollapseStatus) => {
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
        if (this.isInvalidConfig) {
            return CONSTANT.DEFAULT_CLASS_NAME;
        }
        else {
            if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
            }
            else {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
        }
    }
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            const styles = {
                background: null
            };
            if (this.configuration.backgroundColor !== '' &&
                this.configuration.backgroundColor !== null &&
                this.configuration.backgroundColor !== undefined) {
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
        if (event.dontEmit !== undefined && event.dontEmit !== null && event.dontEmit) {
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
}
NgMaterialMultilevelMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-material-multilevel-menu',
                template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='!isInvalidData && items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\"\n      [listTemplate] = \"listTemplate\"\n    >\n    </ng-list-item>\n  </mat-list>\n</div>\n",
                styles: [".amml-container .mat-list-base{padding-top:unset}.amml-item{display:flex;justify-content:space-between;line-height:48px;position:relative}.anml-data{display:flex;justify-content:flex-start;text-transform:capitalize;width:100%}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
            },] }
];
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
NgMaterialMultilevelMenuComponent.propDecorators = {
    items: [{ type: Input }],
    configuration: [{ type: Input }],
    selectedItem: [{ type: Output }],
    selectedLabel: [{ type: Output }],
    listTemplate: [{ type: ContentChild, args: ['listTemplate', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjLyIsInNvdXJjZXMiOlsibGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBbUQsd0JBQXdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU9sRSxNQUFNLE9BQU8saUNBQWlDO0lBMkI1QyxZQUNVLE1BQWMsRUFDZixxQkFBNEM7UUFEM0MsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNmLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUEzQjVDLGtCQUFhLEdBQWtCLElBQUksQ0FBQztRQUNuQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ25ELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFHOUQscUNBQWdDLEdBQWlCLElBQUksQ0FBQztRQUN0RCwrQkFBMEIsR0FBaUIsSUFBSSxDQUFDO1FBQ2hELGdCQUFXLEdBQW9CLElBQUksQ0FBQztRQUVwQyxlQUFVLEdBQWtCO1lBQzFCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsU0FBUyxFQUFFLElBQUk7WUFDZixxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLGtC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QyxVQUFVLElBQUksT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxFQUFHO1lBQy9GLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFDRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoRCxDQUFDOzs7WUFwTUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw2QkFBNkI7Z0JBQ3ZDLHdvQkFBMkQ7O2FBRTVEOzs7WUFWdUIsTUFBTTtZQUlyQixxQkFBcUI7OztvQkFRM0IsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLE1BQU07NEJBQ04sTUFBTTsyQkFDTixZQUFZLFNBQUMsY0FBYyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBPbkluaXQsIE9uRGVzdHJveSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0LCBDb250ZW50Q2hpbGQsIFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kU3R5bGUsIENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcywgRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpdGVtczogTXVsdGlsZXZlbE5vZGVzW107XG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZExhYmVsID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XG4gIEBDb250ZW50Q2hpbGQoJ2xpc3RUZW1wbGF0ZScsIHtzdGF0aWM6IHRydWV9KSBsaXN0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPEVsZW1lbnRSZWY+O1xuXG4gIGV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBzZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcyA9IG51bGw7XG5cbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgIGZvbnRDb2xvcjogbnVsbCxcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxuICAgIGNvbGxhcHNlT25TZWxlY3Q6IG51bGwsXG4gICAgaGlnaGxpZ2h0T25TZWxlY3Q6IGZhbHNlLFxuICAgIHVzZURpdmlkZXJzOiB0cnVlLFxuICAgIHJ0bExheW91dDogZmFsc2UsXG4gICAgY3VzdG9tVGVtcGxhdGU6IGZhbHNlLFxuICB9O1xuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xuICBpc0ludmFsaWREYXRhID0gdHJ1ZTtcbiAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxuICApIHsgfVxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcbiAgICB0aGlzLmluaXRFeHBhbmRDb2xsYXBzZVN0YXR1cygpO1xuICAgIHRoaXMuaW5pdFNlbGVjdGVkTWVudUlEKCk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gJycgJiZcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSkge1xuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xuICAgIH1cbiAgfVxuICB1cGRhdGVOb2RlQnlVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcbiAgICBpZiAoXG4gICAgICBmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IG51bGwgJiZcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSAnJ1xuICAgICAgLy8gJiYgIWZvdW5kTm9kZS5kaXNhYmxlZCAvLyBQcmV2ZW50IHJvdXRlIHJlZGlyZWN0aW9uIGZvciBkaXNhYmxlZCBtZW51XG4gICAgKSB7XG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xuICAgICAgaWYoZm91bmROb2RlLmRvbnRFbWl0ICE9PSB1bmRlZmluZWQgJiYgZm91bmROb2RlLmRvbnRFbWl0ICE9PSBudWxsICYmICFmb3VuZE5vZGUuZG9udEVtaXQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNoZWNrVmFsaWREYXRhKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLml0ZW1zID09PSB1bmRlZmluZWQgfHwgKEFycmF5LmlzQXJyYXkodGhpcy5pdGVtcykgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDApKSB7XG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XG4gICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcbiAgICAgIHRoaXMuaXNJbnZhbGlkRGF0YSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gPT09IG51bGwgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSAnJykge1xuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IGZhbHNlO1xuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnBhZGRpbmdBdFN0YXJ0ID0gY29uZmlnLnBhZGRpbmdBdFN0YXJ0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmZvbnRDb2xvciAhPT0gJycgJiZcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gJycgJiZcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA9IGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3I7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcuY29sbGFwc2VPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID0gY29uZmlnLmNvbGxhcHNlT25TZWxlY3Q7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPSBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3Q7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLnVzZURpdmlkZXJzICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy51c2VEaXZpZGVycyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcudXNlRGl2aWRlcnMgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcudXNlRGl2aWRlcnMgPSBjb25maWcudXNlRGl2aWRlcnM7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLnJ0bExheW91dCAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcucnRsTGF5b3V0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5ydGxMYXlvdXQgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0ID0gY29uZmlnLnJ0bExheW91dDtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuY3VzdG9tVGVtcGxhdGUgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmN1c3RvbVRlbXBsYXRlICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jdXN0b21UZW1wbGF0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jdXN0b21UZW1wbGF0ZSA9IGNvbmZpZy5jdXN0b21UZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH1cbiAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XG4gIH1cbiAgaW5pdEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQge1xuICAgIHRoaXMuZXhwYW5kQ29sbGFwc2VTdGF0dXNTdWJzY3JpcHRpb24gPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5leHBhbmRDb2xsYXBzZVN0YXR1cyQuc3Vic2NyaWJlKCAoZXhwYW5kQ29sbGFwc2VTdGF0dXM6IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bSkgPT4ge1xuICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBleHBhbmRDb2xsYXBzZVN0YXR1cyA/IGV4cGFuZENvbGxhcHNlU3RhdHVzIDogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtLm5ldXRyYWw7XG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0ubmV1dHJhbDtcbiAgICB9KTtcbiAgfVxuICBpbml0U2VsZWN0ZWRNZW51SUQoKTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbiA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLnNlbGVjdGVkTWVudUlEJC5zdWJzY3JpYmUoIChzZWxlY3RlZE1lbnVJRDogc3RyaW5nKSA9PiB7XG4gICAgICBpZihzZWxlY3RlZE1lbnVJRCkge1xuICAgICAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlJZCh0aGlzLml0ZW1zLCBzZWxlY3RlZE1lbnVJRCk7XG4gICAgICAgIGlmIChmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0ludmFsaWRDb25maWcpIHtcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSAnJyAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgfVxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dDtcbiAgfVxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcbiAgICB0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyA9IEV4cGFuZENvbGxhcHNlU3RhdHVzRW51bS5uZXV0cmFsO1xuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcbiAgICBpZihldmVudC5kb250RW1pdCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50LmRvbnRFbWl0ICE9PSBudWxsICYmIGV2ZW50LmRvbnRFbWl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICghZXZlbnQub25TZWxlY3RlZCB8fCB0eXBlb2YgZXZlbnQub25TZWxlY3RlZCAhPT0gJ2Z1bmN0aW9uJykgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZExhYmVsLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5zZWxlY3RNZW51QnlJRFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=