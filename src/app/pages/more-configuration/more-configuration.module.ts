import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreConfigurationRoutingModule } from './more-configuration-routing.module';
import { MoreConfigurationComponent } from './more-configuration.component';
import { LayoutVariationsModule } from '../layout-variations/layout-variations.module';

@NgModule({
    imports: [CommonModule, MoreConfigurationRoutingModule, LayoutVariationsModule],
    declarations: [MoreConfigurationComponent],
})
export class MoreConfigurationModule {}
