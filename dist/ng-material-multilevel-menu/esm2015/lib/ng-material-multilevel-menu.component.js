import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
let NgMaterialMultilevelMenuComponent = class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
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
            rtlLayout: false,
        };
        this.isInvalidConfig = true;
    }
    ngOnChanges() {
        this.detectInvalidConfig();
    }
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.url);
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
            if (config.rtlLayout !== null &&
                config.rtlLayout !== undefined &&
                typeof config.rtlLayout === 'boolean') {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
        }
        this.checkValidData();
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
};
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgMaterialMultilevelMenuComponent.prototype, "items", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgMaterialMultilevelMenuComponent.prototype, "configuration", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NgMaterialMultilevelMenuComponent.prototype, "selectedItem", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NgMaterialMultilevelMenuComponent.prototype, "selectedLabel", void 0);
NgMaterialMultilevelMenuComponent = __decorate([
    Component({
        selector: 'ng-material-multilevel-menu',
        template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      (selectedItem)=\"selectedListItem($event)\r\n    \">\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n",
        styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
    }),
    __metadata("design:paramtypes", [Router,
        MultilevelMenuService])
], NgMaterialMultilevelMenuComponent);
export { NgMaterialMultilevelMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTbEUsSUFBYSxpQ0FBaUMsR0FBOUMsTUFBYSxpQ0FBaUM7SUFpQjVDLFlBQ1UsTUFBYyxFQUNmLHFCQUE0QztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWpCNUMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDbkQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUU5RCxlQUFVLEdBQWtCO1lBQzFCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsU0FBUyxFQUFFLElBQUk7WUFDZixxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFDRixvQkFBZSxHQUFHLElBQUksQ0FBQztJQUluQixDQUFDO0lBQ0wsV0FBVztRQUNULElBQUksQ0FBQyxt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QUssQ0FBQztRQUN6QixJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLE9BQU8sS0FBSyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsRUFBRztZQUMvRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUExSG1CLE1BQU07WUFDUSxxQkFBcUI7O0FBbEI1QztJQUFSLEtBQUssRUFBRTs7Z0VBQTBCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFOzt3RUFBcUM7QUFDbkM7SUFBVCxNQUFNLEVBQUU7O3VFQUFvRDtBQUNuRDtJQUFULE1BQU0sRUFBRTs7d0VBQXFEO0FBSm5ELGlDQUFpQztJQUw3QyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLDRpQkFBMkQ7O0tBRTVELENBQUM7cUNBbUJrQixNQUFNO1FBQ1EscUJBQXFCO0dBbkIxQyxpQ0FBaUMsQ0E0STdDO1NBNUlZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBCYWNrZ3JvdW5kU3R5bGUsIENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcyB9IGZyb20gJy4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5jc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpdGVtczogTXVsdGlsZXZlbE5vZGVzW107XHJcbiAgQElucHV0KCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZExhYmVsID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxyXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcclxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZSxcclxuICAgIHJ0bExheW91dDogZmFsc2UsXHJcbiAgfTtcclxuICBpc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkgeyB9XHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09ICcnICYmXHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTChldmVudC51cmwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGVOb2RlQnlVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xyXG4gICAgaWYgKFxyXG4gICAgICBmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSBudWxsICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSAnJ1xyXG4gICAgICAvLyAmJiAhZm91bmROb2RlLmRpc2FibGVkIC8vIFByZXZlbnQgcm91dGUgcmVkaXJlY3Rpb24gZm9yIGRpc2FibGVkIG1lbnVcclxuICAgICkge1xyXG4gICAgICB0aGlzLmN1cnJlbnROb2RlID0gZm91bmROb2RlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgY2hlY2tWYWxpZERhdGEoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29uc29sZS53YXJuKENPTlNUQU5ULkVSUk9SX01FU1NBR0UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKTtcclxuICAgICAgdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuYWRkUmFuZG9tSWQodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGRldGVjdEludmFsaWRDb25maWcoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uID09PSBudWxsIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gJycpIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcclxuICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWd1cmF0aW9uO1xyXG4gICAgICBpZiAoY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSB1bmRlZmluZWQgJiYgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ICE9PSBudWxsICYmIHR5cGVvZiBjb25maWcucGFkZGluZ0F0U3RhcnQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgPSBjb25maWcubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmZvbnRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmZvbnRDb2xvciA9IGNvbmZpZy5mb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgPSBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID0gY29uZmlnLmNvbGxhcHNlT25TZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcucnRsTGF5b3V0ICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLnJ0bExheW91dCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5ydGxMYXlvdXQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQgPSBjb25maWcucnRsTGF5b3V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XHJcbiAgfVxyXG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gJycgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQ7XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50Tm9kZSA9IGV2ZW50O1xyXG4gICAgaWYgKGV2ZW50Lml0ZW1zID09PSB1bmRlZmluZWQgJiYgKCFldmVudC5vblNlbGVjdGVkIHx8IHR5cGVvZiBldmVudC5vblNlbGVjdGVkICE9PSAnZnVuY3Rpb24nKSApIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGFiZWwuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==