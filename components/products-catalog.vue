<template>
  <div class="products-wrapper">
    <h3>Catalog</h3>

    <div class="list-wrapper">
      <template v-if="products.length">
        <ProductWidget
          v-for="(product, i) in products"
          :key="'pro' + i"
          :product="product"
        />
      </template>
      <small v-else>No products found...</small>
    </div>
  </div>
</template>

<script>
import ProductWidget from './product-widget.vue';

export default {
  components: {
    ProductWidget
  },
  data() {
    return {};
  },
  computed: {
    products() {
      return this.$store.getters['products/GET_PRODUCTS_TO_DISPLAY'] ?? [];
    }
  }
};
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

h3 {
  margin: 0;
  padding: 20px;
  padding-bottom: 10px;
}
</style>
