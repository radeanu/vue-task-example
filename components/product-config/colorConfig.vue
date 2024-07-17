<template>
  <ul class="config-wrapper">
    <li v-for="color in values" :key="color.value_index" class="color-wrapper">
      <button class="color-option" :style="{ backgroundColor: color.value }" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ConfigValueOption } from '@/common/types';

defineProps<{ values: ConfigValueOption[] }>();
</script>

<style scoped lang="scss">
.config-wrapper {
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  align-items: center;
}

.color-wrapper {
  width: 30px;
  height: 20px;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);

  &:hover {
    border: 2px solid rgb(243, 141, 45);
  }
}

.color-option {
  cursor: pointer;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
</style>
