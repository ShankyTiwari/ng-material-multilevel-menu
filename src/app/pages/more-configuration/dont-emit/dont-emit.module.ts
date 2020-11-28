import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DontEmitRoutingModule } from './dont-emit-routing.module';
import { DontEmitComponent } from './dont-emit.component';

import { MaterialsModule } from './../../../modules/materials.module';


@NgModule({
  declarations: [DontEmitComponent],
  imports: [
    CommonModule,
    DontEmitRoutingModule,
    MaterialsModule
  ]
})
export class DontEmitModule { }
