<template>
    <div class="section" v-if="authStore.isLoggedIn">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Your Statistics</h1>
            <h2 class="subtitle has-text-centered has-text-primary">Let's See Your Impact!</h2>
        </div>
        <hr class="has-background-white" id="lineBreak" />

        <div v-if="loading" class="has-text-centered has-text-white">Loading your stats…</div>

        <div class="section pt-0" v-else>
            <StatisticsCardComponent
                title="Today"
                :distance="formatDistance(today?.totalDistanceMiles)"
                :duration="formatDuration(today?.totalDurationMinutes)"
                :avgPace="formatAvgMinutes(today?.avgDurationMinutes)"
                :calories="formatNumber(today?.totalCalories)"
            />
            <StatisticsCardComponent
                title="This Week"
                :distance="formatDistance(week?.totalDistanceMiles)"
                :duration="formatDuration(week?.totalDurationMinutes)"
                :avgPace="formatAvgMinutes(week?.avgDurationMinutes)"
                :calories="formatNumber(week?.totalCalories)"
            />
            <StatisticsCardComponent
                title="All-Time"
                :distance="formatDistance(alltime?.totalDistanceMiles)"
                :duration="formatDuration(alltime?.totalDurationMinutes)"
                :avgPace="formatAvgMinutes(alltime?.avgDurationMinutes)"
                :calories="formatNumber(alltime?.totalCalories)"
            />
        </div>
    </div>

    <div v-else class="section" id="notLoggedIn">
        <div class="notification is-warning has-text-centered mx-auto" style="max-width: 600px;">
            <strong>You must be logged in to view this page.</strong>
            Please log in to see your statistics and track your progress!
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useActivityStore } from '@/stores/activity'
    import StatisticsCardComponent from '@/components/StatisticsPageCompnonents/StatisticsCardComponent.t.vue'
    import type { ActivityStats } from '@/types'

    const authStore = useAuthStore()
    const activityStore = useActivityStore()

    const today = ref<ActivityStats | null>(null)
    const week = ref<ActivityStats | null>(null)
    const alltime = ref<ActivityStats | null>(null)
    const loading = ref(false)

    function formatNumber(n: number | undefined | null): string {
        return n == null ? '0' : String(n)
    }
    function formatDistance(n: number | undefined | null): string {
        return n == null ? '0' : n.toFixed(1)
    }
    function formatDuration(totalMinutes: number | undefined | null): string {
        if (!totalMinutes) return '0:00'
        const h = Math.floor(totalMinutes / 60)
        const m = totalMinutes % 60
        return h > 0
            ? `${h}:${String(m).padStart(2, '0')}:00`
            : `${m}:00`
    }
    function formatAvgMinutes(avgMinutes: number | undefined | null): string {
        if (!avgMinutes) return '0:00'
        return `${avgMinutes}:00`
    }

    onMounted(async () => {
        if (!authStore.isLoggedIn) return
        loading.value = true
        try {
            const [t, w, a] = await Promise.all([
                activityStore.fetchStats('today'),
                activityStore.fetchStats('week'),
                activityStore.fetchStats('alltime'),
            ])
            today.value = t
            week.value = w
            alltime.value = a
        } finally {
            loading.value = false
        }
    })
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
