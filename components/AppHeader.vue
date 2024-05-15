<template>
  <div
    class="header-wrapper"
    :class="[isCartRoute ? 'justify-center' : 'justify-between']"
  >
    <NuxtLink to="/">
      <img src="/img/logo.png" alt="logo" />
    </NuxtLink>

    <NuxtLink v-if="!isCartRoute" class="cart-link" to="/shopping-cart">
      <span class="cart-count-badge">{{ cartItemsCount }}</span>
      <img id="cart-icon" src="/img/cart-icon.png" alt="cart" height="32" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const route = useRoute();

const cartItemsCount = useState('cartItemsCount', () => 0);
const isCartRoute = computed(() => route.name === 'shopping-cart');
</script>

<style scoped lang="scss">
.header-wrapper {
  display: flex;
  padding-block: 15px;
  margin-inline: 15px;
  align-items: center;
  border-bottom: 1px solid black;
}

.cart-link {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
}

.cart-count-badge {
  top: -6px;
  left: 20px;
  color: #fff;
  padding: 0 5px;
  font-size: 12px;
  min-width: 20px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  border-radius: 10px;
  font-weight: bolder;
  background-color: #eb7070;
}
</style>
