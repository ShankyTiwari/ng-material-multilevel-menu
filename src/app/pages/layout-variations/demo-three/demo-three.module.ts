import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../projects/ng-material-multilevel-menu/src/public_api';
import { MaterialsModule } from './../../../modules/materials.module';

import { DemoThreeRoutingModule } from './demo-three-routing.module';
import { DemoThreeComponent } from './demo-three.component';

@NgModule({
  imports: [
    CommonModule,
    DemoThreeRoutingModule,
    NgMaterialMultilevelMenuModule,
    MaterialsModule
  ],
  declarations: [DemoThreeComponent]
})
export class DemoThreeModule { }
