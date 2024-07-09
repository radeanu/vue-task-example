<template>
  <div class="catalog-wrapper">
    <AppMenu />
    <ProductsCatalog />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue';

import { fetchBrands } from '@/common/services.ts';
import { brandsKey } from '@/common/injection-keys.ts';

import AppMenu from '@/components/AppMenu.vue';
import ProductsCatalog from '@/components/ProductsCatalog.vue';

const { data: brands } = await useAsyncData('brands', fetchBrands);

provide(brandsKey, brands.value ?? []);
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  overflow: hidden;
  display: grid;
  grid-template-columns: 150px 1fr;
}
</style>
