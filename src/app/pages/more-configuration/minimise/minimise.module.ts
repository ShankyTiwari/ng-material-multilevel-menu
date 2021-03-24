import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinimiseComponent } from './minimise.component';
import {MinimiseRoutingModule} from './minimise-routing.module';
import {MaterialsModule} from '../../../modules/materials.module';
import {NgMaterialMultilevelMenuModule} from '../../../../../projects/ng-material-multilevel-menu/src/lib/ng-material-multilevel-menu.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MinimiseComponent],
  imports: [
    CommonModule,
    MinimiseRoutingModule,
    MaterialsModule,
    NgMaterialMultilevelMenuModule,
    FormsModule
  ]
})
export class MinimiseModule { }
