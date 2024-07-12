<template>
  <div class="catalog-wrapper">
    <AppMenu />
    <ProductsCatalog />
  </div>
</template>

<script setup lang="ts">
import { fetchBrands } from '@/common/services.ts';
import type { Brand } from '@/common/types';

const brands = useState<Brand[]>('brands');

await callOnce(async () => {
  brands.value = await fetchBrands();
});
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  overflow: hidden;
  display: grid;
  grid-template-columns: 150px 1fr;
}
</style>
