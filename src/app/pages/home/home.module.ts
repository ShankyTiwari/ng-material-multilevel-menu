import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from './../../modules/materials.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
