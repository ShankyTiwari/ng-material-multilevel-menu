import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
var NgMaterialMultilevelMenuModule = /** @class */ (function () {
    function NgMaterialMultilevelMenuModule() {
    }
    NgMaterialMultilevelMenuModule = __decorate([
        NgModule({
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
        })
    ], NgMaterialMultilevelMenuModule);
    return NgMaterialMultilevelMenuModule;
}());
export { NgMaterialMultilevelMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBYzVGO0lBQUE7SUFBOEMsQ0FBQztJQUFsQyw4QkFBOEI7UUFaMUMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osZUFBZTtnQkFDZixZQUFZO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1osaUNBQWlDO2dCQUNqQyxpQkFBaUI7YUFDbEI7WUFDRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUM3QyxDQUFDO09BQ1csOEJBQThCLENBQUk7SUFBRCxxQ0FBQztDQUFBLEFBQS9DLElBQStDO1NBQWxDLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRlcmlhbHNNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFscy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQgfSBmcm9tICcuL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRlcmlhbHNNb2R1bGUsXHJcbiAgICBSb3V0ZXJNb2R1bGUsXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCxcclxuICAgIExpc3RJdGVtQ29tcG9uZW50LFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudU1vZHVsZSB7IH1cclxuIl19