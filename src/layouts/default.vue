<template>
	<div class="layout">
		<AppHeader />

		<div class="page-wrapper">
			<slot />
		</div>
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
	overflow: auto;
}

.page-wrapper {
	padding-inline: var(--page-pad-x);
	padding-bottom: 20px;
	max-width: var(--page-max-width);
	margin-inline: auto;
}
</style>
