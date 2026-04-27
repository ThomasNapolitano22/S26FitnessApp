<template>
    <div class="box user-card is-flex is-align-items-center">
        <figure class="image is-64x64 mr-4 mb-0" v-if="iconIsUrl">
            <img :src="user.icon ?? ''" alt="Profile" class="is-rounded user-avatar">
        </figure>
        <span v-else class="mr-4" style="font-size: 3rem;">
            {{ user.icon || '🏃' }}
        </span>
        <div>
            <h3 class="title is-5 mb-1 user-name">{{ user.name }}</h3>
            <p class="has-text-grey is-size-7 mb-1">@{{ user.username }}</p>
            <span v-if="user.isAdmin" class="tag is-danger is-rounded">Admin</span>
            <span v-else class="tag is-dark is-rounded">Member</span>
        </div>
        <div class="ml-auto">
            <button class="button is-link is-small is-outlined is-success"
                    @click="$emit('add-friend')"
                    title="Send friend request">
                <span class="icon is-small">
                    <i class="fa-solid fa-person-circle-plus"></i>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import type { User } from '@/types'

    const props = defineProps<{
        user: User
    }>()

    defineEmits<{ (e: 'add-friend'): void }>()

    const iconIsUrl = computed(
        () => !!props.user.icon && /^https?:\/\//.test(props.user.icon),
    )
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
