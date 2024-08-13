<template>
	<div>
		<h3 class="mt-5 text-lg font-bold">Shopping Cart</h3>

		<div
			v-if="dbCartItems?.length"
			class="hidden md:grid md:grid-cols-[1fr_100px_100px_100px_50px] md:gap-x-2 md:gap-y-2 md:items-center md:mt-5 md:font-bold"
		>
			<div v-for="header in headers" :key="header" class="text-center">
				{{ header }}
			</div>
		</div>

		<p v-else class="text-center">No products found...</p>

		<CartProduct
			v-for="item in dbCartItems"
			:key="item.sku"
			:item="item"
			@update-count="onUpdateCount"
			@delete="onDeleteItem"
		/>

		<div
			v-if="dbCartItems?.length"
			class="flex flex-col gap-5 mt-2 items-end justify-end"
		>
			<p class="font-bold text-lg">Subtotal: {{ totalPrice.label }}</p>
			<button
				class="flex items-center justify-center border border-primary text-primary px-2 py-1 w-[180px] h-[35px] font-semibold shadow-button active:shadow-button-active"
			>
				Checkout
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import * as services from '@/common/services';
import { usdFormatter } from '@/common/utils';
import { type ProductCart } from '@/common/types';
import { useCartState } from '@/composables/useAppState';

import CartProduct from '@/components/cart/CartProduct.vue';

const headers = ['Item', 'Price', 'Qty', 'Total', ''];

const { setCart } = useCartState();

const { data: dbCartItems, refresh } = await useLazyAsyncData(
	'dbCartItems',
	services.fetchCartItems
);

watchEffect(() => {
	const list = dbCartItems?.value ?? [];

	const cartItems: ProductCart[] = list.map((item) => {
		return {
			count: item.count,
			sku: item.sku
		};
	});

	setCart(cartItems);
});

const totalPrice = computed(() => {
	let total: number = 0;

	dbCartItems.value?.forEach((item) => {
		const price = item.product?.regular_price?.value ?? 0;
		total += price * item.count;
	});

	return {
		val: total,
		label: usdFormatter.format(total)
	};
});

function onUpdateCount(item: ProductCart) {
	if (!dbCartItems.value?.length) return;

	const targetIndex = dbCartItems.value.findIndex((v) => v.sku === item.sku);
	if (targetIndex === -1) return;

	dbCartItems.value[targetIndex].count = item.count;
}

async function onDeleteItem() {
	await refresh();
}
</script>
