import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VersionThreeRoutingModule } from './version-three-routing.module';
import { VersionThreeComponent } from './version-three.component';


@NgModule({
  declarations: [VersionThreeComponent],
  imports: [
    CommonModule,
    VersionThreeRoutingModule
  ]
})
export class VersionThreeModule { }
