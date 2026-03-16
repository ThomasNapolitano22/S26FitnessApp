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
    duration: string
    calories: string
    distance?: string
}

export const useActivityStore = defineStore('activity', () => {
    const exercises = ref<Exercise[]>([
    {
      id: 1,
      userId: 2, 
      title: 'Morning Park Jog',
      description: 'A brisk run through the city park to wake up. The weather was perfect!',
      category: 'Cardio',
      date: '2026-03-14',
      location: 'Central Park',
      duration: '30',
      calories: '200',
      distance: '3'
    },
    {
      id: 2,
      userId: 3, 
      title: 'Chasing the Mailman',
      description: 'Sprinted around the yard for a good 15 minutes. Best workout ever. Bark!',
      category: 'Cardio',
      date: '2026-03-15',
      location: 'Front Yard',
      duration: '15',
      calories: '150'
    },
    {
      id: 3,
      userId: 1, 
      title: 'Dumbbell Circuit',
      description: 'Got a quick strength session in before heading out for the day.',
      category: 'Strength',
      date: '2026-03-15',
      location: 'Home Gym',
      duration: '45',
      calories: '350'  
    }
    ])



    let nextId = 4
    
    function addExercise(exerciseData: Omit<Exercise, 'id'>) {
        exercises.value.push({ ...exerciseData, id: nextId++ })
    }

    function deleteExercise(id: number) {
    exercises.value = exercises.value.filter(exercise => exercise.id !== id)
  }



    return { exercises, addExercise, deleteExercise }
})