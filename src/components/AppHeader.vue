<template>
	<header class="header-wrapper">
		<div class="header" :class="headerClass">
			<NuxtLink to="/">
				<NuxtImg class="logo" src="/images/logo.png" alt="logo" />
			</NuxtLink>

			<NuxtLink v-if="!isCartRoute" class="cart-link" to="/cart">
				<ClientOnly>
					<span class="cart-count-badge">{{ cartCount }}</span>
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
const headerClass = computed(() => {
	return isCartRoute.value ? 'justify-center' : 'justify-between';
});
</script>

<style scoped lang="scss">
.header-wrapper {
	position: sticky;
	top: 0;
	z-index: 9;
	background-color: var(--light-color);
	border-bottom: 1px solid var(--primary-color);
}

.header {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-inline: auto;
	padding-block: 16px;
	padding-inline: var(--page-pad-x);
	max-width: var(--page-max-width);
}

.justify-center {
	justify-content: center;
}

.justify-between {
	justify-content: space-between;
}

.logo {
	height: 50px;
}

.cart-link {
	display: block;
	position: relative;
	margin-right: 20px;
	cursor: pointer;
}

.cart-count-badge {
	top: -6px;
	left: 20px;
	padding: 0 5px;
	font-size: 12px;
	min-width: 20px;
	line-height: 20px;
	position: absolute;
	text-align: center;
	border-radius: 10px;
	font-weight: bolder;
	color: var(--light-color);
	background-color: var(--accent-color);
}
</style>
