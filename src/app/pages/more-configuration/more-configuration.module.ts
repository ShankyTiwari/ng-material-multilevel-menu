import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreConfigurationRoutingModule } from './more-configuration-routing.module';
import { MoreConfigurationComponent } from './more-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    MoreConfigurationRoutingModule
  ],
  declarations: [MoreConfigurationComponent]
})
export class MoreConfigurationModule { }
