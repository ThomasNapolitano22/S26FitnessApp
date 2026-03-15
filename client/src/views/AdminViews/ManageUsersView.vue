<template>
    <div class="section">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Admin Control Panel</h1>
            <h2 class="subtitle has-text-centered has-text-primary"> Manage Nature Runner Users </h2>
        </div>
        <hr class="has-background-white" id="lineBreak"/>

        <div class="container mt-5">
            <div class="is-flex is-justify-content-flex-end mb-4">
                <button class="button is-primary has-text-black has-text-weight-bold">
                    <span class="icon">
                        <i class="fa-solid fa-user-plus"></i>
                    </span>
                    <span>Add New User</span>
                </button>
            </div>

            <div class="box p-0" id="userTableBox">
                <div class="table-container mb-0">
                    <table class="table is-fullwidth is-hoverable" style="background-color: transparent;">
                        <thead>
                            <tr>
                                <th class="pl-5">Avatar</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th class="has-text-right pr-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in authStore.users" :key="user.id">
                                <td class="is-vcentered pl-5">
                                    <figure class="image is-48x48 mb-0">
                                        <img :src="user.icon" class="is-rounded avatar">
                                    </figure>
                                </td>
                                <td class="is-vcentered has-text-weight-bold user-name">
                                    {{ user.name }}
                                </td>
                                <td class="is-vcentered">
                                    <span v-if="user.isAdmin" class="tag is-danger is-rounded">Admin</span>
                                    <span v-else class="tag is-dark is-rounded">Member</span>
                                </td>
                                <td class="is-vcentered has-text-right pr-5">
                                    <div class="buttons is-right mb-0">
                                        <button class="button is-small is-info is-outlined">
                                            <span class="icon is-small">
                                                <i class="fa-solid fa-pen"></i>
                                            </span>
                                            <span>Edit</span>
                                        </button>
                                        <button class="button is-small is-danger is-outlined">
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
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
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

    tbody tr:hover td {
        background-color: #faedcd; 
    }

</style>