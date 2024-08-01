import type { Brand, Product, ProductCart } from '@/common/types.ts';

export function fetchBrands(): Promise<Brand[]> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_BASE_URL;
  return $fetch(baseUrl + '/api/brands');
}

export function fetchCart(): Promise<ProductCart[]> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_BASE_URL;
  return $fetch(baseUrl + '/api/cart');
}

export function addToCart(item: ProductCart): Promise<void> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_BASE_URL;

  return $fetch(baseUrl + '/api/cart', { method: 'POST', body: item });
}

export function fetchProducts(brand?: string): Promise<Product[]> {
  const config = useRuntimeConfig();
  const baseUrl = config.public.API_BASE_URL;

  return $fetch(baseUrl + '/api/products', { query: { brand } });
}
