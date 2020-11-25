import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpandCollapseComponent } from './expand-collapse.component';

const routes: Routes = [{
  path: '',
  component: ExpandCollapseComponent,
}, {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpandCollapseRoutingModule { }
