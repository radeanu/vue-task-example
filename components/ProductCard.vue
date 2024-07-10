<template>
  <div class="product-wrapper">
    <NuxtImg
      class="product-image"
      :src="productVariant.image"
      :alt="product.title"
      loading="lazy"
      width="180"
      height="180"
    />

    <div class="product-content">
      <div class="product-description">
        <span>{{ product.title }}</span>
        <small>{{ brandTitle }}</small>
        <small>${{ product.regular_price.value }}</small>

        <ProductConfigurations v-if="isConfigurable" :product="product" />
      </div>

      <div class="product-actions">
        <button v-if="isInCart" class="btn btn-secondary">✔</button>
        <button v-else class="btn btn-accent" @click="handleAddClick">
          + Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

import ProductConfigurations from './ProductConfigurations.vue';

import {
  type Product,
  type ProductVariant,
  productTypeEnum
} from '@/common/types.ts';
import { addToCart } from '@/common/services.ts';
import { brandsKey, cartKey } from '@/common/injectionKeys.ts';

const brands = inject(brandsKey, null);
const cartProducts = inject(cartKey, null);

const props = defineProps<{ product: Product }>();

const productVariant: Ref<ProductVariant> = ref({
  id: props.product.id,
  image: props.product.image,
  sku: props.product.sku
});

const isConfigurable = computed(() => {
  return props.product.type === productTypeEnum.configurable;
});

const brandTitle = computed(() => {
  return brands?.value?.find((b) => b.id === props.product.brand)?.title;
});

const isInCart = computed(() => {
  return cartProducts?.value?.some((p) => p.sku === productVariant.value.sku);
});

async function handleAddClick() {
  await addToCart({
    count: 1,
    sku: productVariant.value.sku
  });

  window.dispatchEvent(new CustomEvent('REFRESH_CART'));
}

//       sameProductsInCarts() {
//         return this.$store.getters['cart/GET_ITEMS'].filter(
//           (p) => p.id === this.product.id
//         );
//       },

// addProductToCart() {
//   this.$store.commit('cart/ADD_ITEM_TO_CART', {
//     id: this.product.id,
//     selectedVariant: this.productVariant
//   });
// },
// openCart() {
//   this.$router.push({ path: '/shopping-cart' });
// },
// updateProduct(variant) {
//   this.productVariant = variant;
// }
</script>

<style scoped lang="scss">
.product-wrapper {
  margin-top: 10px;
  margin-left: 10px;
}

.product-description {
  display: flex;
  flex-direction: column;
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
