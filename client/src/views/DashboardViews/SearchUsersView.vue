<template>
    <div class="section">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Search Users</h1>
            <h2 class="subtitle has-text-centered has-text-primary"> Find fellow Nature Runners to connect with! </h2>
        </div>
        <hr class="has-background-white" id="lineBreak"/>

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
                            >
                            <span class="icon is-left" style="color: #BC6C25;">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="columns is-multiline is-centered">
                <div 
                    class="column is-one-third" 
                    v-for="user in filteredUsers" 
                    :key="user.id"
                >
                    <UserCard :user="user" />
                </div>
            </div>

            <div v-if="filteredUsers.length === 0" class="notification is-warning has-text-centered mt-4 mx-auto" style="max-width: 600px;">
                <strong>No runners found matching "{{ searchQuery }}".</strong> Keep looking!
            </div>
        </div>
    </div>
    <div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import UserCard from '@/components/SearchPageComponents/SearchUserCardComponent.vue'

const authStore = useAuthStore()
const searchQuery = ref('')

const filteredUsers = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return authStore.users
    
    return authStore.users.filter(user => 
        user.name.toLowerCase().includes(query)
    )
})
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
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
</style>