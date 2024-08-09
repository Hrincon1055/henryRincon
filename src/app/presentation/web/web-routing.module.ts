import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
    title: 'List Products',
  },
  {
    path: 'create',
    component: CreateProductComponent,
    title: 'Create Product',
  },
  {
    path: 'edit/:id',
    component: CreateProductComponent,
    title: 'Edit Product',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
