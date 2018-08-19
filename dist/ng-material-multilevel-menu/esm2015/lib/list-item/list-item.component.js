/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, state, group } from '@angular/animations';
import { MultilevelMenuService } from './../multilevel-menu.service';
import { CONSTANT } from './../constants';
export class ListItemComponent {
    /**
     * @param {?} router
     * @param {?} multilevelMenuService
     */
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.nodeConfiguration = null;
        this.selectedItem = new EventEmitter();
        this.isSelected = false;
        this.expanded = false;
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: false,
        };
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    }
    /**
     * @param {?} isFound
     * @return {?}
     */
    setSelectedClass(isFound) {
        if (isFound) {
            this.isSelected = true;
            this.expanded = true;
        }
        else {
            this.isSelected = false;
        }
        this.selectedListClasses = {
            [CONSTANT.DEFAULT_LIST_CLASS_NAME]: true,
            [CONSTANT.SELECTED_LIST_CLASS_NAME]: this.isSelected,
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
     * @return {?}
     */
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    /**
     * @return {?}
     */
    setClasses() {
        this.classes = {
            ['level-' + this.level]: true,
            'amml-submenu': this.hasItems() && this.expanded && this.getPaddingAtStart()
        };
    }
    /**
     * @param {?} node
     * @return {?}
     */
    expand(node) {
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
                template: `<mat-list-item matRipple [ngClass]="selectedListClasses" *ngIf="!node.hidden" (click)="expand(node)"
  [ngStyle]="getListStyle()">
  <div class="anml-data">
    <span *ngIf="node.faIcon" class="amml-icon amml-icon-fa">
      <i [ngClass]="node.faIcon"></i>
    </span>
    <mat-icon *ngIf="node.icon" class="amml-icon">
      {{node.icon}}
    </mat-icon>
    <span class="label">{{node.label}}</span>
  </div>
  <mat-icon *ngIf='hasItems()' [@isExpanded]="hasItems() && expanded ? 'yes' : 'no'">
    keyboard_arrow_down
  </mat-icon>
</mat-list-item>

<mat-divider></mat-divider>

<div *ngIf="hasItems() && expanded" [@slideInOut] [ngClass]="classes">
  <ng-list-item *ngFor="let singleNode of nodeChildren" 
    [nodeConfiguration]='nodeConfiguration' 
    [node]='singleNode' 
    [level]="level + 1"
    [selectedNode]='selectedNode'
    (selectedItem)="selectedListItem($event)">
  </ng-list-item>
</div>
`,
                styles: [`.amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:start;height:48px}.amml-icon{line-height:48px;margin-right:15px}.amml-icon-fa{font-size:20px}.label{line-height:48px}.amml-submenu{margin-left:16px}`],
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
ListItemComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
ListItemComponent.propDecorators = {
    node: [{ type: Input }],
    level: [{ type: Input }],
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBZ0UxQyxNQUFNOzs7OztJQVdKLFlBQ1UsUUFDQTtRQURBLFdBQU0sR0FBTixNQUFNO1FBQ04sMEJBQXFCLEdBQXJCLHFCQUFxQjtxQkFYZCxDQUFDO2lDQUUwQixJQUFJOzRCQUN2QixJQUFJLFlBQVksRUFBbUI7MEJBQy9DLEtBQUs7d0JBSVAsS0FBSztRQUtkLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUN6QixDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLElBQUk7WUFDeEMsQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRSxLQUFLO1NBQzNDLENBQUM7S0FDSDs7OztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDckc7S0FDRjs7Ozs7SUFDRCxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDdEI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQ3pCLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsSUFBSTtZQUN4QyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQ3JELENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7S0FDbkI7Ozs7SUFDRCxpQkFBaUI7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDN0Q7Ozs7SUFDRCxZQUFZOztRQUNWLE1BQU0sTUFBTSxHQUFHO1lBQ2IsVUFBVSxFQUFFLFFBQVEsQ0FBQyw2QkFBNkI7WUFDbEQsS0FBSyxFQUFFLFFBQVEsQ0FBQyx1QkFBdUI7U0FDeEMsQ0FBQztRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDO1NBQ2hFO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsMkJBQTJCLENBQUM7U0FDckg7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztTQUNqRDtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDZjs7OztJQUNELFFBQVE7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztLQUNwRDs7OztJQUNELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUk7WUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtTQUM3RSxDQUFDO0tBQ0g7Ozs7O0lBQ0QsTUFBTSxDQUFDLElBQXFCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEtBQUssSUFBSTtlQUNqRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCO2VBQ3pDLElBQUksQ0FBQyxJQUFJLEtBQUssU0FDbkIsQ0FBQyxDQUFDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtLQUNGOzs7OztJQUNELGdCQUFnQixDQUFDLElBQXFCO1FBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzlCOzs7WUFuSkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxnU0FBZ1MsQ0FBQztnQkFDMVMsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxZQUFZLEVBQUU7d0JBQ3BCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDL0MsVUFBVSxDQUFDLFFBQVEsRUFBRTs0QkFDbkIsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7NEJBQ3BDLEtBQUssQ0FBQztnQ0FDSixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dDQUNsQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7NkJBQ2pELENBQUM7eUJBQ0gsQ0FBQzt3QkFDRixVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs0QkFDbEMsS0FBSyxDQUFDO2dDQUNKLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ3BDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDakQsQ0FBQzt5QkFDSCxDQUFDO3FCQUNILENBQUM7b0JBQ0YsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDcEIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDO3dCQUVuRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7d0JBQ0QsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO3FCQUNGLENBQUM7aUJBQ0g7YUFDRjs7OztZQXJFUSxNQUFNO1lBR04scUJBQXFCOzs7bUJBb0UzQixLQUFLO29CQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDTCxLQUFLOzJCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBzdGF0ZSwgZ3JvdXAgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuXHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzLCBMaXN0U3R5bGUgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UIH0gZnJvbSAnLi8uLi9jb25zdGFudHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1saXN0LWl0ZW0nLFxyXG4gIHRlbXBsYXRlOiBgPG1hdC1saXN0LWl0ZW0gbWF0UmlwcGxlIFtuZ0NsYXNzXT1cInNlbGVjdGVkTGlzdENsYXNzZXNcIiAqbmdJZj1cIiFub2RlLmhpZGRlblwiIChjbGljayk9XCJleHBhbmQobm9kZSlcIlxyXG4gIFtuZ1N0eWxlXT1cImdldExpc3RTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cImFubWwtZGF0YVwiPlxyXG4gICAgPHNwYW4gKm5nSWY9XCJub2RlLmZhSWNvblwiIGNsYXNzPVwiYW1tbC1pY29uIGFtbWwtaWNvbi1mYVwiPlxyXG4gICAgICA8aSBbbmdDbGFzc109XCJub2RlLmZhSWNvblwiPjwvaT5cclxuICAgIDwvc3Bhbj5cclxuICAgIDxtYXQtaWNvbiAqbmdJZj1cIm5vZGUuaWNvblwiIGNsYXNzPVwiYW1tbC1pY29uXCI+XHJcbiAgICAgIHt7bm9kZS5pY29ufX1cclxuICAgIDwvbWF0LWljb24+XHJcbiAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPG1hdC1pY29uICpuZ0lmPSdoYXNJdGVtcygpJyBbQGlzRXhwYW5kZWRdPVwiaGFzSXRlbXMoKSAmJiBleHBhbmRlZCA/ICd5ZXMnIDogJ25vJ1wiPlxyXG4gICAga2V5Ym9hcmRfYXJyb3dfZG93blxyXG4gIDwvbWF0LWljb24+XHJcbjwvbWF0LWxpc3QtaXRlbT5cclxuXHJcbjxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxyXG5cclxuPGRpdiAqbmdJZj1cImhhc0l0ZW1zKCkgJiYgZXhwYW5kZWRcIiBbQHNsaWRlSW5PdXRdIFtuZ0NsYXNzXT1cImNsYXNzZXNcIj5cclxuICA8bmctbGlzdC1pdGVtICpuZ0Zvcj1cImxldCBzaW5nbGVOb2RlIG9mIG5vZGVDaGlsZHJlblwiIFxyXG4gICAgW25vZGVDb25maWd1cmF0aW9uXT0nbm9kZUNvbmZpZ3VyYXRpb24nIFxyXG4gICAgW25vZGVdPSdzaW5nbGVOb2RlJyBcclxuICAgIFtsZXZlbF09XCJsZXZlbCArIDFcIlxyXG4gICAgW3NlbGVjdGVkTm9kZV09J3NlbGVjdGVkTm9kZSdcclxuICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXCI+XHJcbiAgPC9uZy1saXN0LWl0ZW0+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuYW1tbC1pdGVte2xpbmUtaGVpZ2h0OjQ4cHg7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXJ9LmFubWwtZGF0YXt3aWR0aDoxMDAlO3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzdGFydDtoZWlnaHQ6NDhweH0uYW1tbC1pY29ue2xpbmUtaGVpZ2h0OjQ4cHg7bWFyZ2luLXJpZ2h0OjE1cHh9LmFtbWwtaWNvbi1mYXtmb250LXNpemU6MjBweH0ubGFiZWx7bGluZS1oZWlnaHQ6NDhweH0uYW1tbC1zdWJtZW51e21hcmdpbi1sZWZ0OjE2cHh9YF0sXHJcbiAgYW5pbWF0aW9uczogW1xyXG4gICAgdHJpZ2dlcignc2xpZGVJbk91dCcsIFtcclxuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwLjIgfSksXHJcbiAgICAgICAgZ3JvdXAoW1xyXG4gICAgICAgICAgYW5pbWF0ZSgzMDAsIHN0eWxlKHsgaGVpZ2h0OiAwIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzIwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pLFxyXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXHJcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6ICcqJyB9KSksXHJcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICBdKVxyXG4gICAgICBdKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9KSksXHJcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcclxuXHJcbiAgICAgIHRyYW5zaXRpb24oJ25vID0+IHllcycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgICksXHJcbiAgICAgIHRyYW5zaXRpb24oJ3llcyA9PiBubycsXHJcbiAgICAgICAgYW5pbWF0ZSgzMDApXHJcbiAgICAgIClcclxuICAgIF0pXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IE11bHRpbGV2ZWxOb2RlcztcclxuICBASW5wdXQoKSBsZXZlbCA9IDE7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICBwcml2YXRlIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xyXG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxyXG4gICAgICBbQ09OU1RBTlQuU0VMRUNURURfTElTVF9DTEFTU19OQU1FXTogdGhpcy5pc1NlbGVjdGVkLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXHJcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cclxuICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA6IHN0eWxlcy5jb2xvciA9IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuICBoYXNJdGVtcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc2VzID0ge1xyXG4gICAgICBbJ2xldmVsLScgKyB0aGlzLmxldmVsXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmV4cGFuZGVkICYmIHRoaXMuZ2V0UGFkZGluZ0F0U3RhcnQoKVxyXG4gICAgfTtcclxuICB9XHJcbiAgZXhwYW5kKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xyXG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XHJcbiAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGxcclxuICAgICAgJiYgdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGVcclxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcclxuICAgICkge1xyXG4gICAgICBpZiAobm9kZS5leHRlcm5hbFJlZGlyZWN0ICE9PSB1bmRlZmluZWQgJiYgbm9kZS5leHRlcm5hbFJlZGlyZWN0KSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBub2RlLmxpbms7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdGVkTGlzdEl0ZW0obm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xyXG4gIH1cclxufVxyXG4iXX0=