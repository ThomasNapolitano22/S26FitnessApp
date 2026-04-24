<template>
    <div class="box exercise-card is-flex is-flex-direction-column">

        <div class="is-flex is-align-items-center mb-3 pb-3 exercise-author-row">
            <figure class="image is-32x32 mr-3 mb-0 exercise-author-avatar-wrap"
                    v-if="authorIconIsUrl">
                <img :src="activity.authorIcon ?? ''" class="is-rounded profile-img-card">
            </figure>
            <span v-else class="mr-3" style="font-size: 1.5rem;">
                {{ activity.authorIcon || '🏃' }}
            </span>
            <span class="has-text-weight-bold exercise-author-name">
                {{ activity.authorName || 'Unknown User' }}
            </span>
        </div>

        <div class="card-header-wrapper mb-2">
            <div>
                <h4 class="title is-4 exercise-title mb-0">{{ activity.title }}</h4>
                <h3 class="title is-6 has-text-black mb-0">On {{ activity.date }}</h3>
            </div>
            <button
                v-if="isOwn"
                class="button is-danger is-small is-outlined delete-btn"
                @click="handleDelete"
                :class="{ 'is-loading': deleting }"
                title="Delete Exercise"
            >
                <span class="icon is-small"><i class="fa-solid fa-trash"></i></span>
            </button>
        </div>

        <div class="mb-3">
            <span class="tag is-rounded category-tag mr-2">
                <i class="fa-solid fa-fire mr-1" v-if="activity.category === 'Cardio'"></i>
                <i class="fa-solid fa-dumbbell mr-1" v-if="activity.category === 'Strength'"></i>
                <i class="fa-solid fa-spa mr-1" v-if="activity.category === 'Yoga'"></i>
                {{ activity.exerciseTypeName || activity.category || 'Uncategorized' }}
            </span>

            <span class="tag is-rounded is-light is-info">
                <i class="fa-regular fa-clock mr-1"></i> {{ activity.durationMinutes }} Minutes
            </span>

            <span class="tag is-rounded is-light is-danger" v-if="activity.calories != null">
                <i class="fa-solid fa-fire-flame-curved mr-1"></i> {{ activity.calories }} Calories
            </span>

            <span class="tag is-rounded is-light is-success" v-if="activity.distanceMiles != null">
                <i class="fa-solid fa-road mr-1"></i> {{ activity.distanceMiles }} Miles
            </span>
        </div>

        <p class="mb-4" v-if="activity.location">
            <span class="icon has-text-primary is-small mr-1">
                <i class="fa-solid fa-location-dot has-text-black"></i>
            </span>
            <strong class="has-text-black">Location:</strong> {{ activity.location }}
        </p>

        <p class="exercise-description mt-auto" v-if="activity.description">
            {{ activity.description }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue'
    import { useActivityStore } from '@/stores/activity'
    import { useAuthStore } from '@/stores/auth'
    import type { Activity } from '@/types'

    const props = defineProps<{
        activity: Activity
    }>()

    const emit = defineEmits<{ (e: 'deleted'): void }>()

    const activityStore = useActivityStore()
    const authStore = useAuthStore()
    const deleting = ref(false)

    const isOwn = computed(() => authStore.currentUser?.id === props.activity.userId)
    const authorIconIsUrl = computed(
        () => !!props.activity.authorIcon && /^https?:\/\//.test(props.activity.authorIcon),
    )

    async function handleDelete() {
        if (!isOwn.value) return
        deleting.value = true
        try {
            await activityStore.deleteActivity(props.activity.id)
            emit('deleted')
        } catch (e) {
            alert((e as Error).message)
        } finally {
            deleting.value = false
        }
    }
</script>

<style scoped>
    .exercise-card {
        background-color: #fefae0;
        border: 2px solid #BC6C25;
        height: 100%;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .exercise-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        border-color: #DDA15E;
    }
    .card-header-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .delete-btn {
        border-radius: 6px;
        transition: background-color 0.2s ease, color 0.2s ease;
    }
    .delete-btn:hover {
        background-color: #f14668;
        color: white;
    }
    .exercise-title {
        color: #283618;
    }
    .exercise-author-row {
        border-bottom: 1px solid rgba(188, 108, 37, 0.3);
    }
    .exercise-author-avatar-wrap {
        flex-shrink: 0;
    }
    .exercise-author-name {
        color: #283618;
    }
    .category-tag {
        background-color: #DDA15E;
        color: #fefae0;
        font-weight: bold;
    }
    .exercise-description {
        color: #283618;
        border-top: 1px solid rgba(188, 108, 37, 0.3);
        padding-top: 1rem;
        font-style: italic;
    }
</style>
