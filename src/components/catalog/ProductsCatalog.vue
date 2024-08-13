<template>
	<div class="products-wrapper">
		<h3 class="title">Catalog</h3>

		<div v-if="dbProducts?.length" class="list-wrapper">
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

<style scoped lang="scss">
.products-wrapper {
	flex: 1;
	display: flex;
	overflow: hidden;
	flex-direction: column;
	position: relative;
	z-index: 1;
}

.list-wrapper {
	padding: 20px;
	padding-left: 10px;
	padding-top: 0;
	display: flex;
	flex-wrap: wrap;
	overflow-y: auto;
}

.title {
	margin: 0;
	padding: 20px;
	padding-bottom: 10px;
	font-size: larger;
	font-weight: bold;
}
</style>
