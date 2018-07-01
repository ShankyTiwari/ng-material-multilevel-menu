import { NgModule } from '@angular/core';

import {
  MatIconModule,
  MatListModule,
  MatRippleModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatListModule,
    MatRippleModule,
  ],
  declarations: [],
  exports: [
    MatIconModule,
    MatListModule,
    MatRippleModule,
  ]
})
export class MaterialsModule { }
