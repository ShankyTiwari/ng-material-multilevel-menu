import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutVariationsComponent } from './layout-variations.component';

const routes: Routes = [{
  path: '',
  component: LayoutVariationsComponent,
  children: [
    {
      path: 'demo-one',
      loadChildren: () => import("./demo-one/demo-one.module").then((m) => m.DemoOneModule),
    },
    {
      path: 'demo-two',
      loadChildren: () => import("./demo-two/demo-two.module").then((m) => m.DemoTwoModule),
    },
    {
      path: 'demo-three',
      loadChildren: () => import("./demo-three/demo-three.module").then((m) => m.DemoThreeModule),
    },
    {
      path: 'demo-four',
      loadChildren: () => import("./demo-four/demo-four.module").then((m) => m.DemoFourModule),
    },
    {
      path: 'demo-five',
      loadChildren: () => import("./demo-five/demo-five.module").then((m) => m.DemoFiveModule),
    },
    {
      path: 'demo-six',
      loadChildren: () => import("./demo-six/demo-six.module").then((m) => m.DemoSixModule),
    }
  ]
}, {
  path: '**',
  redirectTo: '',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutVariationsRoutingModule { }
