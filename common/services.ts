import type { Brand, Product } from './types.ts';

import brands from '../public/data/brands.json';
import products from '../public/data/level3/products.json';

export function fetchBrands(): Promise<Brand[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(brands);
    }, 0);
  });
}

export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products as Product[]);
    }, 0);
  });
}
