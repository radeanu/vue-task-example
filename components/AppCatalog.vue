<template>
  <div class="catalog-wrapper">
    <AppMenu />
    <!-- <ProductsCatalog /> -->
  </div>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu.vue';
// import ProductsCatalog from './ProductsCatalog.vue';
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

@media screen and (min-width: 741px) {
  .catalog-wrapper {
    flex-direction: row;
  }
}
</style>
