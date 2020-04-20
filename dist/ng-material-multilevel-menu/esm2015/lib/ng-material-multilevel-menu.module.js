import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
import * as i0 from "@angular/core";
export class NgMaterialMultilevelMenuModule {
}
NgMaterialMultilevelMenuModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
NgMaterialMultilevelMenuModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); }, imports: [[
            CommonModule,
            MaterialsModule,
            RouterModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent], imports: [CommonModule,
        MaterialsModule,
        RouterModule], exports: [NgMaterialMultilevelMenuComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgMaterialMultilevelMenuModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    MaterialsModule,
                    RouterModule,
                ],
                declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
                exports: [NgMaterialMultilevelMenuComponent]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBVzVGLE1BQU0sT0FBTyw4QkFBOEI7O2tFQUE5Qiw4QkFBOEI7MklBQTlCLDhCQUE4QixrQkFSaEM7WUFDUCxZQUFZO1lBQ1osZUFBZTtZQUNmLFlBQVk7U0FDYjt3RkFJVSw4QkFBOEIsbUJBSDFCLGlDQUFpQyxFQUFFLGlCQUFpQixhQUpqRSxZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVksYUFHSixpQ0FBaUM7a0RBRWhDLDhCQUE4QjtjQVQxQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRSxDQUFDLGlDQUFpQyxFQUFFLGlCQUFpQixDQUFDO2dCQUNwRSxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQzthQUM3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE1hdGVyaWFsc01vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgfSBmcm9tICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdGVyaWFsc01vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCwgTGlzdEl0ZW1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUgeyB9XG4iXX0=