<template>
    <div class="section" v-if="authStore.isLoggedIn">
        <div class="box" id="headerBox">
            <h1 class="title is-spaced has-text-primary has-text-centered">Your Friends' Activity!</h1>
            <h2 class="subtitle has-text-centered has-text-primary">
                See what everyone is up to!
            </h2>
        </div>
        <hr class="has-background-white" id="lineBreak" />

        <div class="container mt-5" v-if="friendsStore.incomingRequests.length > 0">
            <div class="box">
                <h3 class="title is-5">
                    <i class="fa-solid fa-user-plus mr-2"></i>
                    Pending Friend Requests
                </h3>
                <div v-for="req in friendsStore.incomingRequests" :key="req.id"
                     class="is-flex is-align-items-center mb-2">
                    <strong class="mr-3">{{ req.friend.name }}</strong>
                    <span class="has-text-grey mr-auto">@{{ req.friend.username }}</span>
                    <button class="button is-small is-success mr-2"
                            @click="respond(req.id, 'accept')">
                        Accept
                    </button>
                    <button class="button is-small is-danger is-outlined"
                            @click="respond(req.id, 'decline')">
                        Decline
                    </button>
                </div>
            </div>
        </div>

        <div class="container mt-5">
            <div v-if="activityStore.error" class="notification is-danger">
                {{ activityStore.error }}
            </div>

            <div class="has-text-centered has-text-white mb-3"
                 v-if="activityStore.feedTotal > 0">
                Showing {{ activityStore.feed.length }} of {{ activityStore.feedTotal }}
            </div>

            <div class="columns is-multiline">
                <div class="column is-one-third"
                     v-for="activity in activityStore.feed"
                     :key="activity.id">
                    <ExerciseCard :activity="activity" />
                </div>

                <template v-if="activityStore.isLoading">
                    <div class="column is-one-third" v-for="n in 3" :key="`skeleton-${n}`">
                        <div class="box">
                            <div class="skeleton-lines">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="notification is-warning has-text-centered mt-4"
                 v-if="!activityStore.isLoading && activityStore.feed.length === 0">
                Add a friend from the Search Users page — then their activities will
                show up here alongside yours!
            </div>

            <div class="has-text-centered has-text-white mt-4"
                 v-if="activityStore.feedDone && activityStore.feed.length > 0">
                You're all caught up!
            </div>
        </div>
    </div>

    <div v-else class="section" id="notLoggedIn">
        <div class="notification is-warning has-text-centered mx-auto" style="max-width: 600px;">
            <strong>You must be logged in to view this page.</strong>
            Please log in to see your friends' activities and connect with them!
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import { useInfiniteScroll } from '@vueuse/core'
    import ExerciseCard from '@/components/ActivityPageComponents/ExerciseCardComponent.vue'
    import { useActivityStore } from '@/stores/activity'
    import { useAuthStore } from '@/stores/auth'
    import { useFriendsStore } from '@/stores/friends'

    const activityStore = useActivityStore()
    const authStore = useAuthStore()
    const friendsStore = useFriendsStore()

    useInfiniteScroll(
        window,
        () => activityStore.fetchNextFeedPage(),
        {
            distance: 200,
            canLoadMore: () => !activityStore.feedDone && !activityStore.isLoading,
        },
    )

    async function respond(id: string, action: 'accept' | 'decline') {
        if (action === 'accept') await friendsStore.accept(id)
        else await friendsStore.decline(id)
        activityStore.resetFeed()
        await activityStore.fetchNextFeedPage()
    }

    onMounted(async () => {
        if (authStore.isLoggedIn) {
            activityStore.resetFeed()
            await Promise.all([
                activityStore.fetchNextFeedPage(),
                friendsStore.fetchRequests(),
            ])
        }
    })
</script>

<style scoped>
    #headerBox {
        background-color: #DDA15E;
    }
    #notLoggedIn {
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
