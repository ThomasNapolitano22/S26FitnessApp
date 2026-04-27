<template>
    <div class="section" v-if="authStore.isAdmin">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Admin Control Panel</h1>
            <h2 class="subtitle has-text-centered has-text-primary">Manage Nature Runner Users</h2>
        </div>
        <hr class="has-background-white" id="lineBreak" />

        <div class="container mt-5">
            <div v-if="usersStore.error" class="notification is-danger">
                {{ usersStore.error }}
            </div>

            <div class="box p-0" id="userTableBox">
                <div class="table-container mb-0">
                    <table class="table is-fullwidth is-hoverable" style="background-color: transparent;">
                        <thead>
                            <tr>
                                <th class="pl-5">Avatar</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th class="has-text-right pr-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="u in usersStore.allUsers" :key="u.id">
                                <td class="is-vcentered pl-5">
                                    <figure class="image is-48x48 mb-0" v-if="isUrl(u.icon)">
                                        <img :src="u.icon ?? ''" class="is-rounded avatar">
                                    </figure>
                                    <span v-else style="font-size: 2rem;">
                                        {{ u.icon || '🏃' }}
                                    </span>
                                </td>
                                <td class="is-vcentered has-text-weight-bold user-name">
                                    {{ u.name }}
                                </td>
                                <td class="is-vcentered user-meta">@{{ u.username }}</td>
                                <td class="is-vcentered user-meta">{{ u.email }}</td>
                                <td class="is-vcentered">
                                    <span v-if="u.isAdmin" class="tag is-danger is-rounded">Admin</span>
                                    <span v-else class="tag is-dark is-rounded">Member</span>
                                </td>
                                <td class="is-vcentered has-text-right pr-5">
                                    <div class="buttons is-right mb-0">
                                        <button class="button is-small is-info is-outlined"
                                                @click="toggleAdmin(u)">
                                            <span class="icon is-small">
                                                <i class="fa-solid fa-user-shield"></i>
                                            </span>
                                            <span>{{ u.isAdmin ? 'Demote' : 'Promote' }}</span>
                                        </button>
                                        <button class="button is-small is-danger is-outlined"
                                                :disabled="u.id === authStore.currentUser?.id"
                                                @click="confirmDelete(u)">
                                            <span class="icon is-small">
                                                <i class="fa-solid fa-trash"></i>
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="section" id="notLoggedIn">
        <div class="notification is-warning has-text-centered mx-auto" style="max-width: 600px;">
            <strong>You must be logged in as an admin to view this page.</strong>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useUsersStore } from '@/stores/users'
    import type { User } from '@/types'

    const authStore = useAuthStore()
    const usersStore = useUsersStore()

    function isUrl(s: string | null): boolean {
        return !!s && /^https?:\/\//.test(s)
    }

    async function toggleAdmin(user: User) {
        await usersStore.updateUser(user.id, { isAdmin: !user.isAdmin })
    }

    async function confirmDelete(user: User) {
        if (!confirm(`Delete ${user.name}? This cannot be undone.`)) return
        await usersStore.deleteUser(user.id)
    }

    onMounted(() => {
        if (authStore.isAdmin) usersStore.fetchAllAdmin()
    })
</script>

<style scoped>
    #headerBox {
        background-color: #DDA15E;
    }
    #userTableBox {
        overflow: hidden;
        border: 2px solid #BC6C25;
        background-color: #fefae0;
    }
    th {
        color: #283618;
        border-bottom: 2px solid #BC6C25;
        background-color: rgb(221, 162, 94);
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    td {
        border-bottom: 1px solid rgba(188, 108, 37, 0.3);
    }
    tr:last-child td {
        border-bottom: none;
    }
    .avatar {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border: 2px solid #DDA15E;
    }
    .user-name {
        color: #283618;
        font-size: 1.1rem;
    }
    .user-meta {
        color: #283618;
        font-weight: 500;
    }
    tbody tr:hover td {
        background-color: #faedcd;
    }
    #notLoggedIn {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
