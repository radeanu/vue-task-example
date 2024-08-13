<template>
	<span class="loader"></span>
</template>

<style lang="scss" scoped>
.loader {
	border: 2px solid var(--primary-color);
	border-bottom-color: transparent;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 0.5s linear infinite;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
