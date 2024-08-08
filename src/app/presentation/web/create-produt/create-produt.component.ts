import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../domain/interfaces/produt.interface';
import { ProdutUsecase } from '../../../domain/usecases/produt.usecase';

@Component({
  selector: 'app-create-produt',
  templateUrl: './create-produt.component.html',
  styleUrls: ['./create-produt.component.css'],
})
export class CreateProdutComponent implements OnInit, OnDestroy {
  public formProdut!: FormGroup;
  public isProductSave: boolean = false;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _produtUsecase: ProdutUsecase
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.syncDateReleaseWithDateRevision();
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
      this._produtUsecase.saveProdut(newProduct).subscribe({
        next: (response) => {
          if (response) {
            this.isProductSave = true;
            setTimeout(() => {
              this.isProductSave = false;
              this.resetForm();
            }, 1000);
          }
        },
        error: (err) => {
          this.isProductSave = false;
        },
      })
    );
  }

  public resetForm(): void {
    this.formProdut.reset();
    this.formProdut.get('id')?.setValue(crypto.randomUUID());
  }
}
