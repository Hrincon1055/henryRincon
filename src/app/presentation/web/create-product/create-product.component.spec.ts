import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';
import { SharedModule } from '../../../shared/shared.module';
import { CreateProductComponent } from './create-product.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let formBuilder: FormBuilder;
  let productUsecase: jasmine.SpyObj<ProductUsecase>;
  const voidExpected = void 0;
  beforeEach(async () => {
    const productUsecaseSpy = jasmine.createSpyObj('ProductUsecase', [
      'saveProduct',
    ]);
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [SharedModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ProductUsecase, useValue: productUsecaseSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    productUsecase = TestBed.inject(
      ProductUsecase
    ) as jasmine.SpyObj<ProductUsecase>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('getErrorMessage', () => {
    beforeEach(() => {
      component.formProduct = formBuilder.group({
        id: [{ value: '', disabled: true }],
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        logo: [null, [Validators.required]],
        date_release: [null, [Validators.required]],
        date_revision: [{ value: null, disabled: true }],
      });
    });

    it('should return an empty string if there are no errors', () => {
      const result = component.getErrorMessage('id');
      expect(result).toBe('');
    });

    it('should return "Este campo es requerido" if the field is required and empty', () => {
      component.formProduct.get('name')?.setValue('');
      component.formProduct.get('name')?.markAsTouched();
      const result = component.getErrorMessage('name');
      expect(result).toBe('Este campo es requerido');
    });

    it('should return error message for pattern if the field has a pattern error', () => {
      component.formProduct
        .get('name')
        ?.setValidators([Validators.pattern('^[a-zA-Z]*$')]);
      component.formProduct.get('name')?.setValue('1234');
      component.formProduct.get('name')?.markAsTouched();
      const result = component.getErrorMessage('name');
      expect(result).toBe('Formato no válido');
    });

    it('should return error message for minlength if the field is too short', () => {
      component.formProduct
        .get('name')
        ?.setValidators([Validators.minLength(5)]);
      component.formProduct.get('name')?.setValue('John');
      component.formProduct.get('name')?.markAsTouched();
      const result = component.getErrorMessage('name');
      expect(result).toBe('Debe tener al menos 5 caracteres');
    });

    it('should return error message for maxlength if the field is too long', () => {
      component.formProduct
        .get('name')
        ?.setValidators([Validators.maxLength(5)]);
      component.formProduct.get('name')?.setValue('Johnathan');
      component.formProduct.get('name')?.markAsTouched();
      const result = component.getErrorMessage('name');
      expect(result).toBe('No puede tener más de 5 caracteres');
    });
  });
  // it('should set isProductSave to true when saveProdut is successful', () => {
  //   const product = component.formProdut.getRawValue();
  //   produtUsecase.saveProduct.and.returnValue(
  //     of({
  //       message: 'Product added successfully',
  //       data: {
  //         id: 'tres',
  //         name: 'Nombre producto',
  //         description: 'Descripción producto',
  //         logo: 'assets-1.png',
  //         date_release: '2025-01-01',
  //         date_revision: '2025-01-01',
  //       },
  //     })
  //   );
  //   component.saveProdut();
  //   expect(produtUsecase.saveProduct).toHaveBeenCalledWith(product);
  //   expect(component.statusAlert).toBeTrue();
  // });
  it('should call resetForm', () => {
    expect(component.resetForm()).toBe(voidExpected);
  });
  // it('should call resetStatus', () => {
  //   expect(component.resetStatus()).toBe(voidExpected);
  // });
  // it('should set isProductSave to true, then false, and call resetForm after 1 second', fakeAsync(() => {
  //   spyOn(component, 'resetForm');
  //   component.resetStatus();
  //   expect(component.statusAlert).toBeTrue();
  //   tick(1000);
  //   expect(component.statusAlert).toBeFalse();
  //   expect(component.resetForm).toHaveBeenCalled();
  // }));
});
