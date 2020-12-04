import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from './../../../modules/materials.module';

import { OnSelectRoutingModule } from './on-select-routing.module';
import { OnSelectComponent } from './on-select.component';

@NgModule({
  declarations: [OnSelectComponent],
  imports: [
    CommonModule,
    OnSelectRoutingModule,
    MaterialsModule
  ]
})
export class OnSelectModule { }
