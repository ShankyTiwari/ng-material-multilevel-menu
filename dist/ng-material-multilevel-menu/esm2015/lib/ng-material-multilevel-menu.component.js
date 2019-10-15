/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
export class NgMaterialMultilevelMenuComponent {
    /**
     * @param {?} router
     * @param {?} multilevelMenuService
     */
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
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.detectInvalidConfig();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.configuration !== null && this.configuration !== undefined && this.configuration !== '' &&
            this.configuration.interfaceWithRoute !== null && this.configuration.interfaceWithRoute) {
            this.router.events
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event instanceof NavigationEnd) {
                    this.updateNodeByURL(event.url);
                }
            }));
            this.updateNodeByURL(this.router.url);
        }
    }
    /**
     * @param {?} url
     * @return {?}
     */
    updateNodeByURL(url) {
        /** @type {?} */
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
    /**
     * @return {?}
     */
    checkValidData() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => !n.hidden));
            this.multilevelMenuService.addRandomId(this.items);
        }
    }
    /**
     * @return {?}
     */
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
            /** @type {?} */
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
            this.checkValidData();
        }
    }
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
            /** @type {?} */
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
    /**
     * @return {?}
     */
    isRtlLayout() {
        return this.nodeConfig.rtlLayout;
    }
    /**
     * @param {?} event
     * @return {?}
     */
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
                template: "<div [ngClass]=\"getClassName()\" [ngStyle]=\"getGlobalStyle()\" *ngIf='items.length !== 0' [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n  <mat-list>\r\n    <ng-list-item\r\n      *ngFor=\"let node of items | keyvalue: multilevelMenuService.kvDummyComparerFn\"\r\n      [nodeConfiguration]='nodeConfig'\r\n      [node]='node.value'\r\n      [level]=\"1\"\r\n      [submenuLevel]=\"node.key\"\r\n      [selectedNode]='currentNode'\r\n      (selectedItem)=\"selectedListItem($event)\r\n    \">\r\n    </ng-list-item>\r\n  </mat-list>\r\n</div>\r\n",
                styles: [".amml-item{line-height:48px;display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:-webkit-box;display:flex;-webkit-box-pack:start;justify-content:flex-start}.amml-icon-fa{font-size:20px}.amml-icon{line-height:48px}.active{color:#1976d2}div[dir=ltr] .amml-icon{margin-right:15px}div[dir=ltr] .amml-submenu{margin-left:16px}div[dir=rtl] .amml-icon{margin-left:15px}div[dir=rtl] .amml-submenu{margin-right:16px}"]
            }] }
];
/** @nocollapse */
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
NgMaterialMultilevelMenuComponent.propDecorators = {
    items: [{ type: Input }],
    configuration: [{ type: Input }],
    selectedItem: [{ type: Output }],
    selectedLabel: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.items;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.configuration;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.selectedItem;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.selectedLabel;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.currentNode;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.nodeConfig;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.isInvalidConfig;
    /**
     * @type {?}
     * @private
     */
    NgMaterialMultilevelMenuComponent.prototype.router;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.multilevelMenuService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFTbEUsTUFBTSxPQUFPLGlDQUFpQzs7Ozs7SUFpQjVDLFlBQ1UsTUFBYyxFQUNmLHFCQUE0QztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWpCNUMsa0JBQWEsR0FBa0IsSUFBSSxDQUFDO1FBQ25DLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDbkQsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUU5RCxlQUFVLEdBQWtCO1lBQzFCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLG1CQUFtQixFQUFFLElBQUk7WUFDekIsU0FBUyxFQUFFLElBQUk7WUFDZixxQkFBcUIsRUFBRSxJQUFJO1lBQzNCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFDRixvQkFBZSxHQUFHLElBQUksQ0FBQztJQUluQixDQUFDOzs7O0lBQ0wsV0FBVztRQUNULElBQUksQ0FBQyxtQkFB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RyxLQUFLLENBQUM7UUFDekIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxPQUFPLEtBQUssQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLEVBQUc7WUFDL0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7YUFBTTtZQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBaEpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2Qyw0aUJBQTJEOzthQUU1RDs7OztZQVh1QixNQUFNO1lBR3JCLHFCQUFxQjs7O29CQVUzQixLQUFLOzRCQUNMLEtBQUs7MkJBQ0wsTUFBTTs0QkFDTixNQUFNOzs7O0lBSFAsa0RBQWtDOztJQUNsQywwREFBNkM7O0lBQzdDLHlEQUE2RDs7SUFDN0QsMERBQThEOztJQUM5RCx3REFBNkI7O0lBQzdCLHVEQVNFOztJQUNGLDREQUF1Qjs7Ozs7SUFFckIsbURBQXNCOztJQUN0QixrRUFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQmFja2dyb3VuZFN0eWxlLCBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaXRlbXM6IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRMYWJlbCA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIGN1cnJlbnROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcclxuICAgIHBhZGRpbmdBdFN0YXJ0OiB0cnVlLFxyXG4gICAgbGlzdEJhY2tncm91bmRDb2xvcjogbnVsbCxcclxuICAgIGZvbnRDb2xvcjogbnVsbCxcclxuICAgIHNlbGVjdGVkTGlzdEZvbnRDb2xvcjogbnVsbCxcclxuICAgIGludGVyZmFjZVdpdGhSb3V0ZTogbnVsbCxcclxuICAgIGNvbGxhcHNlT25TZWxlY3Q6IG51bGwsXHJcbiAgICBoaWdobGlnaHRPblNlbGVjdDogZmFsc2UsXHJcbiAgICBydGxMYXlvdXQ6IGZhbHNlLFxyXG4gIH07XHJcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHsgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5kZXRlY3RJbnZhbGlkQ29uZmlnKCk7XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5jb25maWd1cmF0aW9uICE9PSAnJyAmJlxyXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcclxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwoZXZlbnQudXJsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgdGhpcy51cGRhdGVOb2RlQnlVUkwodGhpcy5yb3V0ZXIudXJsKTtcclxuICAgIH1cclxuICB9XHJcbiAgdXBkYXRlTm9kZUJ5VVJMKHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBmb3VuZE5vZGUgPSB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5nZXRNYXRjaGVkT2JqZWN0QnlVcmwodGhpcy5pdGVtcywgdXJsKTtcclxuICAgIGlmIChcclxuICAgICAgZm91bmROb2RlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gJydcclxuICAgICAgLy8gJiYgIWZvdW5kTm9kZS5kaXNhYmxlZCAvLyBQcmV2ZW50IHJvdXRlIHJlZGlyZWN0aW9uIGZvciBkaXNhYmxlZCBtZW51XHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IGZvdW5kTm9kZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNoZWNrVmFsaWREYXRhKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XHJcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcclxuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucGFkZGluZ0F0U3RhcnQgPSBjb25maWcucGFkZGluZ0F0U3RhcnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLnJ0bExheW91dCAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5ydGxMYXlvdXQgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcucnRsTGF5b3V0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0ID0gY29uZmlnLnJ0bExheW91dDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gJycgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYCR7Q09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FfSAke3RoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWV9YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldEdsb2JhbFN0eWxlKCk6IEJhY2tncm91bmRTdHlsZSB7XHJcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XHJcbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kIDogbnVsbFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzdHlsZXM7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZy5ydGxMYXlvdXQ7XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5jdXJyZW50Tm9kZSA9IGV2ZW50O1xyXG4gICAgaWYgKGV2ZW50Lml0ZW1zID09PSB1bmRlZmluZWQgJiYgKCFldmVudC5vblNlbGVjdGVkIHx8IHR5cGVvZiBldmVudC5vblNlbGVjdGVkICE9PSAnZnVuY3Rpb24nKSApIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGFiZWwuZW1pdChldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==