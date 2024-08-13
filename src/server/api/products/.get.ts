import { getBrandsRepo } from '@/server/useBrandsRepo';
import { getProductsRepo } from '@/server/useProductsRepo';

const brandsRepo = getBrandsRepo();
const productsRepo = getProductsRepo();

export default defineEventHandler(async (event) => {
	const query = getQuery<{ brand: string | null }>(event);
	const brandCode = query?.brand;

	const products = productsRepo.getProducts();

	if (!brandCode) return products;

	const brands = brandsRepo.getBrands();
	const findBrand = brands.find((b) => b.code === brandCode);

	if (!findBrand) return [];

	return products.filter((p) => p.brand === findBrand.id);
});
