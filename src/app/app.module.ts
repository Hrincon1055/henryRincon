import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutGateway } from './domain/gateway/produt.gateway';
import { ProdutService } from './infrastruture/produt/product.service';
import { LoaderInterceptor } from './interceptors/loader-interceptor.service';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: ProdutGateway, useClass: ProdutService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
