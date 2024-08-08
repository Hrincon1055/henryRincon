import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [FooterComponent, HeaderComponent, LoadingComponent],
})
export class SharedModule {}
