import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../domain/interfaces/product.interface';
import { PRODUCT_SAVE, PRODUCTS } from '../../domain/mock/product.mock';
import { ProductService } from './product.service';
describe('ProdutService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get produt', () => {
    service.getProducts().subscribe((response) => {
      expect(response.data).toEqual(PRODUCTS.data);
    });
    const req = httpMock.expectOne(`${environment.urls.url}/products`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: PRODUCTS.data });
  });
  it('should save produt', () => {
    const payload: IProduct = {
      id: 'dos',
      name: 'Nuevo producto',
      description: 'Descripción del nuevo producto',
      logo: 'assets-2.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    };
    service.saveProduct(payload).subscribe((response) => {
      expect(response).toEqual(PRODUCT_SAVE);
    });
    const req = httpMock.expectOne(`${environment.urls.url}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(PRODUCT_SAVE);
  });
});
