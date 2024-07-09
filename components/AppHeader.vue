<template>
  <header class="header" :class="headerClass">
    <NuxtLink to="/">
      <NuxtImg class="logo" src="/images/logo.png" alt="logo" />
    </NuxtLink>

    <NuxtLink v-if="!isCartRoute" class="cart-link" to="/">
      <span class="cart-count-badge">{{ cartItemsCount }}</span>
      <NuxtImg src="/images/cart-icon.png" alt="cart" height="32" />
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();

const cartItemsCount = useState('cartItemsCount', () => 0);

const isCartRoute = computed(() => route.name === 'shopping-cart');
const headerClass = computed(() => {
  return isCartRoute.value ? 'justify-center' : 'justify-between';
});
</script>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: row;
  padding-block: 15px;
  align-items: center;
  border-bottom: 1px solid var(--primary-color);
  justify-content: space-between;
}

.logo {
  height: 50px;
}

.cart-link {
  display: block;
  position: relative;
  margin-right: 20px;
  cursor: pointer;
}

.cart-count-badge {
  top: -6px;
  left: 20px;
  padding: 0 5px;
  font-size: 12px;
  min-width: 20px;
  line-height: 20px;
  position: absolute;
  text-align: center;
  border-radius: 10px;
  font-weight: bolder;
  color: var(--light-color);
  background-color: var(--accent-color);
}
</style>
