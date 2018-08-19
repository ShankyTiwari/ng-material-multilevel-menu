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
            interfaceWithRoute: null
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
        this.selectedItem.emit(event);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBR2xFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFrQnZDLE1BQU07Ozs7O0lBYUosWUFDVSxRQUNBO1FBREEsV0FBTSxHQUFOLE1BQU07UUFDTiwwQkFBcUIsR0FBckIscUJBQXFCOzZCQWJTLElBQUk7NEJBQ25CLElBQUksWUFBWSxFQUFtQjswQkFFaEM7WUFDMUIsY0FBYyxFQUFFLElBQUk7WUFDcEIsbUJBQW1CLEVBQUUsSUFBSTtZQUN6QixTQUFTLEVBQUUsSUFBSTtZQUNmLHFCQUFxQixFQUFFLElBQUk7WUFDM0Isa0JBQWtCLEVBQUUsSUFBSTtTQUN6QjsrQkFDaUIsSUFBSTtLQUlqQjs7OztJQUNMLFdBQVc7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7S0FDNUI7Ozs7SUFDRCxRQUFRO1FBQ04sRUFBRSxDQUFDLENBQ0QsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxFQUFFO1lBQzVGLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLEtBQUssSUFB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RCxjQUFjO1FBQ1osRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7WUFDMUIsTUFBTSxNQUFNLEdBQUc7Z0JBQ2IsVUFBVSxFQUFHLElBQUk7YUFDbEIsQ0FBQztZQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxLQUFLLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxLQUFLLElBQUk7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7YUFDeEQ7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2Y7S0FDRjs7Ozs7SUFDRCxnQkFBZ0IsQ0FBQyxLQUFzQjtRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMvQjs7O1lBaElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7O09BV0w7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsOFNBQThTLENBQUM7YUFDelQ7Ozs7WUF0QlEsTUFBTTtZQUVOLHFCQUFxQjs7O29CQXNCM0IsS0FBSzs0QkFDTCxLQUFLOzJCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBCYWNrZ3JvdW5kU3R5bGUgfSBmcm9tICcuL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdDbGFzc109XCJnZXRDbGFzc05hbWUoKVwiIFtuZ1N0eWxlXT1cImdldEdsb2JhbFN0eWxlKClcIiAqbmdJZj0naXRlbXMubGVuZ3RoICE9PSAwJz5cclxuICA8bWF0LWxpc3Q+XHJcbiAgICA8bmctbGlzdC1pdGVtIFxyXG4gICAgICAqbmdGb3I9XCJsZXQgbm9kZSBvZiBpdGVtc1wiIFxyXG4gICAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlnJyBcclxuICAgICAgW25vZGVdPSdub2RlJyBcclxuICAgICAgW3NlbGVjdGVkTm9kZV09J2N1cnJlbnROb2RlJyBcclxuICAgICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcclxuICAgIFwiPlxyXG4gICAgPC9uZy1saXN0LWl0ZW0+XHJcbiAgPC9tYXQtbGlzdD5cclxuPC9kaXY+YCxcclxuICBzdHlsZXM6IFtgLmFtbWwtaXRlbXtsaW5lLWhlaWdodDo0OHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2Vlbjtwb3NpdGlvbjpyZWxhdGl2ZX0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0fS5hbW1sLWljb257bGluZS1oZWlnaHQ6NDhweDttYXJnaW4tcmlnaHQ6MTVweH0uYW1tbC1pY29uLWZhe2ZvbnQtc2l6ZToyMHB4fS5hbW1sLXN1Ym1lbnV7bWFyZ2luLWxlZnQ6MTZweH0uYWN0aXZle2NvbG9yOiMxOTc2ZDJ9YF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgaXRlbXM6IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIEBJbnB1dCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBjdXJyZW50Tm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIG5vZGVDb25maWc6IENvbmZpZ3VyYXRpb24gPSB7XHJcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcclxuICAgIGxpc3RCYWNrZ3JvdW5kQ29sb3I6IG51bGwsXHJcbiAgICBmb250Q29sb3I6IG51bGwsXHJcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXHJcbiAgICBpbnRlcmZhY2VXaXRoUm91dGU6IG51bGxcclxuICB9O1xyXG4gIGlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkgeyB9XHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLmNoZWNrVmFsaWRkYXRhKCk7XHJcbiAgICB0aGlzLmRldGVjdEludmFsaWRDb25maWcoKTtcclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09ICcnICYmXHJcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSkge1xyXG4gICAgICB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTChldmVudC51cmwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB0aGlzLnVwZGF0ZU5vZGVCeVVSTCh0aGlzLnJvdXRlci51cmwpO1xyXG4gICAgfVxyXG4gIH1cclxuICB1cGRhdGVOb2RlQnlVUkwodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xyXG4gICAgaWYgKFxyXG4gICAgICBmb3VuZE5vZGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSBudWxsICYmXHJcbiAgICAgIGZvdW5kTm9kZS5saW5rICE9PSAnJ1xyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShmb3VuZE5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja1ZhbGlkZGF0YSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pO1xyXG4gICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcclxuICAgIH1cclxuICB9XHJcbiAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24gPT09IG51bGwgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQgfHwgdGhpcy5jb25maWd1cmF0aW9uID09PSAnJykge1xyXG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzSW52YWxpZENvbmZpZyA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZ3VyYXRpb247XHJcbiAgICAgIGlmIChjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IHVuZGVmaW5lZCAmJiBjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IG51bGwgJiYgdHlwZW9mIGNvbmZpZy5wYWRkaW5nQXRTdGFydCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnBhZGRpbmdBdFN0YXJ0ID0gY29uZmlnLnBhZGRpbmdBdFN0YXJ0O1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCAmJlxyXG4gICAgICAgIGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcubGlzdEJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25maWcuZm9udENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuZm9udENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLm5vZGVDb25maWcuZm9udENvbG9yID0gY29uZmlnLmZvbnRDb2xvcjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gJycgJiZcclxuICAgICAgICBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsICYmXHJcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA9IGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiZcclxuICAgICAgICBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICB0eXBlb2YgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9IGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICBpZiAodGhpcy5pc0ludmFsaWRDb25maWcpIHtcclxuICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSAnJyAmJiB0aGlzLmNvbmZpZ3VyYXRpb24uY2xhc3NuYW1lICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBgJHtDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUV9ICR7dGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZX1gO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0R2xvYmFsU3R5bGUoKTogQmFja2dyb3VuZFN0eWxlIHtcclxuICAgIGlmICghdGhpcy5pc0ludmFsaWRDb25maWcpIHtcclxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICAgIGJhY2tncm91bmQgOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSAnJyAmJlxyXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uYmFja2dyb3VuZENvbG9yICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHN0eWxlcztcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShldmVudDogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLmN1cnJlbnROb2RlID0gZXZlbnQ7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19