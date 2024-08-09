import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductGateway } from '../gateway/product.gateway';
import { IProduct } from '../interfaces/product.interface';
import { IResponse } from '../interfaces/response.interface';
import { PRODUCT_SAVE, PRODUCTS } from '../mock/product.mock';

@Injectable({ providedIn: 'root' })
export class ProductStub implements ProductGateway {
  private products: IResponse<IProduct[]> = PRODUCTS;
  private productSave: IResponse<IProduct> = PRODUCT_SAVE;

  public getProducts(): Observable<IResponse<IProduct[]>> {
    return of(this.products);
  }
  public saveProduct(payload: IProduct): Observable<IResponse<IProduct>> {
    return of(this.productSave);
  }
  public getProductsById(id: string): Observable<IResponse<IProduct>> {
    return of(this.productSave);
  }
}
