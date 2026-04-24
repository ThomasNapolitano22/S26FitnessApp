<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation" id="mainNavBar">
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/">
                <img src="/images/NatureRunnerLogo.webp" alt="Nature Runner Logo" style="max-height: 4.5rem;">
            </RouterLink>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false"
               @click="isActive = !isActive" :class="{ 'is-active': isActive }">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/" id="homeButton">Home</RouterLink>

                <div class="navbar-item has-dropdown is-hoverable" v-if="authStore.isLoggedIn">
                    <a class="navbar-link" href="#">Fitness Dashboard</a>
                    <div class="navbar-dropdown is-boxed">
                        <RouterLink class="navbar-item" to="/activity">Activity</RouterLink>
                        <RouterLink class="navbar-item" to="/Statistics">Statistics</RouterLink>
                        <RouterLink class="navbar-item" to="/FriendsActivity">Friends Activity</RouterLink>
                        <RouterLink class="navbar-item" to="/SearchUsers">Search Users</RouterLink>
                    </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable" v-if="authStore.isAdmin">
                    <a class="navbar-link" href="#">Admin</a>
                    <div class="navbar-dropdown is-boxed">
                        <RouterLink class="navbar-item" to="/ManageUsers">Users</RouterLink>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped" v-if="!authStore.isLoggedIn">
                        <p class="control">
                            <RouterLink class="button is-primary" to="/signup">
                                <span class="icon" id="registerIcon">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </span>
                                <span>Register</span>
                            </RouterLink>
                        </p>
                        <p class="control">
                            <RouterLink class="button is-primary" to="/login">
                                <span class="icon" id="loginIcon">
                                    <i class="fa-regular fa-address-card"></i>
                                </span>
                                <span>Login</span>
                            </RouterLink>
                        </p>
                    </div>

                    <div class="field is-grouped is-align-items-center" v-else>
                        <figure class="image is-32x32 mr-3" v-if="isImageUrl(authStore.currentUser?.icon)">
                            <img :src="authStore.currentUser?.icon ?? ''" class="is-rounded" id="navbarProfileIcon">
                        </figure>
                        <span v-else class="mr-3" style="font-size: 1.5rem;">
                            {{ authStore.currentUser?.icon || '🏃' }}
                        </span>
                        <span class="has-text-weight-bold mr-4">{{ authStore.currentUser?.name }}</span>
                        <p class="control">
                            <a class="button is-danger is-small is-outlined" href="#" @click.prevent="handleLogout">
                                <span class="icon">
                                    <i class="fa-regular fa-sign-out"></i>
                                </span>
                                <span>Logout</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { RouterLink, useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'

    const isActive = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    function isImageUrl(s: string | null | undefined): boolean {
        return !!s && /^https?:\/\//.test(s)
    }

    const handleLogout = () => {
        authStore.logout()
        router.push('/')
        isActive.value = false
    }
</script>

<style>
    .navbar-burger span {
        background-color: #DDA15E;
    }
    #mainNavBar {
        border-bottom: solid #DDA15E;
    }
    #navbarProfileIcon {
        object-fit: cover;
        height: 100%;
        width: 100%;
        border: 2px solid #DDA15E;
    }
</style>
