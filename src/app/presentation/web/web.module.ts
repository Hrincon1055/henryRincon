import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from './component/avatar/avatar.component';
import { CreateProdutComponent } from './create-produt/create-produt.component';
import { ProdutListComponent } from './produt-list/produt-list.component';
import { WebRoutingModule } from './web-routing.module';

@NgModule({
  declarations: [ProdutListComponent, AvatarComponent, CreateProdutComponent],
  imports: [CommonModule, WebRoutingModule, ReactiveFormsModule],
})
export class WebModule {}
