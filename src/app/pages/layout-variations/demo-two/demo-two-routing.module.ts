import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoTwoComponent } from './demo-two.component';

const routes: Routes = [{
  path: '',
  component: DemoTwoComponent
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoTwoRoutingModule { }
