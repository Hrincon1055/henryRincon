import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-produt',
  templateUrl: './create-produt.component.html',
  styleUrls: ['./create-produt.component.css'],
})
export class CreateProdutComponent implements OnInit {
  public formProdut!: FormGroup;
  private subscriptions: Subscription = new Subscription();
  constructor(private _fb: FormBuilder) {}
  ngOnInit(): void {
    this.loadForm();
    this.syncDateReleaseWithDateRevision();
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

  public resetForm(): void {
    this.formProdut.reset();
    this.formProdut.get('id')?.setValue(crypto.randomUUID());
  }
}
