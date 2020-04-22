import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './link/link.component';
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
                LinkComponent
            ],
            exports: [NgMaterialMultilevelMenuComponent]
        })
    ], NgMaterialMultilevelMenuModule);
    return NgMaterialMultilevelMenuModule;
}());
export { NgMaterialMultilevelMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWU1RjtJQUFBO0lBQThDLENBQUM7SUFBbEMsOEJBQThCO1FBYjFDLFFBQVEsQ0FBQztZQUNSLE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGVBQWU7Z0JBQ2YsWUFBWTthQUNiO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGlDQUFpQztnQkFDakMsaUJBQWlCO2dCQUNqQixhQUFhO2FBQ2Q7WUFDRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztTQUM3QyxDQUFDO09BQ1csOEJBQThCLENBQUk7SUFBRCxxQ0FBQztDQUFBLEFBQS9DLElBQStDO1NBQWxDLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgTGlua0NvbXBvbmVudCB9IGZyb20gJy4vbGluay9saW5rLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbGlzdC1pdGVtL2xpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0ZXJpYWxzTW9kdWxlIH0gZnJvbSAnLi9tYXRlcmlhbHMubW9kdWxlJztcbmltcG9ydCB7IE5nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudCB9IGZyb20gJy4vbmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0ZXJpYWxzTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50LFxuICAgIExpc3RJdGVtQ29tcG9uZW50LFxuICAgIExpbmtDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51TW9kdWxlIHsgfVxuIl19