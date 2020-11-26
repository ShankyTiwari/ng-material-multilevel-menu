import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../../projects/ng-material-multilevel-menu/src/public_api';
import { MaterialsModule } from './../../../../modules/materials.module';

import { VersionTwoRoutingModule } from './version-two-routing.module';
import { VersionTwoComponent } from './version-two.component';


@NgModule({
  declarations: [VersionTwoComponent],
  imports: [
    CommonModule,
    VersionTwoRoutingModule,
    NgMaterialMultilevelMenuModule,
    MaterialsModule
  ]
})
export class VersionTwoModule { }
