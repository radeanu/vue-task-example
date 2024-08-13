import brandsData from '@/server/data/brands.json';

import { type Brand } from '@/common/types';

let brandsRepo: ReturnType<typeof useBrandsRepo> | undefined;

function useBrandsRepo() {
	const brands: Brand[] = brandsData as Brand[];

	function getBrands(): Brand[] {
		return brands;
	}

	return {
		getBrands
	};
}

export function getBrandsRepo() {
	if (brandsRepo) return brandsRepo;

	brandsRepo = useBrandsRepo();

	return brandsRepo;
}
