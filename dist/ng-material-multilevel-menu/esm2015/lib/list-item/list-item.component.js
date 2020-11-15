import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExpandCollapseStatusEnum } from './../app.model';
import { CONSTANT } from './../constants';
import { MultilevelMenuService } from './../multilevel-menu.service';
export class ListItemComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.level = 1;
        this.submenuLevel = 0;
        this.nodeConfiguration = null;
        this.nodeExpandCollapseStatus = null;
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
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
        this.setExpandCollapseStatus();
    }
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
    getPaddingAtStart() {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    }
    getListStyle() {
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
    getSelectedSvgIcon() {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    }
    getSelectedIcon() {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    }
    getSelectedFaIcon() {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    }
    getSelectedImageIcon() {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    }
    getHrefTargetType() {
        if (this.node.hrefTargetType) {
            return this.node.hrefTargetType;
        }
        return CONSTANT.DEFAULT_HREF_TARGET_TYPE;
    }
    hasItems() {
        return this.nodeChildren.length > 0 ? true : false;
    }
    isRtlLayout() {
        return this.nodeConfiguration.rtlLayout;
    }
    setClasses() {
        this.classes = {
            [`level-${this.level + 1}`]: true,
            'amml-submenu': this.hasItems() && this.getPaddingAtStart()
        };
    }
    setExpandCollapseStatus() {
        if (this.nodeExpandCollapseStatus !== null && this.nodeExpandCollapseStatus !== undefined) {
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.expand) {
                this.expanded = true;
            }
            if (this.nodeExpandCollapseStatus === ExpandCollapseStatusEnum.collapse) {
                this.expanded = false;
            }
        }
    }
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
            this.router.navigate([node.link], node.navigationExtras);
        }
        else if (node.onSelected && typeof node.onSelected === 'function') {
            node.onSelected(node);
            this.selectedListItem(node);
        }
        else if (node.items === undefined || this.nodeConfiguration.collapseOnSelect) {
            this.selectedListItem(node);
        }
    }
    selectedListItem(node) {
        this.selectedItem.emit(node);
    }
}
ListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-list-item',
                template: "<mat-list-item matRipple \n  *ngIf=\"!node.hidden\"\n  title=\"{{node.label}}\"\n  [matRippleDisabled]=\"node.disabled\" \n  [ngClass]=\"selectedListClasses\"\n  [ngStyle]=\"getListStyle()\"\n  (click)=\"expand(node)\">\n  <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\n</mat-list-item>\n\n<mat-divider *ngIf=\"nodeConfiguration.useDividers\"></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n    [nodeConfiguration]='nodeConfiguration' \n    [node]=\"singleNode.value\" \n    [level]=\"level + 1\"\n    [submenuLevel]=\"singleNode.key\"\n    [selectedNode]='selectedNode' \n    [nodeExpandCollapseStatus]='nodeExpandCollapseStatus'\n    (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n\n<ng-template #linkTemplate>\n  <a class=\"anml-link\" *ngIf=\"node.externalRedirect\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\n  </a>\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect\" [routerLink]=\"node.link\">\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\n  </a>\n</ng-template>\n\n<ng-template #linkLabelOutlet>\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\n      </span>\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n        {{getSelectedIcon()}}\n      </mat-icon>\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\n      </mat-icon>\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\n        alt=\"{{node.label}}\" />\n    </div>\n    <span class=\"label\">{{node.label}}</span>\n  </div>\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()' [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</ng-template>",
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
                styles: [".amml-item{cursor:pointer;line-height:48px;position:relative}.anml-link{color:inherit;text-decoration:none;text-transform:capitalize}.anml-data,.anml-link{display:flex;justify-content:flex-start;width:100%}.anml-data{height:48px}.disabled-amml-item{opacity:.5;pointer-events:none;text-decoration:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{font-weight:400;line-height:48px}.amml-svg-icon{height:22px;margin-top:-12px;width:22px}.amml-icon-arrow-container{align-items:center;direction:ltr;display:flex}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
            },] }
];
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
    nodeExpandCollapseStatus: [{ type: Input }],
    selectedItem: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQTZDLHdCQUF3QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBa0RyRSxNQUFNLE9BQU8saUJBQWlCO0lBYzVCLFlBQ1UsTUFBYyxFQUNmLHFCQUE0QztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWQ1QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN4Qyw2QkFBd0IsR0FBNkIsSUFBSSxDQUFDO1FBQ3pELGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDN0QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUluQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUt2QixJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekIs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SyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDO3dCQUVuRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7d0JBQ0QsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO3FCQUNGLENBQUM7b0JBQ0YsT0FBTyxDQUFDLGVBQWUsRUFBRTt3QkFDdkIsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzt3QkFDbEQsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxHQUFHLENBQUMsQ0FBQzt3QkFFbkQsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO3dCQUNELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjtxQkFDRixDQUFDO2lCQUNIOzthQUNGOzs7WUFwRFEsTUFBTTtZQUdOLHFCQUFxQjs7O21CQW1EM0IsS0FBSztvQkFDTCxLQUFLOzJCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDTCxLQUFLO3VDQUNMLEtBQUs7MkJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIGdyb3VwLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24sIExpc3RTdHlsZSwgTXVsdGlsZXZlbE5vZGVzLCBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbGlzdC1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpc3QtaXRlbS5jb21wb25lbnQuY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogMCB9KSksXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSksXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZExUUicsIFtcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcblxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcbiAgICAgICAgYW5pbWF0ZSgyMDApXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcbiAgICAgICAgYW5pbWF0ZSgyMDApXG4gICAgICApXG4gICAgXSksXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZFJUTCcsIFtcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScgfSkpLFxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxuXG4gICAgICB0cmFuc2l0aW9uKCdubyA9PiB5ZXMnLFxuICAgICAgICBhbmltYXRlKDIwMClcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCd5ZXMgPT4gbm8nLFxuICAgICAgICBhbmltYXRlKDIwMClcbiAgICAgIClcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gIEBJbnB1dCgpIGxldmVsID0gMTtcbiAgQElucHV0KCkgc3VibWVudUxldmVsID0gMDtcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgQElucHV0KCkgbm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzOiBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0gPSBudWxsO1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRJdGVtID0gbmV3IEV2ZW50RW1pdHRlcjxNdWx0aWxldmVsTm9kZXM+KCk7XG4gIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcbiAgY2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcbiAgc2VsZWN0ZWRMaXN0Q2xhc3NlczogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfTtcbiAgZXhwYW5kZWQgPSBmYWxzZTtcbiAgZmlyc3RJbml0aWFsaXplciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHB1YmxpYyBtdWx0aWxldmVsTWVudVNlcnZpY2U6IE11bHRpbGV2ZWxNZW51U2VydmljZVxuICApIHtcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XG4gICAgICBbQ09OU1RBTlQuREVGQVVMVF9MSVNUX0NMQVNTX05BTUVdOiB0cnVlLFxuICAgICAgW0NPTlNUQU5ULlNFTEVDVEVEX0xJU1RfQ0xBU1NfTkFNRV06IGZhbHNlLFxuICAgICAgW0NPTlNUQU5ULkFDVElWRV9JVEVNX0NMQVNTX05BTUVdOiBmYWxzZSxcbiAgICB9O1xuICB9XG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubm9kZUNoaWxkcmVuID0gdGhpcy5ub2RlICYmIHRoaXMubm9kZS5pdGVtcyA/IHRoaXMubm9kZS5pdGVtcy5maWx0ZXIobiA9PiAhbi5oaWRkZW4pIDogW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWROb2RlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5zZWxlY3RlZE5vZGUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcbiAgICB9XG4gICAgdGhpcy5zZXRFeHBhbmRDb2xsYXBzZVN0YXR1cygpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdID0gdGhpcy5ub2RlLmRpc2FibGVkO1xuXG4gICAgaWYgKHRoaXMubm9kZS5mYUljb24gIT09IG51bGwgJiZcbiAgICAgIHRoaXMubm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdGhpcy5ub2RlLmZhSWNvbi5tYXRjaCgvXFxiZmFcXHcoPyEtKS8pID09PSBudWxsKSB7XG4gICAgICB0aGlzLm5vZGUuZmFJY29uID0gYGZhcyAke3RoaXMubm9kZS5mYUljb259YDtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF0gPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5ub2RlLmV4cGFuZGVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm5vZGUuZXhwYW5kZWQ7XG4gICAgfVxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xuICB9XG4gIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChpc0ZvdW5kKSB7XG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuc2VsZWN0ZWROb2RlLmlkID09PSB0aGlzLm5vZGUuaWQsXG4gICAgICBbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5ub2RlLmRpc2FibGVkLFxuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdOiB0cnVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gIH1cbiAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZSB7XG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXG4gICAgICBjb2xvcjogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1JcbiAgICB9O1xuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCA/XG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZyB7XG4gICAgaWYgKG5vZGUuaWNvbiAhPT0gbnVsbCAmJiBub2RlLmljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmljb24gIT09ICcnKSB7XG4gICAgICByZXR1cm4gYGljb25gO1xuICAgIH0gZWxzZSBpZiAobm9kZS5mYUljb24gIT09IG51bGwgJiYgbm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmZhSWNvbiAhPT0gJycpIHtcbiAgICAgIHJldHVybiBgZmFpY29uYDtcbiAgICB9IGVsc2UgaWYgKG5vZGUuaW1hZ2VJY29uICE9PSBudWxsICYmIG5vZGUuaW1hZ2VJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5pbWFnZUljb24gIT09ICcnKSB7XG4gICAgICByZXR1cm4gYGltYWdlaWNvbmA7XG4gICAgfSBlbHNlIGlmIChub2RlLnN2Z0ljb24gIT09IG51bGwgJiYgbm9kZS5zdmdJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5zdmdJY29uICE9PSAnJykge1xuICAgICAgcmV0dXJuIGBzdmdpY29uYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBgO1xuICAgIH1cbiAgfVxuICBnZXRTZWxlY3RlZFN2Z0ljb24oKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlU3ZnSWNvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVTdmdJY29uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2RlLnN2Z0ljb247XG4gIH1cbiAgZ2V0U2VsZWN0ZWRJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUljb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlSWNvbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9kZS5pY29uO1xuICB9XG4gIGdldFNlbGVjdGVkRmFJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUZhSWNvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVGYUljb247XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vZGUuZmFJY29uO1xuICB9XG4gIGdldFNlbGVjdGVkSW1hZ2VJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUltYWdlSWNvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVJbWFnZUljb247XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vZGUuaW1hZ2VJY29uO1xuICB9XG4gIGdldEhyZWZUYXJnZXRUeXBlKCkge1xuICAgIGlmICh0aGlzLm5vZGUuaHJlZlRhcmdldFR5cGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuaHJlZlRhcmdldFR5cGU7XG4gICAgfVxuICAgIHJldHVybiBDT05TVEFOVC5ERUZBVUxUX0hSRUZfVEFSR0VUX1RZUEU7XG4gIH1cbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucnRsTGF5b3V0O1xuICB9XG4gIHNldENsYXNzZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jbGFzc2VzID0ge1xuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWwgKyAxfWBdOiB0cnVlLFxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcbiAgICB9O1xuICB9XG4gIHNldEV4cGFuZENvbGxhcHNlU3RhdHVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyAhPT0gbnVsbCAmJiB0aGlzLm5vZGVFeHBhbmRDb2xsYXBzZVN0YXR1cyAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgaWYgKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID09PSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0uZXhwYW5kKSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubm9kZUV4cGFuZENvbGxhcHNlU3RhdHVzID09PSBFeHBhbmRDb2xsYXBzZVN0YXR1c0VudW0uY29sbGFwc2UpIHtcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XG4gICAgaWYgKG5vZGUuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcbiAgICAgICYmIG5vZGUubGlua1xuICAgICkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW25vZGUubGlua10sIG5vZGUubmF2aWdhdGlvbkV4dHJhcyk7XG4gICAgfSBlbHNlIGlmIChub2RlLm9uU2VsZWN0ZWQgJiYgdHlwZW9mIG5vZGUub25TZWxlY3RlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5pdGVtcyA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uY29sbGFwc2VPblNlbGVjdCkge1xuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xuICAgIH1cbiAgfVxuICBzZWxlY3RlZExpc3RJdGVtKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmVtaXQobm9kZSk7XG4gIH1cbn1cbiJdfQ==