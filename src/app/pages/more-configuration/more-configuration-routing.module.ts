import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreConfigurationComponent } from './more-configuration.component';

const routes: Routes = [{
  path: '',
  component: MoreConfigurationComponent,
  children: [
    {
      path: 'disable-padding',
      loadChildren: () => import("./disable-padding/disable-padding.module").then((m) => m.DisablePaddingModule),
    },
    {
      path: 'disable-routing',
      loadChildren: () => import("./disable-routing/disable-routing.module").then((m) => m.DisableRoutingModule),
    },
    {
      path: 'expand-collapse',
      loadChildren: () => import("./expand-collapse/expand-collapse.module").then((m) => m.ExpandCollapseModule),
    },
    {
      path: '**',
      redirectTo: 'demo-one',
    }
  ]
}, {
  path: '**',
  redirectTo: '',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreConfigurationRoutingModule { }
