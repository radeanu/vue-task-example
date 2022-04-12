<template>
  <div class="app-wrapper">
    <AppHeader />
    <Nuxt />
  </div>
</template>

<style lang="scss">
#__nuxt {
  font-family: cursive, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#__nuxt,
#__layout {
  height: 100%;
  width: 100%;
}

.app-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
