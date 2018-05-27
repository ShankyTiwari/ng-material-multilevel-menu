import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialsModule
  ],
  declarations: [NgMaterialMultilevelMenuComponent],
  exports: [
    NgMaterialMultilevelMenuComponent
  ]
})
export class NgMaterialMultilevelMenuModule { }
