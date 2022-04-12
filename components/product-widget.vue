<template>
  <div class="product-wrapper">
    <img :src="getProductImg" :alt="product.title" />

    <div class="d-flex flex-column">
      <div class="product-description">
        <span>{{ product.title }}</span>
        <span>{{ brandTitle }}</span>
        <span>${{ product.regular_price.value }}</span>

        <div v-if="product.type === 'configurable'" class="config-options">
          <div
            v-for="(config, i) in product.configurable_options"
            :key="'opt' + i"
          >
            <div class="product-config-options-list">
              <div v-for="(option, k) in config.values" :key="'val' + k">
                <div
                  v-if="config.attribute_code === 'color'"
                  class="product-config-option"
                  :style="{
                    backgroundColor: option.value
                  }"
                />

                <div
                  v-if="config.attribute_code === 'size'"
                  class="product-config-option"
                >
                  {{ option.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="product-actions">
        <button v-if="isInCart" class="btn btn-secondary" @click="openCart">
          In cart
        </button>
        <button v-else class="btn btn-primary" @click="addProductToCart">
          + Add to cart
        </button>
      </div>
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
  data() {
    return {};
  },
  computed: {
    brandTitle() {
      return this.$store.getters['brands/GET_BRANDS'].find(
        (b) => b.id === this.product.brand
      ).title;
    },
    getProductImg() {
      return require(`../assets${this.product.image}`);
    },
    isInCart() {
      return this.$store.getters['cart/GET_ITEMS'].some(
        (p) => p.id === this.product.id
      );
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

.config-options {
  display: flex;
  flex-direction: column;
}

.product-config-option {
  cursor: pointer;
  border: 2px solid black;
  border-radius: 2px;
  width: 24px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 5px;
  margin-top: 5px;

  &:hover {
    border: 2px solid rgb(243, 141, 45);
  }
}

.product-config-options-list {
  display: flex;
  flex-wrap: wrap;
}

img {
  width: 180px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
}
</style>
