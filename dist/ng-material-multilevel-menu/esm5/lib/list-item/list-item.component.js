/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { MultilevelMenuService } from './../multilevel-menu.service';
import { CONSTANT } from './../constants';
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(router, multilevelMenuService) {
        var _a;
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
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
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(function (n) { return !n.hidden; }) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
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
            _a['level-' + this.level] = true,
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
                this.router.navigate([node.link]);
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
                    template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\" title=\"{{node.label}}\"\r\n  [ngStyle]=\"getListStyle()\">\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"node.faIcon\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{node.icon}}\r\n      </mat-icon>      \r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{node.svgIcon}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{node.imageIcon}}\" alt=\"{{node.label}}\"/>\r\n    </div>    \r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <ng-container *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"hasItems() && expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"hasItems() && expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </ng-container>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\"\r\n    [nodeConfiguration]='nodeConfiguration'\r\n    [node]='singleNode'\r\n    [level]=\"level + 1\"\r\n    [selectedNode]='selectedNode'\r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n",
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
                    styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start;height:48px}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}.amml-svg-icon{line-height:57px;width:22px;height:22px}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
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
    /**
     * @type {?}
     * @private
     */
    ListItemComponent.prototype.multilevelMenuService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDO0lBMERFLDJCQUNVLE1BQWMsRUFDZCxxQkFBNEM7O1FBRDVDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBWjdDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFFVixzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDN0QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUluQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUt2QixJQUFJLENBQUMsbUJBQW1CO1lBQ3RCLEdBQUMsUUFBUSxDQUFDLHVCQUF1QixJQUFHLElBQUk7WUFDeEMsR0FBQyxRQUFRLENBQUMsd0JBQXdCLElBQUcsS0FBSztZQUMxQyxHQUFDLFFBQVEsQ0FBQyxzQkFBc0IsSUFBRyxLQUFLO2VBQ3pDLENBQUM7SUFDSixDQUFDOzs7O0lBQ0QsdUNB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LENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDOzRCQUVuRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7NEJBQ0QsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO3lCQUNGLENBQUM7d0JBQ0YsT0FBTyxDQUFDLGVBQWUsRUFBRTs0QkFDdkIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzs0QkFDbEQsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQzs0QkFFbkQsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiOzRCQUNELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjt5QkFDRixDQUFDO3FCQUNIOztpQkFDRjs7OztnQkFyRFEsTUFBTTtnQkFHTixxQkFBcUI7Ozt1QkFvRDNCLEtBQUs7d0JBQ0wsS0FBSzsrQkFDTCxLQUFLO29DQUNMLEtBQUs7K0JBQ0wsTUFBTTs7SUE4R1Qsd0JBQUM7Q0FBQSxBQWpLRCxJQWlLQztTQW5IWSxpQkFBaUI7OztJQUM1QixpQ0FBK0I7O0lBQy9CLGtDQUFtQjs7SUFDbkIseUNBQXVDOztJQUN2Qyw4Q0FBaUQ7O0lBQ2pELHlDQUE2RDs7SUFDN0QsdUNBQW1COztJQUNuQix5Q0FBZ0M7O0lBQ2hDLG9DQUFzQzs7SUFDdEMsZ0RBQWtEOztJQUNsRCxxQ0FBaUI7O0lBQ2pCLDZDQUF5Qjs7Ozs7SUFFdkIsbUNBQXNCOzs7OztJQUN0QixrREFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBzdGF0ZSwgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBMaXN0U3R5bGUgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1saXN0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xpc3QtaXRlbS5jb21wb25lbnQuY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgyMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkTFRSJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgIClcclxuICAgIF0pLFxyXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZFJUTCcsIFtcclxuICAgICAgc3RhdGUoJ25vJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBmaXJzdEluaXRpYWxpemVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHJpdmF0ZSBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZE5vZGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkTm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkQ2xhc3ModGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UucmVjdXJzaXZlQ2hlY2tJZCh0aGlzLm5vZGUsIHRoaXMuc2VsZWN0ZWROb2RlLmlkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGlzRm91bmQpIHtcclxuICAgICAgaWYgKCF0aGlzLmZpcnN0SW5pdGlhbGl6ZXIpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmhpZ2hsaWdodE9uU2VsZWN0IHx8IHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuc2VsZWN0ZWROb2RlLmlkID09PSB0aGlzLm5vZGUuaWQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZyB7XHJcbiAgICBpZiAobm9kZS5pY29uICE9PSBudWxsICYmIG5vZGUuaWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5mYUljb24gIT09IG51bGwgJiYgbm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmZhSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBmYWljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLmltYWdlSWNvbiAhPT0gbnVsbCAmJiBub2RlLmltYWdlSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaW1hZ2VJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYGltYWdlaWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuc3ZnSWNvbiAhPT0gbnVsbCAmJiBub2RlLnN2Z0ljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLnN2Z0ljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgc3ZnaWNvbmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYGA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucnRsTGF5b3V0O1xyXG4gIH1cclxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc2VzID0ge1xyXG4gICAgICBbJ2xldmVsLScgKyB0aGlzLmxldmVsXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgICAmJiBub2RlLmxpbmtcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUub25TZWxlY3RlZCAmJiB0eXBlb2Ygbm9kZS5vblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLml0ZW1zID09PSB1bmRlZmluZWQgfHwgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==