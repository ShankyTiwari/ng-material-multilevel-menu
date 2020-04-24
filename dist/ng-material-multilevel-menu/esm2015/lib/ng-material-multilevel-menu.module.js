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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBYzVGLE1BQU0sT0FBTyw4QkFBOEI7O2tFQUE5Qiw4QkFBOEI7MklBQTlCLDhCQUE4QixrQkFYaEM7WUFDUCxZQUFZO1lBQ1osZUFBZTtZQUNmLFlBQVk7U0FDYjt3RkFPVSw4QkFBOEIsbUJBTHZDLGlDQUFpQztRQUNqQyxpQkFBaUIsYUFOakIsWUFBWTtRQUNaLGVBQWU7UUFDZixZQUFZLGFBTUosaUNBQWlDO2tEQUVoQyw4QkFBOEI7Y0FaMUMsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGVBQWU7b0JBQ2YsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osaUNBQWlDO29CQUNqQyxpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2FBQzdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuXHJcbmltcG9ydCB7IExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1hdGVyaWFsc01vZHVsZSB9IGZyb20gJy4vbWF0ZXJpYWxzLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdGVyaWFsc01vZHVsZSxcclxuICAgIFJvdXRlck1vZHVsZSxcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50LFxyXG4gICAgTGlzdEl0ZW1Db21wb25lbnQsXHJcbiAgXSxcclxuICBleHBvcnRzOiBbTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51TW9kdWxlIHsgfVxyXG4iXX0=