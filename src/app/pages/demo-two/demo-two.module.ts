import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoTwoRoutingModule } from './demo-two-routing.module';
import { DemoTwoComponent } from './demo-two.component';

@NgModule({
  imports: [
    CommonModule,
    DemoTwoRoutingModule
  ],
  declarations: [DemoTwoComponent]
})
export class DemoTwoModule { }
