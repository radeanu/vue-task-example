<template>
	<div
		class="grid-template-areas grid border-b border-primary py-1 md:items-center md:gap-x-2 md:gap-y-2"
	>
		<div class="grid-area-a flex flex-nowrap gap-2 items-center">
			<NuxtImg
				class="product-image"
				:src="variantImage"
				:alt="item?.product?.title"
				loading="lazy"
				width="80"
				height="80"
				:placeholder="defaultImage"
			/>

			<div>
				<h4 class="text-lg">
					{{ brandTitle }}/{{ item?.product?.title ?? '-' }}
				</h4>

				<ul class="mt-1 text-sm">
					<li v-for="attr in attributes" :key="attr.label">
						<span>{{ attr.label }}:</span>
						<span>{{ attr.value }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="grid-area-c flex flex-col gap-1 p-2 justify-between min-h-12 xsm:flex xsm:flex-row xsm:flex-nowrap xsm:items-center md:grid md:grid-cols-[100px_100px_100px] md:gap-y-2 md:gap-x-2"
		>
			<div
				class="flex gap-2 flex-nowrap items-center h-7 md:block md:h-auto"
			>
				<div class="font-bold md:hidden">Price</div>
				<div class="text-center">{{ price.label }}</div>
			</div>

			<div
				class="flex gap-2 flex-nowrap items-center h-7 md:block md:h-auto"
			>
				<div class="font-bold md:hidden">Qty</div>
				<div class="text-center">
					<input
						:value="item.count"
						class="w-[50px] border border-primary text-center"
						type="number"
						min="0"
						@input="handleCountUpdate"
					/>
				</div>
			</div>

			<div
				class="flex gap-2 flex-nowrap items-center h-7 md:block md:h-auto"
			>
				<div class="font-bold md:hidden">Total</div>
				<div class="flex items-center justify-center">
					<AppSpinnerLoader
						v-if="countLoader.isLoading.value"
						class="w-5 h-5"
					/>
					<span v-else>{{ total.label }}</span>
				</div>
			</div>
		</div>

		<div class="grid-area-b text-center">
			<button
				class="text-center cursor-pointer p-1 w-6 h-7 hover:h-8 hover:w-7"
				@click="handleDeleteClick"
			>
				<AppSpinnerLoader
					v-if="deleteLoader.isLoading.value"
					class="w-5 h-5"
				/>
				<NuxtImg v-else src="/images/delete-icon.png" alt="delete" />
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	type CartItem,
	type ProductCart,
	type ViewPrice,
	productTypeEnum,
	type ConfigurableOption
} from '@/common/types';

import AppSpinnerLoader from '@/components/AppSpinnerLoader.vue';

import { usdFormatter } from '@/common/utils';
import * as services from '@/common/services';
import { useLoading } from '@/composables/useLoading';
import { useDebounce } from '@/composables/useDebounce';

interface Props {
	item: CartItem;
}

interface Emits {
	(e: 'delete'): void;
	(e: 'updateCount', item: ProductCart): void;
}

const $emit = defineEmits<Emits>();
const props = defineProps<Props>();

const defaultImage = '/images/default.svg';

const countLoader = useLoading();
const deleteLoader = useLoading();

const handleCountUpdate = useDebounce(updateCount, 300);

const price = computed<ViewPrice>(() => {
	const val = props.item?.product?.regular_price.value ?? 0;
	return {
		val,
		label: usdFormatter.format(val)
	};
});

const total = computed<ViewPrice>(() => {
	const val = props.item.count * price.value.val;

	return {
		val,
		label: usdFormatter.format(val)
	};
});

const brandTitle = computed(() => {
	return props.item?.brand?.title ?? '-';
});

const isConfigurable = computed(() => {
	return props.item?.product?.type === productTypeEnum.configurable;
});

const variant = computed(() => {
	if (!props.item?.product) return;
	if (props.item.product.type === productTypeEnum.simple) return;

	return props.item.product.variants.find(
		(v) => v.product.sku === props.item.sku
	);
});

const productConfigurations = computed<ConfigurableOption[]>(() => {
	if (!props.item?.product) return [];
	if (props.item.product.type === productTypeEnum.simple) return [];

	return props.item.product.configurable_options;
});

const attributes = computed(() => {
	if (!variant.value) return [];

	return variant.value.attributes.map((attr) => {
		const config = productConfigurations.value.find(
			(c) => c.attribute_code === attr.code
		);

		const configValue = config?.values.find(
			(v) => v.value_index === attr.value_index
		);

		return {
			label: config?.label ?? attr.code,
			value: configValue?.label ?? '-'
		};
	});
});

const variantImage = computed(() => {
	if (!props.item?.product) return defaultImage;

	if (!isConfigurable.value) {
		return props.item.product.image;
	}

	return variant.value?.product.image ?? defaultImage;
});

async function updateCount(event: Event) {
	try {
		countLoader.start();

		const count = (event.target as HTMLInputElement).value;
		const payload: ProductCart = { sku: props.item.sku, count: +count };

		const updatedItem = await services.upsertCart(payload);
		$emit('updateCount', updatedItem);
	} catch (error) {
		console.error(error);
	} finally {
		countLoader.end();
	}
}

async function handleDeleteClick() {
	try {
		deleteLoader.start();

		await services.deleteFromCart(props.item.sku);
		$emit('delete');
	} catch (error) {
		console.error(error);
	} finally {
		deleteLoader.end();
	}
}
</script>

<style lang="scss" scoped>
.grid-template-areas {
	grid-template-areas:
		'a a a a a a a b'
		'a a a a a a a b'
		'c c c c c c c c';
}

.grid-area-a {
	grid-area: a;
}

.grid-area-c {
	grid-area: c;
}

.grid-area-b {
	grid-area: b;
}

input {
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		opacity: 1;
	}
}

@media screen and (min-width: 768px) {
	.grid-template-areas {
		grid-template-areas: none;
		grid-template-columns: 1fr auto 50px;
	}

	.grid-area-a,
	.grid-area-c,
	.grid-area-b {
		grid-area: auto;
	}
}
</style>
