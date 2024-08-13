<template>
	<div class="w-screen h-screen m-0 overflow-auto">
		<AppHeader />

		<div class="px-1 md:px-4 xl:px-8 pb-5 max-w-[1240px] mx-auto">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
</script>
