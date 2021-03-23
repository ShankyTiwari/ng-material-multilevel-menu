import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoEightComponent } from './demo-eight.component';
import {DemoEightRoutingModule} from './demo-eight-routing.module';
import {MaterialsModule} from '../../../modules/materials.module';
import {NgMaterialMultilevelMenuModule} from '../../../../../projects/ng-material-multilevel-menu/src/lib/ng-material-multilevel-menu.module';

@NgModule({
  declarations: [DemoEightComponent],
  imports: [
    CommonModule,
    DemoEightRoutingModule,
    MaterialsModule,
    NgMaterialMultilevelMenuModule
  ]
})
export class DemoEightModule { }
