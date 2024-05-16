<template>
  <div
    class="header"
    :class="[isCartRoute ? 'justify-center' : 'justify-between']"
  >
    <NuxtLink to="/">
      <NuxtImg src="/img/logo.png" alt="logo" />
    </NuxtLink>

    <NuxtLink v-if="!isCartRoute" class="cart-link" to="/">
      <span class="cart-count-badge">{{ cartItemsCount }}</span>
      <NuxtImg src="/img/cart-icon.png" alt="cart" height="32" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const route = useRoute();

const cartItemsCount = useState('cartItemsCount', () => 0);
const isCartRoute = computed(() => route.name === 'shopping-cart');
</script>

<style scoped lang="scss">
.header {
  display: flex;
  padding-block: 15px;
  align-items: center;
  border-bottom: 1px solid var(--primary-color);
  height: 50px !important;
  background-color: #eb7070;
}

// .cart-link {
//   display: block;
//   position: relative;
//   margin-right: 20px;
//   cursor: pointer;
// }

// .cart-count-badge {
//   top: -6px;
//   left: 20px;
//   color: #fff;
//   padding: 0 5px;
//   font-size: 12px;
//   min-width: 20px;
//   line-height: 20px;
//   position: absolute;
//   text-align: center;
//   border-radius: 10px;
//   font-weight: bolder;
//   background-color: #eb7070;
// }
</style>
