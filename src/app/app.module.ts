import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialsModule } from './modules/materials.module';
import { AppRoutingModule } from './app-routing.module';

import { NgMaterialMultilevelMenuModule } from './../../projects/ng-material-multilevel-menu/src/lib/ng-material-multilevel-menu.module';

// import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialsModule,
    NgMaterialMultilevelMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
