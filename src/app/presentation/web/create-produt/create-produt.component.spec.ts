import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProdutComponent } from './create-produt.component';

describe('CreateProdutComponent', () => {
  let component: CreateProdutComponent;
  let fixture: ComponentFixture<CreateProdutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProdutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProdutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
