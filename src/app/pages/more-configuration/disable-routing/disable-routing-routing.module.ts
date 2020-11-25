import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisableRoutingComponent } from './disable-routing.component';

const routes: Routes = [{
  path: '',
  component: DisableRoutingComponent,
}, {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisableRoutingRoutingModule { }
