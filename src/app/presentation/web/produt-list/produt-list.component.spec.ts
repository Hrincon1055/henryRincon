import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ProdutStub } from '../../../domain/stub/produt.stub';
import { ProdutUsecase } from '../../../domain/usecases/produt.usecase';
import { SharedModule } from '../../../shared/shared.module';
import { ProdutListComponent } from './produt-list.component';

describe('ProdutListComponent', () => {
  let component: ProdutListComponent;
  let fixture: ComponentFixture<ProdutListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutListComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: ProdutUsecase, useClass: ProdutStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ProdutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
