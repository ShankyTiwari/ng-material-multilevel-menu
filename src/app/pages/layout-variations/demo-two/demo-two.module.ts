import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../projects/ng-material-multilevel-menu/src/public_api';
import { MaterialsModule } from './../../../modules/materials.module';

import { DemoTwoRoutingModule } from './demo-two-routing.module';
import { DemoTwoComponent } from './demo-two.component';

@NgModule({
  imports: [
    CommonModule,
    DemoTwoRoutingModule,
    MaterialsModule,
    NgMaterialMultilevelMenuModule
  ],
  declarations: [DemoTwoComponent]
})
export class DemoTwoModule { }
