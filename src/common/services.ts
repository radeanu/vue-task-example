import type { Brand, Product, ProductCart, CartItem } from '@/common/types.ts';

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

export function upsertCart(item: ProductCart): Promise<ProductCart> {
	const config = useRuntimeConfig();
	const baseUrl = config.public.API_BASE_URL;

	return $fetch(baseUrl + '/api/cart', { method: 'POST', body: item });
}

export function deleteFromCart(sku: string): Promise<void> {
	const config = useRuntimeConfig();
	const baseUrl = config.public.API_BASE_URL;

	return $fetch(baseUrl + '/api/cart', { method: 'DELETE', body: { sku } });
}

export function fetchProducts(brand?: string): Promise<Product[]> {
	const config = useRuntimeConfig();
	const baseUrl = config.public.API_BASE_URL;

	return $fetch(baseUrl + '/api/products', { query: { brand } });
}

export function fetchCartItems(): Promise<CartItem[]> {
	const config = useRuntimeConfig();
	const baseUrl = config.public.API_BASE_URL;

	return $fetch(baseUrl + '/api/cart/items');
}
