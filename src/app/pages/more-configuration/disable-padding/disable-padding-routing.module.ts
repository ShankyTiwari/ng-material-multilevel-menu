import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisablePaddingComponent } from './disable-padding.component';

const routes: Routes = [{
  path: '',
  component: DisablePaddingComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisablePaddingRoutingModule { }
