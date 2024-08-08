import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [FooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the Footer', () => {
    expect(component).toBeTruthy();
  });
});
