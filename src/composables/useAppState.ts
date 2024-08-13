import * as services from '@/common/services';
import type { ProductCart, Brand } from '@/common/types';

export const useCartState = () => {
	const cart = useState<ProductCart[]>('cart', () => []);

	const cartCount = computed(() => cart.value.length);

	function setCart(items: ProductCart[]) {
		cart.value = items;
	}

	async function fetchCart() {
		cart.value = await services.fetchCart();
	}

	async function upsertCart(item: ProductCart) {
		await services.upsertCart(item);
		await fetchCart();
	}

	return { cart, setCart, fetchCart, upsertCart, cartCount };
};

export const useBrandsState = () => {
	const brands = useState<Brand[]>('brands', () => []);

	async function fetchBrands() {
		brands.value = await services.fetchBrands();
	}

	return { brands, fetchBrands };
};
