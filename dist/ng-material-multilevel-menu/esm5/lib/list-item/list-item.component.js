/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from './../constants';
import { MultilevelMenuService } from './../multilevel-menu.service';
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(router, multilevelMenuService) {
        var _a;
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = false,
            _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = false,
            _a);
    }
    /**
     * @return {?}
     */
    ListItemComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return !n.hidden; })) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (this.node.faIcon !== null &&
            this.node.faIcon !== undefined &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = "fas " + this.node.faIcon;
        }
        this.selectedListClasses["level-" + this.level + "-submenulevel-" + this.submenuLevel] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    };
    /**
     * @param {?} isFound
     * @return {?}
     */
    ListItemComponent.prototype.setSelectedClass = /**
     * @param {?} isFound
     * @return {?}
     */
    function (isFound) {
        var _a;
        if (isFound) {
            if (!this.firstInitializer) {
                this.expanded = true;
            }
            this.isSelected = this.nodeConfiguration.highlightOnSelect || this.selectedNode.items === undefined ? true : false;
        }
        else {
            this.isSelected = false;
            if (this.nodeConfiguration.collapseOnSelect) {
                this.expanded = false;
            }
        }
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = this.isSelected,
            _a[CONSTANT.ACTIVE_ITEM_CLASS_NAME] = this.selectedNode.id === this.node.id,
            _a[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled,
            _a["level-" + this.level + "-submenulevel-" + this.submenuLevel] = true,
            _a);
        this.setClasses();
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getPaddingAtStart = /**
     * @return {?}
     */
    function () {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getListStyle = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var styles = {
            background: CONSTANT.DEFAULT_LIST_BACKGROUND_COLOR,
            color: CONSTANT.DEFAULT_LIST_FONT_COLOR
        };
        if (this.nodeConfiguration.listBackgroundColor !== null) {
            styles.background = this.nodeConfiguration.listBackgroundColor;
        }
        if (this.isSelected) {
            this.nodeConfiguration.selectedListFontColor !== null ?
                styles.color = this.nodeConfiguration.selectedListFontColor : styles.color = CONSTANT.DEFAULT_SELECTED_FONT_COLOR;
        }
        else if (this.nodeConfiguration.fontColor !== null) {
            styles.color = this.nodeConfiguration.fontColor;
        }
        return styles;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ListItemComponent.prototype.getListIcon = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return "icon";
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return "faicon";
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return "imageicon";
        }
        else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
            return "svgicon";
        }
        else {
            return "";
        }
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getSelectedSvgIcon = /**
     * @return {?}
     */
    function () {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getSelectedIcon = /**
     * @return {?}
     */
    function () {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getSelectedFaIcon = /**
     * @return {?}
     */
    function () {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.getSelectedImageIcon = /**
     * @return {?}
     */
    function () {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.hasItems = /**
     * @return {?}
     */
    function () {
        return this.nodeChildren.length > 0 ? true : false;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.isRtlLayout = /**
     * @return {?}
     */
    function () {
        return this.nodeConfiguration.rtlLayout;
    };
    /**
     * @return {?}
     */
    ListItemComponent.prototype.setClasses = /**
     * @return {?}
     */
    function () {
        var _a;
        this.classes = (_a = {},
            _a["level-" + (this.level + 1)] = true,
            _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
            _a);
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ListItemComponent.prototype.expand = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        if (node.disabled) {
            return;
        }
        this.expanded = !this.expanded;
        this.firstInitializer = true;
        this.setClasses();
        if (this.nodeConfiguration.interfaceWithRoute !== null
            && this.nodeConfiguration.interfaceWithRoute
            && node.link !== undefined
            && node.link) {
            if (node.externalRedirect !== undefined && node.externalRedirect) {
                window.location.href = node.link;
            }
            else {
                this.router.navigate([node.link], node.navigationExtras);
            }
        }
        else if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    ListItemComponent.prototype.selectedListItem = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        this.selectedItem.emit(node);
    };
    ListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-list-item',
                    template: "<mat-list-item matRipple [matRippleDisabled]=\"node.disabled\" [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\"\r\n  (click)=\"expand(node)\" title=\"{{node.label}}\"\r\n  [ngStyle]=\"getListStyle()\">\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{getSelectedIcon()}}\r\n      </mat-icon>\r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\" alt=\"{{node.label}}\"/>\r\n    </div>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n    [nodeConfiguration]='nodeConfiguration'\r\n    [node]=\"singleNode.value\"\r\n    [level]=\"level + 1\"\r\n    [submenuLevel]=\"singleNode.key\"\r\n    [selectedNode]='selectedNode'\r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n",
                    animations: [
                        trigger('slideInOut', [
                            state('in', style({ height: '*', opacity: 0 })),
                            transition(':leave', [
                                style({ height: '*', opacity: 0.2 }),
                                group([
                                    animate(200, style({ height: 0 })),
                                    animate('200ms ease-out', style({ opacity: 0 }))
                                ])
                            ]),
                            transition(':enter', [
                                style({ height: '0', opacity: 0 }),
                                group([
                                    animate(200, style({ height: '*' })),
                                    animate('400ms ease-out', style({ opacity: 1 }))
                                ])
                            ])
                        ]),
                        trigger('isExpandedLTR', [
                            state('no', style({ transform: 'rotate(-90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(200)),
                            transition('yes => no', animate(200))
                        ]),
                        trigger('isExpandedRTL', [
                            state('no', style({ transform: 'rotate(90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(200)),
                            transition('yes => no', animate(200))
                        ])
                    ],
                    styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:-webkit-box;display:flex;-webkit-box-pack:start;justify-content:flex-start;height:48px}.disabled-amml-item{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}.amml-svg-icon{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container{direction:ltr;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
                }] }
    ];
    /** @nocollapse */
    ListItemComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
    ListItemComponent.propDecorators = {
        node: [{ type: Input }],
        level: [{ type: Input }],
        submenuLevel: [{ type: Input }],
        selectedNode: [{ type: Input }],
        nodeConfiguration: [{ type: Input }],
        selectedItem: [{ type: Output }]
    };
    return ListItemComponent;
}());
export { ListItemComponent };
if (false) {
    /** @type {?} */
    ListItemComponent.prototype.node;
    /** @type {?} */
    ListItemComponent.prototype.level;
    /** @type {?} */
    ListItemComponent.prototype.submenuLevel;
    /** @type {?} */
    ListItemComponent.prototype.selectedNode;
    /** @type {?} */
    ListItemComponent.prototype.nodeConfiguration;
    /** @type {?} */
    ListItemComponent.prototype.selectedItem;
    /** @type {?} */
    ListItemComponent.prototype.isSelected;
    /** @type {?} */
    ListItemComponent.prototype.nodeChildren;
    /** @type {?} */
    ListItemComponent.prototype.classes;
    /** @type {?} */
    ListItemComponent.prototype.selectedListClasses;
    /** @type {?} */
    ListItemComponent.prototype.expanded;
    /** @type {?} */
    ListItemComponent.prototype.firstInitializer;
    /**
     * @type {?}
     * @private
     */
    ListItemComponent.prototype.router;
    /** @type {?} */
    ListItemComponent.prototype.multilevelMenuService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUlyRTtJQTJERSwyQkFDVSxNQUFjLEVBQ2YscUJBQTRDOztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWI1QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN2QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFJbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLdkIsSUFBSSxDQUFDLG1CQUFtQjtZQUN0QixHQUFDLFFBQVEsQ0FBQyx1QkFBdUIsSUFBRyxJQUFJO1lBQ3hDLEdBQUMsUUFBUSxDQUFDLHdCQUF3QixJQUFHLEtBQUs7WUFDMUMsR0FBQyxRQUFRLENBQUMsc0JBQXNCLElBQUcsS0FBSztlQUN6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RUFBRSxDQUFDLENBQUM7NEJBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUM7NEJBRW5ELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjs0QkFDRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7eUJBQ0YsQ0FBQztxQkFDSDs7aUJBQ0Y7Ozs7Z0JBcERRLE1BQU07Z0JBR04scUJBQXFCOzs7dUJBbUQzQixLQUFLO3dCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLO29DQUNMLEtBQUs7K0JBQ0wsTUFBTTs7SUEwSlQsd0JBQUM7Q0FBQSxBQTlNRCxJQThNQztTQWhLWSxpQkFBaUI7OztJQUM1QixpQ0FBK0I7O0lBQy9CLGtDQUFtQjs7SUFDbkIseUNBQTBCOztJQUMxQix5Q0FBdUM7O0lBQ3ZDLDhDQUFpRDs7SUFDakQseUNBQTZEOztJQUM3RCx1Q0FBbUI7O0lBQ25CLHlDQUFnQzs7SUFDaEMsb0NBQXNDOztJQUN0QyxnREFBa0Q7O0lBQ2xELHFDQUFpQjs7SUFDakIsNkNBQXlCOzs7OztJQUV2QixtQ0FBc0I7O0lBQ3RCLGtEQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIGdyb3VwLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi8uLi9hcHAubW9kZWwnO1xyXG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctbGlzdC1pdGVtJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9saXN0LWl0ZW0uY29tcG9uZW50LmNzcyddLFxyXG4gIGFuaW1hdGlvbnM6IFtcclxuICAgIHRyaWdnZXIoJ3NsaWRlSW5PdXQnLCBbXHJcbiAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAgfSkpLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMC4yIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogMCB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCcyMDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKSxcclxuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnMCcsIG9wYWNpdHk6IDAgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgyMDAsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSlcclxuICAgIF0pLFxyXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZExUUicsIFtcclxuICAgICAgc3RhdGUoJ25vJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoLTkwZGVnKScgfSkpLFxyXG4gICAgICBzdGF0ZSgneWVzJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLCB9KSksXHJcblxyXG4gICAgICB0cmFuc2l0aW9uKCdubyA9PiB5ZXMnLFxyXG4gICAgICAgIGFuaW1hdGUoMjAwKVxyXG4gICAgICApLFxyXG4gICAgICB0cmFuc2l0aW9uKCd5ZXMgPT4gbm8nLFxyXG4gICAgICAgIGFuaW1hdGUoMjAwKVxyXG4gICAgICApXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRSVEwnLCBbXHJcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScgfSkpLFxyXG4gICAgICBzdGF0ZSgneWVzJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoMGRlZyknLCB9KSksXHJcblxyXG4gICAgICB0cmFuc2l0aW9uKCdubyA9PiB5ZXMnLFxyXG4gICAgICAgIGFuaW1hdGUoMjAwKVxyXG4gICAgICApLFxyXG4gICAgICB0cmFuc2l0aW9uKCd5ZXMgPT4gbm8nLFxyXG4gICAgICAgIGFuaW1hdGUoMjAwKVxyXG4gICAgICApXHJcbiAgICBdKVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc3VibWVudUxldmVsID0gMDtcclxuICBASW5wdXQoKSBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIGlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgc2VsZWN0ZWRMaXN0Q2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBleHBhbmRlZCA9IGZhbHNlO1xyXG4gIGZpcnN0SW5pdGlhbGl6ZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwdWJsaWMgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcclxuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcclxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IGZhbHNlLFxyXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLm5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXRlbXMgPyB0aGlzLm5vZGUuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKSA6IFtdO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWxlY3RlZE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZENsYXNzKHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLnJlY3Vyc2l2ZUNoZWNrSWQodGhpcy5ub2RlLCB0aGlzLnNlbGVjdGVkTm9kZS5pZCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdID0gdGhpcy5ub2RlLmRpc2FibGVkO1xyXG5cclxuICAgIGlmICh0aGlzLm5vZGUuZmFJY29uICE9PSBudWxsICYmXHJcbiAgICAgIHRoaXMubm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0aGlzLm5vZGUuZmFJY29uLm1hdGNoKC9cXGJmYVxcdyg/IS0pLykgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5ub2RlLmZhSWNvbiA9IGBmYXMgJHt0aGlzLm5vZGUuZmFJY29ufWA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdID0gdHJ1ZTtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5ub2RlLmV4cGFuZGVkID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgdGhpcy5leHBhbmRlZCA9IHRoaXMubm9kZS5leHBhbmRlZDtcclxuICAgIH1cclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBzZXRTZWxlY3RlZENsYXNzKGlzRm91bmQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChpc0ZvdW5kKSB7XHJcbiAgICAgIGlmICghdGhpcy5maXJzdEluaXRpYWxpemVyKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5oaWdobGlnaHRPblNlbGVjdCB8fCB0aGlzLnNlbGVjdGVkTm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcclxuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcclxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IHRoaXMuaXNTZWxlY3RlZCxcclxuICAgICAgW0NPTlNUQU5ULkFDVElWRV9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLnNlbGVjdGVkTm9kZS5pZCA9PT0gdGhpcy5ub2RlLmlkLFxyXG4gICAgICBbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5ub2RlLmRpc2FibGVkLFxyXG4gICAgICBbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF06IHRydWUsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZyB7XHJcbiAgICBpZiAobm9kZS5pY29uICE9PSBudWxsICYmIG5vZGUuaWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5mYUljb24gIT09IG51bGwgJiYgbm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmZhSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBmYWljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLmltYWdlSWNvbiAhPT0gbnVsbCAmJiBub2RlLmltYWdlSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaW1hZ2VJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYGltYWdlaWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuc3ZnSWNvbiAhPT0gbnVsbCAmJiBub2RlLnN2Z0ljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLnN2Z0ljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgc3ZnaWNvbmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYGA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFNlbGVjdGVkU3ZnSWNvbigpIHtcclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZVN2Z0ljb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVTdmdJY29uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5zdmdJY29uO1xyXG4gIH1cclxuICBnZXRTZWxlY3RlZEljb24oKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlSWNvbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm5vZGUuaWNvbjtcclxuICB9XHJcbiAgZ2V0U2VsZWN0ZWRGYUljb24oKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVGYUljb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVGYUljb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlLmZhSWNvbjtcclxuICB9XHJcbiAgZ2V0U2VsZWN0ZWRJbWFnZUljb24oKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVJbWFnZUljb24pIHtcclxuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVJbWFnZUljb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlLmltYWdlSWNvbjtcclxuICB9XHJcbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5ydGxMYXlvdXQ7XHJcbiAgfVxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsICsgMX1gXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIGlmIChub2RlLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgICAmJiBub2RlLmxpbmtcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10sIG5vZGUubmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9kZS5vblNlbGVjdGVkICYmIHR5cGVvZiBub2RlLm9uU2VsZWN0ZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChub2RlKTtcclxuICB9XHJcbn1cclxuIl19