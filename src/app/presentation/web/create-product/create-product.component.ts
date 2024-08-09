import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { IProduct } from '../../../domain/interfaces/product.interface';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  public statusAlert: 'error' | 'exito' | '' = '';
  public formProduct!: FormGroup;
  public isActiveAlert: boolean = false;
  public messageAlert: string = '';
  public isEditing: boolean = false;
  public idEditing: string = '';
  private subscriptions: Subscription = new Subscription();
  constructor(
    public _fb: FormBuilder,
    private _productUsecase: ProductUsecase,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.syncDateReleaseWithDateRevision();
    this.loadProductData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadForm(): void {
    this.formProduct = this._fb.group({
      id: [{ value: crypto.randomUUID(), disabled: true }],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      logo: [null, [Validators.required]],
      date_release: [null, [Validators.required]],
      date_revision: [{ value: null, disabled: true }],
    });
  }

  private syncDateReleaseWithDateRevision(): void {
    this.subscriptions.add(
      this.formProduct.get('date_release')?.valueChanges.subscribe((date) => {
        if (date) {
          this.formProduct
            .get('date_revision')
            ?.setValue(date, { emitEvent: false });
        }
      })!
    );
  }

  public isFieldValid(field: string): boolean {
    const control = this.formProduct.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  public getErrorMessage(field: string): string {
    const control = this.formProduct.get(field);
    if (!control || !control.errors) return '';
    const errorMessages: { [key: string]: string } = {
      required: 'Este campo es requerido',
      email: 'Correo electrónico no válido',
      pattern: 'Formato no válido',
      minlength: `Debe tener al menos ${control.errors['minlength']?.requiredLength} caracteres`,
      maxlength: `No puede tener más de ${control.errors['maxlength']?.requiredLength} caracteres`,
    };
    return errorMessages[Object.keys(control.errors)[0]] || 'Error desconocido';
  }
  public saveProduct(): void {
    console.log('create-product.component LINE 78 =>', this.isEditing);
    this.isEditing ? this.updateProduct() : this.createProduct();
  }
  public createProduct(): void {
    const newProduct = this.formProduct.getRawValue() as IProduct;
    this.subscriptions.add(
      this._productUsecase.saveProduct(newProduct).subscribe({
        next: (response) => {
          if (response) {
            this.resetStatus('Producto creado', 'exito');
          }
        },
        error: (err) => {
          this.resetStatus('Error al crear el producto', 'error');
        },
      })
    );
  }
  public updateProduct(): void {
    const updateProduct = this.formProduct.getRawValue() as IProduct;
    delete updateProduct.id;
    console.log('create-product.component LINE 98 =>', updateProduct);
    this.subscriptions.add(
      this._productUsecase
        .updateProduct(updateProduct, this.idEditing)
        .subscribe({
          next: (response) => {
            if (response) {
              this.resetStatus('Producto Actualizado', 'exito');
            }
          },
          error: (err) => {
            this.resetStatus('Error al crear el producto', 'error');
          },
        })
    );
  }

  public resetStatus(message: string, status: 'error' | 'exito'): void {
    this.isActiveAlert = true;
    this.messageAlert = message;
    this.statusAlert = status;
    setTimeout(() => {
      this.isActiveAlert = false;
      this.resetForm();
    }, 2000);
  }

  private loadProductData(): void {
    this.subscriptions.add(
      this._activatedRoute.paramMap
        .pipe(
          map((param) => param.get('id')),
          filter((id) => !!id),
          switchMap((id) => this._productUsecase.getProductsById(id!))
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.isEditing = true;
              this.updateFormWithProductData(response);
              this.idEditing = response?.id!;
            }
          },
        })
    );
  }

  private updateFormWithProductData(product: IProduct): void {
    this.formProduct.patchValue({
      id: product?.id,
      name: product?.name,
      description: product?.description,
      logo: product?.logo,
      date_release: product?.date_release,
      date_revision: product?.date_revision,
    });
  }

  public resetForm(): void {
    this.formProduct.reset();
    this.formProduct.get('id')?.setValue(crypto.randomUUID());
  }
}
