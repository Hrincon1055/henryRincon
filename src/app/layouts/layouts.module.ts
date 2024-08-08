import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { WebLayoutComponent } from './web-layout/web-layout.component';

@NgModule({
  declarations: [WebLayoutComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [WebLayoutComponent],
})
export class LayoutsModule {}
