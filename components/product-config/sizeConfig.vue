<template>
  <ul class="config-wrapper">
    <li
      v-for="size in config.values"
      :key="size.value_index"
      class="size-wrapper"
    >
      <button class="size-option" @click="handleClick(size)">
        <span>{{ size.label }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ConfigurableSizeOption, ConfigValueOption } from '~/common/types';

const $emit = defineEmits(['select']);
defineProps<{ config: ConfigurableSizeOption }>();

function handleClick(size: ConfigValueOption) {
  $emit('select', JSON.parse(JSON.stringify(size)));
}
</script>

<style scoped lang="scss">
.config-wrapper {
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  align-items: center;
}

.size-wrapper {
  width: 30px;
  height: 20px;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);

  &:hover {
    border: 2px solid rgb(243, 141, 45);
  }
}

.size-option {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
</style>
