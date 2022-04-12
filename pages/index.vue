<template>
  <AppCatalog />
</template>

<script>
import AppCatalog from '~/components/app-catalog.vue';

export default {
  name: 'IndexPage',
  components: { AppCatalog },
  async fetch({ store }) {
    await store.dispatch('brands/FETCH_BRANDS');
    await store.dispatch('products/FETCH_PRODUCTS');
    store.commit('products/RESET_PRODUCTS_TO_DISPLAY');
  }
};
</script>
