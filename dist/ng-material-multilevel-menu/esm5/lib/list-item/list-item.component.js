/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
        this.firstInitializer = false;
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
        this.classes = (_a = {},
            _a['level-' + this.level] = true,
            _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
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
        this.firstInitializer = true;
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
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
        else if (node.onSelected) {
            node.onSelected(node);
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
                    template: "<mat-list-item matRipple [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\" (click)=\"expand(node)\" title=\"{{node.label}}\"\n  [ngStyle]=\"getListStyle()\">\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"node.faIcon\"></i>\n      </span>\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n        {{node.icon}}\n      </mat-icon>\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{node.imageIcon}}\" alt=\"{{node.label}}\"/>\n    </div>    \n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <ng-container *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"hasItems() && expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()'  [@isExpandedRTL]=\"hasItems() && expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </ng-container>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren\"\n    [nodeConfiguration]='nodeConfiguration'\n    [node]='singleNode'\n    [level]=\"level + 1\"\n    [selectedNode]='selectedNode'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
                    styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"],
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
                        trigger('isExpandedLTR', [
                            state('no', style({ transform: 'rotate(-90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(300)),
                            transition('yes => no', animate(300))
                        ]),
                        trigger('isExpandedRTL', [
                            state('no', style({ transform: 'rotate(90deg)' })),
                            state('yes', style({ transform: 'rotate(0deg)', })),
                            transition('no => yes', animate(300)),
                            transition('yes => no', animate(300))
                        ])
                    ]
                },] },
    ];
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
    /** @type {?} */
    ListItemComponent.prototype.router;
    /** @type {?} */
    ListItemComponent.prototype.multilevelMenuService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTFDO0lBNkZFLDJCQUNVLE1BQWMsRUFDZCxxQkFBNEM7UUFENUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFaN0MsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUVWLHNCQUFpQixHQUFrQixJQUFJLENBQUM7UUFDdkMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3RCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBSW5CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBS3ZCLElBQUksQ0FBQyxtQkFBbUI7WUFDdEIsR0FBQyxRQUFRLENBQUMsdUJBQXVCLElBQUcsSUFBSTtZQUN4QyxHQUFDLFFBQVEsQ0FBQyx3QkFBd0IsSUFBRyxLQUFLO2VBQzNDLENBQUM7O0lBQ0osQ0FBQzs7OztJQUNELHVDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFB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akQseUNBQTZEOztJQUM3RCx1Q0FBbUI7O0lBQ25CLHlDQUFnQzs7SUFDaEMsb0NBQXNDOztJQUN0QyxnREFBa0Q7O0lBQ2xELHFDQUFpQjs7SUFDakIsNkNBQXlCOztJQUV2QixtQ0FBc0I7O0lBQ3RCLGtEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgdHJpZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUsIHN0YXRlLCBncm91cCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHsgTXVsdGlsZXZlbE1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi9tdWx0aWxldmVsLW1lbnUuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBNdWx0aWxldmVsTm9kZXMsIExpc3RTdHlsZSB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGU6IGA8bWF0LWxpc3QtaXRlbSBtYXRSaXBwbGUgW25nQ2xhc3NdPVwic2VsZWN0ZWRMaXN0Q2xhc3Nlc1wiICpuZ0lmPVwiIW5vZGUuaGlkZGVuXCIgKGNsaWNrKT1cImV4cGFuZChub2RlKVwiIHRpdGxlPVwie3tub2RlLmxhYmVsfX1cIlxyXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiIFtkaXJdPVwiaXNSdGxMYXlvdXQoKSA/ICdydGwnIDogJ2x0cidcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiIFtuZ1N3aXRjaF09XCJnZXRMaXN0SWNvbihub2RlKVwiPlxyXG4gICAgICA8c3BhbiAqbmdTd2l0Y2hDYXNlPVwiJ2ZhaWNvbidcIiBjbGFzcz1cImFtbWwtaWNvbiBhbW1sLWljb24tZmFcIj5cclxuICAgICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8bWF0LWljb24gKm5nU3dpdGNoQ2FzZT1cIidpY29uJ1wiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgICAge3tub2RlLmljb259fVxyXG4gICAgICA8L21hdC1pY29uPlxyXG4gICAgICA8aW1nIG1hdExpc3RBdmF0YXIgKm5nU3dpdGNoQ2FzZT1cIidpbWFnZWljb24nXCIgY2xhc3M9XCJhbW1sLWljb25cIiBzcmM9XCJ7e25vZGUuaW1hZ2VJY29ufX1cIiBhbHQ9XCJ7e25vZGUubGFiZWx9fVwiLz5cclxuICAgIDwvZGl2PiAgICBcclxuICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj57e25vZGUubGFiZWx9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPSdoYXNJdGVtcygpJz5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj0nIWlzUnRsTGF5b3V0KCknIFtAaXNFeHBhbmRlZExUUl09XCJoYXNJdGVtcygpICYmIGV4cGFuZGVkID8gJ3llcycgOiAnbm8nXCI+XHJcbiAgICAgIGtleWJvYXJkX2Fycm93X2Rvd25cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8bWF0LWljb24gKm5nSWY9J2lzUnRsTGF5b3V0KCknICBbQGlzRXhwYW5kZWRSVExdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAgICBrZXlib2FyZF9hcnJvd19kb3duXHJcbiAgICA8L21hdC1pY29uPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG48L21hdC1saXN0LWl0ZW0+XHJcblxyXG48bWF0LWRpdmlkZXI+PC9tYXQtZGl2aWRlcj5cclxuXHJcbjxkaXYgKm5nSWY9XCJoYXNJdGVtcygpICYmIGV4cGFuZGVkXCIgW0BzbGlkZUluT3V0XSBbZGlyXT1cImlzUnRsTGF5b3V0KCkgPyAncnRsJyA6ICdsdHInXCIgW25nQ2xhc3NdPVwiY2xhc3Nlc1wiPlxyXG4gIDxuZy1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IHNpbmdsZU5vZGUgb2Ygbm9kZUNoaWxkcmVuXCJcclxuICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWd1cmF0aW9uJ1xyXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJ1xyXG4gICAgW2xldmVsXT1cImxldmVsICsgMVwiXHJcbiAgICBbc2VsZWN0ZWROb2RlXT0nc2VsZWN0ZWROb2RlJ1xyXG4gICAgKHNlbGVjdGVkSXRlbSk9XCJzZWxlY3RlZExpc3RJdGVtKCRldmVudClcIj5cclxuICA8L25nLWxpc3QtaXRlbT5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5hbW1sLWl0ZW17bGluZS1oZWlnaHQ6NDhweDtwb3NpdGlvbjpyZWxhdGl2ZTtjdXJzb3I6cG9pbnRlcn0uYW5tbC1kYXRhe3dpZHRoOjEwMCU7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZTtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnN0YXJ0O2hlaWdodDo0OHB4fS5hbW1sLWljb24tZmF7Zm9udC1zaXplOjIwcHh9LmFtbWwtaWNvbiwubGFiZWx7bGluZS1oZWlnaHQ6NDhweH1kaXZbZGlyPWx0cl0gLmFtbWwtaWNvbnttYXJnaW4tcmlnaHQ6MTZweH1kaXZbZGlyPWx0cl0uYW1tbC1zdWJtZW51LGRpdltkaXI9cnRsXSAuYW1tbC1pY29ue21hcmdpbi1sZWZ0OjE2cHh9ZGl2W2Rpcj1ydGxdLmFtbWwtc3VibWVudXttYXJnaW4tcmlnaHQ6MTZweH1gXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xyXG4gICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwIH0pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDMwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzAnLCBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRMVFInLCBbXHJcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkUlRMJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDMwMClcclxuICAgICAgKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbm9kZTogTXVsdGlsZXZlbE5vZGVzO1xyXG4gIEBJbnB1dCgpIGxldmVsID0gMTtcclxuICBASW5wdXQoKSBzZWxlY3RlZE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBub2RlQ29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xyXG4gIGlzU2VsZWN0ZWQgPSBmYWxzZTtcclxuICBub2RlQ2hpbGRyZW46IE11bHRpbGV2ZWxOb2Rlc1tdO1xyXG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgc2VsZWN0ZWRMaXN0Q2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBleHBhbmRlZCA9IGZhbHNlO1xyXG4gIGZpcnN0SW5pdGlhbGl6ZXIgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgfVxyXG4gIGdldFBhZGRpbmdBdFN0YXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGdldExpc3RTdHlsZSgpOiBMaXN0U3R5bGUge1xyXG4gICAgY29uc3Qgc3R5bGVzID0ge1xyXG4gICAgICBiYWNrZ3JvdW5kOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfQkFDS0dST1VORF9DT0xPUixcclxuICAgICAgY29sb3I6IENPTlNUQU5ULkRFRkFVTFRfTElTVF9GT05UX0NPTE9SXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ubGlzdEJhY2tncm91bmRDb2xvcjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgP1xyXG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmZvbnRDb2xvcjtcclxuICAgIH1cclxuICAgIHJldHVybiBzdHlsZXM7XHJcbiAgfVxyXG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZyB7XHJcbiAgICBpZiAobm9kZS5pY29uICE9PSBudWxsICYmIG5vZGUuaWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5mYUljb24gIT09IG51bGwgJiYgbm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmZhSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBmYWljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLmltYWdlSWNvbiAhPT0gbnVsbCAmJiBub2RlLmltYWdlSWNvbiAhPT0gdW5kZWZpbmVkICYmIG5vZGUuaW1hZ2VJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYGltYWdlaWNvbmA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYGA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucnRsTGF5b3V0O1xyXG4gIH1cclxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc2VzID0ge1xyXG4gICAgICBbJ2xldmVsLScgKyB0aGlzLmxldmVsXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgKSB7XHJcbiAgICAgIGlmIChub2RlLmV4dGVybmFsUmVkaXJlY3QgIT09IHVuZGVmaW5lZCAmJiBub2RlLmV4dGVybmFsUmVkaXJlY3QpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG5vZGUubGluaztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUub25TZWxlY3RlZCkge1xyXG4gICAgICBub2RlLm9uU2VsZWN0ZWQobm9kZSk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==