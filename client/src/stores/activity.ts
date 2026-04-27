import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../services/myFetch'
import type {
    Activity,
    ActivityStats,
    DataEnvelope,
    DataListEnvelope,
} from '../types'

export const useActivityStore = defineStore('activity', () => {
    const myActivities = ref<Activity[]>([])
    const feed = ref<Activity[]>([])
    const stats = ref<ActivityStats | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    function setError(e: unknown) {
        error.value = e instanceof Error ? e.message : String(e)
    }

    async function fetchMine(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataListEnvelope<Activity>>('activities')
            myActivities.value = res.data
        } catch (e) {
            setError(e)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchFeed(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataListEnvelope<Activity>>('activities/feed')
            feed.value = res.data
        } catch (e) {
            setError(e)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchStats(
        period: 'today' | 'week' | 'alltime',
    ): Promise<ActivityStats | null> {
        try {
            const res = await api<DataEnvelope<ActivityStats>>(
                `activities/stats?period=${period}`,
            )
            stats.value = res.data
            return res.data
        } catch (e) {
            setError(e)
            return null
        }
    }

    async function createActivity(input: {
        exerciseTypeId: string
        title: string
        description?: string
        date: string
        location?: string
        durationMinutes: number
        calories?: number
        distanceMiles?: number | null
    }): Promise<void> {
        const res = await api<DataEnvelope<Activity>>('activities', {
            method: 'POST',
            body: input,
        })
        myActivities.value = [res.data, ...myActivities.value]
    }

    async function deleteActivity(id: string): Promise<void> {
        await api<DataEnvelope<Activity>>(`activities/${id}`, { method: 'DELETE' })
        myActivities.value = myActivities.value.filter((a) => a.id !== id)
        feed.value = feed.value.filter((a) => a.id !== id)
    }

    async function updateActivity(
        id: string,
        patch: Partial<Activity>,
    ): Promise<void> {
        const res = await api<DataEnvelope<Activity>>(`activities/${id}`, {
            method: 'PATCH',
            body: patch,
        })
        const idx = myActivities.value.findIndex((a) => a.id === id)
        if (idx >= 0) myActivities.value[idx] = { ...myActivities.value[idx], ...res.data }
    }

    return {
        myActivities,
        feed,
        stats,
        isLoading,
        error,
        fetchMine,
        fetchFeed,
        fetchStats,
        createActivity,
        deleteActivity,
        updateActivity,
    }
})
