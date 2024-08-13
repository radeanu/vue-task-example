<template>
	<div
		class="w-[120px] text-sm absolute top-5 right-5 h-full md:text-base lg:relative lg:w-full lg:top-0 lg:right-0"
	>
		<div
			v-click-outside="handleClickOutside"
			class="sticky top-[70px] z-10"
		>
			<button
				class="flex gap-2 flex-row w-full shadow-md cursor-pointer text-light px-2 py-1 rounded bg-primary hover:bg-primary-600 active:bg-primary-700 lg:hidden"
				@click="toggleMenu(!displayMenu)"
			>
				<span> {{ displayMenu ? '↑' : '↓' }} </span>
				<span>{{ selectedBrand.title }}</span>
			</button>

			<ul
				class="p-2 bg-light shadow-md lg:border-r lg:border-r-primary lg:sticky lg:top-[120px] lg:shadow-none lg:block"
				:class="[displayMenu ? 'block' : 'hidden']"
			>
				<li v-for="(brand, i) in menuBrands" :key="'b' + i">
					<NuxtLink
						:to="brand.link"
						class="cursor-pointer w-fit"
						active-class="font-semibold border-b border-b-primary"
					>
						<span class="px-1 hover:font-semibold">
							{{ brand.title }}
						</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type AppMenu } from '@/common/types';
import { useBrandsState } from '@/composables/useAppState';

const route = useRoute();
const { brands } = useBrandsState();

const displayMenu = ref(false);

const defaultOption: AppMenu = {
	code: '',
	link: '/catalog',
	title: 'All Brands'
};

const selectedBrand = computed(() => {
	const selectedCode = route.params.code;

	const find = brands.value.find((m) => m.code === selectedCode);

	return find ?? defaultOption;
});

const menuBrands = computed<AppMenu[]>(() => {
	return [
		defaultOption,
		...brands.value.map((b) => ({
			code: b.code,
			title: b.title,
			link: '/catalog/' + b.code
		}))
	];
});

function toggleMenu(value: boolean) {
	displayMenu.value = value;
}

function handleClickOutside() {
	if (!displayMenu.value) return;
	toggleMenu(false);
}
</script>
