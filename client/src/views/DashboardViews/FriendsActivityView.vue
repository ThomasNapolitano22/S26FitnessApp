<template>
    <div class="section">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Your Friends Activity!</h1>
            <h2 class="subtitle has-text-centered has-text-primary"> See what everyone is up to! </h2>
        </div>
        <hr class="has-background-white" id="lineBreak"/>
        
        <div class="container mt-5">
            <div class="columns is-multiline">
                <div class="column is-one-third" v-for="exercise in allExercises" :key="exercise.id">
                    <ExerciseCard :exercise="exercise" :friendsView="true" />
                </div>
            </div>
            
            <div class="notification is-warning has-text-centered mt-4" v-if="allExercises.length === 0">
                Be the first to add an exercise and get everyone moving!!!
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import ExerciseCard from '@/components/ActivityPageComponents/ExerciseCardComponent.vue';
    import { useActivityStore } from '@/stores/activity';

    const activityStore = useActivityStore();

    const allExercises = computed(() => {
        return [...activityStore.exercises].reverse();
    });
</script>

<style scoped>
    #headerBox {
        background-color: #DDA15E;
    }
</style>