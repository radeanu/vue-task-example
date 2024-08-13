<template>
	<div class="item">
		<div class="item-info">
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
				<h4 class="item-info__title">
					{{ brandTitle }}/{{ item?.product?.title ?? '-' }}
				</h4>

				<ul class="item-info__attributes">
					<li v-for="attr in attributes" :key="attr.label">
						<span>{{ attr.label }}:</span>
						<span>{{ attr.value }}</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="price-info">
			<div class="price-info__item">
				<div class="label">Price</div>
				<div class="value">{{ price.label }}</div>
			</div>

			<div class="price-info__item">
				<div class="label">Qty</div>
				<div class="value">
					<input
						:value="item.count"
						class="input-count"
						type="number"
						min="0"
						@input="handleCountUpdate"
					/>
				</div>
			</div>

			<div class="price-info__item">
				<div class="label">Total</div>
				<div class="value">
					<AppSpinnerLoader
						v-if="countLoader.isLoading.value"
						class="loader"
					/>
					<span v-else>{{ total.label }}</span>
				</div>
			</div>
		</div>

		<div class="center delete-controller">
			<AppSpinnerLoader
				v-if="deleteLoader.isLoading.value"
				class="loader"
			/>

			<button
				v-else
				class="center btn delete-btn"
				@click="handleDeleteClick"
			>
				<NuxtImg src="/images/delete-icon.png" alt="delete" />
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
.item {
	padding-block: 5px;
	border-bottom: 1px solid var(--primary-color);
	display: grid;
	grid-template-areas:
		'a a a a a a a b'
		'a a a a a a a b'
		'c c c c c c c c';
}

.item-info {
	grid-area: a;
	display: flex;
	flex-wrap: nowrap;
	gap: 10px;
	align-items: center;

	&__title {
		font-size: large;
	}

	&__attributes {
		margin-top: 5px;
		font-size: small;
	}
}

.price-info {
	grid-area: c;
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 10px;
	justify-content: space-between;
	min-height: 50px;

	&__item {
		display: flex;
		gap: 10px;
		flex-wrap: nowrap;
		align-items: center;
		height: 30px;

		.label {
			font-weight: bold;
		}

		.value {
			text-align: center;
		}
	}
}

.delete-controller {
	grid-area: b;
}

.center {
	text-align: center;
}

.loader {
	width: 20px;
	height: 20px;
}

.delete-btn {
	background: transparent;
	width: 25px;
	height: 28px;
	padding: 0;
	--image-size: 18px;

	img {
		width: var(--image-size);
		max-width: var(--image-size);
		min-width: var(--image-size);
	}

	&:active {
		--image-size: 20px;
	}
}

.input-count {
	width: 50px;
	border: 1px solid var(--primary-color);

	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		opacity: 1;
	}
}

@media screen and (min-width: 425px) {
	.price-info {
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
	}
}

@media screen and (min-width: 768px) {
	.item {
		grid-template-areas: none;
		grid-template-columns: 1fr auto 50px;
		align-items: center;
	}

	.item-info,
	.price-info,
	.delete-controller {
		grid-area: auto;
	}

	.price-info {
		display: grid;
		grid-template-columns: repeat(3, 100px);

		&__item {
			display: block;
			height: auto;

			.label {
				display: none;
			}

			.value {
				text-align: center;
			}
		}
	}
}
</style>
