import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DemoSevenComponent} from './demo-seven.component';

const routes: Routes = [{
  path: '',
  component: DemoSevenComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoSevenRoutingModule { }
