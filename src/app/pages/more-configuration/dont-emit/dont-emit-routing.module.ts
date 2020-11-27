import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DontEmitComponent } from './dont-emit.component';

const routes: Routes = [{
  path: '',
  component: DontEmitComponent,
}, {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DontEmitRoutingModule { }
