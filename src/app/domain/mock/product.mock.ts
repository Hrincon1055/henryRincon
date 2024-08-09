import { IProduct } from '../interfaces/product.interface';
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
export const PRODUCT_UPDATE: IResponse<IProduct> = {
  message: 'Product updated successfully',
  data: {
    name: 'Nombre producto',
    description: 'Descripción producto',
    logo: 'assets-1.png',
    date_release: '2025-01-01',
    date_revision: '2025-01-01',
  },
};
export const PRODUCT: IProduct = {
  id: 'dos',
  name: 'Nombre producto',
  description: 'Descripción producto',
  logo: 'assets-1.png',
  date_release: '2025-01-01',
  date_revision: '2025-01-01',
};
export const DELETE_PRODUCT: { message: string } = {
  message: 'Product removed successfully',
};
