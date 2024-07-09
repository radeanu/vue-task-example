<template>
  <div class="layout">
    <AppHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;

  width: 100dvw;
  height: 100dvh;

  margin: 0;
  padding-inline: var(--layout-pad-x);
  overflow: auto;
}
</style>
