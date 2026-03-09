<template>
    <section class="hero is-fullheight" id="forestHeroBackground">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <div id="glassyBox">
                        <h1 class="title mb-1" id="welcomeTitle">
                            Welcome to Nature Runner
                        </h1>
                        <h2 class="subtitle mb-6 has-text-white">
                            The Fitness App that Focuses on You, and Your Connection to the World Around You.
                        </h2>
                        <h3 class="mb-3" id="enterEmailPrompt">
                            Enter your email to know when the next update releases...
                        </h3>
                        <div class="box">
                            <div class="field is-grouped">
                                    <p class="control is-expanded">
                                        <input class="input" type="text" placeholder="Enter Your Email...">
                                    </p>
                                    <p class="control">
                                        <a class="button is-info has-text-black">
                                            Notify Me!
                                        </a>
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style>
    #welcomeTitle {
        color:hsl(52deg, 93.75%, 93.73%);
    }

    #enterEmailPrompt {
        color: hsl(52deg, 93.75%, 93.73%);
    }

    .hero .box {
        background-color: #BC6C25;
        border: 1px solid #DDA15E;
    }

    .hero .box .button {
        background-color: #fefae0;
        color: #283618;
        border-color: #fefae0;
    }

    .hero .input {
        background-color: #fefae0;
        color: #283618;
        border-color: #DDA15E;
    }

    .hero .input::placeholder {
        color: black;
        font-weight: light;
    }

    #forestHeroBackground {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('images/forestHeroBackground.jpeg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }

    #glassyBox {
        background-color: rgba(40, 54, 24, 0.6); 
        padding: 3rem; 
        border-radius: 25px; 
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    }
</style>