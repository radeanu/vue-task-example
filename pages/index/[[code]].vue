<template>
  <div class="catalog-wrapper">
    <AppMenu />
    <ProductsCatalog />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';

import { fetchBrands, fetchCart } from '@/common/services.ts';
import { brandsKey, cartKey } from '@/common/injectionKeys.ts';

import AppMenu from '@/components/AppMenu.vue';
import ProductsCatalog from '@/components/ProductsCatalog.vue';

const { data: brands } = await useAsyncData('brands', fetchBrands);
const { data: cart, refresh: refreshCart } = await useAsyncData(
  'cart',
  fetchCart,
  { server: false, immediate: true }
);

provide(cartKey, cart);
provide(brandsKey, brands);

if (import.meta.client) {
  window.addEventListener('REFRESH_CART', async () => {
    await refreshCart();
  });
}
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  overflow: hidden;
  display: grid;
  grid-template-columns: 150px 1fr;
}
</style>
