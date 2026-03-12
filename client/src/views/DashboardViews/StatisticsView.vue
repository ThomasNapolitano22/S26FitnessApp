<template>
   <div class="section">
       <div class="box" id="headerBox">
           <h1 class="title is-spaced has-text-primary has-text-centered">Your Statistics</h1>
           <h2 class="subtitle has-text-centered has-text-primary"> Let's See Your Impact! </h2>
       </div>
       <hr class="has-background-white" id="lineBreak"/>
       <div class="section pt-0">
           <StatisticsCardComponent 
                title="Today" 
                distance="3.1" 
                duration="25:00" 
                avgPace="8:03" 
                calories="320" 
            />
            <StatisticsCardComponent 
                title="This Week" 
                distance="12.4" 
                duration="1:45:00" 
                avgPace="8:28" 
                calories="1450" 
            />
            <StatisticsCardComponent 
                title="All-Time" 
                distance="156.2" 
                duration="22:30:00" 
                avgPace="8:40" 
                calories="18200" 
            />
       </div>
    </div>
</template>

<script setup lang="ts">
    import StatisticsCardComponent from '@/components/StatisticsPageCompnonents/StatisticsCardComponent.t.vue';
</script>

<style scoped>
    #headerBox{
        background-color: #DDA15E;
    }
</style>
