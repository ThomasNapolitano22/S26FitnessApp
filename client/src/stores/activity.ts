import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Exercise {
    id: number
    userId: number
    title: string
    description: string
    category: string
    date: string
    location: string
}

export const useActivityStore = defineStore('activity', () => {
    const exercises = ref<Exercise[]>([])
    let nextId = 1
    
    function addExercise(exerciseData: Omit<Exercise, 'id'>) {
        exercises.value.push({ ...exerciseData, id: nextId++ })
    }

    function deleteExercise(id: number) {
    exercises.value = exercises.value.filter(exercise => exercise.id !== id)
  }



    return { exercises, addExercise, deleteExercise }
})