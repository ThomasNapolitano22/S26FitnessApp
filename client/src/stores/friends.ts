import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../services/myFetch'
import type { DataEnvelope, DataListEnvelope, Friend } from '../types'

export const useFriendsStore = defineStore('friends', () => {
    const accepted = ref<Friend[]>([])
    const incomingRequests = ref<Friend[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function fetchAccepted(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataListEnvelope<Friend>>('friends')
            accepted.value = res.data
        } catch (e) {
            error.value = (e as Error).message
        } finally {
            isLoading.value = false
        }
    }

    async function fetchRequests(): Promise<void> {
        try {
            const res = await api<DataListEnvelope<Friend>>('friends/requests')
            incomingRequests.value = res.data
        } catch (e) {
            error.value = (e as Error).message
        }
    }

    async function sendRequest(userId: string): Promise<void> {
        await api<DataEnvelope<Friend>>(`friends/request/${userId}`, {
            method: 'POST',
        })
    }

    async function accept(id: string): Promise<void> {
        await api<DataEnvelope<Friend>>(`friends/accept/${id}`, { method: 'POST' })
        incomingRequests.value = incomingRequests.value.filter((f) => f.id !== id)
        await fetchAccepted()
    }

    async function decline(id: string): Promise<void> {
        await api<DataEnvelope<Friend>>(`friends/decline/${id}`, { method: 'POST' })
        incomingRequests.value = incomingRequests.value.filter((f) => f.id !== id)
    }

    async function remove(id: string): Promise<void> {
        await api<DataEnvelope<Friend>>(`friends/${id}`, { method: 'DELETE' })
        accepted.value = accepted.value.filter((f) => f.id !== id)
    }

    return {
        accepted,
        incomingRequests,
        isLoading,
        error,
        fetchAccepted,
        fetchRequests,
        sendRequest,
        accept,
        decline,
        remove,
    }
})
