import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PRODUCT } from '../../../domain/mock/product.mock';
import { ProductStub } from '../../../domain/stub/product.stub';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';
import { SharedModule } from '../../../shared/shared.module';
import { CreateProductComponent } from './create-product.component';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let formBuilder: FormBuilder;
  const voidExpected = void 0;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [SharedModule, RouterTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ProductUsecase, useClass: ProductStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

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
  it('should call resetForm', () => {
    expect(component.resetForm()).toBe(voidExpected);
  });
  it('should call updateProduct if isEditing is true', () => {
    spyOn(component, 'updateProduct');
    component.isEditing = true;
    component.saveProduct();
    expect(component.updateProduct).toHaveBeenCalled();
  });
  it('should call createProduct if isEditing is false', () => {
    spyOn(component, 'createProduct');
    component.isEditing = false;
    component.saveProduct();
    expect(component.createProduct).toHaveBeenCalled();
  });
  beforeEach(() => {
    spyOn(component['_productUsecase'], 'saveProduct').and.returnValue(
      of({ data: {} })
    );
    spyOn(component, 'resetStatus');
  });
  it('should call saveProduct and resetStatus with success message', () => {
    component.createProduct();
    expect(component['_productUsecase'].saveProduct).toHaveBeenCalled();
    expect(component.resetStatus).toHaveBeenCalledWith(
      'Producto creado',
      'exito'
    );
  });
  it('should call updateProduct and resetStatus with success message', () => {
    component.idEditing = '93c70fa6-bae1-411f-9574-9ed282f3ee6b';
    component.updateProduct();
    expect(component.updateProduct()).toBe(voidExpected);
  });
  it('should update alert status and call resetForm after 2 seconds', () => {
    expect(component.resetStatus('mensaje', 'exito')).toBe(voidExpected);
  });
  it('should call updateFormWithProductData', () => {
    expect(component.updateFormWithProductData(PRODUCT)).toBe(voidExpected);
  });
  it('should call loadProductData', () => {
    expect(component.loadProductData()).toBe(voidExpected);
  });
  it('should update alert status and call resetForm after 2 seconds', fakeAsync(() => {
    spyOn(component, 'resetForm').and.callThrough();
    component.resetStatus('', 'error');
    expect(component.isActiveAlert).toBeFalsy();
    expect(component.messageAlert).toBe('');
    expect(component.statusAlert).toBe('');
    tick(2000);
    expect(component.isActiveAlert).toBeFalse();
  }));
});
