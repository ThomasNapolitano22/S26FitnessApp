<template>
  <div class="modal" :class="{ 'is-active': modalActive }">
    
    <div class="modal-background" @click="close"></div>

    <div class="modal-content">
      <div class="box">
        
        <slot />

        <button class="button is-danger mt-4" @click="close">
          Close
        </button>
      </div>
    </div>

    <button class="modal-close is-large" @click="close"></button>
  </div>
</template>

<script setup lang="ts">
    defineProps<{
        modalActive: boolean
    }>()

    const emit = defineEmits<{
        close: []
    }>()

    const close = () => {
        emit("close")
    }
</script>