<template>
    <div class="section" v-if="authStore.isLoggedIn">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Your Activity</h1>
            <h2 class="subtitle has-text-centered has-text-primary"> Add New Exercises, and View Past Ones! </h2>
        </div>
        <hr class="has-background-white" id="lineBreak"/>
        
        <div class="section has-text-centered columns is-centered">
            <AddExerciseButtonCompnent />
        </div>

        <hr class="has-background-white" id="lineBreak"/>


        <div class="container mt-5">
            <h3 class="title is-4 has-text-white mb-4" v-if="userExercises.length > 0">Recent Exercises</h3>
            
            <div class="columns is-multiline">
                <div class="column is-one-third" v-for="exercise in userExercises" :key="exercise.id">
                    
                    <ExerciseCardComponent :exercise="exercise" />
                    
                </div>
            </div>
            
            <div class="notification is-warning has-text-centered mt-4" v-if="userExercises.length === 0">
               <strong> You haven't added any exercises yet. Get out there!!!</strong>
            </div>
        </div>

    </div>
    <div v-else class="section" id="notLoggedIn">
        <div class="notification is-warning has-text-centered mx-auto" style="max-width: 600px;">
            <strong>You must be logged in to view this page.</strong> Please log in to access your activity dashboard.
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import AddExerciseButtonCompnent from '@/components/ActivityPageComponents/AddExerciseButtonCompnent.vue';
    import ExerciseCardComponent from '@/components/ActivityPageComponents/ExerciseCardComponent.vue';
    import { useAuthStore } from '@/stores/auth';
    import { useActivityStore } from '@/stores/activity';

    const authStore = useAuthStore();
    const activityStore = useActivityStore();

    const userExercises = computed(() => {
        if (!authStore.currentUser) return [];
        const filteredExercises = activityStore.exercises.filter(ex => ex.userId === authStore.currentUser!.id);
        return filteredExercises.reverse();
    });
</script>

<style scoped>
    #headerBox{
        background-color: #DDA15E;
    }
    #notLoggedIn {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;   
    }
</style>