import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../projects/ng-material-multilevel-menu/src/public_api';

import { MaterialsModule } from './../../../modules/materials.module';

import { DisablePaddingRoutingModule } from './disable-padding-routing.module';
import { DisablePaddingComponent } from './disable-padding.component';
import { LayoutVariationsModule } from '../../layout-variations/layout-variations.module';

@NgModule({
    imports: [CommonModule, DisablePaddingRoutingModule, NgMaterialMultilevelMenuModule, MaterialsModule, LayoutVariationsModule],
    declarations: [DisablePaddingComponent],
})
export class DisablePaddingModule {}
