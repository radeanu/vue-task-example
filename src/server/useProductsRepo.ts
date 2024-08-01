import testData from '@/server/data/level3/products.json';

import { type Product } from '@/common/types';

let productsRepo: ReturnType<typeof useProductsRepo> | undefined;

function useProductsRepo() {
  const products: Product[] = testData as Product[];

  function getProducts(): Product[] {
    return products;
  }

  return {
    getProducts
  };
}

export function getProductsRepo() {
  if (productsRepo) return productsRepo;

  productsRepo = useProductsRepo();

  return productsRepo;
}
