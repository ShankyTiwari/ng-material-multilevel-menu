/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from './../constants';
import { MultilevelMenuService } from './../multilevel-menu.service';
export class ListItemComponent {
    /**
     * @param {?} router
     * @param {?} multilevelMenuService
     */
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.firstInitializer = false;
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: false,
        };
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter((/**
         * @param {?} n
         * @return {?}
         */
        n => !n.hidden)) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selectedListClasses[CONSTANT.DISABLED_ITEM_CLASS_NAME] = this.node.disabled;
        if (this.node.faIcon !== null &&
            this.node.faIcon !== undefined &&
            this.node.faIcon.match(/\bfa\w(?!-)/) === null) {
            this.node.faIcon = `fas ${this.node.faIcon}`;
        }
        this.selectedListClasses[`level-${this.level}-submenulevel-${this.submenuLevel}`] = true;
        if (typeof this.node.expanded === 'boolean') {
            this.expanded = this.node.expanded;
        }
        this.setClasses();
    }
    /**
     * @param {?} isFound
     * @return {?}
     */
    setSelectedClass(isFound) {
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
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
            [CONSTANT.ACTIVE_ITEM_CLASS_NAME]: this.selectedNode.id === this.node.id,
            [CONSTANT.DISABLED_ITEM_CLASS_NAME]: this.node.disabled,
            [`level-${this.level}-submenulevel-${this.submenuLevel}`]: true,
        };
        this.setClasses();
    }
    /**
     * @return {?}
     */
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    }
    /**
     * @return {?}
     */
    getListStyle() {
        /** @type {?} */
        const styles = {
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
    }
    /**
     * @param {?} node
     * @return {?}
     */
    getListIcon(node) {
        if (node.icon !== null && node.icon !== undefined && node.icon !== '') {
            return `icon`;
        }
        else if (node.faIcon !== null && node.faIcon !== undefined && node.faIcon !== '') {
            return `faicon`;
        }
        else if (node.imageIcon !== null && node.imageIcon !== undefined && node.imageIcon !== '') {
            return `imageicon`;
        }
        else if (node.svgIcon !== null && node.svgIcon !== undefined && node.svgIcon !== '') {
            return `svgicon`;
        }
        else {
            return ``;
        }
    }
    /**
     * @return {?}
     */
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    /**
     * @return {?}
     */
    isRtlLayout() {
        return this.nodeConfiguration.rtlLayout;
    }
    /**
     * @return {?}
     */
    setClasses() {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            'amml-submenu': this.hasItems() && this.getPaddingAtStart()
        };
    }
    /**
     * @param {?} node
     * @return {?}
     */
    expand(node) {
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
    }
    /**
     * @param {?} node
     * @return {?}
     */
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
}
ListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-list-item',
                template: "<mat-list-item matRipple [matRippleDisabled]=\"node.disabled\" [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\"\r\n  (click)=\"expand(node)\" title=\"{{node.label}}\"\r\n  [ngStyle]=\"getListStyle()\">\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"node.faIcon\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{node.icon}}\r\n      </mat-icon>\r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{node.svgIcon}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{node.imageIcon}}\" alt=\"{{node.label}}\"/>\r\n    </div>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n    [nodeConfiguration]='nodeConfiguration'\r\n    [node]=\"singleNode.value\"\r\n    [level]=\"level + 1\"\r\n    [submenuLevel]=\"singleNode.key\"\r\n    [selectedNode]='selectedNode'\r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n",
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
ListItemComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
ListItemComponent.propDecorators = {
    node: [{ type: Input }],
    level: [{ type: Input }],
    submenuLevel: [{ type: Input }],
    selectedNode: [{ type: Input }],
    nodeConfiguration: [{ type: Input }],
    selectedItem: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWtEckUsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFhNUIsWUFDVSxNQUFjLEVBQ2YscUJBQTRDO1FBRDNDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBYjVDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDN0QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUluQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUt2QixJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekIsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxJQUFJO1lBQ3hDLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsS0FBSztZQUMxQyxD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QUNELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjtxQkFDRixDQUFDO29CQUNGLE9BQU8sQ0FBQyxlQUFlLEVBQUU7d0JBQ3ZCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7d0JBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUM7d0JBRW5ELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjt3QkFDRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7cUJBQ0YsQ0FBQztpQkFDSDs7YUFDRjs7OztZQXBEUSxNQUFNO1lBR04scUJBQXFCOzs7bUJBbUQzQixLQUFLO29CQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLO2dDQUNMLEtBQUs7MkJBQ0wsTUFBTTs7OztJQUxQLGlDQUErQjs7SUFDL0Isa0NBQW1COztJQUNuQix5Q0FBMEI7O0lBQzFCLHlDQUF1Qzs7SUFDdkMsOENBQWlEOztJQUNqRCx5Q0FBNkQ7O0lBQzdELHVDQUFtQjs7SUFDbkIseUNBQWdDOztJQUNoQyxvQ0FBc0M7O0lBQ3RDLGdEQUFrRDs7SUFDbEQscUNBQWlCOztJQUNqQiw2Q0FBeUI7Ozs7O0lBRXZCLG1DQUFzQjs7SUFDdEIsa0RBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgZ3JvdXAsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTGlzdFN0eWxlLCBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuLy4uL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcclxuXHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1saXN0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xpc3QtaXRlbS5jb21wb25lbnQuY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgyMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkTFRSJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgIClcclxuICAgIF0pLFxyXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZFJUTCcsIFtcclxuICAgICAgc3RhdGUoJ25vJywgc3R5bGUoeyB0cmFuc2Zvcm06ICdyb3RhdGUoOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgyMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgbm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIEBJbnB1dCgpIGxldmVsID0gMTtcclxuICBASW5wdXQoKSBzdWJtZW51TGV2ZWwgPSAwO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkTm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcclxuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XHJcbiAgaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVzW107XHJcbiAgY2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBzZWxlY3RlZExpc3RDbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGV4cGFuZGVkID0gZmFsc2U7XHJcbiAgZmlyc3RJbml0aWFsaXplciA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZE5vZGUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnNlbGVjdGVkTm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnNldFNlbGVjdGVkQ2xhc3ModGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UucmVjdXJzaXZlQ2hlY2tJZCh0aGlzLm5vZGUsIHRoaXMuc2VsZWN0ZWROb2RlLmlkKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV0gPSB0aGlzLm5vZGUuZGlzYWJsZWQ7XHJcblxyXG4gICAgaWYgKHRoaXMubm9kZS5mYUljb24gIT09IG51bGwgJiZcclxuICAgICAgdGhpcy5ub2RlLmZhSWNvbiAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgIHRoaXMubm9kZS5mYUljb24ubWF0Y2goL1xcYmZhXFx3KD8hLSkvKSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm5vZGUuZmFJY29uID0gYGZhcyAke3RoaXMubm9kZS5mYUljb259YDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF0gPSB0cnVlO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLm5vZGUuZXhwYW5kZWQgPT09ICdib29sZWFuJykge1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdGhpcy5ub2RlLmV4cGFuZGVkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgaWYgKGlzRm91bmQpIHtcclxuICAgICAgaWYgKCF0aGlzLmZpcnN0SW5pdGlhbGl6ZXIpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmhpZ2hsaWdodE9uU2VsZWN0IHx8IHRoaXMuc2VsZWN0ZWROb2RlLml0ZW1zID09PSB1bmRlZmluZWQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuc2VsZWN0ZWROb2RlLmlkID09PSB0aGlzLm5vZGUuaWQsXHJcbiAgICAgIFtDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdOiB0aGlzLm5vZGUuZGlzYWJsZWQsXHJcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXTogdHJ1ZSxcclxuICAgIH07XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICB9XHJcbiAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5wYWRkaW5nQXRTdGFydCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZSB7XHJcbiAgICBjb25zdCBzdHlsZXMgPSB7XHJcbiAgICAgIGJhY2tncm91bmQ6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9CQUNLR1JPVU5EX0NPTE9SLFxyXG4gICAgICBjb2xvcjogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1JcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yICE9PSBudWxsKSB7XHJcbiAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCA/XHJcbiAgICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgOiBzdHlsZXMuY29sb3IgPSBDT05TVEFOVC5ERUZBVUxUX1NFTEVDVEVEX0ZPTlRfQ09MT1I7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yICE9PSBudWxsKSB7XHJcbiAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0eWxlcztcclxuICB9XHJcbiAgZ2V0TGlzdEljb24obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogc3RyaW5nIHtcclxuICAgIGlmIChub2RlLmljb24gIT09IG51bGwgJiYgbm9kZS5pY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5pY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYGljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLmZhSWNvbiAhPT0gbnVsbCAmJiBub2RlLmZhSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuZmFJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYGZhaWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaW1hZ2VJY29uICE9PSBudWxsICYmIG5vZGUuaW1hZ2VJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5pbWFnZUljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgaW1hZ2VpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5zdmdJY29uICE9PSBudWxsICYmIG5vZGUuc3ZnSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuc3ZnSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBzdmdpY29uYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBgYDtcclxuICAgIH1cclxuICB9XHJcbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5ydGxMYXlvdXQ7XHJcbiAgfVxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsICsgMX1gXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIGlmIChub2RlLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgICAmJiBub2RlLmxpbmtcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUub25TZWxlY3RlZCAmJiB0eXBlb2Ygbm9kZS5vblNlbGVjdGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLml0ZW1zID09PSB1bmRlZmluZWQgfHwgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==