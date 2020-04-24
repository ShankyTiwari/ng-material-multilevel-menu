import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
import * as i0 from "@angular/core";
var NgMaterialMultilevelMenuModule = /** @class */ (function () {
    function NgMaterialMultilevelMenuModule() {
    }
    NgMaterialMultilevelMenuModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgMaterialMultilevelMenuModule });
    NgMaterialMultilevelMenuModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgMaterialMultilevelMenuModule_Factory(t) { return new (t || NgMaterialMultilevelMenuModule)(); }, imports: [[
                CommonModule,
                MaterialsModule,
                RouterModule,
            ]] });
    return NgMaterialMultilevelMenuModule;
}());
export { NgMaterialMultilevelMenuModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgMaterialMultilevelMenuModule, { declarations: [NgMaterialMultilevelMenuComponent,
        ListItemComponent], imports: [CommonModule,
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
                declarations: [
                    NgMaterialMultilevelMenuComponent,
                    ListItemComponent,
                ],
                exports: [NgMaterialMultilevelMenuComponent]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBRTVGO0lBQUE7S0FZK0M7c0VBQWxDLDhCQUE4QjsrSUFBOUIsOEJBQThCLGtCQVhoQztnQkFDUCxZQUFZO2dCQUNaLGVBQWU7Z0JBQ2YsWUFBWTthQUNiO3lDQWJIO0NBb0IrQyxBQVovQyxJQVkrQztTQUFsQyw4QkFBOEI7d0ZBQTlCLDhCQUE4QixtQkFMdkMsaUNBQWlDO1FBQ2pDLGlCQUFpQixhQU5qQixZQUFZO1FBQ1osZUFBZTtRQUNmLFlBQVksYUFNSixpQ0FBaUM7a0RBRWhDLDhCQUE4QjtjQVoxQyxRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixpQ0FBaUM7b0JBQ2pDLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsaUNBQWlDLENBQUM7YUFDN0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxzTW9kdWxlIH0gZnJvbSAnLi9tYXRlcmlhbHMubW9kdWxlJztcclxuaW1wb3J0IHsgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxzTW9kdWxlLFxyXG4gICAgUm91dGVyTW9kdWxlLFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQsXHJcbiAgICBMaXN0SXRlbUNvbXBvbmVudCxcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUgeyB9XHJcbiJdfQ==