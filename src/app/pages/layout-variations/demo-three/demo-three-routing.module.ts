import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoThreeComponent } from './demo-three.component';

const routes: Routes = [{
  path: '',
  component: DemoThreeComponent
}, {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoThreeRoutingModule { }
