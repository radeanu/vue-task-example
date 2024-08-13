import testData from '@/server/data/level3/products.json';

import { type Product, productTypeEnum } from '@/common/types';

let productsRepo: ReturnType<typeof useProductsRepo> | undefined;

function useProductsRepo() {
	const products: Product[] = testData as Product[];

	function getProducts(): Product[] {
		return products;
	}

	function getProductBySku(sku: string): Product | undefined {
		return products.find((p) => {
			if (p.sku === sku) return p;
			if (p.type !== productTypeEnum.configurable) return;

			return p.variants.find((v) => v.product.sku === sku);
		});
	}

	return {
		getProducts,
		getProductBySku
	};
}

export function getProductsRepo() {
	if (productsRepo) return productsRepo;

	productsRepo = useProductsRepo();

	return productsRepo;
}
