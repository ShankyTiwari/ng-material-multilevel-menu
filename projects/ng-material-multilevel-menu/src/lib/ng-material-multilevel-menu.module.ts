import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListItemComponent } from './list-item/list-item.component';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';
import { ListItemContentComponent } from './list-item/list-item-content/list-item-content.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    RouterModule,
  ],
  declarations: [
    NgMaterialMultilevelMenuComponent,
    ListItemComponent,
    ListItemContentComponent,
  ],
  exports: [NgMaterialMultilevelMenuComponent]
})
export class NgMaterialMultilevelMenuModule {}
