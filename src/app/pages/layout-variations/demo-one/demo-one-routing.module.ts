import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoOneComponent } from './demo-one.component';

const routes: Routes = [{
  path: '',
  component: DemoOneComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoOneRoutingModule { }
