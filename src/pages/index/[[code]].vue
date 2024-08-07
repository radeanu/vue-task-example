<template>
  <div class="catalog-wrapper">
    <AppMenu />
    <ProductsCatalog />
  </div>
</template>

<script setup lang="ts">
import { useBrandsState, useCartState } from '@/composables/useAppState';

const { fetchCart } = useCartState();
const { fetchBrands } = useBrandsState();

await callOnce('cart', fetchCart);
await callOnce('brands', fetchBrands);
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 10px;
}
</style>
