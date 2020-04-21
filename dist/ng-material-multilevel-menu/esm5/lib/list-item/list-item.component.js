import { __decorate, __metadata } from "tslib";
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
    ListItemComponent.prototype.ngOnChanges = function () {
        this.nodeChildren = this.node && this.node.items ? this.node.items.filter(function (n) { return !n.hidden; }) : [];
        if (this.selectedNode !== undefined && this.selectedNode !== null) {
            this.setSelectedClass(this.multilevelMenuService.recursiveCheckId(this.node, this.selectedNode.id));
        }
    };
    ListItemComponent.prototype.ngOnInit = function () {
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
    ListItemComponent.prototype.setSelectedClass = function (isFound) {
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
    ListItemComponent.prototype.getPaddingAtStart = function () {
        return this.nodeConfiguration.paddingAtStart ? true : false;
    };
    ListItemComponent.prototype.getListStyle = function () {
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
    ListItemComponent.prototype.getListIcon = function (node) {
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
    ListItemComponent.prototype.getSelectedSvgIcon = function () {
        if (this.isSelected && this.node.activeSvgIcon) {
            return this.node.activeSvgIcon;
        }
        return this.node.svgIcon;
    };
    ListItemComponent.prototype.getSelectedIcon = function () {
        if (this.isSelected && this.node.activeIcon) {
            return this.node.activeIcon;
        }
        return this.node.icon;
    };
    ListItemComponent.prototype.getSelectedFaIcon = function () {
        if (this.isSelected && this.node.activeFaIcon) {
            return this.node.activeFaIcon;
        }
        return this.node.faIcon;
    };
    ListItemComponent.prototype.getSelectedImageIcon = function () {
        if (this.isSelected && this.node.activeImageIcon) {
            return this.node.activeImageIcon;
        }
        return this.node.imageIcon;
    };
    ListItemComponent.prototype.hasItems = function () {
        return this.nodeChildren.length > 0 ? true : false;
    };
    ListItemComponent.prototype.isRtlLayout = function () {
        return this.nodeConfiguration.rtlLayout;
    };
    ListItemComponent.prototype.setClasses = function () {
        var _a;
        this.classes = (_a = {},
            _a["level-" + (this.level + 1)] = true,
            _a['amml-submenu'] = this.hasItems() && this.getPaddingAtStart(),
            _a);
    };
    ListItemComponent.prototype.expand = function (node) {
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
    ListItemComponent.prototype.selectedListItem = function (node) {
        this.selectedItem.emit(node);
    };
    ListItemComponent.ctorParameters = function () { return [
        { type: Router },
        { type: MultilevelMenuService }
    ]; };
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
            template: "<mat-list-item matRipple [matRippleDisabled]=\"node.disabled\" [ngClass]=\"selectedListClasses\" *ngIf=\"!node.hidden\"\n  (click)=\"expand(node)\" title=\"{{node.label}}\" [ngStyle]=\"getListStyle()\">\n  <a [routerLink]=\"node.link\" class=\"menu-link\">\n    <div class=\"anml-data\" [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\">\n      <div class=\"icon-container\" [ngSwitch]=\"getListIcon(node)\">\n        <span *ngSwitchCase=\"'faicon'\" class=\"amml-icon amml-icon-fa\">\n          <i [ngClass]=\"getSelectedFaIcon()\"></i>\n        </span>\n        <mat-icon *ngSwitchCase=\"'icon'\" class=\"amml-icon\">\n          {{getSelectedIcon()}}\n        </mat-icon>\n        <mat-icon *ngSwitchCase=\"'svgicon'\" svgIcon=\"{{getSelectedSvgIcon()}}\" class=\"amml-icon amml-svg-icon\">\n        </mat-icon>\n        <img matListAvatar *ngSwitchCase=\"'imageicon'\" class=\"amml-icon\" src=\"{{getSelectedImageIcon()}}\"\n          alt=\"{{node.label}}\" />\n      </div>\n      <span class=\"label\">{{node.label}}</span>\n    </div>\n  </a>\n  <div class=\"amml-icon-arrow-container\" *ngIf='hasItems()'>\n    <mat-icon *ngIf='!isRtlLayout()' [@isExpandedLTR]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n    <mat-icon *ngIf='isRtlLayout()' [@isExpandedRTL]=\"expanded ? 'yes' : 'no'\">\n      keyboard_arrow_down\n    </mat-icon>\n  </div>\n</mat-list-item>\n\n<mat-divider></mat-divider>\n\n<div *ngIf=\"hasItems() && expanded\" [@slideInOut] [dir]=\"isRtlLayout() ? 'rtl' : 'ltr'\" [ngClass]=\"classes\">\n  <ng-list-item *ngFor=\"let singleNode of nodeChildren | keyvalue : multilevelMenuService.kvDummyComparerFn\"\n    [nodeConfiguration]='nodeConfiguration' [node]=\"singleNode.value\" [level]=\"level + 1\"\n    [submenuLevel]=\"singleNode.key\" [selectedNode]='selectedNode' (selectedItem)=\"selectedListItem($event)\">\n  </ng-list-item>\n</div>\n",
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
            styles: [".amml-item{line-height:48px;position:relative;cursor:pointer}.anml-data{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start;height:48px}.disabled-amml-item{cursor:not-allowed;opacity:.5;text-decoration:none}.amml-icon-fa{font-size:20px}.amml-icon,.label{line-height:48px}.amml-svg-icon{line-height:57px;width:22px;height:22px}.amml-icon-arrow-container{direction:ltr;display:flex;align-items:center}div[dir=ltr] .amml-icon{margin-right:16px}div[dir=ltr].amml-submenu,div[dir=rtl] .amml-icon{margin-left:16px}div[dir=rtl].amml-submenu{margin-right:16px}.menu-link{text-decoration:none;width:100%;display:flex;align-items:center;color:inherit}"]
        }),
        __metadata("design:paramtypes", [Router,
            MultilevelMenuService])
    ], ListItemComponent);
    return ListItemComponent;
}());
export { ListItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQWtEckU7SUFhRSwyQkFDVSxNQUFjLEVBQ2YscUJBQTRDOztRQUQzQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQWI1QyxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFFakIsc0JBQWlCLEdBQWtCLElBQUksQ0FBQztRQUN2QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBQzdELGVBQVUsR0FBRyxLQUFLLENBQUM7UUFJbkIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLdkIsSUFBSSxDQUFDLG1CQUFtQjtZQUN0QixHQUFDLFFBQVEsQ0FBQyx1QkFBdUIsSUFBRyxJQUFJO1lBQ3hDLEdBQUMsUUFBUSxDQUFDLHdCQUF3QixJQUFHLEtBQUs7WUFDMUMsR0FBQyxRQUFRLENBQUMsc0JBQXNCLElBQUcsS0FBSztlQUN6QyxD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QUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjtpQkFDRixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxlQUFlLEVBQUU7b0JBQ3ZCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7b0JBQ2xELEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUM7b0JBRW5ELFVBQVUsQ0FBQyxXQUFXLEVBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDYjtvQkFDRCxVQUFVLENBQUMsV0FBVyxFQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2I7aUJBQ0YsQ0FBQzthQUNIOztTQUNGLENBQUM7eUNBZWtCLE1BQU07WUFDUSxxQkFBcUI7T0FmMUMsaUJBQWlCLENBZ0s3QjtJQUFELHdCQUFDO0NBQUEsQUFoS0QsSUFnS0M7U0FoS1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgZ3JvdXAsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiwgTGlzdFN0eWxlLCBNdWx0aWxldmVsTm9kZXMgfSBmcm9tICcuLy4uL2FwcC5tb2RlbCc7XG5pbXBvcnQgeyBDT05TVEFOVCB9IGZyb20gJy4vLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IE11bHRpbGV2ZWxNZW51U2VydmljZSB9IGZyb20gJy4vLi4vbXVsdGlsZXZlbC1tZW51LnNlcnZpY2UnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbGlzdC1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpc3QtaXRlbS5jb21wb25lbnQuY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdzbGlkZUluT3V0JywgW1xuICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyBoZWlnaHQ6ICcqJywgb3BhY2l0eTogMCB9KSksXG4gICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgIHN0eWxlKHsgaGVpZ2h0OiAnKicsIG9wYWNpdHk6IDAuMiB9KSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogMCB9KSksXG4gICAgICAgICAgYW5pbWF0ZSgnMjAwbXMgZWFzZS1vdXQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoeyBoZWlnaHQ6ICcwJywgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgZ3JvdXAoW1xuICAgICAgICAgIGFuaW1hdGUoMjAwLCBzdHlsZSh7IGhlaWdodDogJyonIH0pKSxcbiAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlLW91dCcsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSksXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZExUUicsIFtcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKC05MGRlZyknIH0pKSxcbiAgICAgIHN0YXRlKCd5ZXMnLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3JvdGF0ZSgwZGVnKScsIH0pKSxcblxuICAgICAgdHJhbnNpdGlvbignbm8gPT4geWVzJyxcbiAgICAgICAgYW5pbWF0ZSgyMDApXG4gICAgICApLFxuICAgICAgdHJhbnNpdGlvbigneWVzID0+IG5vJyxcbiAgICAgICAgYW5pbWF0ZSgyMDApXG4gICAgICApXG4gICAgXSksXG4gICAgdHJpZ2dlcignaXNFeHBhbmRlZFJUTCcsIFtcbiAgICAgIHN0YXRlKCdubycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScgfSkpLFxuICAgICAgc3RhdGUoJ3llcycsIHN0eWxlKHsgdHJhbnNmb3JtOiAncm90YXRlKDBkZWcpJywgfSkpLFxuXG4gICAgICB0cmFuc2l0aW9uKCdubyA9PiB5ZXMnLFxuICAgICAgICBhbmltYXRlKDIwMClcbiAgICAgICksXG4gICAgICB0cmFuc2l0aW9uKCd5ZXMgPT4gbm8nLFxuICAgICAgICBhbmltYXRlKDIwMClcbiAgICAgIClcbiAgICBdKVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RJdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBub2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gIEBJbnB1dCgpIGxldmVsID0gMTtcbiAgQElucHV0KCkgc3VibWVudUxldmVsID0gMDtcbiAgQElucHV0KCkgc2VsZWN0ZWROb2RlOiBNdWx0aWxldmVsTm9kZXM7XG4gIEBJbnB1dCgpIG5vZGVDb25maWd1cmF0aW9uOiBDb25maWd1cmF0aW9uID0gbnVsbDtcbiAgQE91dHB1dCgpIHNlbGVjdGVkSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXI8TXVsdGlsZXZlbE5vZGVzPigpO1xuICBpc1NlbGVjdGVkID0gZmFsc2U7XG4gIG5vZGVDaGlsZHJlbjogTXVsdGlsZXZlbE5vZGVzW107XG4gIGNsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG4gIHNlbGVjdGVkTGlzdENsYXNzZXM6IHsgW2luZGV4OiBzdHJpbmddOiBib29sZWFuIH07XG4gIGV4cGFuZGVkID0gZmFsc2U7XG4gIGZpcnN0SW5pdGlhbGl6ZXIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwdWJsaWMgbXVsdGlsZXZlbE1lbnVTZXJ2aWNlOiBNdWx0aWxldmVsTWVudVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiBmYWxzZSxcbiAgICAgIFtDT05TVEFOVC5BQ1RJVkVfSVRFTV9DTEFTU19OQU1FXTogZmFsc2UsXG4gICAgfTtcbiAgfVxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm5vZGVDaGlsZHJlbiA9IHRoaXMubm9kZSAmJiB0aGlzLm5vZGUuaXRlbXMgPyB0aGlzLm5vZGUuaXRlbXMuZmlsdGVyKG4gPT4gIW4uaGlkZGVuKSA6IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTm9kZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMuc2VsZWN0ZWROb2RlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLnNldFNlbGVjdGVkQ2xhc3ModGhpcy5tdWx0aWxldmVsTWVudVNlcnZpY2UucmVjdXJzaXZlQ2hlY2tJZCh0aGlzLm5vZGUsIHRoaXMuc2VsZWN0ZWROb2RlLmlkKSk7XG4gICAgfVxuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWRMaXN0Q2xhc3Nlc1tDT05TVEFOVC5ESVNBQkxFRF9JVEVNX0NMQVNTX05BTUVdID0gdGhpcy5ub2RlLmRpc2FibGVkO1xuXG4gICAgaWYgKHRoaXMubm9kZS5mYUljb24gIT09IG51bGwgJiZcbiAgICAgIHRoaXMubm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgdGhpcy5ub2RlLmZhSWNvbi5tYXRjaCgvXFxiZmFcXHcoPyEtKS8pID09PSBudWxsKSB7XG4gICAgICB0aGlzLm5vZGUuZmFJY29uID0gYGZhcyAke3RoaXMubm9kZS5mYUljb259YDtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGVkTGlzdENsYXNzZXNbYGxldmVsLSR7dGhpcy5sZXZlbH0tc3VibWVudWxldmVsLSR7dGhpcy5zdWJtZW51TGV2ZWx9YF0gPSB0cnVlO1xuICAgIGlmICh0eXBlb2YgdGhpcy5ub2RlLmV4cGFuZGVkID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZXhwYW5kZWQgPSB0aGlzLm5vZGUuZXhwYW5kZWQ7XG4gICAgfVxuICAgIHRoaXMuc2V0Q2xhc3NlcygpO1xuICB9XG4gIHNldFNlbGVjdGVkQ2xhc3MoaXNGb3VuZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChpc0ZvdW5kKSB7XG4gICAgICBpZiAoIXRoaXMuZmlyc3RJbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNTZWxlY3RlZCA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaGlnaGxpZ2h0T25TZWxlY3QgfHwgdGhpcy5zZWxlY3RlZE5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5jb2xsYXBzZU9uU2VsZWN0KSB7XG4gICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZExpc3RDbGFzc2VzID0ge1xuICAgICAgW0NPTlNUQU5ULkRFRkFVTFRfTElTVF9DTEFTU19OQU1FXTogdHJ1ZSxcbiAgICAgIFtDT05TVEFOVC5TRUxFQ1RFRF9MSVNUX0NMQVNTX05BTUVdOiB0aGlzLmlzU2VsZWN0ZWQsXG4gICAgICBbQ09OU1RBTlQuQUNUSVZFX0lURU1fQ0xBU1NfTkFNRV06IHRoaXMuc2VsZWN0ZWROb2RlLmlkID09PSB0aGlzLm5vZGUuaWQsXG4gICAgICBbQ09OU1RBTlQuRElTQUJMRURfSVRFTV9DTEFTU19OQU1FXTogdGhpcy5ub2RlLmRpc2FibGVkLFxuICAgICAgW2BsZXZlbC0ke3RoaXMubGV2ZWx9LXN1Ym1lbnVsZXZlbC0ke3RoaXMuc3VibWVudUxldmVsfWBdOiB0cnVlLFxuICAgIH07XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gIH1cbiAgZ2V0UGFkZGluZ0F0U3RhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubm9kZUNvbmZpZ3VyYXRpb24ucGFkZGluZ0F0U3RhcnQgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgZ2V0TGlzdFN0eWxlKCk6IExpc3RTdHlsZSB7XG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgYmFja2dyb3VuZDogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0JBQ0tHUk9VTkRfQ09MT1IsXG4gICAgICBjb2xvcjogQ09OU1RBTlQuREVGQVVMVF9MSVNUX0ZPTlRfQ09MT1JcbiAgICB9O1xuICAgIGlmICh0aGlzLm5vZGVDb25maWd1cmF0aW9uLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5ub2RlQ29uZmlndXJhdGlvbi5saXN0QmFja2dyb3VuZENvbG9yO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gbnVsbCA/XG4gICAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uc2VsZWN0ZWRMaXN0Rm9udENvbG9yIDogc3R5bGVzLmNvbG9yID0gQ09OU1RBTlQuREVGQVVMVF9TRUxFQ1RFRF9GT05UX0NPTE9SO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ub2RlQ29uZmlndXJhdGlvbi5mb250Q29sb3IgIT09IG51bGwpIHtcbiAgICAgIHN0eWxlcy5jb2xvciA9IHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uZm9udENvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gc3R5bGVzO1xuICB9XG4gIGdldExpc3RJY29uKG5vZGU6IE11bHRpbGV2ZWxOb2Rlcyk6IHN0cmluZyB7XG4gICAgaWYgKG5vZGUuaWNvbiAhPT0gbnVsbCAmJiBub2RlLmljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmljb24gIT09ICcnKSB7XG4gICAgICByZXR1cm4gYGljb25gO1xuICAgIH0gZWxzZSBpZiAobm9kZS5mYUljb24gIT09IG51bGwgJiYgbm9kZS5mYUljb24gIT09IHVuZGVmaW5lZCAmJiBub2RlLmZhSWNvbiAhPT0gJycpIHtcbiAgICAgIHJldHVybiBgZmFpY29uYDtcbiAgICB9IGVsc2UgaWYgKG5vZGUuaW1hZ2VJY29uICE9PSBudWxsICYmIG5vZGUuaW1hZ2VJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5pbWFnZUljb24gIT09ICcnKSB7XG4gICAgICByZXR1cm4gYGltYWdlaWNvbmA7XG4gICAgfSBlbHNlIGlmIChub2RlLnN2Z0ljb24gIT09IG51bGwgJiYgbm9kZS5zdmdJY29uICE9PSB1bmRlZmluZWQgJiYgbm9kZS5zdmdJY29uICE9PSAnJykge1xuICAgICAgcmV0dXJuIGBzdmdpY29uYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGBgO1xuICAgIH1cbiAgfVxuICBnZXRTZWxlY3RlZFN2Z0ljb24oKSB7XG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZCAmJiB0aGlzLm5vZGUuYWN0aXZlU3ZnSWNvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVTdmdJY29uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2RlLnN2Z0ljb247XG4gIH1cbiAgZ2V0U2VsZWN0ZWRJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUljb24pIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuYWN0aXZlSWNvbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubm9kZS5pY29uO1xuICB9XG4gIGdldFNlbGVjdGVkRmFJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUZhSWNvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVGYUljb247XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vZGUuZmFJY29uO1xuICB9XG4gIGdldFNlbGVjdGVkSW1hZ2VJY29uKCkge1xuICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQgJiYgdGhpcy5ub2RlLmFjdGl2ZUltYWdlSWNvbikge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmVJbWFnZUljb247XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5vZGUuaW1hZ2VJY29uO1xuICB9XG4gIGhhc0l0ZW1zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLnJ0bExheW91dDtcbiAgfVxuICBzZXRDbGFzc2VzKCk6IHZvaWQge1xuICAgIHRoaXMuY2xhc3NlcyA9IHtcbiAgICAgIFtgbGV2ZWwtJHt0aGlzLmxldmVsICsgMX1gXTogdHJ1ZSxcbiAgICAgICdhbW1sLXN1Ym1lbnUnOiB0aGlzLmhhc0l0ZW1zKCkgJiYgdGhpcy5nZXRQYWRkaW5nQXRTdGFydCgpXG4gICAgfTtcbiAgfVxuICBleHBhbmQobm9kZTogTXVsdGlsZXZlbE5vZGVzKTogdm9pZCB7XG4gICAgaWYgKG5vZGUuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgIHRoaXMuZmlyc3RJbml0aWFsaXplciA9IHRydWU7XG4gICAgdGhpcy5zZXRDbGFzc2VzKCk7XG4gICAgaWYgKHRoaXMubm9kZUNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsXG4gICAgICAmJiB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmludGVyZmFjZVdpdGhSb3V0ZVxuICAgICAgJiYgbm9kZS5saW5rICE9PSB1bmRlZmluZWRcbiAgICAgICYmIG5vZGUubGlua1xuICAgICkge1xuICAgICAgaWYgKG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCAhPT0gdW5kZWZpbmVkICYmIG5vZGUuZXh0ZXJuYWxSZWRpcmVjdCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IG5vZGUubGluaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtub2RlLmxpbmtdLCBub2RlLm5hdmlnYXRpb25FeHRyYXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobm9kZS5vblNlbGVjdGVkICYmIHR5cGVvZiBub2RlLm9uU2VsZWN0ZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5vZGUub25TZWxlY3RlZChub2RlKTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUuaXRlbXMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLm5vZGVDb25maWd1cmF0aW9uLmNvbGxhcHNlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0SXRlbShub2RlKTtcbiAgICB9XG4gIH1cbiAgc2VsZWN0ZWRMaXN0SXRlbShub2RlOiBNdWx0aWxldmVsTm9kZXMpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbS5lbWl0KG5vZGUpO1xuICB9XG59XG4iXX0=