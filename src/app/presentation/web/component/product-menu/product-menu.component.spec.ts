import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMenuComponent } from './product-menu.component';

describe('ProductMenuComponent', () => {
  let component: ProductMenuComponent;
  let fixture: ComponentFixture<ProductMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle the value of showMenu when toggleMenu is called', () => {
    component.showMenu = false;
    component.toggleMenu();
    expect(component.showMenu).toBeTrue();
    component.toggleMenu();
    expect(component.showMenu).toBeFalse();
  });
  it('should set showMenu to false if clicked outside of the menu container', () => {
    component.showMenu = true;
    const event = {
      target: document.createElement('div'),
    } as any;
    component.closeMenu(event);
    expect(component.showMenu).toBeFalse();
  });
  it('should navigate to the edit page with the correct product ID', () => {
    const routerSpy = spyOn(component['_router'], 'navigate');
    component.productId = '123';
    component.editProduct();
    expect(routerSpy).toHaveBeenCalledWith(['/product/edit/123']);
  });
  it('should emit the correct productId when deleteProduct is called', () => {
    spyOn(component.deleteProductId, 'emit');
    component.productId = '123';
    component.deleteProduct();
    expect(component.deleteProductId.emit).toHaveBeenCalledWith('123');
  });
});
