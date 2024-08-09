import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../domain/interfaces/product.interface';
import {
  PRODUCT_SAVE,
  PRODUCT_UPDATE,
  PRODUCTS,
} from '../../domain/mock/product.mock';
import { ProductService } from './product.service';
describe('ProductService', () => {
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

  it('should get product', () => {
    service.getProducts().subscribe((response) => {
      expect(response.data).toEqual(PRODUCTS.data);
    });
    const req = httpMock.expectOne(`${environment.urls.url}/products`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: PRODUCTS.data });
  });
  it('should save product', () => {
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

  it('should get product by id', () => {
    const productId = '1';
    const mockProduct: IProduct = {
      id: '1',
      name: 'Product 1',
      description: 'Description for Product 1',
      logo: 'logo-1.png',
      date_release: '2024-01-01',
      date_revision: '2024-01-01',
    };

    service.getProductsById(productId).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(
      `${environment.urls.url}/products/${productId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
  it('should update product', () => {
    const productId = '1';
    const updatedProduct: IProduct = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'updated-logo.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    };

    service.updateProduct(updatedProduct, productId).subscribe((resp) => {
      expect(resp).toEqual(PRODUCT_UPDATE);
    });

    const req = httpMock.expectOne(
      `${environment.urls.url}/products/${productId}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(PRODUCT_UPDATE);
  });
});
