<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <strong id="brandFooter"> Nature Runner </strong>
        </div>

        <div class="columns has-text-centered">
            <div class="column is-one-third">
                <h4 class="bd-footer-title"> About Us </h4>
                    <ul id="footerColumn1">
                        <li class="mb-1"><a class="has-text-white has-text-weight-light is-small" href="#">Our Mission</a></li>
                        <li class="mb-1"><a class="has-text-white has-text-weight-light" href="#">Our Goals</a></li>
                        <li class="mb-1"><a class="has-text-white has-text-weight-light" href="#">Your Exercises</a></li>
                        <li> <a class="has-text-white has-text-weight-light" href="#"> FAQ </a></li>
                    </ul>
            </div>

            <div class="column is-one-third">
                <h4 class="bd-footer-title"> Ready to Join? </h4>
                    <ul id="footerColumn2">
                        <li class="mb-1"><a class="has-text-white has-text-weight-light is-small" href="#">Register Now</a></li>
                        <li class="mb-1"><a class="has-text-white has-text-weight-light is-small" href="#">Refer-a-Friend</a></li>
                        <li class="mb-1"><a class="has-text-white has-text-weight-light is-small" href="#">Login</a></li>
                    </ul>
            </div>

            <div class="column is-one-third">
                <h4 class="bd-footer-title"> Contact Us </h4>
                    <ul id="footerColumn3">
                        <li class="mb-1">
                            <a class="has-text-white has-text-weight-light is-small" href="#"> 
                                <span><i class="fa-regular fa-envelope"></i></span>
                                <span class="footer-link-text">Email</span>
                            </a>
                        </li>
                        <li class="mb-1">
                            <a class="has-text-white has-text-weight-light" href="#">
                                <span> <i class="fa-regular fa-comment"></i></span> 
                                <span class="footer-link-text">Live Chat</span>
                            </a>
                        </li>
                        <li class="mb-1">
                            <a class="has-text-white has-text-weight-light" href="#"> 
                                <span> <i class="fa-brands fa-twitter"></i></span>
                                <span class="footer-link-text">Twitter</span>
                            </a>
                        </li>
                        <li class="mb-1">
                            <a class="has-text-white has-text-weight-light" href="#"> 
                                <span><i class="fa-brands fa-instagram"></i></span>
                                <span class="footer-link-text">Instagram</span>
                            </a>
                        </li>
                    </ul>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>

<style>
    .footer {
        /* background: linear-gradient(to bottom,rgba(54, 68, 32, 1) 0%, rgba(47, 61, 28, 1) 50%, rgba(40, 54, 24, 1) 100%); */
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/footerImage2.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-top: 1.5px solid #fefae0;
        border-bottom: 1.5px solid #fefae0;
        padding: 0.75rem 1rem;
    }

    #brandFooter {
        color: hsl(52deg, 93.75%, 93.73%);
    }

    h4.bd-footer-title {
        color:#DDA15E;
    }

    #footerColumn1,#footerColumn2,#footerColumn3 li a {
        font-size: 0.85rem;
    }

    #footerColumn1 a:hover,
    #footerColumn2 a:hover {
        text-decoration: underline;
    }

    .footer a:hover .footer-link-text {
        text-decoration: underline;
        text-underline-offset: 2px;
    }
</style>