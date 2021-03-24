import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DemoEightComponent} from './demo-eight.component';

const routes: Routes = [{
  path: '',
  component: DemoEightComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoEightRoutingModule { }
