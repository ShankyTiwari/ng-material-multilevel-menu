import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
let NgMaterialMultilevelMenuModule = class NgMaterialMultilevelMenuModule {
};
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
export { NgMaterialMultilevelMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQWU1RixJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtDQUFJLENBQUE7QUFBbEMsOEJBQThCO0lBYjFDLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixlQUFlO1lBQ2YsWUFBWTtTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1osaUNBQWlDO1lBQ2pDLGlCQUFpQjtZQUNqQixhQUFhO1NBQ2Q7UUFDRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztLQUM3QyxDQUFDO0dBQ1csOEJBQThCLENBQUk7U0FBbEMsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBMaW5rQ29tcG9uZW50IH0gZnJvbSAnLi9saW5rL2xpbmsuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWl0ZW0vbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRlcmlhbHNNb2R1bGUgfSBmcm9tICcuL21hdGVyaWFscy5tb2R1bGUnO1xuaW1wb3J0IHsgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBNYXRlcmlhbHNNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQsXG4gICAgTGlzdEl0ZW1Db21wb25lbnQsXG4gICAgTGlua0NvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUgeyB9XG4iXX0=