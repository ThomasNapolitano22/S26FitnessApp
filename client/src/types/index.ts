export interface DataEnvelope<T> {
    data: T
    isSuccess: boolean
    message?: string
}

export interface DataListEnvelope<T> extends DataEnvelope<T[]> {
    total: number
}

export interface User {
    id: string
    name: string
    username: string
    email: string
    isAdmin: boolean
    icon: string | null
}

export interface ExerciseType {
    id: string
    name: string
    category: string
    tracksDistance: boolean
}

export interface Activity {
    id: string
    userId: string
    exerciseTypeId: string
    title: string
    description: string | null
    date: string
    location: string | null
    durationMinutes: number
    calories: number | null
    distanceMiles: number | null
    exerciseTypeName?: string
    category?: string
    authorName?: string
    authorUsername?: string
    authorIcon?: string | null
}

export type FriendStatus = 'pending' | 'accepted' | 'declined'

export interface Friend {
    id: string
    requesterId: string
    addresseeId: string
    status: FriendStatus
    friend: User
}

export interface ActivityStats {
    period: 'today' | 'week' | 'alltime'
    totalActivities: number
    totalDurationMinutes: number
    totalCalories: number
    totalDistanceMiles: number
    avgDurationMinutes: number
}
