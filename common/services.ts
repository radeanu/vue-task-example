import productCartStorage from '@/common/productCartStorage.ts';
import type { Brand, Product, ProductCart } from '@/common/types.ts';

import brands from '../public/data/brands.json';
import products from '../public/data/level3/products.json';

const cartStorage = productCartStorage();

export function fetchBrands(): Promise<Brand[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(brands);
    }, 0);
  });
}

export function fetchCart(): Promise<ProductCart[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = cartStorage.getCartProducts();

      resolve(products);
    }, 0);
  });
}

export function addToCart(item: ProductCart): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      cartStorage.addProduct(item);
      resolve();
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
