<template>
	<div
		:class="{
			'size-wrapper': true,
			'selected-option': option._selected,
			'disabled-option ': !option._exists
		}"
	>
		<button
			:class="{
				'size-option': true,
				'crossed-red': !option._exists
			}"
			@click="handleClick"
		>
			<span>{{ option.label }}</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import type { ConfigValueOption } from '~/common/types';

interface Emits {
	(e: 'click'): void;
}

interface Props {
	option: ConfigValueOption;
}

const $emit = defineEmits<Emits>();
defineProps<Props>();

function handleClick() {
	$emit('click');
}
</script>

<style scoped lang="scss">
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
