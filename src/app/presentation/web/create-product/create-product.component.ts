import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../domain/interfaces/product.interface';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  public statusAlert: 'error' | 'exito' | '' = '';
  public formProdut!: FormGroup;
  public isActiveAlert: boolean = false;
  public messageAlert: string = '';

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
    this.formProdut = this._fb.group({
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
      this.formProdut.get('date_release')?.valueChanges.subscribe((date) => {
        if (date) {
          this.formProdut
            .get('date_revision')
            ?.setValue(date, { emitEvent: false });
        }
      })!
    );
  }

  public isFieldValid(field: string): boolean {
    const control = this.formProdut.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  public getErrorMessage(field: string): string {
    const control = this.formProdut.get(field);
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

  public saveProdut(): void {
    const newProduct = this.formProdut.getRawValue() as IProduct;
    this.subscriptions.add(
      this._productUsecase.saveProduct(newProduct).subscribe({
        next: (response) => {
          if (response) {
            this.resetStatus('Producto creado', 'exito');
          }
        },
        error: (err) => {
          this.resetStatus('Error al crear el produto', 'error');
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
    }, 1000);
  }

  private loadProductData(): void {
    //  this.subscriptions.add(this._activatedRoute.paramMap
    //     .pipe())
  }

  public resetForm(): void {
    this.formProdut.reset();
    this.formProdut.get('id')?.setValue(crypto.randomUUID());
  }
}
