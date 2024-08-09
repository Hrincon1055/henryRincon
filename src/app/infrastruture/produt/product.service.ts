import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductGateway } from '../../domain/gateway/product.gateway';
import { IProduct } from '../../domain/interfaces/product.interface';
import { IResponse } from '../../domain/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends ProductGateway {
  private url = environment.urls.url;

  constructor(private _http: HttpClient) {
    super();
  }

  public getProducts(): Observable<IResponse<IProduct[]>> {
    return this._http.get<IResponse<IProduct[]>>(`${this.url}/products`);
  }

  public saveProduct(payload: IProduct): Observable<IResponse<IProduct>> {
    return this._http.post<IResponse<IProduct>>(
      `${this.url}/products`,
      payload
    );
  }

  public getProductsById(id: string): Observable<IResponse<IProduct>> {
    return this._http.get<IResponse<IProduct>>(`${this.url}/products/${id}`);
  }
}
