import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CONSTANT } from './constants';
import { MultilevelMenuService } from './multilevel-menu.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./multilevel-menu.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/bidi";
import * as i5 from "@angular/material/list";
import * as i6 from "./list-item/list-item.component";
function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ng-list-item", 3);
    i0.ɵɵlistener("selectedItem", function NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template_ng_list_item_selectedItem_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r3 = i0.ɵɵnextContext(2); return ctx_r3.selectedListItem($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r2 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("nodeConfiguration", ctx_r1.nodeConfig)("node", node_r2.value)("level", 1)("submenuLevel", node_r2.key)("selectedNode", ctx_r1.currentNode);
} }
function NgMaterialMultilevelMenuComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelementStart(1, "mat-list");
    i0.ɵɵtemplate(2, NgMaterialMultilevelMenuComponent_div_0_ng_list_item_2_Template, 1, 5, "ng-list-item", 2);
    i0.ɵɵpipe(3, "keyvalue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.getClassName())("ngStyle", ctx_r0.getGlobalStyle())("dir", ctx_r0.isRtlLayout() ? "rtl" : "ltr");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(3, 4, ctx_r0.items, ctx_r0.multilevelMenuService.kvDummyComparerFn));
} }
export class NgMaterialMultilevelMenuComponent {
    constructor(router, multilevelMenuService) {
        this.router = router;
        this.multilevelMenuService = multilevelMenuService;
        this.configuration = null;
        this.selectedItem = new EventEmitter();
        this.selectedLabel = new EventEmitter();
        this.nodeConfig = {
            paddingAtStart: true,
            listBackgroundColor: null,
            fontColor: null,
            selectedListFontColor: null,
            interfaceWithRoute: null,
            collapseOnSelect: null,
            highlightOnSelect: false,
            rtlLayout: false,
        };
        this.isInvalidConfig = true;
    }
    ngOnChanges() {
        this.detectInvalidConfig();
    }
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
    updateNodeByURL(url) {
        const foundNode = this.multilevelMenuService.getMatchedObjectByUrl(this.items, url);
        if (foundNode !== undefined &&
            foundNode.link !== undefined &&
            foundNode.link !== null &&
            foundNode.link !== ''
        // && !foundNode.disabled // Prevent route redirection for disabled menu
        ) {
            this.currentNode = foundNode;
            this.selectedListItem(foundNode);
        }
    }
    checkValidData() {
        if (this.items.length === 0) {
            console.warn(CONSTANT.ERROR_MESSAGE);
        }
        else {
            this.items = this.items.filter(n => !n.hidden);
            this.multilevelMenuService.addRandomId(this.items);
        }
    }
    detectInvalidConfig() {
        if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
            this.isInvalidConfig = true;
        }
        else {
            this.isInvalidConfig = false;
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
            if (config.collapseOnSelect !== null &&
                config.collapseOnSelect !== undefined &&
                typeof config.collapseOnSelect === 'boolean') {
                this.nodeConfig.collapseOnSelect = config.collapseOnSelect;
            }
            if (config.highlightOnSelect !== null &&
                config.highlightOnSelect !== undefined &&
                typeof config.highlightOnSelect === 'boolean') {
                this.nodeConfig.highlightOnSelect = config.highlightOnSelect;
            }
            if (config.rtlLayout !== null &&
                config.rtlLayout !== undefined &&
                typeof config.rtlLayout === 'boolean') {
                this.nodeConfig.rtlLayout = config.rtlLayout;
            }
            this.checkValidData();
        }
    }
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
    getGlobalStyle() {
        if (!this.isInvalidConfig) {
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
    isRtlLayout() {
        return this.nodeConfig.rtlLayout;
    }
    selectedListItem(event) {
        this.currentNode = event;
        if (event.items === undefined && (!event.onSelected || typeof event.onSelected !== 'function')) {
            this.selectedItem.emit(event);
        }
        else {
            this.selectedLabel.emit(event);
        }
    }
}
NgMaterialMultilevelMenuComponent.ɵfac = function NgMaterialMultilevelMenuComponent_Factory(t) { return new (t || NgMaterialMultilevelMenuComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.MultilevelMenuService)); };
NgMaterialMultilevelMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: NgMaterialMultilevelMenuComponent, selectors: [["ng-material-multilevel-menu"]], inputs: { items: "items", configuration: "configuration" }, outputs: { selectedItem: "selectedItem", selectedLabel: "selectedLabel" }, features: [i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [[3, "ngClass", "ngStyle", "dir", 4, "ngIf"], [3, "ngClass", "ngStyle", "dir"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem", 4, "ngFor", "ngForOf"], [3, "nodeConfiguration", "node", "level", "submenuLevel", "selectedNode", "selectedItem"]], template: function NgMaterialMultilevelMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, NgMaterialMultilevelMenuComponent_div_0_Template, 4, 7, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.items.length !== 0);
    } }, directives: [i3.NgIf, i3.NgClass, i3.NgStyle, i4.Dir, i5.MatList, i3.NgForOf, i6.ListItemComponent], pipes: [i3.KeyValuePipe], styles: [".amml-item[_ngcontent-%COMP%]{line-height:48px;display:flex;justify-content:space-between;position:relative}.anml-data[_ngcontent-%COMP%]{width:100%;text-transform:capitalize;display:flex;justify-content:flex-start}.amml-icon-fa[_ngcontent-%COMP%]{font-size:20px}.amml-icon[_ngcontent-%COMP%]{line-height:48px}.active[_ngcontent-%COMP%]{color:#1976d2}div[dir=ltr][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-right:15px}div[dir=ltr][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-left:16px}div[dir=rtl][_ngcontent-%COMP%]   .amml-icon[_ngcontent-%COMP%]{margin-left:15px}div[dir=rtl][_ngcontent-%COMP%]   .amml-submenu[_ngcontent-%COMP%]{margin-right:16px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgMaterialMultilevelMenuComponent, [{
        type: Component,
        args: [{
                selector: 'ng-material-multilevel-menu',
                templateUrl: './ng-material-multilevel-menu.component.html',
                styleUrls: ['./ng-material-multilevel-menu.component.css'],
            }]
    }], function () { return [{ type: i1.Router }, { type: i2.MultilevelMenuService }]; }, { items: [{
            type: Input
        }], configuration: [{
            type: Input
        }], selectedItem: [{
            type: Output
        }], selectedLabel: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LnRzIiwibGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7Ozs7Ozs7SUNGOUQsdUNBU2U7SUFGYiwyUEFDRDtJQUNELGlCQUFlOzs7O0lBUGIscURBQWdDLHVCQUFBLFlBQUEsNkJBQUEsb0NBQUE7OztJQUp0Qyw4QkFDRTtJQUFBLGdDQUNFO0lBQUEsMEdBU0E7O0lBQ0YsaUJBQVc7SUFDYixpQkFBTTs7O0lBYkQsK0NBQTBCLG9DQUFBLDZDQUFBO0lBR3pCLGVBQThFO0lBQTlFLDRHQUE4RTs7QURVcEYsTUFBTSxPQUFPLGlDQUFpQztJQWlCNUMsWUFDVSxNQUFjLEVBQ2YscUJBQTRDO1FBRDNDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBakI1QyxrQkFBYSxHQUFrQixJQUFJLENBQUM7UUFDbkMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUNuRCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBRTlELGVBQVUsR0FBa0I7WUFDMUIsY0FBYyxFQUFFLElBQUk7WUFD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ZSxLQUFLLFNBQVMsRUFBRTtnQkFDbEQsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQzthQUN4RDtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDbkMsQ0FBQztJQUNELGdCQUFnQixDQUFDLEtBQXNCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksT0FBTyxLQUFLLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxFQUFHO1lBQy9GLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7O2tIQTNJVSxpQ0FBaUM7c0VBQWpDLGlDQUFpQztRQ2I5QyxrRkFDRTs7UUFEMkQsNkNBQTBCOztrRERhMUUsaUNBQWlDO2NBTDdDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxXQUFXLEVBQUUsOENBQThDO2dCQUMzRCxTQUFTLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQzthQUMzRDs7a0JBRUUsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBQ0wsTUFBTTs7a0JBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJhY2tncm91bmRTdHlsZSwgQ29uZmlndXJhdGlvbiwgTXVsdGlsZXZlbE5vZGVzIH0gZnJvbSAnLi9hcHAubW9kZWwnO1xuaW1wb3J0IHsgQ09OU1RBTlQgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBNdWx0aWxldmVsTWVudVNlcnZpY2UgfSBmcm9tICcuL211bHRpbGV2ZWwtbWVudS5zZXJ2aWNlJztcblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBNdWx0aWxldmVsTm9kZXNbXTtcbiAgQElucHV0KCkgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdGlvbiA9IG51bGw7XG4gIEBPdXRwdXQoKSBzZWxlY3RlZEl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdGVkTGFiZWwgPSBuZXcgRXZlbnRFbWl0dGVyPE11bHRpbGV2ZWxOb2Rlcz4oKTtcbiAgY3VycmVudE5vZGU6IE11bHRpbGV2ZWxOb2RlcztcbiAgbm9kZUNvbmZpZzogQ29uZmlndXJhdGlvbiA9IHtcbiAgICBwYWRkaW5nQXRTdGFydDogdHJ1ZSxcbiAgICBsaXN0QmFja2dyb3VuZENvbG9yOiBudWxsLFxuICAgIGZvbnRDb2xvcjogbnVsbCxcbiAgICBzZWxlY3RlZExpc3RGb250Q29sb3I6IG51bGwsXG4gICAgaW50ZXJmYWNlV2l0aFJvdXRlOiBudWxsLFxuICAgIGNvbGxhcHNlT25TZWxlY3Q6IG51bGwsXG4gICAgaGlnaGxpZ2h0T25TZWxlY3Q6IGZhbHNlLFxuICAgIHJ0bExheW91dDogZmFsc2UsXG4gIH07XG4gIGlzSW52YWxpZENvbmZpZyA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHVibGljIG11bHRpbGV2ZWxNZW51U2VydmljZTogTXVsdGlsZXZlbE1lbnVTZXJ2aWNlXG4gICkgeyB9XG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuZGV0ZWN0SW52YWxpZENvbmZpZygpO1xuICB9XG4gIG5nT25Jbml0KCkge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlndXJhdGlvbiAhPT0gbnVsbCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLmNvbmZpZ3VyYXRpb24gIT09ICcnICYmXG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uaW50ZXJmYWNlV2l0aFJvdXRlICE9PSBudWxsICYmIHRoaXMuY29uZmlndXJhdGlvbi5pbnRlcmZhY2VXaXRoUm91dGUpIHtcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKGV2ZW50LnVybCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIHRoaXMudXBkYXRlTm9kZUJ5VVJMKHRoaXMucm91dGVyLnVybCk7XG4gICAgfVxuICB9XG4gIHVwZGF0ZU5vZGVCeVVSTCh1cmw6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGZvdW5kTm9kZSA9IHRoaXMubXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmdldE1hdGNoZWRPYmplY3RCeVVybCh0aGlzLml0ZW1zLCB1cmwpO1xuICAgIGlmIChcbiAgICAgIGZvdW5kTm9kZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBmb3VuZE5vZGUubGluayAhPT0gbnVsbCAmJlxuICAgICAgZm91bmROb2RlLmxpbmsgIT09ICcnXG4gICAgICAvLyAmJiAhZm91bmROb2RlLmRpc2FibGVkIC8vIFByZXZlbnQgcm91dGUgcmVkaXJlY3Rpb24gZm9yIGRpc2FibGVkIG1lbnVcbiAgICApIHtcbiAgICAgIHRoaXMuY3VycmVudE5vZGUgPSBmb3VuZE5vZGU7XG4gICAgICB0aGlzLnNlbGVjdGVkTGlzdEl0ZW0oZm91bmROb2RlKTtcbiAgICB9XG4gIH1cbiAgY2hlY2tWYWxpZERhdGEoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLndhcm4oQ09OU1RBTlQuRVJST1JfTUVTU0FHRSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihuID0+ICFuLmhpZGRlbik7XG4gICAgICB0aGlzLm11bHRpbGV2ZWxNZW51U2VydmljZS5hZGRSYW5kb21JZCh0aGlzLml0ZW1zKTtcbiAgICB9XG4gIH1cbiAgZGV0ZWN0SW52YWxpZENvbmZpZygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uID09PSBudWxsIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY29uZmlndXJhdGlvbiA9PT0gJycpIHtcbiAgICAgIHRoaXMuaXNJbnZhbGlkQ29uZmlnID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0ludmFsaWRDb25maWcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICAgIGlmIChjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IHVuZGVmaW5lZCAmJiBjb25maWcucGFkZGluZ0F0U3RhcnQgIT09IG51bGwgJiYgdHlwZW9mIGNvbmZpZy5wYWRkaW5nQXRTdGFydCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5wYWRkaW5nQXRTdGFydCA9IGNvbmZpZy5wYWRkaW5nQXRTdGFydDtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcubGlzdEJhY2tncm91bmRDb2xvciAhPT0gJycgJiZcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmxpc3RCYWNrZ3JvdW5kQ29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcubGlzdEJhY2tncm91bmRDb2xvciA9IGNvbmZpZy5saXN0QmFja2dyb3VuZENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5mb250Q29sb3IgIT09ICcnICYmXG4gICAgICAgIGNvbmZpZy5mb250Q29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5mb250Q29sb3IgPSBjb25maWcuZm9udENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09ICcnICYmXG4gICAgICAgIGNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLnNlbGVjdGVkTGlzdEZvbnRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubm9kZUNvbmZpZy5zZWxlY3RlZExpc3RGb250Q29sb3IgPSBjb25maWcuc2VsZWN0ZWRMaXN0Rm9udENvbG9yO1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGUgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcuaW50ZXJmYWNlV2l0aFJvdXRlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmludGVyZmFjZVdpdGhSb3V0ZSA9IGNvbmZpZy5pbnRlcmZhY2VXaXRoUm91dGU7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmNvbGxhcHNlT25TZWxlY3QgPT09ICdib29sZWFuJykge1xuICAgICAgICB0aGlzLm5vZGVDb25maWcuY29sbGFwc2VPblNlbGVjdCA9IGNvbmZpZy5jb2xsYXBzZU9uU2VsZWN0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5oaWdobGlnaHRPblNlbGVjdCAhPT0gbnVsbCAmJlxuICAgICAgICBjb25maWcuaGlnaGxpZ2h0T25TZWxlY3QgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICB0eXBlb2YgY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0ID0gY29uZmlnLmhpZ2hsaWdodE9uU2VsZWN0O1xuICAgICAgfVxuICAgICAgaWYgKGNvbmZpZy5ydGxMYXlvdXQgIT09IG51bGwgJiZcbiAgICAgICAgY29uZmlnLnJ0bExheW91dCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHR5cGVvZiBjb25maWcucnRsTGF5b3V0ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhpcy5ub2RlQ29uZmlnLnJ0bExheW91dCA9IGNvbmZpZy5ydGxMYXlvdXQ7XG4gICAgICB9XG4gICAgICB0aGlzLmNoZWNrVmFsaWREYXRhKCk7XG4gICAgfVxuICB9XG4gIGdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzSW52YWxpZENvbmZpZykge1xuICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09ICcnICYmIHRoaXMuY29uZmlndXJhdGlvbi5jbGFzc25hbWUgIT09IG51bGwgJiYgdGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBgJHtDT05TVEFOVC5ERUZBVUxUX0NMQVNTX05BTUV9ICR7dGhpcy5jb25maWd1cmF0aW9uLmNsYXNzbmFtZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENPTlNUQU5ULkRFRkFVTFRfQ0xBU1NfTkFNRTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZ2V0R2xvYmFsU3R5bGUoKTogQmFja2dyb3VuZFN0eWxlIHtcbiAgICBpZiAoIXRoaXMuaXNJbnZhbGlkQ29uZmlnKSB7XG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIGJhY2tncm91bmQgOiBudWxsXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09ICcnICYmXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYWNrZ3JvdW5kQ29sb3IgIT09IG51bGwgJiZcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN0eWxlcy5iYWNrZ3JvdW5kID0gdGhpcy5jb25maWd1cmF0aW9uLmJhY2tncm91bmRDb2xvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHlsZXM7XG4gICAgfVxuICB9XG4gIGlzUnRsTGF5b3V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVDb25maWcucnRsTGF5b3V0O1xuICB9XG4gIHNlbGVjdGVkTGlzdEl0ZW0oZXZlbnQ6IE11bHRpbGV2ZWxOb2Rlcyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudE5vZGUgPSBldmVudDtcbiAgICBpZiAoZXZlbnQuaXRlbXMgPT09IHVuZGVmaW5lZCAmJiAoIWV2ZW50Lm9uU2VsZWN0ZWQgfHwgdHlwZW9mIGV2ZW50Lm9uU2VsZWN0ZWQgIT09ICdmdW5jdGlvbicpICkge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZW1pdChldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRMYWJlbC5lbWl0KGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgW25nQ2xhc3NdPVwiZ2V0Q2xhc3NOYW1lKClcIiBbbmdTdHlsZV09XCJnZXRHbG9iYWxTdHlsZSgpXCIgKm5nSWY9J2l0ZW1zLmxlbmd0aCAhPT0gMCcgW2Rpcl09XCJpc1J0bExheW91dCgpID8gJ3J0bCcgOiAnbHRyJ1wiPlxuICA8bWF0LWxpc3Q+XG4gICAgPG5nLWxpc3QtaXRlbVxuICAgICAgKm5nRm9yPVwibGV0IG5vZGUgb2YgaXRlbXMgfCBrZXl2YWx1ZTogbXVsdGlsZXZlbE1lbnVTZXJ2aWNlLmt2RHVtbXlDb21wYXJlckZuXCJcbiAgICAgIFtub2RlQ29uZmlndXJhdGlvbl09J25vZGVDb25maWcnXG4gICAgICBbbm9kZV09J25vZGUudmFsdWUnXG4gICAgICBbbGV2ZWxdPVwiMVwiXG4gICAgICBbc3VibWVudUxldmVsXT1cIm5vZGUua2V5XCJcbiAgICAgIFtzZWxlY3RlZE5vZGVdPSdjdXJyZW50Tm9kZSdcbiAgICAgIChzZWxlY3RlZEl0ZW0pPVwic2VsZWN0ZWRMaXN0SXRlbSgkZXZlbnQpXG4gICAgXCI+XG4gICAgPC9uZy1saXN0LWl0ZW0+XG4gIDwvbWF0LWxpc3Q+XG48L2Rpdj5cbiJdfQ==