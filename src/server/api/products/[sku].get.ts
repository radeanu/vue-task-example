import { getProductsRepo } from '@/server/useProductsRepo';

const productsRepo = getProductsRepo();

export default defineEventHandler(async (event) => {
	const sku = getRouterParam(event, 'sku');

	if (!sku) return null;

	const product = productsRepo.getProductBySku(sku);

	if (!product) return null;

	return product;
});
