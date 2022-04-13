<template>
  <div class="product-wrapper">
    <img class="product-image" :src="getProductImg" :alt="product.title" />

    <div class="product-content">
      <div class="product-description">
        <span>{{ product.title }}</span>
        <small>{{ brandTitle }}</small>
        <small>${{ product.regular_price.value }}</small>

        <ProductConfigurations
          v-if="product.type === 'configurable'"
          :product="product"
          @update-product="updateProduct"
        />
      </div>

      <div class="product-actions">
        <button v-if="isInCart" class="btn btn-secondary" @click="openCart">
          ✔
        </button>
        <button v-else class="btn btn-primary" @click="addProductToCart">
          + Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductConfigurations from './product-configurations.vue';

export default {
  components: {
    ProductConfigurations
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      productVariant: {
        variant_id: '',
        variant_image: '/images/conf/default.png'
      }
    };
  },
  computed: {
    brandTitle() {
      return this.$store.getters['brands/GET_BRANDS'].find(
        (b) => b.id === this.product.brand
      ).title;
    },
    getProductImg() {
      const imagePath =
        this.product.type === 'configurable'
          ? this.productVariant.variant_image
          : this.product.image;

      return require(`../assets${imagePath}`);
    },
    sameProductsInCarts() {
      return this.$store.getters['cart/GET_ITEMS'].filter(
        (p) => p.id === this.product.id
      );
    },
    isInCart() {
      const itemExists = this.$store.getters['cart/GET_ITEMS'].some(
        (p) => p.id === this.product.id
      );

      if (this.product.type !== 'configurable') {
        return itemExists;
      }

      if (itemExists) {
        return this.sameProductsInCarts.some(
          (p) => p.selectedVariant.variant_id === this.productVariant.variant_id
        );
      }

      return false;
    }
  },
  methods: {
    addProductToCart() {
      this.$store.commit('cart/ADD_ITEM_TO_CART', {
        id: this.product.id,
        selectedVariant: this.productVariant
      });
    },
    openCart() {
      this.$router.push({ path: '/shopping-cart' });
    },
    updateProduct(variant) {
      this.productVariant = variant;
    }
  }
};
</script>

<style scoped lang="scss">
.product-wrapper {
  margin-top: 10px;
  margin-left: 10px;
}

.product-description {
  display: flex;
  flex-direction: column;
}

.product-actions {
  display: flex;
  margin-top: 5px;
}

.product-image {
  width: 180px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
}

.product-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>
