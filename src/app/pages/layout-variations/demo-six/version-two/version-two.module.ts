import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgMaterialMultilevelMenuModule } from './../../../../../../projects/ng-material-multilevel-menu/src/public_api';
import { MaterialsModule } from './../../../../modules/materials.module';

import { VersionTwoRoutingModule } from './version-two-routing.module';
import { VersionTwoComponent } from './version-two.component';
import { LayoutVariationsModule } from '../../layout-variations.module';

@NgModule({
    declarations: [VersionTwoComponent],
    imports: [CommonModule, VersionTwoRoutingModule, NgMaterialMultilevelMenuModule, MaterialsModule, LayoutVariationsModule],
})
export class VersionTwoModule {}
