<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <RouterLink class="navbar-item" to="/">
                <img src="/images/NatureRunnerLogo.png" alt="Nature Runner Logo" style="max-height: 4.5rem;">
            </RouterLink>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    
        <div class="navbar-menu">
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
                 <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="#"> Fitness Dashboard </a>
                        <div class="navbar-dropdown is-boxed">
                            <RouterLink class="navbar-item" to="/activity"> Activity </RouterLink>
                            <RouterLink class="navbar-item" to="/Statistics"> Statistics </RouterLink>
                            <RouterLink class="navbar-item" to="/FriendsActivity"> Friends Activity </RouterLink>
                            <RouterLink class="navbar-item" to="/SearchUsers"> Search Users </RouterLink>
                        </div>
                 </div>
                 <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="#"> Admin </a>
                        <div class="navbar-dropdown is-boxed">
                            <RouterLink class="navbar-item" to="/ManageUsers"> Users </RouterLink>
                        </div>
                 </div>

            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <a class="button is-primary" href="#">
                                <span class="icon" id="registerIcon">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </span>
                                <span> Register </span>
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-primary" href="#">
                                <span class="icon" id="loginIcon">
                                    <i class="fa-regular fa-address-card"></i>
                                </span>
                                <span>Login</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
</script>

<style>
    .navbar-burger span {
        background-color: #DDA15E;
    }
</style>