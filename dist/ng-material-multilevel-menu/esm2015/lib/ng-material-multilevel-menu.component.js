import { __decorate, __metadata } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ExpandCollapseStatusEnum } from './app.model';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
let NgMaterialMultilevelMenuComponent = class NgMaterialMultilevelMenuComponent {
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
    Input(),
    __metadata("design:type", String)
], NgMaterialMultilevelMenuComponent.prototype, "expandCollapseStatus", void 0);
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
        template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\r\n      (selectedItem)=\"selectedListItem($event)\r\n    \">\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n",
        styles: [".amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
    }),
    __metadata("design:paramtypes", [Router,
        MultilevelMenuService])
], NgMaterialMultilevelMenuComponent);
export { NgMaterialMultilevelMenuComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBbUQsd0JBQXdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDeEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQU9sRSxJQUFhLGlDQUFpQyxHQUE5QyxNQUFhLGlDQUFpQztJQW1CNUMsWUFDVSxNQUFjLEVBQ2YscUJBQTRDO1FBRDNDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBbkI1QyxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDcEMseUJBQW9CLEdBQTZCLElBQUksQ0FBQztRQUNyRCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQ25ELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFFOUQsZUFBVSxHQUFrQjtZQUMxQixjQUFjLEVBQUUsSUFBSTtZQUNwQixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YscUJBQXFCLEVBQUUsSUFBSTtZQUMzQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixTQUFTLEVBQUUsS0FBSztT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dEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IEJhY2tncm91bmRTdHlsZSwgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBASW5wdXQoKSBleHBhbmRDb2xsYXBzZVN0YXR1czogRXhwYW5kQ29sbGFwc2VTdGF0dXNFbnVtID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkTGFiZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIG5vZGVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcclxuICAgIGxpc3RCYWNrZ3JvdW5kQ29sb3I6IG51bGwsXHJcbiAgICBmb250Q29sb3I6IG51bGwsXHJcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXHJcbiAgICBpbnRlcmZhY2VXaXRoUm91dGU6IG51bGwsXHJcbiAgICBjb2xsYXBzZU9uU2VsZWN0OiBudWxsLFxyXG4gICAgaGlnaGxpZ2h0T25TZWxlY3Q6IGZhbHNlLFxyXG4gICAgcnRsTGF5b3V0OiBmYWxzZSxcclxuICB9O1xyXG4gIGlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBudWxsO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkgeyB9XHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcclxuICAgIHRoaXMuZGV0ZWN0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09ICcnICYmXHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTChldmVudC51cmxBZnRlclJlZGlyZWN0cyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKHRoaXMuaXRlbXMsIHVybCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IG51bGwgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09ICcnXHJcbiAgICAgIC8vICYmICFmb3VuZE5vZGUuZGlzYWJsZWQgLy8gUHJldmVudCByb3V0ZSByZWRpcmVjdGlvbiBmb3IgZGlzYWJsZWQgbWVudVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja1ZhbGlkRGF0YSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pO1xyXG4gICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcclxuICAgIH1cclxuICB9XHJcbiAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gPT09IG51bGwgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSAnJykge1xyXG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb247XHJcbiAgICAgIGlmIChjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IHVuZGVmaW5lZCAmJiBjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IG51bGwgJiYgdHlwZW9mIGNvbmZpZy5wYWRkaW5nQXRTdGFydCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnBhZGRpbmdBdFN0YXJ0ID0gY29uZmlnLnBhZGRpbmdBdFN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcubGlzdEJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuZm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuZm9udENvbG9yID0gY29uZmlnLmZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA9IGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9IGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuY29sbGFwc2VPblNlbGVjdCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPSBjb25maWcuY29sbGFwc2VPblNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPSBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5ydGxMYXlvdXQgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcucnRsTGF5b3V0ICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLnJ0bExheW91dCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dCA9IGNvbmZpZy5ydGxMYXlvdXQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuY2hlY2tWYWxpZERhdGEoKTtcclxuICB9XHJcbiAgZGV0ZWN0RXhwYW5kQ29sbGFwc2VTdGF0dXMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5leHBhbmRDb2xsYXBzZVN0YXR1cyAhPT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhpcy5ub2RlRXhwYW5kQ29sbGFwc2VTdGF0dXMgPSB0aGlzLmV4cGFuZENvbGxhcHNlU3RhdHVzO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRX0gJHt0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xyXG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICBpc1J0bExheW91dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0O1xyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcclxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICghZXZlbnQub25TZWxlY3RlZCB8fCB0eXBlb2YgZXZlbnQub25TZWxlY3RlZCAhPT0gJ2Z1bmN0aW9uJykgKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZXZlbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZExhYmVsLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=