import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { LoaderService } from '../infrastruture/ui/app.loader.service';

/**
 * Interceptor HTTP inyectable que maneja la visualización de un loader durante las peticiones.
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  /**
   * Descripción: Arreglo que almacena las solicitudes pendientes.
   */
  private requests: HttpRequest<any>[] = [];
  /**
   * Descripción: Constructor del interceptor de loader.
   * @param loaderService - Servicio de loader para gestionar la visibilidad.
   */
  constructor(private loaderService: LoaderService) {}
  /**
   * Descripción: Método privado que elimina la solicitud del arreglo de solicitudes pendientes.
   * @param req - Solicitud HTTP a ser eliminada.
   */
  private removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
  /**
   * Descripción: Interceptar la solicitud HTTP y gestionar la visualización del loader.
   * @param req - Solicitud HTTP.
   * @param next - Manejador HTTP para continuar con la cadena de interceptores.
   * @returns Observable que emite el evento HTTP.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return new Observable((observer: any) => {
      const subscription = next
        .handle(req)
        .pipe(delay(200))
        .subscribe({
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          error: (err) => {
            this.removeRequest(req);
            observer.error(err);
          },
          complete: () => {
            this.removeRequest(req);
            observer.complete();
          },
        });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
