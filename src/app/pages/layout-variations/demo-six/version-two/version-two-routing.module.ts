import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionTwoComponent } from './version-two.component';

const routes: Routes = [{
  path: '',
  component: VersionTwoComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionTwoRoutingModule { }
