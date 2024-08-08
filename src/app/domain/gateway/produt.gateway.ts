import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/produt.interface';
import { IResponse } from '../interfaces/response.interface';

export abstract class ProdutGateway {
  abstract getProduts(): Observable<IResponse<IProduct[]>>;
  abstract saveProdut(payload: IProduct): Observable<IResponse<IProduct>>;
}
