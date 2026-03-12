import {ref, computed} from 'vue'
import { defineStore } from 'pinia'

export interface User {
    id: number
    name: string
    isAdmin: boolean
    icon: string
}

export const useAuthStore = defineStore('auth', () => {
    const users = ref<User[]>([
        {
            id: 1,
            name: 'Thomas Napolitano',
            isAdmin: true,
            icon: '/images/richard-brutyo-Sg3XwuEpybU-unsplash.webp'
        },
        {
            id: 2,
            name: 'John Doe',
            isAdmin: false,
            icon: '/images/ian-dooley-d1UPkiFd04A-unsplash.webp'
        },
        {
            id: 3,
            name: 'Mike Wazowski',
            isAdmin: false,
            icon: '/images/mikepfp.webp'
        }

    ])

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