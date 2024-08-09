import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from '../../../domain/interfaces/product.interface';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';
import { byStringProperty } from '../../../utils/filters';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public productsAll: IProduct[] = [];
  public productsFilterd: IProduct[] = [];
  public searchTerm: string = '';
  public lengthFilt: number = 5;
  public isModalOpen: boolean = false;
  public idDelete: string = '';
  public titleProduct: string = '';
  private subscriptions: Subscription = new Subscription();
  constructor(private _productUsecase: ProductUsecase) {}

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getProduct(): void {
    this._productUsecase.getProducts().subscribe({
      next: (response) => {
        if (response) {
          this.productsAll = response.data;
          this.productsFilterd = response.data;
        }
      },
    });
  }

  public filterGrid(): void {
    const filtersEmpty = !this.searchTerm?.length;
    if (filtersEmpty) {
      this.productsFilterd = this.productsAll;
    } else {
      this.productsFilterd = this.updateFiter({ name: this.searchTerm });
    }
  }

  public updateFiter(filters: any) {
    let tempList: IProduct[] = [...this.productsAll];
    tempList = this.nameFltr(tempList, filters);
    return tempList;
  }

  private nameFltr(tempList: IProduct[], filters: any): IProduct[] {
    tempList = byStringProperty({
      filters,
      filterKey: 'name',
      tempList,
      tempListProperty: 'name',
    });
    return tempList;
  }

  public deleteProductId(event: any): void {
    if (event.length > 0) {
      this.isModalOpen = true;
      this.idDelete = event;
      this.titleProduct = this.productsAll.find(
        (item) => item.id === event
      )?.name!;
    }
  }

  public handleModalClose(event: any): void {
    this.isModalOpen = false;
    if (event) {
      this.deleteProductsById();
    }
  }

  public deleteProductsById(): void {
    this.subscriptions.add(
      this._productUsecase.deleteProductsById(this.idDelete).subscribe({
        next: (response) => {
          if (response.message === 'Product removed successfully') {
            this.getProduct();
          }
        },
        error: (err) => {},
      })
    );
  }
}
