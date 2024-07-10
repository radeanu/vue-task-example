<template>
  <div class="menu-wrapper">
    <ul class="menu-default-type">
      <li>
        <NuxtLink
          to="/catalog"
          class="menu-item-title"
          active-class="selected-menu"
        >
          <span>All Brands</span>
        </NuxtLink>
      </li>

      <li v-for="(brand, i) in brands" :key="'b' + i">
        <NuxtLink
          :to="'/catalog/' + brand.code"
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
import { inject } from 'vue';

import type { Brand } from '@/common/types.ts';
import { brandsKey } from '@/common/injectionKeys.ts';

const brands: Brand[] = inject(brandsKey, []);
</script>

<style scoped lang="scss">
.menu-default-type {
  margin: 0;
  margin-top: 40px;
  padding-left: 10px;
  border-right: 1px solid var(--primary-color);
  list-style: none;
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
