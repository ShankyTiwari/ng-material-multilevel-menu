import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent
}, {
  path: 'demo-one',
  loadChildren: () => import('src/app/pages/demo-one/demo-one.module').then(m => m.DemoOneModule)
}, {
  path: 'demo two',
  loadChildren: () => import('src/app/pages/demo-two/demo-two.module').then(m => m.DemoTwoModule)
}, {
  path: 'demo/:demoNumber',
  loadChildren: () => import('src/app/pages/demo-three/demo-three.module').then(m => m.DemoThreeModule)
}, {
  path: 'demo',
  loadChildren: () => import('src/app/pages/demo-four/demo-four.module').then(m => m.DemoFourModule)
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
