import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionThreeComponent } from './version-three.component';

const routes: Routes = [{
  path: '',
  component: VersionThreeComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionThreeRoutingModule { }
