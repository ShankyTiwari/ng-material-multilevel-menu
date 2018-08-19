/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { MultilevelMenuService } from './../multilevel-menu.service';
import { CONSTANT } from './../constants';
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = false,
            _a);
        var _a;
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
        if (isFound) {
            this.isSelected = true;
            this.expanded = true;
        }
        else {
            this.isSelected = false;
        }
        this.selectedListClasses = (_a = {},
            _a[CONSTANT.DEFAULT_LIST_CLASS_NAME] = true,
            _a[CONSTANT.SELECTED_LIST_CLASS_NAME] = this.isSelected,
            _a);
        this.setClasses();
        var _a;
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
    ListItemComponent.prototype.setClasses = /**
     * @return {?}
     */
    function () {
        this.classes = (_a = {},
            _a['level-' + this.level] = true,
            _a['amml-submenu'] = this.hasItems() && this.expanded && this.getPaddingAtStart(),
            _a);
        var _a;
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
        this.setClasses();
        if (this.nodeConfiguration.interfaceWithRoute !== null
            && this.nodeConfiguration.interfaceWithRoute
            && node.link !== undefined) {
            if (node.externalRedirect !== undefined && node.externalRedirect) {
                window.location.href = node.link;
            }
            else {
                this.router.navigate([node.link]);
            }
        }
        else if (node.items === undefined) {
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
                    template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\">\n    <span *ngIf=\"node.faIcon\" class=\"amml-icon amml-icon-fa\">\n      <i [ngClass]=\"node.faIcon\"></i>\n    </span>\n    <mat-icon *ngIf=\"node.icon\" class=\"amml-icon\">\n      {{node.icon}}\n    </mat-icon>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <mat-icon *ngIf='hasItems()' [@isExpanded]=\"hasItems() && expanded ? 'yes' : 'no'\">\n    keyboard_arrow_down\n  </mat-icon>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\" \n    [nodeConfiguration]='nodeConfiguration' \n    [node]='singleNode' \n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
                    styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.label{line-height:48px}.amml-submenu{margin-left:16px}"],
                    animations: [
                        trigger('slideInOut', [
                            state('in', style({ height: '*', opacity: 0 })),
                            transition(':leave', [
                                style({ height: '*', opacity: 0.2 }),
                                group([
                                    animate(300, style({ height: 0 })),
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
                        trigger('isExpanded', [
                            state('no', style({ transform: 'rotate(-90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(300)),
                            transition('yes => no', animate(300))
                        ])
                    ]
                },] },
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
    ListItemComponent.prototype.router;
    /** @type {?} */
    ListItemComponent.prototype.multilevelMenuService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQTJFeEMsMkJBQ1UsUUFDQTtRQURBLFdBQU0sR0FBTixNQUFNO1FBQ04sMEJBQXFCLEdBQXJCLHFCQUFxQjtxQkFYZCxDQUFDO2lDQUUwQixJQUFJOzRCQUN2QixJQUFJLFlBQVksRUFBbUI7MEJBQy9DLEtBQUs7d0JBSVAsS0FBSztRQUtkLElBQUksQ0FBQyxtQkFBbUI7WUFDdEIsR0FBQyxRQUFRLENBQUMsdUJBQXVCLElBQUcsSUFBSTtZQUN4QyxHQUFDLFFBQVEsQ0FBQyx3QkFBd0IsSUFBRyxLQUFLO2VBQzNDLENBQUM7O0tBQ0g7Ozs7SUFDRCx1Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLE1BQU0s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QUNMLEtBQUs7b0NBQ0wsS0FBSzsrQkFDTCxNQUFNOzs0QkE1RVQ7O1NBdUVhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIHN0YXRlLCBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMsIExpc3RTdHlsZSB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGUgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCIgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiXHJcbiAgW25nU3R5bGVdPVwiZ2V0TGlzdFN0eWxlKClcIj5cclxuICA8ZGl2IGNsYXNzPVwiYW5tbC1kYXRhXCI+XHJcbiAgICA8c3BhbiAqbmdJZj1cIm5vZGUuZmFJY29uXCIgY2xhc3M9XCJhbW1sLWljb24gYW1tbC1pY29uLWZhXCI+XHJcbiAgICAgIDxpIFtuZ0NsYXNzXT1cIm5vZGUuZmFJY29uXCI+PC9pPlxyXG4gICAgPC9zcGFuPlxyXG4gICAgPG1hdC1pY29uICpuZ0lmPVwibm9kZS5pY29uXCIgY2xhc3M9XCJhbW1sLWljb25cIj5cclxuICAgICAge3tub2RlLmljb259fVxyXG4gICAgPC9tYXQtaWNvbj5cclxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57e25vZGUubGFiZWx9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8bWF0LWljb24gKm5nSWY9J2hhc0l0ZW1zKCknIFtAaXNFeHBhbmRlZF09XCJoYXNJdGVtcygpICYmIGV4cGFuZGVkID8gJ3llcycgOiAnbm8nXCI+XHJcbiAgICBrZXlib2FyZF9hcnJvd19kb3duXHJcbiAgPC9tYXQtaWNvbj5cclxuPC9tYXQtbGlzdC1pdGVtPlxyXG5cclxuPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XHJcblxyXG48ZGl2ICpuZ0lmPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZFwiIFtAc2xpZGVJbk91dF0gW25nQ2xhc3NdPVwiY2xhc3Nlc1wiPlxyXG4gIDxuZy1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IHNpbmdsZU5vZGUgb2Ygbm9kZUNoaWxkcmVuXCIgXHJcbiAgICBbbm9kZUNvbmZpZ3VyYXRpb25dPSdub2RlQ29uZmlndXJhdGlvbicgXHJcbiAgICBbbm9kZV09J3NpbmdsZU5vZGUnIFxyXG4gICAgW2xldmVsXT1cImxldmVsICsgMVwiXHJcbiAgICBbc2VsZWN0ZWROb2RlXT0nc2VsZWN0ZWROb2RlJ1xyXG4gICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIj5cclxuICA8L25nLWxpc3QtaXRlbT5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcn0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0O2hlaWdodDo0OHB4fS5hbW1sLWljb257bGluZS1oZWlnaHQ6NDhweDttYXJnaW4tcmlnaHQ6MTVweH0uYW1tbC1pY29uLWZhe2ZvbnQtc2l6ZToyMHB4fS5sYWJlbHtsaW5lLWhlaWdodDo0OHB4fS5hbW1sLXN1Ym1lbnV7bWFyZ2luLWxlZnQ6MTZweH1gXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xyXG4gICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwIH0pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDMwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzAnLCBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWQnLCBbXHJcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIEBJbnB1dCgpIGxldmVsID0gMTtcclxuICBASW5wdXQoKSBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIGlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgc2VsZWN0ZWRMaXN0Q2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBleHBhbmRlZCA9IGZhbHNlO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgIHByaXZhdGUgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3NlcyA9IHtcclxuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcclxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IGZhbHNlLFxyXG4gICAgfTtcclxuICB9XHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLm5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXRlbXMgPyB0aGlzLm5vZGUuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKSA6IFtdO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWxlY3RlZE5vZGUgIT09IG51bGwpIHtcclxuICAgICAgdGhpcy5zZXRTZWxlY3RlZENsYXNzKHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLnJlY3Vyc2l2ZUNoZWNrSWQodGhpcy5ub2RlLCB0aGlzLnNlbGVjdGVkTm9kZS5pZCkpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRTZWxlY3RlZENsYXNzKGlzRm91bmQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmIChpc0ZvdW5kKSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFsnbGV2ZWwtJyArIHRoaXMubGV2ZWxdOiB0cnVlLFxyXG4gICAgICAnYW1tbC1zdWJtZW51JzogdGhpcy5oYXNJdGVtcygpICYmIHRoaXMuZXhwYW5kZWQgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpXHJcbiAgICB9O1xyXG4gIH1cclxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgKSB7XHJcbiAgICAgIGlmIChub2RlLmV4dGVybmFsUmVkaXJlY3QgIT09IHVuZGVmaW5lZCAmJiBub2RlLmV4dGVybmFsUmVkaXJlY3QpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG5vZGUubGluaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==