import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ExpandCollapseStatusEnum } from './app.model';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
export class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.expandCollapseStatus = null;
        this.selectedItem = new EventEmitter();
        this.selectedLabel = new EventEmitter();
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
        };
        this.isInvalidConfig = true;
        this.nodeExpandCollapseStatus = null;
    }
    ngOnChanges() {
        this.detectInvalidConfig();
        this.detectExpandCollapseStatus();
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
            this.selectedListItem(foundNode);
        }
    }
    checkValidData() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
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
        }
        this.checkValidData();
    }
    detectExpandCollapseStatus() {
        if (this.expandCollapseStatus !== null &&
            this.expandCollapseStatus !== undefined) {
            this.nodeExpandCollapseStatus = this.expandCollapseStatus;
        }
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
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    }
}
NgMaterialMultilevelMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-material-multilevel-menu',
                template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>\n",
                styles: [".amml-item{display:flex;justify-content:space-between;line-height:48px;position:relative}.anml-data{display:flex;justify-content:flex-start;text-transform:capitalize;width:100%}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
            },] }
];
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
NgMaterialMultilevelMenuComponent.propDecorators = {
    items: [{ type: Input }],
    configuration: [{ type: Input }],
    expandCollapseStatus: [{ type: Input }],
    selectedItem: [{ type: Output }],
    selectedLabel: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjLyIsInNvdXJjZXMiOlsibGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQW1ELHdCQUF3QixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFPbEUsTUFBTSxPQUFPLGlDQUFpQztJQW9CNUMsWUFDVSxNQUFjLEVBQ2YscUJBQTRDO1FBRDNDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBcEI1QyxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDcEMseUJBQW9CLEdBQTZCLElBQUksQ0FBQztRQUNyRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ25ELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFFOUQsZUFBVSxHQUFrQjtZQUMxQixjQUFjLEVBQUUsSUFBSTtZQUNwQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixXQUFXLEVBQUUs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IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhY2tncm91bmRTdHlsZSwgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpdGVtczogTXVsdGlsZXZlbE5vZGVzW107XG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xuICBASW5wdXQoKSBleHBhbmRDb2xsYXBzZVN0YXR1czogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtID0gbnVsbDtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRMYWJlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xuICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGVzO1xuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xuICAgIHBhZGRpbmdBdFN0YXJ0OiB0cnVlLFxuICAgIGxpc3RCYWNrZ3JvdW5kQ29sb3I6IG51bGwsXG4gICAgZm9udENvbG9yOiBudWxsLFxuICAgIHNlbGVjdGVkTGlzdEZvbnRDb2xvcjogbnVsbCxcbiAgICBpbnRlcmZhY2VXaXRoUm91dGU6IG51bGwsXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcbiAgICBoaWdobGlnaHRPblNlbGVjdDogZmFsc2UsXG4gICAgdXNlRGl2aWRlcnM6IHRydWUsXG4gICAgcnRsTGF5b3V0OiBmYWxzZSxcbiAgfTtcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcbiAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBudWxsO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxuICApIHsgfVxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcbiAgICB0aGlzLmRldGVjdEV4cGFuZENvbGxhcHNlU3RhdHVzKCk7XG4gIH1cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gJycgJiZcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSkge1xuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xuICAgIH1cbiAgfVxuICB1cGRhdGVOb2RlQnlVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcbiAgICBpZiAoXG4gICAgICBmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IG51bGwgJiZcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSAnJ1xuICAgICAgLy8gJiYgIWZvdW5kTm9kZS5kaXNhYmxlZCAvLyBQcmV2ZW50IHJvdXRlIHJlZGlyZWN0aW9uIGZvciBkaXNhYmxlZCBtZW51XG4gICAgKSB7XG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XG4gICAgfVxuICB9XG4gIGNoZWNrVmFsaWREYXRhKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pO1xuICAgICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XG4gICAgfVxuICB9XG4gIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09ICcnKSB7XG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgICBpZiAoY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSB1bmRlZmluZWQgJiYgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSBudWxsICYmIHR5cGVvZiBjb25maWcucGFkZGluZ0F0U3RhcnQgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcucGFkZGluZ0F0U3RhcnQgPSBjb25maWcucGFkZGluZ0F0U3RhcnQ7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcubGlzdEJhY2tncm91bmRDb2xvcjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZm9udENvbG9yICE9PSAnJyAmJlxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuZm9udENvbG9yID0gY29uZmlnLmZvbnRDb2xvcjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSAnJyAmJlxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPSBjb25maWcuY29sbGFwc2VPblNlbGVjdDtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcudXNlRGl2aWRlcnMgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLnVzZURpdmlkZXJzICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIGNvbmZpZy51c2VEaXZpZGVycyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy51c2VEaXZpZGVycyA9IGNvbmZpZy51c2VEaXZpZGVycztcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcucnRsTGF5b3V0ICE9PSBudWxsICYmXG4gICAgICAgIGNvbmZpZy5ydGxMYXlvdXQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLnJ0bExheW91dCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQgPSBjb25maWcucnRsTGF5b3V0O1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XG4gIH1cbiAgZGV0ZWN0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXhwYW5kQ29sbGFwc2VTdGF0dXMgIT09IG51bGwgJiZcbiAgICAgIHRoaXMuZXhwYW5kQ29sbGFwc2VTdGF0dXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzO1xuICAgIH1cbiAgfVxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0ludmFsaWRDb25maWcpIHtcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSAnJyAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3R5bGVzO1xuICAgIH1cbiAgfVxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dDtcbiAgfVxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnROb2RlID0gZXZlbnQ7XG4gICAgaWYgKGV2ZW50Lml0ZW1zID09PSB1bmRlZmluZWQgJiYgKCFldmVudC5vblNlbGVjdGVkIHx8IHR5cGVvZiBldmVudC5vblNlbGVjdGVkICE9PSAnZnVuY3Rpb24nKSApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkTGFiZWwuZW1pdChldmVudCk7XG4gICAgfVxuICB9XG59XG4iXX0=