<template>
    <div class="section" v-if="authStore.isLoggedIn">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Your Activity</h1>
            <h2 class="subtitle has-text-centered has-text-primary">
                Add New Exercises, and View Past Ones!
            </h2>
        </div>
        <hr class="has-background-white" id="lineBreak" />

        <div class="section has-text-centered columns is-centered">
            <AddExerciseButtonCompnent @created="refresh" />
        </div>

        <hr class="has-background-white" id="lineBreak" />

        <div class="container mt-5">
            <div v-if="activityStore.error" class="notification is-danger mb-4">
                {{ activityStore.error }}
            </div>

            <h3 class="title is-4 has-text-white mb-4" v-if="activityStore.myActivities.length > 0">
                Recent Exercises
            </h3>

            <div class="columns is-multiline">
                <div class="column is-one-third"
                     v-for="activity in activityStore.myActivities"
                     :key="activity.id">
                    <ExerciseCardComponent :activity="activity" @deleted="refresh" />
                </div>
            </div>

            <div class="notification is-warning has-text-centered mt-4"
                 v-if="!activityStore.isLoading && activityStore.myActivities.length === 0">
                <strong>You haven't added any exercises yet. Get out there!!!</strong>
            </div>
        </div>
    </div>

    <div v-else class="section" id="notLoggedIn">
        <div class="notification is-warning has-text-centered mx-auto" style="max-width: 600px;">
            <strong>You must be logged in to view this page.</strong>
            Please log in to access your activity dashboard.
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import AddExerciseButtonCompnent from '@/components/ActivityPageComponents/AddExerciseButtonCompnent.vue'
    import ExerciseCardComponent from '@/components/ActivityPageComponents/ExerciseCardComponent.vue'
    import { useAuthStore } from '@/stores/auth'
    import { useActivityStore } from '@/stores/activity'

    const authStore = useAuthStore()
    const activityStore = useActivityStore()

    function refresh() {
        if (authStore.isLoggedIn) activityStore.fetchMine()
    }

    onMounted(refresh)
</script>

<style scoped>
    #headerBox {
        background-color: #DDA15E;
    }
    #notLoggedIn {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
