import { IProduct } from '../interfaces/produt.interface';
import { IResponse } from '../interfaces/response.interface';

export const PRODUCTS: IResponse<IProduct[]> = {
  data: [
    {
      id: 'dos',
      name: 'Nombre producto',
      description: 'Descripción producto',
      logo: 'assets-1.png',
      date_release: '2025-01-01',
      date_revision: '2025-01-01',
    },
  ],
};
export const PRODUCT_SAVE: IResponse<IProduct> = {
  message: 'Product added successfully',
  data: {
    id: 'dos',
    name: 'Nombre producto',
    description: 'Descripción producto',
    logo: 'assets-1.png',
    date_release: '2025-01-01',
    date_revision: '2025-01-01',
  },
};
