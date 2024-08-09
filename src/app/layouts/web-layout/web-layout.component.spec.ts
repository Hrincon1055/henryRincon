import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WebLayoutComponent } from './web-layout.component';
describe('WebLayoutComponent', () => {
  let fixture: ComponentFixture<WebLayoutComponent>;
  let component: WebLayoutComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, SharedModule],
      declarations: [WebLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(WebLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the web layout', () => {
    expect(component).toBeTruthy();
  });
});
