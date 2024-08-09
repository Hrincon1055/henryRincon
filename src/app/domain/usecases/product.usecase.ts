import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductGateway } from '../gateway/product.gateway';
import { IProduct } from '../interfaces/product.interface';
import { IResponse } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class ProductUsecase implements ProductGateway {
  constructor(private _productGateway: ProductGateway) {}

  public getProducts(): Observable<IResponse<IProduct[]>> {
    return this._productGateway.getProducts();
  }

  public saveProduct(payload: IProduct): Observable<IResponse<IProduct>> {
    return this._productGateway.saveProduct(payload);
  }

  public getProductsById(id: string): Observable<IProduct> {
    return this._productGateway.getProductsById(id);
  }

  public updateProduct(
    payload: IProduct,
    id: string
  ): Observable<IResponse<IProduct>> {
    return this._productGateway.updateProduct(payload, id);
  }
}
