import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProdutGateway } from '../gateway/produt.gateway';
import { IProduct } from '../interfaces/produt.interface';
import { IResponse } from '../interfaces/response.interface';
import { PRODUCT_SAVE, PRODUCTS } from '../mock/product.mock';

@Injectable({ providedIn: 'root' })
export class ProdutStub implements ProdutGateway {
  private products: IResponse<IProduct[]> = PRODUCTS;
  private productSave: IResponse<IProduct> = PRODUCT_SAVE;

  public getProduts(): Observable<IResponse<IProduct[]>> {
    return of(this.products);
  }
  public saveProdut(payload: IProduct): Observable<IResponse<IProduct>> {
    return of(this.productSave);
  }
}
