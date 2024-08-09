import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  const voidExpected = void 0;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return an empty string if name is empty', () => {
    const result = component.getInitials('');
    expect(result).toBe('');
  });

  it('should return the first letter if name has one word', () => {
    const result = component.getInitials('John');
    expect(result).toBe('J');
  });

  it('should return initials from the first two words if name has two words', () => {
    const result = component.getInitials('John Doe');
    expect(result).toBe('JD');
  });

  it('should return initials from the first two words if name has more than two words', () => {
    const result = component.getInitials('John Michael Doe');
    expect(result).toBe('JM');
  });
  it('should call resetForm', () => {
    expect(component.ngOnChanges()).toBe(voidExpected);
  });
});
