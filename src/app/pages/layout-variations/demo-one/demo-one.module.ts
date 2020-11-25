import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../projects/ng-material-multilevel-menu/src/public_api';
import { MaterialsModule } from './../../../modules/materials.module';

import { DemoOneRoutingModule } from './demo-one-routing.module';
import { DemoOneComponent } from './demo-one.component';

@NgModule({
  imports: [
    CommonModule,
    DemoOneRoutingModule,
    NgMaterialMultilevelMenuModule,
    MaterialsModule
  ],
  declarations: [DemoOneComponent]
})
export class DemoOneModule { }
