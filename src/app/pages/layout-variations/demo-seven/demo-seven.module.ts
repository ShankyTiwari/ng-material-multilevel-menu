import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoSevenComponent } from './demo-seven.component';
import {NgMaterialMultilevelMenuModule} from '../../../../../projects/ng-material-multilevel-menu/src/lib/ng-material-multilevel-menu.module';
import {MaterialsModule} from '../../../modules/materials.module';
import {DemoSevenRoutingModule} from './demo-seven-routing.module';

@NgModule({
  declarations: [DemoSevenComponent],
  imports: [
    CommonModule,
    DemoSevenRoutingModule,
    NgMaterialMultilevelMenuModule,
    MaterialsModule
  ]
})
export class DemoSevenModule { }
