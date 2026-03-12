<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation" id="mainNavBar">
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/">
                <img src="/images/NatureRunnerLogo.webp" alt="Nature Runner Logo" style="max-height: 4.5rem;">
            </RouterLink>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" @click="isActive = !isActive" :class="{ 'is-active': isActive}">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    
        <div class="navbar-menu" :class="{'is-active': isActive}">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/" id="homeButton"> Home </RouterLink>
                <!-- <div class="navbar-item is-hoverable"> -->
                <!-- <a class="navbar-item" href="#"> About Us </a> -->
                    <!-- <div class="navbar-dropdown is-boxed" id="aboutUsDropDown">
                        <a class="navbar-item" href="#"> Our Mission </a>
                        <a class="navbar-item" href="#"> Our Goals </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="#"> Your Exercises </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="#"> FAQ </a>
                    </div> -->
                <!-- </div> -->
                 <div class="navbar-item has-dropdown is-hoverable" v-if="authStore.isLoggedIn">
                    <a class="navbar-link" href="#"> Fitness Dashboard </a>
                        <div class="navbar-dropdown is-boxed">
                            <RouterLink class="navbar-item" to="/activity"> Activity </RouterLink>
                            <RouterLink class="navbar-item" to="/Statistics"> Statistics </RouterLink>
                            <RouterLink class="navbar-item" to="/FriendsActivity"> Friends Activity </RouterLink>
                            <RouterLink class="navbar-item" to="/SearchUsers"> Search Users </RouterLink>
                        </div>
                 </div>
                 <div class="navbar-item has-dropdown is-hoverable" v-if="authStore.isAdmin">
                    <a class="navbar-link" href="#"> Admin </a>
                        <div class="navbar-dropdown is-boxed">
                            <RouterLink class="navbar-item" to="/ManageUsers"> Users </RouterLink>
                        </div>
                 </div>

            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped" v-if="!authStore.isLoggedIn">
                        <p class="control">
                            <a class="button is-primary" href="#" @click="toggleModal">
                                <span class="icon" id="registerIcon">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </span>
                                <span> Register </span>
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-primary" href="#" @click="toggleModal">
                                <span class="icon" id="loginIcon">
                                    <i class="fa-regular fa-address-card"></i>
                                </span>
                                <span>Login</span>
                            </a>
                        </p>
                    </div>
                    
                    <div class="field is-grouped is-align-items-center" v-else>
                        <figure class="image is-32x32 mr-3">
                            <img :src="authStore.currentUser?.icon" class="is-rounded" id="navbarProfileIcon">
                        </figure>
                        <span class="has-text-weight-bold mr-4"> {{ authStore.currentUser?.name }} </span>
                        <p class="control">
                            <a class="button is-danger is-small is-outlined" href="#" @click="handleLogout">
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

    <Modal :modal-active="isModalActive" @close="toggleModal">
        <div class="content">
            <h2 class="title is-4"> Welcome Back! Please Login! </h2>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control has-icons-left">
                        <input class="input" type="text" placeholder="Enter Username...">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left">
                        <input class="input" type="password" placeholder="Enter Password...">
                        <span class="icon is-small is-left">
                            <i class="fa-solid fa-key"></i>
                        </span>
                    </div>
                </div>

                <a class="button is-primary" href="#">
                    <span class="icon" id="loginIcon">
                        <i class="fa-regular fa-address-card"></i>
                    </span>
                    <span>Login</span>
                </a>

            </div>
        <hr />
        <div class="content">
            <h2 class="title is-4"> No Account? No Problem, Register Now!</h2>
                <a class="button is-primary" href="#">
                    <span class="icon" id="registerIcon">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </span>
                    <span> Register Here! </span>
                </a>
        </div>
        <hr />
        <div class="content">
            <h2 class="title is-4"> Or Select A Pre-Generated User Below!</h2>
                <div class="buttons">
                    <button 
                        v-for="user in authStore.users"
                        :key="user.id"
                        class="button is-primary is-outlined"
                        @click="handeLogin(user.id)"
                    >
                    <figure class="image is-32x32 mr-3">
                        <img :src="user.icon" class="is-rounded modalUserImage" >
                    </figure>
                    <span>{{ user.name }} <strong v-if="user.isAdmin" class="has-text-danger ml-1">(Admin)</strong></span>
                    </button>
                </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import Modal from '@/components/ModalComponent.vue'
    import { useAuthStore } from '@/stores/auth';

    const isActive = ref(false)
    const isModalActive = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const toggleModal = () => {
        isModalActive.value = !isModalActive.value
    }

    const handeLogin = (userId: number) => {
        authStore.login(userId)
        isModalActive.value = false
    }

    const handleLogout = () => {
        authStore.logout()
        router.push("/")
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

   

    .modalUserButton figure {
        flex-shrink: 0;
    }

    

</style>