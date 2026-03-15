<template>
    <div class="box user-card is-flex is-align-items-center">
        <figure class="image is-64x64 mr-4 mb-0">
            <img :src="user.icon" alt="Profile" class="is-rounded user-avatar">
        </figure>
        <div>
            <h3 class="title is-5 mb-1 user-name">{{ user.name }}</h3>
            <span v-if="user.isAdmin" class="tag is-danger is-rounded">Admin</span>
            <span v-else class="tag is-dark is-rounded">Member</span>
        </div>
        <div class="ml-auto">
            <button class="button is-link is-small is-outlined is-success">
                <span class="icon is-small">
                    <i class="fa-solid fa-person-circle-plus"></i>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/stores/auth'

defineProps<{
    user: User
}>()
</script>

<style scoped>
    .user-card {
        background-color: #fefae0;
        border: 2px solid #BC6C25;
        border-radius: 15px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        height: 100%;
    }

    .user-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        border-color: #DDA15E;
    }

    .user-avatar {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border: 2px solid #DDA15E;
    }

    .user-name {
        color: #283618;
    }
</style>