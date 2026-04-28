<template>
    <div class="section">
        <div class="container" style="max-width: 480px;">
            <div class="box p-0" id="authBox">
                <div id="authHeader">
                    <h1 class="title has-text-centered mb-2 auth-title">Welcome Back</h1>
                    <p class="subtitle has-text-centered mb-0 auth-subtitle">
                        Log in to start tracking all your exercises!
                    </p>
                </div>

                <div class="p-5">
                    <form @submit.prevent="handleLogin">
                        <div class="field">
                            <label class="label auth-label">Username or Email</label>
                            <div class="control has-icons-left">
                                <input
                                    class="input auth-input"
                                    type="text"
                                    v-model="loginId"
                                    placeholder="thomas OR thomas@example.com"
                                    required
                                    autocomplete="username"
                                />
                                <span class="icon is-small is-left auth-icon">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label auth-label">Password</label>
                            <div class="control has-icons-left">
                                <input
                                    class="input auth-input"
                                    type="password"
                                    v-model="password"
                                    placeholder="••••••••"
                                    required
                                    autocomplete="current-password"
                                />
                                <span class="icon is-small is-left auth-icon">
                                    <i class="fa-solid fa-key"></i>
                                </span>
                            </div>
                        </div>

                        <div v-if="authStore.error" class="notification is-danger is-light mt-4">
                            {{ authStore.error }}
                        </div>

                        <div class="field mt-5">
                            <button
                                class="button is-fullwidth auth-submit"
                                :class="{ 'is-loading': authStore.isLoading }"
                                type="submit"
                            >
                                <span class="icon"><i class="fa-regular fa-address-card"></i></span>
                                <span>Log in</span>
                            </button>
                        </div>
                    </form>

                    <hr class="auth-divider" />
                    <p class="has-text-centered auth-footer">
                        New around here?
                        <RouterLink to="/signup" class="auth-link">
                            Create an account
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const loginId = ref('')
const password = ref('')

async function handleLogin() {
    try {
        await authStore.login(loginId.value, password.value)
        router.push('/activity')
    } catch {
    }
}
</script>

<style scoped>
    #authBox {
        background-color: #fefae0;
        border: 2px solid #BC6C25;
        border-radius: 15px;
        overflow: hidden;
        margin-top: 3rem;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    }
    #authHeader {
        background-color: #DDA15E;
        border-bottom: 2px solid #BC6C25;
        padding: 1.75rem 1.5rem 1.25rem;
    }
    .auth-title {
        color: #283618;
        font-weight: 700;
    }
    .auth-subtitle {
        color: #283618;
        opacity: 0.85;
    }
    .auth-label {
        color: #283618;
        font-weight: 600;
    }
    .auth-input {
        background-color: #faedcd;
        border: 2px solid #BC6C25;
        color: #283618;
        border-radius: 8px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .auth-input::placeholder {
        color: rgba(40, 54, 24, 0.5);
        font-style: italic;
    }
    .auth-input:focus {
        border-color: #283618;
        box-shadow: 0 0 0 0.15em rgba(40, 54, 24, 0.25);
        outline: none;
    }
    .auth-icon {
        color: #BC6C25 !important;
    }
    .auth-submit {
        background-color: #606C38;
        border: 2px solid #283618;
        color: #fefae0;
        font-weight: 600;
        letter-spacing: 0.5px;
        transition: background-color 0.2s ease, transform 0.15s ease;
    }
    .auth-submit:hover {
        background-color: #283618;
        color: #fefae0;
        transform: translateY(-1px);
    }
    .auth-divider {
        background-color: #BC6C25;
        height: 2px;
        opacity: 0.5;
    }
    .auth-footer {
        color: #283618;
    }
    .auth-link {
        color: #BC6C25;
        font-weight: 700;
        text-decoration: underline;
    }
    .auth-link:hover {
        color: #283618;
    }
</style>
