import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * Servicio inyectable que gestiona el estado de carga de la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  /**
   * Descripción: Sujeto para emitir eventos de cambio en el estado de carga.
   */
  public isLoading = new BehaviorSubject<boolean>(false);
}
