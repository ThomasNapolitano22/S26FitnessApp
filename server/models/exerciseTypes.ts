import { connect, dbError } from "./database"
import type { ExerciseType } from "../types"

const TABLE = "exercise_types"

function rowTo(t: any): ExerciseType {
    return {
        id: t.id,
        name: t.name,
        category: t.category,
        tracksDistance: t.tracks_distance,
    }
}

export async function getAll(): Promise<ExerciseType[]> {
    const db = connect()
    const { data, error } = await db.from(TABLE).select("*").order("name")
    if (error) throw dbError(error.message)
    return (data || []).map(rowTo)
}

export async function get(id: string): Promise<ExerciseType> {
    const db = connect()
    const { data, error } = await db.from(TABLE).select("*").eq("id", id).maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Exercise type not found", 404)
    return rowTo(data)
}
export async function getByCategory(category: string): Promise<ExerciseType[]> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .select("*")
        .eq("category", category)
        .order("name")
    if (error) throw dbError(error.message)
    return (data || []).map(rowTo)
}

export async function create(input: {
    name: string
    category: string
    tracksDistance?: boolean
}): Promise<ExerciseType> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .insert({
            name: input.name,
            category: input.category,
            tracks_distance: input.tracksDistance ?? false,
        })
        .select("*")
        .single()
    if (error) throw dbError(error.message)
    return rowTo(data)
}

export async function update(
    id: string,
    patch: Partial<{ name: string; category: string; tracksDistance: boolean }>,
): Promise<ExerciseType> {
    const db = connect()
    const update: Record<string, unknown> = {}
    if (patch.name !== undefined) update.name = patch.name
    if (patch.category !== undefined) update.category = patch.category
    if (patch.tracksDistance !== undefined) update.tracks_distance = patch.tracksDistance

    if (Object.keys(update).length === 0) throw dbError("No fields to update", 400)

    const { data, error } = await db
        .from(TABLE)
        .update(update)
        .eq("id", id)
        .select("*")
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Exercise type not found", 404)
    return rowTo(data)
}

export async function remove(id: string): Promise<ExerciseType> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .delete()
        .eq("id", id)
        .select("*")
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Exercise type not found", 404)
    return rowTo(data)
}
