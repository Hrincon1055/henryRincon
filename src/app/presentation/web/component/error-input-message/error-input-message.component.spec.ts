import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInputMessageComponent } from './error-input-message.component';

describe('ErrorInputMessageComponent', () => {
  let component: ErrorInputMessageComponent;
  let fixture: ComponentFixture<ErrorInputMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorInputMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorInputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
