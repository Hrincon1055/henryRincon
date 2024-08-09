import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './component/avatar/avatar.component';
import { ErrorInputMessageComponent } from './component/error-input-message/error-input-message.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { WebRoutingModule } from './web-routing.module';
import { AlertComponent } from './component/alert/alert.component';

@NgModule({
  declarations: [
    ProductListComponent,
    AvatarComponent,
    ErrorInputMessageComponent,
    CreateProductComponent,
    AlertComponent,
  ],
  imports: [CommonModule, WebRoutingModule, ReactiveFormsModule, FormsModule],
})
export class WebModule {}
