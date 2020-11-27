import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../../projects/ng-material-multilevel-menu/src/public_api';
import { MaterialsModule } from './../../../../modules/materials.module';

import { VersionThreeRoutingModule } from './version-three-routing.module';
import { VersionThreeComponent } from './version-three.component';


@NgModule({
  declarations: [VersionThreeComponent],
  imports: [
    CommonModule,
    VersionThreeRoutingModule,
    NgMaterialMultilevelMenuModule,
    MaterialsModule
  ]
})
export class VersionThreeModule { }
