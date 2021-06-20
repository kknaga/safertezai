<template>
  <div class="app">
    <AppHeader />

    <main class="app__main">
      <router-view/>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/app/components/AppHeader.vue'
import AppFooter from '@/app/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__main {
  flex-grow: 1;
}
</style>
