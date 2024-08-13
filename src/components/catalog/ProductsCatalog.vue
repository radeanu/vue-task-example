<template>
	<div class="flex w-full overflow-hidden flex-col relative z-[1]">
		<h3 class="m-0 p-5 pb-2 text-xl font-bold">Catalog</h3>

		<div
			v-if="dbProducts?.length"
			class="p-5 flex flex-wrap overflow-y-auto gap-[10px]"
		>
			<ProductCard
				v-for="product in dbProducts"
				:key="product.id"
				:product="product"
			/>
		</div>

		<small v-else>No products found...</small>
	</div>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue';

import { fetchProducts } from '@/common/services';

const route = useRoute();

const { data: dbProducts } = await useLazyAsyncData('products', async () => {
	return await fetchProducts(route.params.code as string);
});
</script>
