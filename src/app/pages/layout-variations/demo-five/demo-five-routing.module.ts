import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemoFiveComponent } from './demo-five.component';

const routes: Routes = [{
  path: '',
  component: DemoFiveComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoFiveRoutingModule { }
