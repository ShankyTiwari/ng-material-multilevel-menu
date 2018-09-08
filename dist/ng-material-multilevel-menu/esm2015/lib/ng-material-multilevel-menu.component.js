/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MultilevelMenuService } from './multilevel-menu.service';
import { CONSTANT } from './constants';
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
        this.nodeConfig = {
            paddingAtStart: true,
            listBackgroundColor: null,
            fontColor: null,
            selectedListFontColor: null,
            interfaceWithRoute: null,
            collapseOnSelect: null,
            highlightOnSelect: false
        };
        this.isInvalidConfig = true;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.checkValiddata();
        this.detectInvalidConfig();
    }
    /**
     * @return {?}
     */
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
            foundNode.link !== '') {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    }
    /**
     * @return {?}
     */
    checkValiddata() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
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
     * @param {?} event
     * @return {?}
     */
    selectedListItem(event) {
        this.currentNode = event;
        if (event.items === undefined && !event.onSelected) {
            this.selectedItem.emit(event);
        }
    }
}
NgMaterialMultilevelMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-material-multilevel-menu',
                template: `<div [ngClass]="getClassName()" [ngStyle]="getGlobalStyle()" *ngIf='items.length !== 0'>
  <mat-list>
    <ng-list-item 
      *ngFor="let node of items" 
      [nodeConfiguration]='nodeConfig' 
      [node]='node' 
      [selectedNode]='currentNode' 
      (selectedItem)="selectedListItem($event)
    ">
    </ng-list-item>
  </mat-list>
</div>`,
                styles: [`.amml-item{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.amml-submenu{margin-left:16px}.active{color:#1976d2}`],
            },] },
];
/** @nocollapse */
NgMaterialMultilevelMenuComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
NgMaterialMultilevelMenuComponent.propDecorators = {
    items: [{ type: Input }],
    configuration: [{ type: Input }],
    selectedItem: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.items;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.configuration;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.selectedItem;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.currentNode;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.nodeConfig;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.isInvalidConfig;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.router;
    /** @type {?} */
    NgMaterialMultilevelMenuComponent.prototype.multilevelMenuService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2xFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFrQnZDLE1BQU07Ozs7O0lBZUosWUFDVSxRQUNBO1FBREEsV0FBTSxHQUFOLE1BQU07UUFDTiwwQkFBcUIsR0FBckIscUJBQXFCOzZCQWZTLElBQUk7NEJBQ25CLElBQUksWUFBWSxFQUFtQjswQkFFaEM7WUFDMUIsY0FBYyxFQUFFLElBQUk7WUFDcEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixTQUFTLEVBQUUsSUFBSTtZQUNmLHFCQUFxQixFQUFFLElBQUk7WUFDM0Isa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGlCQUFpQixFQUFFLEtBQUs7U0FDekI7K0JBQ2lCLElBQUk7S0FJakI7Ozs7SUFDTCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQzVCOzs7O0lBQ0QsUUFBUTtRQUNOLEVBQUUsQ0FBQyxDQUNELElBQUksQ0FBQyxhQUFhLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUss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QyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7OztZQTlJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFOzs7Ozs7Ozs7OztPQVdMO2dCQUNMLE1BQU0sRUFBRSxDQUFDLDhTQUE4UyxDQUFDO2FBQ3pUOzs7O1lBdEJRLE1BQU07WUFFTixxQkFBcUI7OztvQkFzQjNCLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIE11bHRpbGV2ZWxOb2RlcywgQmFja2dyb3VuZFN0eWxlIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9J2l0ZW1zLmxlbmd0aCAhPT0gMCc+XHJcbiAgPG1hdC1saXN0PlxyXG4gICAgPG5nLWxpc3QtaXRlbSBcclxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXNcIiBcclxuICAgICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZycgXHJcbiAgICAgIFtub2RlXT0nbm9kZScgXHJcbiAgICAgIFtzZWxlY3RlZE5vZGVdPSdjdXJyZW50Tm9kZScgXHJcbiAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXHJcbiAgICBcIj5cclxuICAgIDwvbmctbGlzdC1pdGVtPlxyXG4gIDwvbWF0LWxpc3Q+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cG9zaXRpb246cmVsYXRpdmV9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9LmFjdGl2ZXtjb2xvcjojMTk3NmQyfWBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBASW5wdXQoKSBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBub2RlQ29uZmlnOiBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgcGFkZGluZ0F0U3RhcnQ6IHRydWUsXHJcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxyXG4gICAgZm9udENvbG9yOiBudWxsLFxyXG4gICAgc2VsZWN0ZWRMaXN0Rm9udENvbG9yOiBudWxsLFxyXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxyXG4gICAgY29sbGFwc2VPblNlbGVjdDogbnVsbCxcclxuICAgIGhpZ2hsaWdodE9uU2VsZWN0OiBmYWxzZVxyXG4gIH07XHJcbiAgaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7IH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZGRhdGEoKTtcclxuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xyXG4gIH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gJycgJiZcclxuICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlKSB7XHJcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKGV2ZW50LnVybCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgY29uc3QgZm91bmROb2RlID0gdGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UuZ2V0TWF0Y2hlZE9iamVjdEJ5VXJsKHRoaXMuaXRlbXMsIHVybCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09IG51bGwgJiZcclxuICAgICAgZm91bmROb2RlLmxpbmsgIT09ICcnXHJcbiAgICApIHtcclxuICAgICAgdGhpcy5jdXJyZW50Tm9kZSA9IGZvdW5kTm9kZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKGZvdW5kTm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNoZWNrVmFsaWRkYXRhKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihDT05TVEFOVC5FUlJPUl9NRVNTQUdFKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XHJcbiAgICAgIHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmFkZFJhbmRvbUlkKHRoaXMuaXRlbXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBkZXRlY3RJbnZhbGlkQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbiA9PT0gbnVsbCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCB8fCB0aGlzLmNvbmZpZ3VyYXRpb24gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcclxuICAgICAgaWYgKGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gdW5kZWZpbmVkICYmIGNvbmZpZy5wYWRkaW5nQXRTdGFydCAhPT0gbnVsbCAmJiB0eXBlb2YgY29uZmlnLnBhZGRpbmdBdFN0YXJ0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcucGFkZGluZ0F0U3RhcnQgPSBjb25maWcucGFkZGluZ0F0U3RhcnQ7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yID0gY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yID0gY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID0gY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuY29sbGFwc2VPblNlbGVjdCAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgdHlwZW9mIGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgIHR5cGVvZiBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCA9IGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICByZXR1cm4gQ09OU1RBTlQuREVGQVVMVF9DTEFTU19OQU1FO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke0NPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRX0gJHt0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lfWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRHbG9iYWxTdHlsZSgpOiBCYWNrZ3JvdW5kU3R5bGUge1xyXG4gICAgaWYgKCF0aGlzLmlzSW52YWxpZENvbmZpZykge1xyXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZCA6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3R5bGVzO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKGV2ZW50OiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcclxuICAgIGlmIChldmVudC5pdGVtcyA9PT0gdW5kZWZpbmVkICYmICFldmVudC5vblNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=