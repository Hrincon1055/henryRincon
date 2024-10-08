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

  public getProductsById(id: string): Observable<IProduct> {
    return this._http.get<IProduct>(`${this.url}/products/${id}`);
  }

  public updateProduct(
    payload: IProduct,
    id: string
  ): Observable<IResponse<IProduct>> {
    return this._http.put<IResponse<IProduct>>(
      `${this.url}/products/${id}`,
      payload
    );
  }

  public deleteProductsById(id: string): Observable<{ message: string }> {
    return this._http.delete<{ message: string }>(`${this.url}/products/${id}`);
  }
}
