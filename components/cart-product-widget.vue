<template>
  <div class="cart-product-wrapper">
    <img :src="getProductImg" :alt="product.title" />
    <div class="cart-product-description">
      <span>{{ brandTitle }} / {{ product.title }}</span>
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    brandTitle() {
      return this.$store.getters['brands/GET_BRANDS'].find(
        (b) => b.id === this.product.brand
      ).title;
    },
    getProductImg() {
      return require(`../assets${this.product.image}`);
    }
  },
  methods: {
    addProductToCart() {
      this.$store.commit('cart/ADD_ITEM_TO_CART', this.product.id);
    },
    openCart() {
      this.$router.push({ path: '/shopping-cart' });
    }
  }
};
</script>

<style scoped lang="scss">
.cart-product-wrapper {
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  flex: 1;
}

.cart-product-description {
  flex: 1;
  display: flex;
  flex-direction: column;
}

img {
  width: 86px;
}
</style>
