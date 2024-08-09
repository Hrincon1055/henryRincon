import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirModalComponent } from './confir-modal.component';

describe('ConfirModalComponent', () => {
  let component: ConfirModalComponent;
  let fixture: ComponentFixture<ConfirModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit true when confirmDelete is called', () => {
    spyOn(component.onClose, 'emit');
    component.confirmDelete();
    expect(component.onClose.emit).toHaveBeenCalledWith(true);
  });
  it('should emit false when cancel is called', () => {
    spyOn(component.onClose, 'emit');
    component.cancel();
    expect(component.onClose.emit).toHaveBeenCalledWith(false);
  });
});
