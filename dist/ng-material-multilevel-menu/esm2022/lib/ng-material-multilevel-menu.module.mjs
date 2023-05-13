import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
import { ListItemContentComponent } from './list-item/list-item-content/list-item-content.component';
import * as i0 from "@angular/core";
class NgMaterialMultilevelMenuModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent, ListItemContentComponent], imports: [CommonModule, MaterialsModule, RouterModule], exports: [NgMaterialMultilevelMenuComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, imports: [CommonModule, MaterialsModule, RouterModule] });
}
export { NgMaterialMultilevelMenuModule };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: i0, type: NgMaterialMultilevelMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MaterialsModule, RouterModule],
                    declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent, ListItemContentComponent],
                    exports: [NgMaterialMultilevelMenuComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWwtbXVsdGlsZXZlbC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS9zcmMvbGliL25nLW1hdGVyaWFsLW11bHRpbGV2ZWwtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUM1RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyREFBMkQsQ0FBQzs7QUFFckcsTUFLYSw4QkFBOEI7dUdBQTlCLDhCQUE4Qjt3R0FBOUIsOEJBQThCLGlCQUh4QixpQ0FBaUMsRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsYUFEbkYsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLGFBRTNDLGlDQUFpQzt3R0FFbEMsOEJBQThCLFlBSjdCLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWTs7U0FJNUMsOEJBQThCOzJGQUE5Qiw4QkFBOEI7a0JBTDFDLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQ3RELFlBQVksRUFBRSxDQUFDLGlDQUFpQyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixDQUFDO29CQUM5RixPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuaW1wb3J0IHsgTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2xpc3QtaXRlbS9saXN0LWl0ZW0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWF0ZXJpYWxzTW9kdWxlIH0gZnJvbSAnLi9tYXRlcmlhbHMubW9kdWxlJztcclxuaW1wb3J0IHsgTmdNYXRlcmlhbE11bHRpbGV2ZWxNZW51Q29tcG9uZW50IH0gZnJvbSAnLi9uZy1tYXRlcmlhbC1tdWx0aWxldmVsLW1lbnUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlzdEl0ZW1Db250ZW50Q29tcG9uZW50IH0gZnJvbSAnLi9saXN0LWl0ZW0vbGlzdC1pdGVtLWNvbnRlbnQvbGlzdC1pdGVtLWNvbnRlbnQuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRlcmlhbHNNb2R1bGUsIFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVDb21wb25lbnQsIExpc3RJdGVtQ29tcG9uZW50LCBMaXN0SXRlbUNvbnRlbnRDb21wb25lbnRdLFxyXG4gICAgZXhwb3J0czogW05nTWF0ZXJpYWxNdWx0aWxldmVsTWVudUNvbXBvbmVudF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsTXVsdGlsZXZlbE1lbnVNb2R1bGUge31cclxuIl19