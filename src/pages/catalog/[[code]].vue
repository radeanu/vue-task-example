<template>
	<div class="relative lg:grid lg:grid-cols-[150px_1fr] lg:gap-2">
		<AppMenu />
		<ProductsCatalog />
	</div>
</template>

<script setup lang="ts">
import ProductsCatalog from '@/components/catalog/ProductsCatalog.vue';
import { useBrandsState, useCartState } from '@/composables/useAppState';

const { fetchCart } = useCartState();
const { fetchBrands } = useBrandsState();

await callOnce('cart', fetchCart);
await callOnce('brands', fetchBrands);
</script>
