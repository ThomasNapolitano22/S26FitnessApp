<template>
  <div class="app-container">
    <Navbar />
    <main class="app-main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/NavbarComponent.vue'
import Footer from './components/FooterComponent.vue'
</script>

<style>
  :root {
    --bulma-primary-h: 52deg;
    --bulma-primary-s: 93.75%;
    --bulma-primary-l: 93.73%
  }

  html,
  body,
  #app {
    margin: 0;
    min-height: 100%;
  }

  body {
    font-family: "Noto Serif", serif;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(to bottom,rgba(96, 108, 56, 1) 0%, rgba(82, 95, 48, 1) 50%, rgba(68, 81, 40, 1) 100%);
  }

  .app-main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }

  .app-main > .section {
    flex: 1 0 auto;
  }

</style>