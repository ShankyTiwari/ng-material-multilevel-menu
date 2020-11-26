import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VersionOneComponent } from './version-one.component';

const routes: Routes = [{
  path: '',
  component: VersionOneComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VersionOneRoutingModule { }
