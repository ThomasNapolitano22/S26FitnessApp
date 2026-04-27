import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { api, getToken, setToken, onUnauthorized } from '../services/myFetch'
import type { DataEnvelope, User } from '../types'

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<User | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => currentUser.value !== null)
    const isAdmin = computed(() => currentUser.value?.isAdmin === true)

    async function init(): Promise<void> {
        const token = getToken()
        if (!token) return
        try {
            const res = await api<DataEnvelope<User>>('auth/me')
            if (res.isSuccess) currentUser.value = res.data
        } catch {
            setToken(null)
            currentUser.value = null
        }
    }

    async function login(loginId: string, password: string): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataEnvelope<{ token: string; user: User }>>(
                'auth/login',
                { method: 'POST', body: { loginId, password }, skipAuth: true },
            )
            setToken(res.data.token)
            currentUser.value = res.data.user
        } catch (e) {
            error.value = (e as Error).message
            throw e
        } finally {
            isLoading.value = false
        }
    }

    async function signup(input: {
        name: string
        username: string
        email: string
        password: string
        icon?: string | null
    }): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataEnvelope<{ token: string; user: User }>>(
                'auth/signup',
                { method: 'POST', body: input, skipAuth: true },
            )
            setToken(res.data.token)
            currentUser.value = res.data.user
        } catch (e) {
            error.value = (e as Error).message
            throw e
        } finally {
            isLoading.value = false
        }
    }

    function logout(): void {
        setToken(null)
        currentUser.value = null
    }

    onUnauthorized(() => {
        currentUser.value = null
    })

    return {
        currentUser,
        isLoggedIn,
        isAdmin,
        isLoading,
        error,
        init,
        login,
        signup,
        logout,
    }
})
