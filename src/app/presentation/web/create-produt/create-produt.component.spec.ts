import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProdutStub } from '../../../domain/stub/produt.stub';
import { ProdutUsecase } from '../../../domain/usecases/produt.usecase';
import { SharedModule } from '../../../shared/shared.module';
import { CreateProdutComponent } from './create-produt.component';

describe('CreateProdutComponent', () => {
  let component: CreateProdutComponent;
  let fixture: ComponentFixture<CreateProdutComponent>;
  let formBuilder: FormBuilder;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProdutComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: ProdutUsecase, useClass: ProdutStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(CreateProdutComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
