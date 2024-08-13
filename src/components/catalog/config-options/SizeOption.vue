<template>
	<div
		class="w-[30px] h-[20px] border-primary border-2 rounded-[2px] hover:border-orange-500"
		:class="{
			'!border-orange-500': option._selected,
			'pointer-events-none': !option._exists
		}"
	>
		<button
			class="cursor-pointer w-full h-full flex items-center justify-center font-bold text-xs font-arial"
			:class="{
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
