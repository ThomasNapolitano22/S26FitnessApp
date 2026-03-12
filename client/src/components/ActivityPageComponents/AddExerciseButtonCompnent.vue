<template>
    <div class="box has-text-centered column is-one-third p-5 is-centered" id="buttonBox">
        <button class="button is-medium is-primary" @click="toggleModal"> Add New Exercise! </button>
    </div>

    <Modal :modal-active="isModalActive" @close="toggleModal">
        <div class="content">
            <div class="notification" id="modalBanner"> 
                <h1 class="title has-text-primary"> <b>Add A New Exercise!</b></h1>
            </div>
            
            <form @submit.prevent="submitExercise">
                <div class="field">
                    <label class="exerciseTitle">Title of Exercise</label>
                    <div class="control mt-2">
                        <input class="input" type="text" placeholder="Enter Exercise..." v-model="newExercise.title" required>
                    </div>
                </div>

                <div class="field">
                    <label class="exerciseTitle">Description of Exercise</label>
                    <div class="control mt-2">
                        <textarea class="textarea" placeholder="Enter Description..." v-model="newExercise.description"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="exerciseTitle">Category</label>
                    <div class="control mt-2">
                        <div class="select is-fullwidth">
                            <select v-model="newExercise.category" required>
                                <option disabled value="">Select a category...</option>
                                <option>Cardio</option>
                                <option>Strength</option>
                                <option>Yoga</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="field">
                    <label class="exerciseTitle">Date of Exercise</label>
                    <div class="control mt-2">
                        <input class="input" type="date" v-model="newExercise.date" required>
                    </div>
                </div>

                <div class="field">
                    <label class="location">Location of Exercise</label>
                    <div class="control mt-2">
                        <input class="input" type="text" placeholder="Enter Location..." v-model="newExercise.location">
                    </div>
                </div>

                <div class="field upload-field">
                    <label class="exerciseTitle">Upload an Image!</label>
                    <div class="file is-primary mt-2 upload-file">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fa-solid fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                        </label>
                    </div>
                </div>
                
                <hr />

                
                <div class="field mt-5">
                    <button class="button is-primary" type="submit" :disabled="!authStore.currentUser">
                        <span class="icon" id="addExerciseIcon">
                            <i class="fa-solid fa-plus"></i>
                        </span>
                        <span> Add Exercise! </span>
                    </button>
                </div>
            </form>
        </div>
    </Modal>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Modal from '@/components/ModalComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { useActivityStore } from '@/stores/activity'

const isModalActive = ref(false)
const submitError = ref('')
const authStore = useAuthStore()
const activityStore = useActivityStore()

const toggleModal = () => {
    submitError.value = ''
  isModalActive.value = !isModalActive.value
}

const newExercise = reactive({
  title: '',
  description: '',
  category: '',
  date: '',
  location: ''
})

const submitExercise = () => {
  if (!authStore.currentUser) {
    return
  }

  activityStore.addExercise({ 
    userId: authStore.currentUser.id,
    title: newExercise.title,
    description: newExercise.description,
    category: newExercise.category,
    date: newExercise.date,
    location: newExercise.location
   })

    newExercise.title = ''
    newExercise.description = ''
    newExercise.category = ''
    newExercise.date = ''
    newExercise.location = ''

  toggleModal()
}

</script>

<style scoped>
    #buttonBox{
        background-color: #BC6C25;
    }
    #modalBanner {
        background-color: #BC6C25;
        height: 80px;
    }

    .upload-field {
        text-align: center;
    }

    .upload-file {
        justify-content: center;
    }

</style>