import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';

@NgModule({
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
export class NgMaterialMultilevelMenuModule { }
