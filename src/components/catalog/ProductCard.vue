<template>
	<div>
		<NuxtImg
			class="shadow-product"
			:src="productVariant.image"
			:alt="product.title"
			loading="lazy"
			width="180"
			height="180"
			placeholder="/images/default.svg"
		/>

		<div class="flex items-start justify-between mt-2">
			<div class="flex flex-col">
				<span>{{ product.title }}</span>
				<small class="text-xsm">{{ brandTitle }}</small>
				<small class="text-xsm">
					${{ product.regular_price.value }}
				</small>

				<ProductConfigurations
					v-if="isConfigurable"
					:product="productAsConfigurable"
					@update-variant="handleUpdateVariant"
				/>
			</div>

			<div class="flex">
				<NuxtLink
					v-if="isInCart"
					class="cursor-pointer text-light bg-gray-500 rounded px-2 py-1 text-sm hover:bg-gray-600 active:bg-gray-700"
					to="/cart"
				>
					<span>✔</span>
				</NuxtLink>

				<button
					v-else
					class="cursor-pointer text-light bg-secondary rounded px-2 py-1 text-sm hover:bg-secondary-600 active:bg-secondary-700"
					@click="handleAddClick"
				>
					+ Add
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ProductConfigurations from './ProductConfigurations.vue';

import {
	type Product,
	type ProductVariant,
	type ConfigurableProduct,
	productTypeEnum
} from '@/common/types.ts';
import { useCartState } from '@/composables/useAppState';

const props = defineProps<{ product: Product }>();

const { brands } = useBrandsState();
const { cart, upsertCart } = useCartState();

const isConfigurable = props.product.type === productTypeEnum.configurable;
const productAsConfigurable = props.product as ConfigurableProduct;

const productVariant: Ref<ProductVariant> = ref({
	id: props.product.id,
	image: props.product.image,
	sku: props.product.sku
});

const isInCart = computed(() => {
	return cart.value.some((item) => item.sku === productVariant.value.sku);
});

const brandTitle = computed(() => {
	const targetBrand = brands.value.find((b) => b.id === props.product.brand);

	return targetBrand?.title ?? '-';
});

function handleUpdateVariant(variant: ProductVariant) {
	productVariant.value = variant;
}

async function handleAddClick() {
	await upsertCart({ count: 1, sku: productVariant.value.sku });
}
</script>
