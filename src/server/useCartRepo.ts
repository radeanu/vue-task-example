import { type ProductCart } from '@/common/types';

let cartRepo: ReturnType<typeof useCartRepo> | undefined;

function useCartRepo() {
	let cart: ProductCart[] = [];

	function getCart() {
		return cart;
	}

	function deleteFromCart(sku: string) {
		cart = cart.filter((item) => item.sku !== sku);
	}

	function upsertCart(sku: string, count: number) {
		const itemIndex = cart.findIndex((i) => i.sku === sku);

		if (itemIndex === -1) {
			return cart.push({ sku, count });
		}

		cart[itemIndex].count = count;

		return cart[itemIndex];
	}

	return {
		getCart,
		upsertCart,
		deleteFromCart
	};
}

export function getCartRepo() {
	if (cartRepo) return cartRepo;

	cartRepo = useCartRepo();

	return cartRepo;
}
