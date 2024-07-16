<template>
  <div class="products-wrapper">
    <h3 class="title">Catalog</h3>

    <div v-if="products?.length" class="list-wrapper">
      <ProductCard
        v-for="product in products"
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
import { useBrandsState, useCartState } from '@/composables/useAppState';

const route = useRoute();
const { cart } = useCartState();
const { brands } = useBrandsState();

//TODO add loading

const { data: dbProducts } = await useLazyAsyncData('products', async () => {
  return await fetchProducts(route.params.code as string);
});

const products = computed(() => {
  return dbProducts.value?.map((product) => {
    const is_in_cart = cart.value.some((c) => c.sku === product.sku);
    const brand_title = brands.value.find((b) => b.id === product.brand)?.title;

    return {
      ...product,
      _in_cart: is_in_cart,
      _brand_title: brand_title
    };
  });
});
</script>

<style scoped lang="scss">
.products-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
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

@media screen and (max-width: 740px) {
  .list-wrapper {
    justify-content: center;
  }
}
</style>
