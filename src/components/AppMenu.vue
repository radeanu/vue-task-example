<template>
	<div class="menu-wrapper">
		<div v-click-outside="handleClickOutside" class="menu-sticky">
			<button class="btn btn-select" @click="toggleMenu(!displayMenu)">
				<span> {{ displayMenu ? '↑' : '↓' }} </span>
				<span>{{ selectedBrand.title }}</span>
			</button>

			<ul
				:class="{
					'menu-default-type': true,
					'menu-hide': !displayMenu
				}"
			>
				<li v-for="(brand, i) in menuBrands" :key="'b' + i">
					<NuxtLink
						:to="brand.link"
						class="menu-item-title"
						active-class="selected-menu"
					>
						<span>{{ brand.title }}</span>
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

<style scoped lang="scss">
.menu-wrapper {
	width: 120px;
	font-size: 14px;
	position: absolute;
	top: 20px;
	right: 20px;
	height: 100%;
}

.btn-select {
	gap: 10px;
	display: flex;
	flex-direction: row;
	width: 100%;
	box-shadow: 0 1px 4px 0 var(--primary-color);
}

.menu-sticky {
	position: sticky;
	top: 80px;
	z-index: 9;
}

.menu-hide {
	display: none;
}

.menu-default-type {
	padding: 10px;
	list-style: none;
	background-color: var(--light-color);
	box-shadow: 0 1px 4px 0 var(--primary-color);
}

.menu-item-title {
	cursor: pointer;
	width: fit-content;

	& > span {
		padding-inline: 5px;
	}

	&:hover {
		font-weight: bolder;
	}
}

.selected-menu > span {
	font-weight: bold;
	border-bottom: 1px solid var(--primary-color);
}

@media screen and (min-width: 768px) {
	.menu-sticky {
		top: 105px;
	}

	.menu-wrapper {
		width: 150px;
		font-size: 18px;
	}
}

@media screen and (min-width: 1024px) {
	.menu-wrapper {
		position: relative;
		width: 100%;
		top: 0;
		right: 0;
	}

	.btn-select {
		display: none;
	}

	.menu-default-type {
		border-right: 1px solid var(--primary-color);
		position: sticky;
		top: 120px;
		box-shadow: none;
	}

	.menu-hide {
		display: block;
	}
}
</style>
