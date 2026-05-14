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

    const feedPage = ref(0)
    const feedTotal = ref(0)
    const feedDone = ref(false)
    const FEED_PAGE_SIZE = 9

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

    function resetFeed(): void {
        feed.value = []
        feedPage.value = 0
        feedTotal.value = 0
        feedDone.value = false
    }

    async function fetchNextFeedPage(): Promise<void> {
        if (isLoading.value || feedDone.value) return
        isLoading.value = true
        error.value = null
        try {
            const nextPage = feedPage.value + 1
            const res = await api<DataListEnvelope<Activity>>(
                `activities/feed?page=${nextPage}&pageSize=${FEED_PAGE_SIZE}`,
            )
            feed.value = [...feed.value, ...res.data]
            feedPage.value = nextPage
            feedTotal.value = res.total
            if (feed.value.length >= res.total) feedDone.value = true
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
        feedPage,
        feedTotal,
        feedDone,
        stats,
        isLoading,
        error,
        fetchMine,
        resetFeed,
        fetchNextFeedPage,
        fetchStats,
        createActivity,
        deleteActivity,
        updateActivity,
    }
})
