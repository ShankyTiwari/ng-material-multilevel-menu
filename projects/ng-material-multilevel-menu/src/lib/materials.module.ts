import { NgModule } from '@angular/core';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatTooltipModule
  ],
  declarations: [],
  exports: [
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatTooltipModule
  ]
})
export class MaterialsModule { }
