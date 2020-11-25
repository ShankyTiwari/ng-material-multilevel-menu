import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutVariationsRoutingModule } from './layout-variations-routing.module';
import { LayoutVariationsComponent } from './layout-variations.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutVariationsRoutingModule
  ],
  declarations: [LayoutVariationsComponent]
})
export class LayoutVariationsModule { }
