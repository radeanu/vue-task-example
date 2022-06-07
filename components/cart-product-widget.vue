<template>
  <div class="cart-product-wrapper">
    <img :src="getProductImg" :alt="product.title" />
    <div class="cart-product-description">
      <span>{{ brandTitle }} / {{ product.title }}</span>

      <div v-if="product.type === 'configurable'" class="configurable-options">
        <div v-for="(option, i) in productVariantValues" :key="'key' + i">
          <span>{{ option.label }}: </span>
          <span>{{ option.value }}</span>
        </div>
      </div>

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
      const imagePath =
        this.product.type === 'configurable'
          ? this.product.selectedVariant.variant_image
          : this.product.image;

      return require(`../assets${imagePath}`);
    },
    productVariantValues() {
      if (this.product.selectedVariant.variant_id === '') {
        return [];
      }

      const variant = this.product.variants.find(
        (v) => v.product.id === this.product.selectedVariant.variant_id
      );

      return variant.attributes.map((attr) => {
        const attribute = this.product.configurable_options.find(
          (o) => o.attribute_code === attr.code
        );

        const optionValue = attribute.values.find(
          (v) => v.value_index === attr.value_index
        );

        return {
          label: attribute.label,
          value: optionValue.label
        };
      });
    }
  },
  methods: {
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

.configurable-options {
  margin-top: 5px;

  span {
    font-size: 0.9em;
  }
}

img {
  width: 86px;
}
</style>
