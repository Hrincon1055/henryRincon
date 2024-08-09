import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../domain/interfaces/product.interface';
import { ProductUsecase } from '../../../domain/usecases/product.usecase';
import { byStringProperty } from '../../../utils/filters';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public productsAll: IProduct[] = [];
  public productsFilterd: IProduct[] = [];
  public searchTerm: string = '';
  public lengthFilt: number = 5;
  constructor(private _productUsecase: ProductUsecase) {}
  ngOnInit(): void {
    this.getProdut();
  }

  private getProdut(): void {
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
}
