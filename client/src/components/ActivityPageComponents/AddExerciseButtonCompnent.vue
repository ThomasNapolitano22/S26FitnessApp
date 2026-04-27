<template>
    <div class="box has-text-centered column is-one-third p-5 is-centered" id="buttonBox">
        <button class="button is-medium is-primary" @click="openModal">Add New Exercise!</button>
    </div>

    <Modal :modal-active="isModalActive" @close="toggleModal">
        <div class="content">
            <div class="notification" id="modalBanner">
                <h1 class="title has-text-primary"><b>Add A New Exercise!</b></h1>
            </div>

            <form @submit.prevent="submit">
                <div class="field">
                    <label class="exerciseTitle">Title of Exercise</label>
                    <div class="control mt-2">
                        <input class="input" type="text" placeholder="Enter Exercise..."
                               v-model="form.title" required>
                    </div>
                </div>

                <div class="field">
                    <label class="exerciseTitle">Description of Exercise</label>
                    <div class="control mt-2">
                        <textarea class="textarea" placeholder="Enter Description..."
                                  v-model="form.description"></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control is-expanded">
                        <label class="exerciseTitle">Duration (minutes)</label>
                        <input class="input mt-2" type="number" min="1"
                               placeholder="e.g. 30" v-model.number="form.durationMinutes" required>
                    </div>
                    <div class="control is-expanded">
                        <label class="exerciseTitle">Calories Burned</label>
                        <input class="input mt-2" type="number" min="0"
                               placeholder="e.g. 300" v-model.number="form.calories">
                    </div>
                </div>

                <div class="field">
                    <label class="exerciseTitle">Exercise Type</label>
                    <div class="control mt-2">
                        <div class="select is-fullwidth">
                            <select v-model="form.exerciseTypeId" required>
                                <option disabled value="">Select a type...</option>
                                <optgroup
                                    v-for="cat in categorized"
                                    :key="cat.category"
                                    :label="cat.category"
                                >
                                    <option
                                        v-for="t in cat.types"
                                        :key="t.id"
                                        :value="t.id"
                                    >
                                        {{ t.name }}
                                    </option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field" v-if="selectedTracksDistance">
                    <label class="exerciseTitle">Distance (miles)</label>
                    <div class="control mt-2">
                        <input class="input" type="number" min="0" step="0.01"
                               placeholder="e.g. 3.1" v-model.number="form.distanceMiles">
                    </div>
                </div>

                <div class="field">
                    <label class="exerciseTitle">Date of Exercise</label>
                    <div class="control mt-2">
                        <input class="input" type="date" v-model="form.date" required>
                    </div>
                </div>

                <div class="field">
                    <label class="location">Location</label>
                    <div class="control mt-2">
                        <input class="input" type="text" placeholder="Enter Location..."
                               v-model="form.location">
                    </div>
                </div>

                <hr />

                <div v-if="submitError" class="notification is-danger">{{ submitError }}</div>

                <div class="field mt-5">
                    <button class="button is-primary" type="submit"
                            :class="{ 'is-loading': submitting }"
                            :disabled="!authStore.currentUser">
                        <span class="icon" id="addExerciseIcon">
                            <i class="fa-solid fa-plus"></i>
                        </span>
                        <span>Add Exercise!</span>
                    </button>
                </div>
            </form>
        </div>
    </Modal>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, onMounted } from 'vue'
    import Modal from '@/components/ModalComponent.vue'
    import { useAuthStore } from '@/stores/auth'
    import { useActivityStore } from '@/stores/activity'
    import { useExerciseTypesStore } from '@/stores/exerciseTypes'

    const emit = defineEmits<{ (e: 'created'): void }>()

    const authStore = useAuthStore()
    const activityStore = useActivityStore()
    const typesStore = useExerciseTypesStore()

    const isModalActive = ref(false)
    const submitting = ref(false)
    const submitError = ref('')

    const form = reactive({
        title: '',
        description: '',
        exerciseTypeId: '',
        date: '',
        location: '',
        durationMinutes: 0 as number | null,
        calories: null as number | null,
        distanceMiles: null as number | null,
    })

    const categorized = computed(() => {
        const groups: Record<string, typeof typesStore.types> = {}
        for (const t of typesStore.types) {
            const list = groups[t.category] ?? (groups[t.category] = [])
            list.push(t)
        }
        return Object.entries(groups).map(([category, types]) => ({ category, types }))
    })

    const selectedTracksDistance = computed(() => {
        const t = typesStore.types.find((x) => x.id === form.exerciseTypeId)
        return !!t?.tracksDistance
    })

    onMounted(() => {
        if (typesStore.types.length === 0) typesStore.fetchAll()
    })

    function openModal() {
        submitError.value = ''
        isModalActive.value = true
        typesStore.fetchAll()
    }

    function toggleModal() {
        isModalActive.value = !isModalActive.value
    }

    async function submit() {
        if (!authStore.currentUser) return
        submitError.value = ''
        submitting.value = true
        try {
            await activityStore.createActivity({
                exerciseTypeId: form.exerciseTypeId,
                title: form.title,
                description: form.description || undefined,
                date: form.date,
                location: form.location || undefined,
                durationMinutes: Number(form.durationMinutes || 0),
                calories: form.calories ?? undefined,
                distanceMiles: selectedTracksDistance.value ? form.distanceMiles : null,
            })

            form.title = ''
            form.description = ''
            form.exerciseTypeId = ''
            form.date = ''
            form.location = ''
            form.durationMinutes = 0
            form.calories = null
            form.distanceMiles = null

            isModalActive.value = false
            emit('created')
        } catch (e) {
            submitError.value = (e as Error).message
        } finally {
            submitting.value = false
        }
    }
</script>

<style scoped>
    #buttonBox {
        background-color: #BC6C25;
    }
    #modalBanner {
        background-color: #BC6C25;
        height: 80px;
    }
</style>
