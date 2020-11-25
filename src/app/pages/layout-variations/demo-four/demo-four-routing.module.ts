import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoFourComponent } from './demo-four.component';

const routes: Routes = [{
  path: '',
  component: DemoFourComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoFourRoutingModule { }
