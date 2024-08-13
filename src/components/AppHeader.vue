<template>
	<header
		class="sticky top-0 z-10 bg-light border-b border-solid border-primary"
	>
		<div
			class="flex flex-row items-center mx-auto py-4 px-1 md:px-4 xl:px-8 max-w-[1240px]"
			:class="[isCartRoute ? 'justify-center' : 'justify-between']"
		>
			<NuxtLink to="/">
				<NuxtImg src="/images/logo.png" alt="logo" height="50" />
			</NuxtLink>

			<NuxtLink
				v-if="!isCartRoute"
				class="block relative mr-5 cursor-pointer"
				to="/cart"
			>
				<ClientOnly>
					<span
						class="absolute text-center rounded-xl -top-1 left-5 px1 text-xs min-w-4 font-bold text-light bg-secondary"
					>
						{{ cartCount }}
					</span>
				</ClientOnly>

				<NuxtImg src="/images/cart-icon.png" alt="cart" height="32" />
			</NuxtLink>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useCartState } from '@/composables/useAppState';

const route = useRoute();

const { cartCount } = useCartState();

const isCartRoute = computed(() => route.name === 'cart');
</script>
