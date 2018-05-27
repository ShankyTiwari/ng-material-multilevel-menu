import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgMaterialMultilevelMenuModule } from './modules/ng-material-multilevel-menu/ng-material-multilevel-menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgMaterialMultilevelMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
