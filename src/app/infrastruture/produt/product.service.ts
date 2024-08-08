import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProdutGateway } from '../../domain/gateway/produt.gateway';
import { IProduct } from '../../domain/interfaces/produt.interface';
import { IResponse } from '../../domain/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutService extends ProdutGateway {
  private url = environment.urls.url;
  constructor(private _http: HttpClient) {
    super();
  }
  public getProduts(): Observable<IResponse<IProduct[]>> {
    return this._http.get<IResponse<IProduct[]>>(`${this.url}/products`);
  }
  public saveProdut(payload: IProduct): Observable<IResponse<IProduct>> {
    return this._http.post<IResponse<IProduct>>(
      `${this.url}/products`,
      payload
    );
  }
}
