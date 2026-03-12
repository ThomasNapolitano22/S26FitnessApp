<template>

    <div class="box has-text-centered column is-one-third p-5  is-centered" id="buttonBox">
        <button class="button is-medium is-primary" @click="toggleModal"> Add New Exercise! </button>
    </div>


    <Modal :modal-active="isModalActive" @close="toggleModal">
        
        <div class="content">
            <div class="notification" id="modalBanner"> 
                <h1 class="title is-spaced has-text-primary has-text-centered">Add An Exercise</h1>
            </div>
            
                <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left">
                        <input class="input" type="text" placeholder="Enter Password...">
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-key"></i>
                        </span>
                    </div>
                </div>

        </div>
        
    </Modal>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/ModalComponent.vue'

const isModalActive = ref(false)
const toggleModal = () => {
  isModalActive.value = !isModalActive.value
}
</script>

<style scoped>
    #buttonBox{
        background-color: #BC6C25;
    }
    #modalBanner {
        background-color: #BC6C25;
    }
</style>