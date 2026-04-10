export { DataEnvelope, DataListEnvelope } from "./dataEnvelopes"

export interface User {
    id: number
    name: string
    username: string
    email: string
    password: string
    isAdmin: boolean
    icon: string
}

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