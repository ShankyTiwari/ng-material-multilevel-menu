import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnSelectComponent } from './on-select.component';

const routes: Routes = [{
  path: '',
  component: OnSelectComponent,
}, {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnSelectRoutingModule { }
