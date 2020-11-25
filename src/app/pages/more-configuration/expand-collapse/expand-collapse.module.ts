import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from './../../../../../projects/ng-material-multilevel-menu/src/public_api';

import { MaterialsModule } from './../../../modules/materials.module';
import { ExpandCollapseRoutingModule } from './expand-collapse-routing.module';
import { ExpandCollapseComponent } from './expand-collapse.component';


@NgModule({
  declarations: [ExpandCollapseComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    ExpandCollapseRoutingModule,
    NgMaterialMultilevelMenuModule,
  ],
  providers: [
    MultilevelMenuService
  ]
})
export class ExpandCollapseModule {}
