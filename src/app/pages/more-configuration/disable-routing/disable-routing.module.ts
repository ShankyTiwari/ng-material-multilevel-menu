import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from './../../../../../projects/ng-material-multilevel-menu/src/public_api';

import { MaterialsModule } from './../../../modules/materials.module';

import { DisableRoutingRoutingModule } from './disable-routing-routing.module';
import { DisableRoutingComponent } from './disable-routing.component';
import { LayoutVariationsModule } from '../../layout-variations/layout-variations.module';

@NgModule({
    imports: [CommonModule, DisableRoutingRoutingModule, NgMaterialMultilevelMenuModule, MaterialsModule, LayoutVariationsModule],
    declarations: [DisableRoutingComponent],
})
export class DisableRoutingModule {}
