import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../services/myFetch'
import type { DataEnvelope, DataListEnvelope, User } from '../types'

export const useUsersStore = defineStore('users', () => {
    const searchResults = ref<User[]>([])
    const allUsers = ref<User[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function search(q: string): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataListEnvelope<User>>(
                `users/search?q=${encodeURIComponent(q)}`,
            )
            searchResults.value = res.data
        } catch (e) {
            error.value = (e as Error).message
        } finally {
            isLoading.value = false
        }
    }

    async function fetchAllAdmin(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataListEnvelope<User>>('users')
            allUsers.value = res.data
        } catch (e) {
            error.value = (e as Error).message
        } finally {
            isLoading.value = false
        }
    }

    async function updateUser(
        id: string,
        patch: Partial<User> & { password?: string },
    ): Promise<void> {
        const res = await api<DataEnvelope<User>>(`users/${id}`, {
            method: 'PATCH',
            body: patch,
        })
        const idx = allUsers.value.findIndex((u) => u.id === id)
        if (idx >= 0) allUsers.value[idx] = res.data
    }

    async function deleteUser(id: string): Promise<void> {
        await api<DataEnvelope<User>>(`users/${id}`, { method: 'DELETE' })
        allUsers.value = allUsers.value.filter((u) => u.id !== id)
    }

    return {
        searchResults,
        allUsers,
        isLoading,
        error,
        search,
        fetchAllAdmin,
        updateUser,
        deleteUser,
    }
})
