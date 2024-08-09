import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductGateway } from '../gateway/product.gateway';
import { IProduct } from '../interfaces/product.interface';
import { IResponse } from '../interfaces/response.interface';
import {
  DELETE_PRODUCT,
  PRODUCT,
  PRODUCT_SAVE,
  PRODUCT_UPDATE,
  PRODUCTS,
} from '../mock/product.mock';

@Injectable({ providedIn: 'root' })
export class ProductStub implements ProductGateway {
  private products: IResponse<IProduct[]> = PRODUCTS;
  private productSave: IResponse<IProduct> = PRODUCT_SAVE;
  private productUpdate: IResponse<IProduct> = PRODUCT_UPDATE;
  private product: IProduct = PRODUCT;
  private productDelete: { message: string } = DELETE_PRODUCT;

  public getProducts(): Observable<IResponse<IProduct[]>> {
    return of(this.products);
  }
  public saveProduct(payload: IProduct): Observable<IResponse<IProduct>> {
    return of(this.productSave);
  }
  public getProductsById(id: string): Observable<IProduct> {
    return of(this.product);
  }
  public updateProduct(
    payload: IProduct,
    id: string
  ): Observable<IResponse<IProduct>> {
    return of(this.productUpdate);
  }
  public deleteProductsById(id: string): Observable<{ message: string }> {
    return of(this.productDelete);
  }
}
