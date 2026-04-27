<template>
    <div class="section" v-if="authStore.isLoggedIn">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Search Users</h1>
            <h2 class="subtitle has-text-centered has-text-primary">
                Find fellow Nature Runners to connect with!
            </h2>
        </div>
        <hr class="has-background-white" id="lineBreak" />

        <div class="container mb-5 mt-4">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="field">
                        <div class="control has-icons-left">
                            <input
                                class="input is-large search-input"
                                type="text"
                                placeholder="Search for a user..."
                                v-model="searchQuery"
                                @input="runSearch"
                            />
                            <span class="icon is-left" style="color: #BC6C25;">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div v-if="requestError" class="notification is-danger mb-4">
                {{ requestError }}
            </div>
            <div v-if="requestSuccess" class="notification is-success mb-4">
                {{ requestSuccess }}
            </div>

            <div class="columns is-multiline is-centered">
                <div class="column is-one-third"
                     v-for="user in visibleResults"
                     :key="user.id">
                    <UserCard :user="user" @add-friend="sendRequest(user)" />
                </div>
            </div>

            <div v-if="searchQuery && !usersStore.isLoading && visibleResults.length === 0"
                 class="notification is-warning has-text-centered mt-4 mx-auto"
                 style="max-width: 600px;">
                <strong>No runners found matching "{{ searchQuery }}".</strong>
                Keep looking!
            </div>
        </div>
    </div>

    <div v-else class="section" id="notLoggedIn">
        <div class="notification is-warning has-text-centered mx-auto" style="max-width: 600px;">
            <strong>You must be logged in to view this page.</strong>
            Please log in to search for users!
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useUsersStore } from '@/stores/users'
    import { useFriendsStore } from '@/stores/friends'
    import UserCard from '@/components/SearchPageComponents/SearchUserCardComponent.vue'
    import type { User } from '@/types'

    const authStore = useAuthStore()
    const usersStore = useUsersStore()
    const friendsStore = useFriendsStore()

    const searchQuery = ref('')
    const requestError = ref('')
    const requestSuccess = ref('')

    const visibleResults = computed(() =>
        usersStore.searchResults.filter((u) => u.id !== authStore.currentUser?.id),
    )

    let debounce: number | undefined
    function runSearch() {
        clearTimeout(debounce)
        requestError.value = ''
        requestSuccess.value = ''
        const q = searchQuery.value.trim()
        if (!q) {
            usersStore.searchResults = []
            return
        }
        debounce = window.setTimeout(() => usersStore.search(q), 250)
    }

    async function sendRequest(user: User) {
        requestError.value = ''
        requestSuccess.value = ''
        try {
            await friendsStore.sendRequest(user.id)
            requestSuccess.value = `Friend request sent to ${user.name}`
        } catch (e) {
            requestError.value = (e as Error).message
        }
    }
</script>

<style scoped>
    #headerBox {
        background-color: #DDA15E;
    }
    .search-input {
        background-color: #fefae0;
        border: 2px solid #BC6C25;
        color: #283618;
        border-radius: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    .search-input::placeholder {
        color: rgba(40, 54, 24, 0.6);
        font-style: italic;
    }
    .search-input:focus {
        border-color: #283618;
        box-shadow: 0 0 0 0.15em rgba(40, 54, 24, 0.25);
        outline: none;
    }
    #notLoggedIn {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
