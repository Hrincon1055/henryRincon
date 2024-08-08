import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './layouts/web-layout/web-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full',
  },
  {
    path: 'product',
    component: WebLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./presentation/web/web.module').then((m) => m.WebModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
