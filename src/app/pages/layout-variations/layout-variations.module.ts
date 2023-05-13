import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutVariationsRoutingModule } from './layout-variations-routing.module';
import { LayoutVariationsComponent } from './layout-variations.component';
import { SwitchDemoComponent } from './switch-demo/switch-demo.component';

@NgModule({
    imports: [CommonModule, LayoutVariationsRoutingModule],
    declarations: [LayoutVariationsComponent, SwitchDemoComponent],
    exports: [SwitchDemoComponent],
})
export class LayoutVariationsModule {}
