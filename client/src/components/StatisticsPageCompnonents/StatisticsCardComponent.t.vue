<template>
    <div class="box is-flex is-flex-direction-column is-justify-content-space-between has-background-primary">
        <div class="title has-text-centered has-text-black"> {{ title }} </div>
        
        <div class="is-flex is-justify-content-space-between">
            <div><span class="is-size-3">Distance: </span> <span class="is-size-3 has-text-success"> {{ distance }} </span></div>
            <div> <span class="is-size-3">Duration: </span> <span class="is-size-3 has-text-success"> {{ duration }}</span> </div>
        </div>
        
        <div class="is-flex is-justify-content-space-between">
            <div><span class="is-size-3">Avg Pace: </span> <span class="is-size-3 has-text-success"> {{ avgPace }} </span></div>
            <div><span class="is-size-3">Calories: </span> <span class="is-size-3 has-text-success"> {{ calories }} </span></div>
        </div>
    </div>
</template>

<script setup lang="ts">

defineProps<{
    title: string
    distance: string 
    duration: string 
    avgPace: string
    calories: string 
}>()
</script>