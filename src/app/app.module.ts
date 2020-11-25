import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialsModule } from './modules/materials.module';
import { AppRoutingModule } from './app-routing.module';

import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from './../../projects/ng-material-multilevel-menu/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialMultilevelMenuModule,
    AppRoutingModule,
    MaterialsModule
  ],
  providers: [MultilevelMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
