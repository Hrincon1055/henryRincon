import { Component } from '@angular/core';
import { ProdutUsecase } from '../../../domain/usecases/produt.usecase';

@Component({
  selector: 'app-produt-list',
  templateUrl: './produt-list.component.html',
  styleUrls: ['./produt-list.component.css'],
})
export class ProdutListComponent {
  constructor(private _produtUsecase: ProdutUsecase) {
    this._produtUsecase.getProduts().subscribe({
      next: (response) => {
        console.log('produt-list.component LINE 12 =>', response);
      },
    });
  }
}
