import { getCartRepo } from '@/server/useCartRepo.ts';

const cartRepo = getCartRepo();

export default defineEventHandler(async () => {
	const cart = cartRepo.getCart();

	return cart;
});
