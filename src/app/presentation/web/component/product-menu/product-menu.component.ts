import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.css'],
})
export class ProductMenuComponent {
  @Input() productId!: string;
  @Output() deleteProductId = new EventEmitter<string>();
  public showMenu: boolean = false;

  constructor(private _router: Router) {}

  public toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click', ['$event'])
  public closeMenu(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-container')) {
      this.showMenu = false;
    }
  }

  public editProduct(): void {
    this._router.navigate([`/product/edit/${this.productId}`]);
  }

  public deleteProduct(): void {
    this.deleteProductId.emit(this.productId);
  }
}
