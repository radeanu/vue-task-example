<template>
  <ul class="config-wrapper">
    <li
      v-for="color in config.values"
      :key="color.value_index"
      :class="{
        'color-wrapper': true,
        'selected-option': color._selected,
        'disabled-option ': !color._exists
      }"
    >
      <button
        :class="{
          'color-option': true,
          'crossed-red': !color._exists
        }"
        :style="{ backgroundColor: color.value }"
        @click="handleClick(color)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type {
  ConfigurableColorOption,
  ConfigValueOption
} from '~/common/types';

interface Emits {
  (e: 'select', option: ConfigValueOption): void;
}

interface Props {
  config: ConfigurableColorOption;
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
