import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MinimiseComponent} from './minimise.component';

const routes: Routes = [{
  path: '',
  component: MinimiseComponent,
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinimiseRoutingModule { }
