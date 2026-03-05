<template>
    <div class="section" id="symbolsAndText">
        <div class="container">
            <div class="columns">
                <div class="column is-one-third">
                    <div class="has-text-centered">
                        <div class="mb-5">
                            <i class="fa-solid fa-tree gifSymbols" id="treeSymbol"></i>
                        </div>
                        <div class="pt-5">
                            <i class="fa-solid fa-person-hiking gifSymbols" id="hikingSymbol"></i>
                        </div>
                    </div>
                </div>

                <div class="column is-one-third" id="columnHero">
                    <section class="hero is-halfheight">
                        <div class="hero-head has-text-centered title is-1" id="heroheader">
                            <h2> <span id="discoverWord">Discover</span></h2>
                        </div>
                        <div class="hero-body has-text-centered title is-1">
                            <div class="container">
                                <h2><span id="fitnessWord">Fitness</span></h2>
                            </div>
                        </div>
                        <div class="hero-footer has-text-centered title is-1">
                            <h2 id="footerWord"> In A Whole New Way </h2>
                        </div>
                    </section>
                </div>

                <div class="column is-one-third">
                    <div class="has-text-centered">
                        <div class="mb-5">
                            <i class="fa-solid fa-cloud-sun gifSymbols" id="cloudSunSymbol"></i>
                        </div>
                        <div class="pt-5">
                        <i class="fa-solid fa-heart gifSymbols" id="heartSymbol"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="backgroundForTwoSections">
        <section class="section" id="fourLogoInfo">
            <div class="container">
                <div class="columns is-centered is-variable is-8">
                    <div class="column is-one-fourth has-text-centered">
                        <div class="iconBlob mb-4">
                            <span class="icon is-large has-text-white">
                                <i class="fa-solid fa-person-running fa-3x"></i>
                            </span>
                        </div>
                        <h3 class="title is-4 has-text-white">Keep Track Of All Your Runs</h3>
                        <div class="blobParagraph">
                            <h4> Lorem ipsum dolor sit amet consectetur adipisicing elit. In saepe neque ducimus amet eos adipisci quam, veritatis exercitationem quidem, cupiditate, officiis ullam iure dolore et quasi blanditiis placeat ut expedita. </h4>
                        </div>
                    </div>

                    <div class="column is-one-fourth has-text-centered">
                        <div class="iconBlob mb-4">
                            <span class="icon is-large has-text-white">
                                <i class="fa-solid fa-dumbbell fa-3x"></i>
                            </span>
                        </div>
                        <h3 class="title is-4 has-text-white">Record Your Strength Milestones</h3>
                        <div class="blobParagraph">
                            <h4> Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet necessitatibus voluptates similique quaerat ut ab tenetur perferendis iure inventore placeat officiis quam voluptatum cum beatae tempore omnis, est excepturi iste! </h4>
                        </div>
                    </div>

                    <div class="column is-one-fourth has-text-centered">
                        <div class="iconBlob mb-4">
                            <span class="icon is-large has-text-white">
                                <i class="fa-solid fa-fire-flame-curved fa-3x"></i>
                            </span>
                        </div>
                        <h3 class="title is-4 has-text-white">Measure Your Calories Burned</h3>
                        <div class="blobParagraph">
                            <h4> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo tempore magnam, vitae vel expedita minima distinctio quam? Itaque autem adipisci non quibusdam quia omnis blanditiis sit quo architecto, consequuntur veritatis. </h4>
                        </div>
                    </div>

                    <div class="column is-one-fourth has-text-centered">
                        <div class="iconBlob mb-4">
                            <span class="icon is-large has-text-white">
                                <i class="fa-solid fa-ranking-star fa-3x"></i>
                            </span>
                        </div>
                        <h3 class="title is-4 has-text-white">Challenge And Compete With Your Friends</h3>
                        <div class="blobParagraph">
                            <h4> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo illum labore expedita repellat rerum eos tempora sed perferendis tempore ratione, non illo et consectetur architecto accusantium perspiciatis impedit. Repellat, quasi. </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="testimonial">
            <div class="container">
                <h2 class="section-title" id="testimonialTitle">Hear From Some Of Our Members...</h2>
            </div>

            <div class="testimonial-grid container">
                <div class="testimonial-card">
                    <span class="quote-icon top-quote">&ldquo;</span>
                        <img src="/images/aiony-haust-3TLl_97HNJo-unsplash.jpg" alt="Member Profile" class="profile-img">
                            <blockquote>
                                I can't live without it!
                            </blockquote>
                        <p class="member-name">- Sarah J.</p>
                        <span class="quote-icon bottom-quote">&rdquo;</span>
                </div>

                <div class="testimonial-card">
                    <span class="quote-icon top-quote">&ldquo;</span>
                        <img src="/images/ian-dooley-d1UPkiFd04A-unsplash.jpg" alt="Member Profile" class="profile-img">
                            <blockquote>
                                This app makes it so easy to track all of my outdoor runs!
                            </blockquote>
                        <p class="member-name">- Mike D.</p>
                    <span class="quote-icon bottom-quote">&rdquo;</span>
                </div>

                <div class="testimonial-card">
                    <span class="quote-icon top-quote">&ldquo;</span>
                        <img src="/images/richard-brutyo-Sg3XwuEpybU-unsplash.jpg" alt="Member Profile" class="profile-img">
                            <blockquote>
                                Woof Woof! Bark!
                            </blockquote>
                        <p class="member-name">- Pluto</p>
                    <span class="quote-icon bottom-quote">&rdquo;</span>
                </div>
            </div>
        </section>
    </div>

    <section class="section has-text-centered" id="threeCardsSection">
        <h2 class="section-title" id="threeCardsTitle">Explore More Possibilites Within Our Community...</h2>
        <div class="columns is-centered">
            <div class="column is-one-third has-text-centered">
                <div class="box p-3" style="overflow: hidden; border: 2px solid #BC6C25; background-color: rgba(0,0,0,0,0.5);">
                        <figure class="image is-16by9">
                            <img src="/images/yoga.jpg" alt="Runner Image" style="object-fit: cover; border-radius: 8px; border: 2px solid hsl(52deg, 93.75%, 93.73%)">
                        </figure>
                        <div class="p-5">
                            <h3 class="title is-4">Yoga: A Guide to Meditation and Stress-Busting</h3>
                            <p class="block">
                                Join the Nature Runner community in exploring their inner selves, and learn how to transform everyday stress into peaceful, welcoming thoughts
                            </p>
                            <a href="#" class="button is-primary">
                               Explore Now
                            </a>
                        </div>
                </div>
            </div>

            <div class="column is-one-third has-text-centered">
                <div class="box p-3" style="overflow: hidden; border: 2px solid #BC6C25;">
                        <figure class="image is-16by9">
                            <img src="/images/twoPeopleOnEquipment.jpg" alt="Runner Image" style="object-fit: cover; border-radius: 8px; border: 2px solid hsl(52deg, 93.75%, 93.73%)">
                        </figure>
                        <div class="p-5">
                            <h3 class="title is-4">Inside the Gym: Nature Runners Take on Indoor Fitness</h3>
                            <p class="block">
                                Learn alongside other Nature Runners on how to feel the warthm of the outdoors even while working out inside.
                            </p>
                            <a href="#" class="button is-primary">
                                Explore Now
                            </a>
                        </div>
                </div>
            </div>

            <div class="column is-one-third has-text-centered">
                <div class="box p-3" style="overflow: hidden; border: 2px solid #BC6C25;">
                        <figure class="image is-16by9">
                            <img src="/images/groupOutside.jpg" alt="Runner Image" style="object-fit: cover; border-radius: 8px; border: 2px solid hsl(52deg, 93.75%, 93.73%);">
                        </figure>
                        <div class="p-5">
                            <h3 class="title is-4">Gatherings: Nature Runners Meet-Up </h3>
                            <p class="block">
                                RSVP now to reserve your spot in one of our Nature Runner gatherings at your local park. We will go over easy fitness habits to get into while practicing some beginner streches and exercises.
                            </p>
                            <a href="#" class="button is-primary">
                                Explore Now
                            </a>
                        </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style>
    #fourLogoInfo {
        border-top: 1.5px solid #fefae0;
        border-bottom: 1.5px solid #fefae0;
        /* background: #162B19; */
        /* background: linear-gradient(to bottom, rgba(22, 43, 25, 1) 10%, rgba(14, 43, 23, 1) 30%, rgba(7, 24, 15, 1) 60%, rgba(2, 11, 5, 1) 100%); */
        padding: 3rem 0;
    }

    .blobParagraph {
        color:#fefae0;
    }

    #backgroundForTwoSections {
        background: linear-gradient(to bottom, rgba(22, 43, 25, 1) 10%, rgba(14, 43, 23, 1) 30%, rgba(7, 24, 15, 1) 60%, rgba(2, 11, 5, 1) 100%);
        padding: 0;
        margin: 0;
        width: 100vw;
    }

    #testimonial {
        background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('images/victor-freitas-hOuJYX2K5DA-unsplash.jpg');
        color:hsl(52deg, 93.75%, 93.73%);
        padding: 60px 0;
        text-align: center;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    #testimonialTitle {
        font-size: 2.5rem;
        margin-bottom: 50px;
        font-weight: 700;
        border: solid #fefae0;
        border-radius: 25px;
        padding: 10px 50px;
        background-color: #DDA15E;
        display: inline-block;
    }

    .testimonial-grid {
        display: flex;
        justify-content: center; 
        gap: 30px; 
        flex-wrap: wrap; 
    }

    .testimonial-card {
        background-color: #BC6C25; 
        border: 2px solid #ffffff;
        border-radius: 20px;
        padding: 40px 30px;
        position: relative; 
        flex: 1 1 300px; 
        max-width: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-img {
        width: 100px;
        height: 100px;
        border-radius: 50%; 
        object-fit: cover;
        border: 3px solid #ffffff;
        margin-bottom: 25px;
        background-color: #cc5544; 
    }

    .testimonial-card blockquote {
        font-size: 1.1rem;
        line-height: 1.6;
        font-style: italic;
        margin: 0 0 20px 0;
    }

    .member-name {
        font-weight: bold;
        margin: 20;
    }

    .quote-icon {
        position: absolute;
        font-size: 5rem;
        line-height: 1;
        color: hsl(52deg, 93.75%, 93.73%);
        padding: 0 10px;
    }

    .top-quote {
        top: 125px; 
        left: 1px;
    }

    .bottom-quote {
        bottom: 20px; 
        right: 20px;
    }

    .gifSymbols {
        font-size: 200px;
        display: inline-block;
    }

    #symbolsAndText {
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/heroBackground.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-top: 1.5px solid #fefae0;
    }

    #heartSymbol {
        /* background: url('') center center no-repeat; */
        background-size: cover;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-stroke: 6px #fefae0; 
    }

    #treeSymbol {
        /* background: url('') center center no-repeat; */
        background-size: cover;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-stroke: 6px #fefae0; 
    }

    #hikingSymbol {
        /* background: url('') center center no-repeat; */
        background-size: cover;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-stroke: 6px #fefae0; 
    }

    #cloudSunSymbol {
        /* background: url('') center center no-repeat; */
        background-size: cover;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-stroke: 6px #fefae0; 
    }

    #discoverWord, #footerWord {
        font-family: "Space Mono", monospace; 
        text-transform: uppercase;          
        letter-spacing: 3px;                  
        font-size: 1.2rem;
        font-weight: 700;
        font-size: 60px;
        text-decoration: underline wavy #DDA15E 6px;
        text-underline-offset: 10px;
        color: #fefae0;
        font-style: italic;
    }

    #fitnessWord {
        font-family: "Space Mono", monospace;
        font-weight: 700;
        text-shadow: 0 -6.25px #EECE9F, 0 -12.5px #DDA15E, 0 6.25px #CD8742,
        0 12.5px #BC6C25;
        color: #fefae0;
        font-size: 75px;
        letter-spacing: 2px;
        font-style: italic;
    }

    #threeCardsSection {
        border-top: 1.5px solid #fefae0;
        /* background: linear-gradient(to bottom, rgba(22, 43, 25, 1) 10%, rgba(14, 43, 23, 1) 30%, rgba(7, 24, 15, 1) 60%, rgba(2, 11, 5, 1) 100%); */
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('images/threeCardsBackground.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    #threeCardsTitle {
        color: #fefae0;
        font-size: 2.5rem;
        margin-bottom: 50px;
        font-weight: 700;
        border: solid #fefae0;
        border-radius: 25px;
        padding: 10px 50px;
        background-color: #DDA15E;
        display: inline-block;
    }
</style>