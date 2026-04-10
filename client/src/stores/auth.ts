import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../services/myFetch'
import type { User, DataListEnvelope } from '../../../server/types'

export const useAuthStore = defineStore('auth', () => {
    // Start with an empty array
    const users = ref<User[]>([])

    // Fetch the real users from our Express backend!
    api<DataListEnvelope<User>>('users').then((response) => {
        console.log("Data from server:", response) // Professor's test log!
        if (response.isSuccess) {
            users.value = response.data
        }
    })

    const currentUser = ref<User | null>(null)

    const isLoggedIn = computed(() => currentUser.value !== null)
    const isAdmin = computed(() => currentUser.value?.isAdmin === true)
    
    function login(userId: number) {
        const user = users.value.find(u => u.id === userId)
        if (user) {
            currentUser.value = user
        }
    }

    function logout() {
        currentUser.value = null
    }

    return {
        users,
        currentUser,
        isLoggedIn,
        isAdmin,
        login,
        logout
    }
})