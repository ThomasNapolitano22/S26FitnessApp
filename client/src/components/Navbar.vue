<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="index.html">
                <img src="/images/NatureRunnerLogo.png" alt="Nature Runner Logo" style="max-height: 4.5rem;">
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    
        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="index.html" id="homeButton"> Home </a>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="#"> About Us </a>
                    <div class="navbar-dropdown is-boxed" id="aboutUsDropDown">
                        <a class="navbar-item" href="#"> Our Mission </a>
                        <a class="navbar-item" href="#"> Our Goals </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="#"> Your Exercises </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="#"> FAQ </a>
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

<script setup>
</script>

<style>
    .navbar-burger span {
        background-color: #DDA15E;
    }
</style>