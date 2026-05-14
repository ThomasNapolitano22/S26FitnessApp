import { connect, dbError } from "./database"
import type {
    Activity,
    ActivityWithDetails,
    ActivityStats,
} from "../types"

const TABLE = "activities"

function rowTo(r: any): Activity {
    return {
        id: r.id,
        userId: r.user_id,
        exerciseTypeId: r.exercise_type_id,
        title: r.title,
        description: r.description,
        date: r.date,
        location: r.location,
        durationMinutes: r.duration_minutes,
        calories: r.calories,
        distanceMiles: r.distance_miles != null ? Number(r.distance_miles) : null,
    }
}

function rowToWithDetails(r: any): ActivityWithDetails {
    return {
        ...rowTo(r),
        exerciseTypeName: r.exercise_types?.name,
        category: r.exercise_types?.category,
        authorName: r.users?.name,
        authorUsername: r.users?.username,
        authorIcon: r.users?.icon,
    }
}
const SELECT_WITH_DETAILS =
    "*, exercise_types ( name, category, tracks_distance ), users ( name, username, icon )"

export async function getByUser(userId: string): Promise<ActivityWithDetails[]> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .select(SELECT_WITH_DETAILS)
        .eq("user_id", userId)
        .order("date", { ascending: false })
    if (error) throw dbError(error.message)
    return (data || []).map(rowToWithDetails)
}
export async function getFeed(
    userId: string,
    page: number,
    pageSize: number,
): Promise<{ rows: ActivityWithDetails[]; total: number }> {
    const db = connect()

    const { data: friendRows, error: friendErr } = await db
        .from("friends")
        .select("requester_id, addressee_id, status")
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq("status", "accepted")
    if (friendErr) throw dbError(friendErr.message)

    const friendIds = new Set<string>()
    for (const row of friendRows || []) {
        const other = row.requester_id === userId ? row.addressee_id : row.requester_id
        friendIds.add(other)
    }

    const visibleIds = [userId, ...friendIds]

    const start = (page - 1) * pageSize
    const end = start + pageSize - 1

    const { data, error, count } = await db
        .from(TABLE)
        .select(SELECT_WITH_DETAILS, { count: "exact" })
        .in("user_id", visibleIds)
        .order("date", { ascending: false })
        .range(start, end)
    if (error) throw dbError(error.message)

    return {
        rows: (data || []).map(rowToWithDetails),
        total: count || 0,
    }
}

export async function get(id: string): Promise<ActivityWithDetails> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .select(SELECT_WITH_DETAILS)
        .eq("id", id)
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Activity not found", 404)
    return rowToWithDetails(data)
}

export async function create(input: {
    userId: string
    exerciseTypeId: string
    title: string
    description?: string | null
    date: string
    location?: string | null
    durationMinutes: number
    calories?: number | null
    distanceMiles?: number | null
}): Promise<Activity> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .insert({
            user_id: input.userId,
            exercise_type_id: input.exerciseTypeId,
            title: input.title,
            description: input.description ?? null,
            date: input.date,
            location: input.location ?? null,
            duration_minutes: input.durationMinutes,
            calories: input.calories ?? null,
            distance_miles: input.distanceMiles ?? null,
        })
        .select("*")
        .single()
    if (error) throw dbError(error.message)
    return rowTo(data)
}

export async function update(
    id: string,
    patch: Partial<{
        exerciseTypeId: string
        title: string
        description: string | null
        date: string
        location: string | null
        durationMinutes: number
        calories: number | null
        distanceMiles: number | null
    }>,
): Promise<Activity> {
    const db = connect()
    const update: Record<string, unknown> = {}
    if (patch.exerciseTypeId !== undefined) update.exercise_type_id = patch.exerciseTypeId
    if (patch.title !== undefined) update.title = patch.title
    if (patch.description !== undefined) update.description = patch.description
    if (patch.date !== undefined) update.date = patch.date
    if (patch.location !== undefined) update.location = patch.location
    if (patch.durationMinutes !== undefined) update.duration_minutes = patch.durationMinutes
    if (patch.calories !== undefined) update.calories = patch.calories
    if (patch.distanceMiles !== undefined) update.distance_miles = patch.distanceMiles

    if (Object.keys(update).length === 0) throw dbError("No fields to update", 400)

    const { data, error } = await db
        .from(TABLE)
        .update(update)
        .eq("id", id)
        .select("*")
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Activity not found", 404)
    return rowTo(data)
}

export async function remove(id: string): Promise<Activity> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .delete()
        .eq("id", id)
        .select("*")
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Activity not found", 404)
    return rowTo(data)
}
export async function getStats(
    userId: string,
    period: "today" | "week" | "alltime",
): Promise<ActivityStats> {
    const db = connect()
    let query = db
        .from(TABLE)
        .select("duration_minutes, calories, distance_miles")
        .eq("user_id", userId)

    if (period === "today") {
        const today = new Date().toISOString().slice(0, 10)
        query = query.eq("date", today)
    } else if (period === "week") {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        query = query.gte("date", sevenDaysAgo.toISOString().slice(0, 10))
    }

    const { data, error } = await query
    if (error) throw dbError(error.message)

    const rows = data || []
    const totalActivities = rows.length
    const totalDurationMinutes = rows.reduce(
        (sum: number, r: any) => sum + (r.duration_minutes || 0),
        0,
    )
    const totalCalories = rows.reduce(
        (sum: number, r: any) => sum + (r.calories || 0),
        0,
    )
    const totalDistanceMiles = rows.reduce(
        (sum: number, r: any) => sum + (Number(r.distance_miles) || 0),
        0,
    )
    const avgDurationMinutes =
        totalActivities > 0 ? Math.round(totalDurationMinutes / totalActivities) : 0

    return {
        period,
        totalActivities,
        totalDurationMinutes,
        totalCalories,
        totalDistanceMiles: Math.round(totalDistanceMiles * 100) / 100,
        avgDurationMinutes,
    }
}
