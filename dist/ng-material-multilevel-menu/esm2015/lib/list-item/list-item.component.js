import { __decorate, __metadata } from "tslib";
import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT } from './../constants';
import { MultilevelMenuService } from './../multilevel-menu.service';
let ListItemComponent = class ListItemComponent {
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
    ngOnChanges() {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
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
};
ListItemComponent.ctorParameters = () => [
    { type: Router },
    { type: MultilevelMenuService }
];
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "level", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "submenuLevel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "selectedNode", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "nodeConfiguration", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "selectedItem", void 0);
ListItemComponent = __decorate([
    Component({
        selector: 'ng-list-item',
        template: "<mat-list-item matRipple \r\n  *ngIf=\"!node.hidden\"\r\n  title=\"{{node.label}}\"\r\n  [matRippleDisabled]=\"node.disabled\" \r\n  [ngClass]=\"selectedListClasses\"\r\n  [ngStyle]=\"getListStyle()\"\r\n  (click)=\"expand(node)\">\r\n  <ng-container *ngTemplateOutlet=\"linkTemplate\"></ng-container>\r\n</mat-list-item>\r\n\r\n<mat-divider></mat-divider>\r\n\r\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\r\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\r\n    [nodeConfiguration]='nodeConfiguration' \r\n    [node]=\"singleNode.value\" \r\n    [level]=\"level + 1\"\r\n    [submenuLevel]=\"singleNode.key\"\r\n    [selectedNode]='selectedNode' \r\n    (selectedItem)=\"selectedListItem($event)\">\r\n  </ng-list-item>\r\n</div>\r\n\r\n<ng-template #linkTemplate>\r\n  <a class=\"anml-link\" *ngIf=\"node.externalRedirect\" [href]=\"node.link\" [target]=\"getHrefTargetType()\">\r\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\r\n  </a>\r\n  <a class=\"anml-link\" *ngIf=\"!node.externalRedirect\" [routerLink]=\"node.link\">\r\n    <ng-container *ngTemplateOutlet=\"linkLabelOutlet\"></ng-container>\r\n  </a>\r\n</ng-template>\r\n\r\n<ng-template #linkLabelOutlet>\r\n  <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\r\n    <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\r\n      <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\r\n        <i [ngClass]=\"getSelectedFaIcon()\"></i>\r\n      </span>\r\n      <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\r\n        {{getSelectedIcon()}}\r\n      </mat-icon>\r\n      <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\r\n      </mat-icon>\r\n      <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\r\n        alt=\"{{node.label}}\" />\r\n    </div>\r\n    <span class=\"label\">{{node.label}}</span>\r\n  </div>\r\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\r\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n    <mat-icon *ngIf='isRtlLayout()' [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\r\n      keyboard_arrow_down\r\n    </mat-icon>\r\n  </div>\r\n</ng-template>",
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
        styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-link{width:100%;display:flex;justify-content:flex-start;text-transform:capitalize;text-decoration:none;color:inherit}.anml-data{width:100%;height:48px;display:flex;justify-content:flex-start}.disabled-amml-item{opacity:.5;text-decoration:none;pointer-events:none}.icon-container{display:flex;flex-direction:column;justify-content:center}.amml-icon-fa{font-size:20px}.label{line-height:48px;font-weight:400}.amml-svg-icon{width:22px;height:22px;margin-top:-12px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}"]
    }),
    __metadata("design:paramtypes", [Router,
        MultilevelMenuService])
], ListItemComponent);
export { ListItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWtEckUsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFhNUIsWUFDVSxNQUFjLEVBQ2YscUJBQTRDO1FBRDNDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBYjVDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUVqQixzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO1FBQ3ZDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDN0QsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUluQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUt2QixJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekIsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsRUFBRSxJQUFJO1lBQ3hDLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUUsS0FBSztZ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QVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUN2QixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxjQUFjLEdBQUcsQ0FBQyxDQUFDO2dCQUVuRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7Z0JBQ0QsVUFBVSxDQUFDLFdBQVcsRUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNiO2FBQ0YsQ0FBQztTQUNIOztLQUNGLENBQUM7cUNBZWtCLE1BQU07UUFDUSxxQkFBcUI7R0FmMUMsaUJBQWlCLENBa0s3QjtTQWxLWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBncm91cCwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBDb25maWd1cmF0aW9uLCBMaXN0U3R5bGUsIE11bHRpbGV2ZWxOb2RlcyB9IGZyb20gJy4vLi4vYXBwLm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuLy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xyXG5cclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWxpc3QtaXRlbScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGlzdC1pdGVtLmNvbXBvbmVudC5jc3MnXSxcclxuICBhbmltYXRpb25zOiBbXHJcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xyXG4gICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7IGhlaWdodDogJyonLCBvcGFjaXR5OiAwIH0pKSxcclxuICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xyXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcclxuICAgICAgICBncm91cChbXHJcbiAgICAgICAgICBhbmltYXRlKDIwMCwgc3R5bGUoeyBoZWlnaHQ6IDAgfSkpLFxyXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXHJcbiAgICAgICAgXSlcclxuICAgICAgXSksXHJcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IGhlaWdodDogJzAnLCBvcGFjaXR5OiAwIH0pLFxyXG4gICAgICAgIGdyb3VwKFtcclxuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcclxuICAgICAgICAgIGFuaW1hdGUoJzQwMG1zIGVhc2Utb3V0Jywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICAgIF0pXHJcbiAgICAgIF0pXHJcbiAgICBdKSxcclxuICAgIHRyaWdnZXIoJ2lzRXhwYW5kZWRMVFInLCBbXHJcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKVxyXG4gICAgXSksXHJcbiAgICB0cmlnZ2VyKCdpc0V4cGFuZGVkUlRMJywgW1xyXG4gICAgICBzdGF0ZSgnbm8nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknIH0pKSxcclxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxyXG5cclxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKSxcclxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcclxuICAgICAgICBhbmltYXRlKDIwMClcclxuICAgICAgKVxyXG4gICAgXSlcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcclxuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbGV2ZWwgPSAxO1xyXG4gIEBJbnB1dCgpIHN1Ym1lbnVMZXZlbCA9IDA7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XHJcbiAgQElucHV0KCkgbm9kZUNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcclxuICBpc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgbm9kZUNoaWxkcmVuOiBNdWx0aWxldmVsTm9kZXNbXTtcclxuICBjbGFzc2VzOiB7IFtpbmRleDogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZXhwYW5kZWQgPSBmYWxzZTtcclxuICBmaXJzdEluaXRpYWxpemVyID0gZmFsc2U7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgICAgW0NPTlNUQU5ULkFDVElWRV9JVEVNX0NMQVNTX05BTUVdOiBmYWxzZSxcclxuICAgIH07XHJcbiAgfVxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlQ2hpbGRyZW4gPSB0aGlzLm5vZGUgJiYgdGhpcy5ub2RlLml0ZW1zID8gdGhpcy5ub2RlLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbikgOiBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc2V0U2VsZWN0ZWRDbGFzcyh0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5yZWN1cnNpdmVDaGVja0lkKHRoaXMubm9kZSwgdGhpcy5zZWxlY3RlZE5vZGUuaWQpKTtcclxuICAgIH1cclxuICB9XHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXSA9IHRoaXMubm9kZS5kaXNhYmxlZDtcclxuXHJcbiAgICBpZiAodGhpcy5ub2RlLmZhSWNvbiAhPT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLm5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgdGhpcy5ub2RlLmZhSWNvbi5tYXRjaCgvXFxiZmFcXHcoPyEtKS8pID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubm9kZS5mYUljb24gPSBgZmFzICR7dGhpcy5ub2RlLmZhSWNvbn1gO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tgbGV2ZWwtJHt0aGlzLmxldmVsfS1zdWJtZW51bGV2ZWwtJHt0aGlzLnN1Ym1lbnVMZXZlbH1gXSA9IHRydWU7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMubm9kZS5leHBhbmRlZCA9PT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm5vZGUuZXhwYW5kZWQ7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICB9XHJcbiAgc2V0U2VsZWN0ZWRDbGFzcyhpc0ZvdW5kOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoaXNGb3VuZCkge1xyXG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXMgPSB7XHJcbiAgICAgIFtDT05TVEFOVC5ERUZBVUxUX0xJU1RfQ0xBU1NfTkFNRV06IHRydWUsXHJcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXHJcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5zZWxlY3RlZE5vZGUuaWQgPT09IHRoaXMubm9kZS5pZCxcclxuICAgICAgW0NPTlNUQU5ULkRJU0FCTEVEX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMubm9kZS5kaXNhYmxlZCxcclxuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xyXG4gIH1cclxuICBnZXRQYWRkaW5nQXRTdGFydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnBhZGRpbmdBdFN0YXJ0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBnZXRMaXN0U3R5bGUoKTogTGlzdFN0eWxlIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IHtcclxuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXHJcbiAgICAgIGNvbG9yOiBDT05TVEFOVC5ERUZBVUxUX0xJU1RfRk9OVF9DT0xPUlxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmJhY2tncm91bmQgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3I7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yICE9PSBudWxsID9cclxuICAgICAgICBzdHlsZXMuY29sb3IgPSB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciA6IHN0eWxlcy5jb2xvciA9IENPTlNUQU5ULkRFRkFVTFRfU0VMRUNURURfRk9OVF9DT0xPUjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcclxuICAgICAgc3R5bGVzLmNvbG9yID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3I7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3R5bGVzO1xyXG4gIH1cclxuICBnZXRMaXN0SWNvbihub2RlOiBNdWx0aWxldmVsTm9kZXMpOiBzdHJpbmcge1xyXG4gICAgaWYgKG5vZGUuaWNvbiAhPT0gbnVsbCAmJiBub2RlLmljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgaWNvbmA7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuZmFJY29uICE9PSBudWxsICYmIG5vZGUuZmFJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5mYUljb24gIT09ICcnKSB7XHJcbiAgICAgIHJldHVybiBgZmFpY29uYDtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5pbWFnZUljb24gIT09IG51bGwgJiYgbm9kZS5pbWFnZUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmltYWdlSWNvbiAhPT0gJycpIHtcclxuICAgICAgcmV0dXJuIGBpbWFnZWljb25gO1xyXG4gICAgfSBlbHNlIGlmIChub2RlLnN2Z0ljb24gIT09IG51bGwgJiYgbm9kZS5zdmdJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5zdmdJY29uICE9PSAnJykge1xyXG4gICAgICByZXR1cm4gYHN2Z2ljb25gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGBgO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRTZWxlY3RlZFN2Z0ljb24oKSB7XHJcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkICYmIHRoaXMubm9kZS5hY3RpdmVTdmdJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlU3ZnSWNvbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLm5vZGUuc3ZnSWNvbjtcclxuICB9XHJcbiAgZ2V0U2VsZWN0ZWRJY29uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlSWNvbikge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmFjdGl2ZUljb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlLmljb247XHJcbiAgfVxyXG4gIGdldFNlbGVjdGVkRmFJY29uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlRmFJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlRmFJY29uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5mYUljb247XHJcbiAgfVxyXG4gIGdldFNlbGVjdGVkSW1hZ2VJY29uKCkge1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlSW1hZ2VJY29uKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlSW1hZ2VJY29uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMubm9kZS5pbWFnZUljb247XHJcbiAgfVxyXG4gIGdldEhyZWZUYXJnZXRUeXBlKCkge1xyXG4gICAgaWYgKHRoaXMubm9kZS5ocmVmVGFyZ2V0VHlwZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5ub2RlLmhyZWZUYXJnZXRUeXBlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfSFJFRl9UQVJHRVRfVFlQRTtcclxuICB9XHJcbiAgaGFzSXRlbXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgaXNSdGxMYXlvdXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5ydGxMYXlvdXQ7XHJcbiAgfVxyXG4gIHNldENsYXNzZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzZXMgPSB7XHJcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsICsgMX1gXTogdHJ1ZSxcclxuICAgICAgJ2FtbWwtc3VibWVudSc6IHRoaXMuaGFzSXRlbXMoKSAmJiB0aGlzLmdldFBhZGRpbmdBdFN0YXJ0KClcclxuICAgIH07XHJcbiAgfVxyXG4gIGV4cGFuZChub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcclxuICAgIGlmIChub2RlLmRpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZXhwYW5kZWQgPSAhdGhpcy5leHBhbmRlZDtcclxuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XHJcbiAgICB0aGlzLnNldENsYXNzZXMoKTtcclxuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gbnVsbFxyXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxyXG4gICAgICAmJiBub2RlLmxpbmsgIT09IHVuZGVmaW5lZFxyXG4gICAgICAmJiBub2RlLmxpbmtcclxuICAgICkge1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbbm9kZS5saW5rXSwgbm9kZS5uYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH0gZWxzZSBpZiAobm9kZS5vblNlbGVjdGVkICYmIHR5cGVvZiBub2RlLm9uU2VsZWN0ZWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgbm9kZS5vblNlbGVjdGVkKG5vZGUpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0obm9kZSk7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZExpc3RJdGVtKG5vZGUpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RlZExpc3RJdGVtKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChub2RlKTtcclxuICB9XHJcbn1cclxuIl19