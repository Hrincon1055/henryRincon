import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the Header', () => {
    expect(component).toBeTruthy();
  });
});
