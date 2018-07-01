import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './materials.module';

import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
import { ListItemComponent } from './list-item/list-item.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [NgMaterialMultilevelMenuComponent, ListItemComponent],
  exports: [NgMaterialMultilevelMenuComponent]
})
export class NgMaterialMultilevelMenuModule { }
