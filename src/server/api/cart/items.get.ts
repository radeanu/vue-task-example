import { type CartItem } from '@/common/types';

import { getCartRepo } from '@/server/useCartRepo';
import { getBrandsRepo } from '@/server/useBrandsRepo';
import { getProductsRepo } from '@/server/useProductsRepo';

const cartRepo = getCartRepo();
const brandsRepo = getBrandsRepo();
const productsRepo = getProductsRepo();

export default defineEventHandler(async () => {
	const cart = cartRepo.getCart();
	const brands = brandsRepo.getBrands();

	const cartItems: CartItem[] = cart.map((item) => {
		const product = productsRepo.getProductBySku(item.sku);

		if (!product) return item;

		const brand = brands.find((b) => b.id === product.brand);

		return {
			...item,
			product,
			brand
		};
	});

	return cartItems;
});
