import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
var NgMaterialMultilevelMenuComponent = /** @class */ (function () {
    function NgMaterialMultilevelMenuComponent(router, multilevelMenuService) {
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
    NgMaterialMultilevelMenuComponent.prototype.ngOnChanges = function () {
        this.detectInvalidConfig();
    };
    NgMaterialMultilevelMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe(function (event) {
                if (event instanceof NavigationEnd) {
                    _this.updateNodeByURL(event.url);
                }
            });
            this.updateNodeByURL(this.router.url);
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.updateNodeByURL = function (url) {
        var foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.checkValidData = function () {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(function (n) { return !n.hidden; });
            this.multilevelMenuService.addRandomId(this.items);
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.detectInvalidConfig = function () {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            var config = this.configuration;
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
            this.checkValidData();
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.getClassName = function () {
        if (this.isInvalidConfig) {
            return CONSTANT.DEFAULT_CLASS_NAME;
        }
        else {
            if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
                return CONSTANT.DEFAULT_CLASS_NAME + " " + this.configuration.classname;
            }
            else {
                return CONSTANT.DEFAULT_CLASS_NAME;
            }
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.getGlobalStyle = function () {
        if (!this.isInvalidConfig) {
            var styles = {
                background: null
            };
            if (this.configuration.backgroundColor !== '' &&
                this.configuration.backgroundColor !== null &&
                this.configuration.backgroundColor !== undefined) {
                styles.background = this.configuration.backgroundColor;
            }
            return styles;
        }
    };
    NgMaterialMultilevelMenuComponent.prototype.isRtlLayout = function () {
        return this.nodeConfig.rtlLayout;
    };
    NgMaterialMultilevelMenuComponent.prototype.selectedListItem = function (event) {
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    };
    NgMaterialMultilevelMenuComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
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
            template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n  <mat-list>\n    <ng-list-item\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\n      [nodeConfiguration]='nodeConfig'\n      [node]='node.value'\n      [level]=\"1\"\n      [submenuLevel]=\"node.key\"\n      [selectedNode]='currentNode'\n      (selectedItem)=\"selectedListItem($event)\n    \">\n    </ng-list-item>\n  </mat-list>\n</div>\n",
            styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
        }),
        __metadata("design:paramtypes", [Router,
            MultilevelMenuService])
    ], NgMaterialMultilevelMenuComponent);
    return NgMaterialMultilevelMenuComponent;
}());
export { NgMaterialMultilevelMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTbEU7SUFpQkUsMkNBQ1UsTUFBYyxFQUNmLHFCQUE0QztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWpCNUMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDbkQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUU5RCxlQUFVLEdBQWtCO1lBQzFCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsU0FBUyxFQUFFLElBQUk7WUFDZixxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFDRixvQkFBZSxHQUFHLElBQUksQ0FBQztJQUluQixDQUFDO0lBQ0wsdURBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENB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ckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxPQUFPLEtBQUssQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLEVBQUc7WUFDL0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Z0JBekhpQixNQUFNO2dCQUNRLHFCQUFxQjs7SUFsQjVDO1FBQVIsS0FBSyxFQUFFOztvRUFBMEI7SUFDekI7UUFBUixLQUFLLEVBQUU7OzRFQUFxQztJQUNuQztRQUFULE1BQU0sRUFBRTs7MkVBQW9EO0lBQ25EO1FBQVQsTUFBTSxFQUFFOzs0RUFBcUQ7SUFKbkQsaUNBQWlDO1FBTDdDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSw2QkFBNkI7WUFDdkMsZ2hCQUEyRDs7U0FFNUQsQ0FBQzt5Q0FtQmtCLE1BQU07WUFDUSxxQkFBcUI7T0FuQjFDLGlDQUFpQyxDQTRJN0M7SUFBRCx3Q0FBQztDQUFBLEFBNUlELElBNElDO1NBNUlZLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhY2tncm91bmRTdHlsZSwgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcbiAgQElucHV0KCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkTGFiZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgIGZvbnRDb2xvcjogbnVsbCxcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxuICAgIGNvbGxhcHNlT25TZWxlY3Q6IG51bGwsXG4gICAgaGlnaGxpZ2h0T25TZWxlY3Q6IGZhbHNlLFxuICAgIHJ0bExheW91dDogZmFsc2UsXG4gIH07XG4gIGlzSW52YWxpZENvbmZpZyA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXG4gICkgeyB9XG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09ICcnICYmXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKGV2ZW50LnVybCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xuICAgIGlmIChcbiAgICAgIGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxuICAgICAgZm91bmROb2RlLmxpbmsgIT09ICcnXG4gICAgICAvLyAmJiAhZm91bmROb2RlLmRpc2FibGVkIC8vIFByZXZlbnQgcm91dGUgcmVkaXJlY3Rpb24gZm9yIGRpc2FibGVkIG1lbnVcbiAgICApIHtcbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcbiAgICB9XG4gIH1cbiAgY2hlY2tWYWxpZERhdGEoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XG4gICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcbiAgICB9XG4gIH1cbiAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uID09PSBudWxsIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gJycpIHtcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICAgIGlmIChjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IHVuZGVmaW5lZCAmJiBjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IG51bGwgJiYgdHlwZW9mIGNvbmZpZy5wYWRkaW5nQXRTdGFydCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcubGlzdEJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09ICcnICYmXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9IGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGU7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5ydGxMYXlvdXQgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLnJ0bExheW91dCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcucnRsTGF5b3V0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dCA9IGNvbmZpZy5ydGxMYXlvdXQ7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XG4gICAgfVxuICB9XG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xuICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBgJHtDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUV9ICR7dGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0R2xvYmFsU3R5bGUoKTogQmFja2dyb3VuZFN0eWxlIHtcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIGJhY2tncm91bmQgOiBudWxsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICB9XG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0O1xuICB9XG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcbiAgICBpZiAoZXZlbnQuaXRlbXMgPT09IHVuZGVmaW5lZCAmJiAoIWV2ZW50Lm9uU2VsZWN0ZWQgfHwgdHlwZW9mIGV2ZW50Lm9uU2VsZWN0ZWQgIT09ICdmdW5jdGlvbicpICkge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbC5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==