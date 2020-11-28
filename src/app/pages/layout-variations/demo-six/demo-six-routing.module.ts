import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoSixComponent } from './demo-six.component';

const routes: Routes = [{
  path: '',
  component: DemoSixComponent,
  children: [{
      path: '',
      redirectTo: 'version-one',
      pathMatch: 'full',
    },
    {
      path: 'version-one',
      loadChildren: () => import("./version-one/version-one.module").then((m) => m.VersionOneModule),
    },
    {
      path: 'version-two',
      loadChildren: () => import("./version-two/version-two.module").then((m) => m.VersionTwoModule),
    },
    {
      path: 'version-three',
      loadChildren: () => import("./version-three/version-three.module").then((m) => m.VersionThreeModule),
    },
  ]
}, {
  path: '',
  redirectTo: '/',
  pathMatch: 'full'
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoSixRoutingModule { }
