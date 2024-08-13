<template>
	<div class="cart-wrapper">
		<h3 class="title">Shopping Cart</h3>

		<div v-if="dbCartItems?.length" class="headers">
			<div v-for="header in headers" :key="header">
				{{ header }}
			</div>
		</div>

		<p v-else class="center">No products found...</p>

		<CartProduct
			v-for="item in dbCartItems"
			:key="item.sku"
			:item="item"
			@update-count="onUpdateCount"
			@delete="onDeleteItem"
		/>

		<div v-if="dbCartItems?.length" class="cart-checkout">
			<p class="cart-total">Subtotal: {{ totalPrice.label }}</p>
			<button class="btn btn-outline">Checkout</button>
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

<style lang="scss" scoped>
.title {
	margin-top: 20px;
	font-size: larger;
	font-weight: bold;
}

.center {
	text-align: center;
}

.headers {
	display: none;
}

.cart-checkout {
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-top: 10px;
	align-items: flex-end;
	justify-content: flex-end;

	.cart-total {
		font-weight: bold;
		font-size: larger;
	}

	.btn {
		width: 180px;
		height: 35px;
		text-align: center;
		font-weight: 700;

		&:hover {
			box-shadow: 2px 2px 0px 0px var(--primary-color);
		}

		&:active {
			box-shadow: 3px 3px 0px 0px var(--primary-color);
		}
	}
}

@media screen and (min-width: 768px) {
	.headers {
		display: grid;
		grid-template-columns: 1fr repeat(3, 100px) 50px;
		column-gap: 10px;
		row-gap: 10px;
		align-items: center;
		margin-top: 20px;
		font-weight: bold;

		& > div {
			text-align: center;
		}
	}
}
</style>
