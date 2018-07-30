import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent
}, {
  path: 'demo-one',
  loadChildren: 'src/app/pages/demo-one/demo-one.module#DemoOneModule'
}, {
  path: 'demo-two',
  loadChildren: 'src/app/pages/demo-two/demo-two.module#DemoTwoModule'
}, {
  path: 'demo/:demoNumber',
  loadChildren: 'src/app/pages/demo-three/demo-three.module#DemoThreeModule'
}, {
  path: 'demo-number/:demoNumber',
  loadChildren: 'src/app/pages/demo-four/demo-four.module#DemoFourModule'
}, {
  path: '**',
  redirectTo: '/',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
