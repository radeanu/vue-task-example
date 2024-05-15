<template>
  <div class="app-wrapper">
    <AppHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>

<style lang="scss"></style>
