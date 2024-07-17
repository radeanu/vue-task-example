<template>
  <div class="product-wrapper">
    <NuxtImg
      class="product-image"
      :src="productVariant.image"
      :alt="product.title"
      loading="lazy"
      width="180"
      height="180"
      placeholder="/images/default.svg"
    />

    <div class="product-content">
      <div class="product-description">
        <span>{{ product.title }}</span>
        <small>{{ product._brand_title ?? '-' }}</small>
        <small>${{ product.regular_price.value }}</small>

        <ProductConfigurations
          v-if="isConfigurable"
          :product="product as ConfigurableProduct"
        />
      </div>

      <div class="product-actions">
        <button v-if="product._in_cart" class="btn btn-secondary">✔</button>
        <button v-else class="btn btn-accent" @click="handleAddClick">
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
const cartState = useCartState();

const isConfigurable = props.product.type === productTypeEnum.configurable;

const productVariant: Ref<ProductVariant> = ref({
  id: props.product.id,
  image: props.product.image,
  sku: props.product.sku
});

async function handleAddClick() {
  await cartState.addToCart({ count: 1, sku: productVariant.value.sku });
}
</script>

<style scoped lang="scss">
.product-wrapper {
  margin-top: 10px;
  margin-left: 10px;
}

.product-description {
  display: flex;
  flex-direction: column;

  small {
    font-size: small;
  }
}

.product-actions {
  display: flex;
  margin-top: 5px;
}

.product-image {
  width: 180px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
}

.product-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
