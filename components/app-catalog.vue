<template>
  <div class="catalog-wrapper">
    <AppMenu />
    <ProductsCatalog />
  </div>
</template>

<script>
import AppMenu from './app-menu.vue';
import ProductsCatalog from './products-catalog.vue';

export default {
  components: {
    AppMenu,
    ProductsCatalog
  }
};
</script>

<style lang="scss" scoped>
.catalog-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
}

@media screen and (max-width: 740px) {
  .catalog-wrapper {
    flex-direction: column;
  }
}

@media screen and (min-width: 741px) {
  .catalog-wrapper {
    flex-direction: row;
  }
}
</style>
