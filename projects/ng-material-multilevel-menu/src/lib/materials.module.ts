import { NgModule } from '@angular/core';

import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
