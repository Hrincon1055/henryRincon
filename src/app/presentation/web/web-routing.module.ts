import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProdutComponent } from './create-produt/create-produt.component';
import { ProdutListComponent } from './produt-list/produt-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProdutListComponent,
    title: 'List Produts',
  },
  {
    path: 'create',
    component: CreateProdutComponent,
    title: 'Create Produts',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
