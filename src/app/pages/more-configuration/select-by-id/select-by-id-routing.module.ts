import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectByIdComponent } from './select-by-id.component';

const routes: Routes = [{
  path: '',
  component: SelectByIdComponent,
}, {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectByIdRoutingModule { }
