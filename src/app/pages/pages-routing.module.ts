import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: 'home',
      loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    },
    {
      path: 'layout-variations',
      loadChildren: () => import("./layout-variations/layout-variations.module").then((m) => m.LayoutVariationsModule),
    },
    {
      path: 'more-configuration',
      loadChildren: () => import("./more-configuration/more-configuration.module").then((m) => m.MoreConfigurationModule),
    },
    {
      path: '**',
      redirectTo: 'home'
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
