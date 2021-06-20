<template>
  <header class="app-header">
      <div>
        <h1 class="app-header__title">
          سافرت ازاى
        </h1>

        <p>
          تجارب المصريين فى العمل بالخارج
        </p>
      </div>

      <router-link to="/"><div class="app-header__logo" /></router-link>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.app-header {
  padding: 8vmin 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: right;

  @media (min-width: 768px) {
    padding: 8vmin 8px;
  }
}

.app-header__title {
  margin-top: 0;
  margin-bottom: 0;

  @media (min-width: 768px) {
    font-size: 48px;
  }
}


.app-header__logo {
  background-image: url(~@/assets/icons/airplane.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100px;
  height: 100px;

  @media (min-width: 768px) {
  width: 150px;
  height: 150px;
  }
}
</style>