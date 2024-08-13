import { getBrandsRepo } from '@/server/useBrandsRepo';

const brandsRepo = getBrandsRepo();

export default defineEventHandler(async () => {
	const brands = brandsRepo.getBrands();

	return brands;
});
