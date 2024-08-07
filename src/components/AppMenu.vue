<template>
  <div class="menu-wrapper">
    <ul class="menu-default-type">
      <li>
        <NuxtLink to="/" class="menu-item-title" active-class="selected-menu">
          <span>All Brands</span>
        </NuxtLink>
      </li>

      <li v-for="(brand, i) in brands" :key="'b' + i">
        <NuxtLink
          :to="'/' + brand.code"
          class="menu-item-title"
          active-class="selected-menu"
        >
          <span>{{ brand.title }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useBrandsState } from '@/composables/useAppState';

const { brands } = useBrandsState();
</script>

<style scoped lang="scss">
.menu-wrapper {
  position: relative;
}
.menu-default-type {
  margin: 0;
  padding-left: 10px;
  border-right: 1px solid var(--primary-color);
  list-style: none;
  position: sticky;
  top: 120px;
}

.menu-item-title {
  cursor: pointer;
  width: fit-content;

  & > span {
    padding-inline: 5px;
  }

  &:hover {
    font-weight: bolder;
  }
}

.selected-menu > span {
  font-weight: bold;
  border-bottom: 1px solid var(--primary-color);
}
</style>
