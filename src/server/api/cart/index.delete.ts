import { getCartRepo } from '@/server/useCartRepo.ts';

const cartRepo = getCartRepo();

export default defineEventHandler(async (event) => {
	const body = await readBody<{ sku: string }>(event);

	cartRepo.deleteFromCart(body.sku);
	return;
});
