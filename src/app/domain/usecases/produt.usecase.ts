import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutGateway } from '../gateway/produt.gateway';
import { IProduct } from '../interfaces/produt.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class ProdutUsecase implements ProdutGateway {
  constructor(private _produtGateway: ProdutGateway) {}

  public getProduts(): Observable<IResponse<IProduct[]>> {
    return this._produtGateway.getProduts();
  }

  public saveProdut(payload: IProduct): Observable<IResponse<IProduct>> {
    return this._produtGateway.saveProdut(payload);
  }
}
