<template>
  <div class="app-container">
    <Navbar />
    <RouterView />
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

  body {
    background: linear-gradient(to bottom,rgba(96, 108, 56, 1) 0%, rgba(82, 95, 48, 1) 50%, rgba(68, 81, 40, 1) 100%) !important;  
    min-height: 100vh;
    margin: 0;
    display: flex;
    flex-direction: column;
    font-family: "Noto Serif", serif;
  }

  .section {
    flex: 1;
  }

</style>