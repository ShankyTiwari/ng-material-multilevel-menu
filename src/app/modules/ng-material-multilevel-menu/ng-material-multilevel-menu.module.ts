import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from './materials.module';
import { NgMaterialMultilevelMenuComponent } from './ng-material-multilevel-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialsModule
  ],
  declarations: [NgMaterialMultilevelMenuComponent],
  exports: [
    NgMaterialMultilevelMenuComponent
  ]
})
export class NgMaterialMultilevelMenuModule { }
