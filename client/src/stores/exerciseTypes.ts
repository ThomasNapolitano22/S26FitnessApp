import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../services/myFetch'
import type {
    DataEnvelope,
    DataListEnvelope,
    ExerciseType,
} from '../types'

export const useExerciseTypesStore = defineStore('exerciseTypes', () => {
    const types = ref<ExerciseType[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    async function fetchAll(): Promise<void> {
        isLoading.value = true
        error.value = null
        try {
            const res = await api<DataListEnvelope<ExerciseType>>('exercise-types')
            types.value = res.data
        } catch (e) {
            error.value = (e as Error).message
        } finally {
            isLoading.value = false
        }
    }

    async function create(input: {
        name: string
        category: string
        tracksDistance: boolean
    }): Promise<void> {
        const res = await api<DataEnvelope<ExerciseType>>('exercise-types', {
            method: 'POST',
            body: input,
        })
        types.value = [...types.value, res.data]
    }

    async function update(
        id: string,
        patch: Partial<ExerciseType>,
    ): Promise<void> {
        const res = await api<DataEnvelope<ExerciseType>>(`exercise-types/${id}`, {
            method: 'PATCH',
            body: patch,
        })
        const idx = types.value.findIndex((t) => t.id === id)
        if (idx >= 0) types.value[idx] = res.data
    }

    async function remove(id: string): Promise<void> {
        await api<DataEnvelope<ExerciseType>>(`exercise-types/${id}`, {
            method: 'DELETE',
        })
        types.value = types.value.filter((t) => t.id !== id)
    }

    return { types, isLoading, error, fetchAll, create, update, remove }
})
