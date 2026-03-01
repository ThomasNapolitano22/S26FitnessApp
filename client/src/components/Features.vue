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

<script>
</script>