import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoFourRoutingModule } from './demo-four-routing.module';
import { DemoFourComponent } from './demo-four.component';

@NgModule({
  imports: [
    CommonModule,
    DemoFourRoutingModule
  ],
  declarations: [DemoFourComponent]
})
export class DemoFourModule { }
