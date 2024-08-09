import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IProduct } from '../../../domain/interfaces/product.interface';
import { PRODUCT } from '../../../domain/mock/product.mock';
import { ProductStub } from '../../../domain/stub/product.stub';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';
import { SharedModule } from '../../../shared/shared.module';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  const voidExpected = void 0;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [SharedModule, RouterTestingModule, FormsModule],
      providers: [{ provide: ProductUsecase, useClass: ProductStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set productsFilterd to productsAll if searchTerm is empty', () => {
    component.productsAll = [PRODUCT] as IProduct[];
    component.searchTerm = '';
    component.filterGrid();
    expect(component.productsFilterd).toEqual(component.productsAll);
  });
  it('should filter products if searchTerm is not empty', () => {
    component.productsAll = [PRODUCT] as IProduct[];
    component.searchTerm = 'Product 1';
    component.filterGrid();
    expect(component.productsFilterd.length).toBe(0);
  });
  it('should filter products based on name', () => {
    component.productsAll = [PRODUCT] as IProduct[];
    const result = component.updateFiter({ name: 'Test' });
    expect(result.length).toBe(0);
  });
  it('should filter products by name', () => {
    const products: IProduct[] = [PRODUCT];
    const filters = { name: 'Banana' };
    const filteredProducts = component['nameFltr'](products, filters);
    expect(filteredProducts.length).toBe(0);
  });
  it('should set isModalOpen to true, idDelete, and titleProduct when deleteProductId is called with a valid event', () => {
    const event = 'dos';
    component.productsAll = [PRODUCT] as IProduct[];
    component.deleteProductId(event);
    expect(component.isModalOpen).toBeTrue();
    expect(component.idDelete).toBe(event);
    expect(component.titleProduct).toBe(PRODUCT?.name!);
  });
  it('should set isModalOpen to false and call deleteProductsById when event is true', () => {
    spyOn(component, 'deleteProductsById');
    component.handleModalClose(true);
    expect(component.isModalOpen).toBeFalse();
    expect(component.deleteProductsById).toHaveBeenCalled();
  });
  it('should call deleteProductsById', () => {
    expect(component.deleteProductsById()).toBe(voidExpected);
  });
});
