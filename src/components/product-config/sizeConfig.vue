<template>
  <ul class="config-wrapper">
    <li
      v-for="size in config.values"
      :key="size.value_index"
      :class="{
        'size-wrapper': true,
        'selected-option': size._selected,
        'disabled-option ': !size._exists
      }"
    >
      <button
        :class="{
          'size-option': true,
          'crossed-red': !size._exists
        }"
        @click="handleClick(size)"
      >
        <span>{{ size.label }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { ConfigurableSizeOption, ConfigValueOption } from '~/common/types';

interface Emits {
  (e: 'select', option: ConfigValueOption): void;
}

interface Props {
  config: ConfigurableSizeOption;
}

const $emit = defineEmits<Emits>();
defineProps<Props>();

function handleClick(option: ConfigValueOption) {
  $emit('select', JSON.parse(JSON.stringify(option)));
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

.disabled-option {
  pointer-events: none;
}

.selected-option {
  border: 2px solid rgb(243, 141, 45);
}

.crossed-red {
  background: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      rgb(255, 0, 0) 50%,
      rgba(0, 0, 0, 0) calc(50% + 2px),
      rgba(0, 0, 0, 0) 100%
    ),
    linear-gradient(
      to top right,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) calc(50% - 2px),
      rgb(255, 0, 0) 50%,
      rgba(0, 0, 0, 0) calc(50% + 2px),
      rgba(0, 0, 0, 0) 100%
    );
}
</style>
