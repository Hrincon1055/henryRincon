import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { IResponse } from '../interfaces/response.interface';

export abstract class ProductGateway {
  abstract getProducts(): Observable<IResponse<IProduct[]>>;
  abstract saveProduct(payload: IProduct): Observable<IResponse<IProduct>>;
  abstract getProductsById(id: string): Observable<IResponse<IProduct>>;
}
