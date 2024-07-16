<template>
  <header class="header" :class="headerClass">
    <NuxtLink to="/">
      <NuxtImg class="logo" src="/images/logo.png" alt="logo" />
    </NuxtLink>

    <NuxtLink class="cart-link" to="/">
      <ClientOnly>
        <span class="cart-count-badge">{{ cartCount }}</span>
      </ClientOnly>
      <NuxtImg src="/images/cart-icon.png" alt="cart" height="32" />
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
import { useCartState } from '@/composables/useAppState';

const route = useRoute();

const { cartCount } = useCartState();

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
