<template>
    <div class="section">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Your Activity</h1>
            <h2 class="subtitle has-text-centered has-text-primary"> Add New Exercises, and View Past Ones! </h2>
        </div>
        <hr class="has-background-white" id="lineBreak"/>
        <div class="section has-text-centered columns is-centered">
            <AddExerciseButtonCompnent />
        </div>

    </div>
</template>

<script setup lang="ts">
    import AddExerciseButtonCompnent from '@/components/ActivityPageComponents/AddExerciseButtonCompnent.vue';

</script>

<style scoped>
    #headerBox{
        background-color: #DDA15E;
    }
</style>