<template>
	<div class="flex flex-col gap-1">
		<ul
			v-for="(config, i) in configOptions"
			:key="'opt' + i"
			class="flex flex-nowrap gap-1 items-center"
		>
			<li v-for="item in config.values" :key="item.value_index">
				<ColorOption
					v-if="config.attribute_code === configAttributeCode.color"
					:option="item"
					@click="onFilterSelect(config.attribute_code, item)"
				/>

				<SizeOption
					v-if="config.attribute_code === configAttributeCode.size"
					:option="item"
					@click="onFilterSelect(config.attribute_code, item)"
				/>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import {
	type ConfigurableProduct,
	type ConfigValueOption,
	type ProductVariant,
	type Variant,
	configAttributeCode
} from '@/common/types';

import ColorOption from './config-options/ColorOption.vue';
import SizeOption from './config-options/SizeOption.vue';

interface Emits {
	(e: 'updateVariant', option: ProductVariant): void;
}

interface Props {
	product: ConfigurableProduct;
}

interface SelectedConfig {
	code: configAttributeCode;
	value_index: number;
}

const props = defineProps<Props>();
const $emit = defineEmits<Emits>();

const currConfig = ref<SelectedConfig[]>([]);
const defaultVariant = {
	id: props.product.id,
	image: props.product.image,
	sku: props.product.sku
};

const configOptions = computed(() => {
	return props.product.configurable_options.map((opt) => {
		const validValues = opt.values.map((v) => {
			const variant = {
				code: opt.attribute_code,
				value_index: v.value_index
			};

			const selectedAttributes = currConfig.value.filter(
				(c) => c.code !== opt.attribute_code
			);

			const variantAttributes = [variant, ...selectedAttributes];

			const findVariant = getVariant(
				props.product.variants,
				variantAttributes
			);

			const selected = currConfig.value.some((c) => {
				return (
					c.code === opt.attribute_code &&
					c.value_index === v.value_index
				);
			});

			return {
				...v,
				_selected: selected,
				_exists: findVariant !== undefined
			};
		});

		return {
			...opt,
			values: validValues
		};
	});
});

watchEffect(() => {
	const productVariant = getVariant(props.product.variants, currConfig.value);

	if (!productVariant) return defaultVariant;

	$emit('updateVariant', {
		id: props.product.id,
		image: productVariant.product.image,
		sku: productVariant.product.sku
	});
});

function getVariant(variants: Variant[], targetConfig: SelectedConfig[]) {
	return variants.find((v) => {
		return targetConfig.every((c) => {
			return v.attributes.some((att) => {
				return att.code === c.code && att.value_index === c.value_index;
			});
		});
	});
}

function onFilterSelect(
	attribute_code: configAttributeCode,
	value: ConfigValueOption
) {
	const confIdx = currConfig.value.findIndex(
		(c) => c.code === attribute_code
	);

	if (confIdx === -1) {
		currConfig.value.push({
			code: attribute_code,
			value_index: value.value_index
		});
		return;
	}

	if (currConfig.value[confIdx].value_index === value.value_index) {
		currConfig.value = currConfig.value.filter((c) => {
			return (
				c.code !== attribute_code && c.value_index !== value.value_index
			);
		});
		return;
	}

	currConfig.value[confIdx].value_index = value.value_index;
}
</script>
