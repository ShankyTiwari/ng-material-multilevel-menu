import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: '/pages/home',
  pathMatch: 'full',
}, {
  path: 'pages',
  loadChildren: () => import("./pages/pages.module").then((m) => m.PagesModule),
}, {
  path: '**',
  redirectTo: '/pages/home',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
