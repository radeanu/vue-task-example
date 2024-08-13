<template>
	<div
		class="w-[30px] h-[20px] border-2 border-primary rounded-[2px] hover:border-orange-500"
		:class="{
			'!border-orange-500': option._selected,
			'pointer-events-none': !option._exists
		}"
	>
		<button
			class="block cursor-pointer w-full h-full opacity-60"
			:class="{
				'crossed-red': !option._exists
			}"
			:style="{ backgroundColor: option.value }"
			@click="handleClick"
		/>
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
