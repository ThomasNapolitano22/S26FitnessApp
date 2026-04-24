import bcrypt from "bcryptjs"
import { connect, dbError } from "./database"
import type { User, UserWithHash, PagingRequest } from "../types"

const TABLE = "users"
const SALT_ROUNDS = 10
function rowToUser(row: any): User {
    return {
        id: row.id,
        name: row.name,
        username: row.username,
        email: row.email,
        isAdmin: row.is_admin,
        icon: row.icon,
        createdAt: row.created_at,
    }
}

function rowToUserWithHash(row: any): UserWithHash {
    return { ...rowToUser(row), passwordHash: row.password_hash }
}
export async function getAll(params: PagingRequest = {}) {
    const db = connect()
    let query = db.from(TABLE).select("*", { count: "exact" })

    if (params.search) {
        const q = `%${params.search}%`
        query = query.or(`name.ilike.${q},username.ilike.${q},email.ilike.${q}`)
    }
    if (params.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    } else {
        query = query.order("created_at", { ascending: false })
    }

    const page = params.page || 1
    const pageSize = params.pageSize || 50
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const { data, count, error } = await query
    if (error) throw dbError(error.message)

    return {
        users: (data || []).map(rowToUser),
        count: count || 0,
    }
}
export async function search(q: string): Promise<User[]> {
    const db = connect()
    const like = `%${q}%`
    const { data, error } = await db
        .from(TABLE)
        .select("*")
        .or(`name.ilike.${like},username.ilike.${like}`)
        .limit(25)
    if (error) throw dbError(error.message)
    return (data || []).map(rowToUser)
}

export async function get(id: string): Promise<User> {
    const db = connect()
    const { data, error } = await db.from(TABLE).select("*").eq("id", id).maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("User not found", 404)
    return rowToUser(data)
}
export async function findByLogin(loginId: string): Promise<UserWithHash | null> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .select("*")
        .or(`username.eq.${loginId},email.eq.${loginId}`)
        .maybeSingle()
    if (error) throw dbError(error.message)
    return data ? rowToUserWithHash(data) : null
}
export async function register(input: {
    name: string
    username: string
    email: string
    password: string
    icon?: string | null
}): Promise<User> {
    if (!input.password || input.password.length < 6) {
        throw dbError("Password must be at least 6 characters", 400)
    }

    const db = connect()

    const { data: existing } = await db
        .from(TABLE)
        .select("id")
        .or(`username.eq.${input.username},email.eq.${input.email}`)
        .maybeSingle()
    if (existing) throw dbError("Username or email is already taken", 409)

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS)

    const { data, error } = await db
        .from(TABLE)
        .insert({
            name: input.name,
            username: input.username,
            email: input.email,
            password_hash: passwordHash,
            icon: input.icon ?? null,
        })
        .select("*")
        .single()

    if (error) throw dbError(error.message)
    return rowToUser(data)
}
export async function update(
    id: string,
    patch: Partial<{
        name: string
        username: string
        email: string
        icon: string | null
        password: string
        isAdmin: boolean
    }>,
): Promise<User> {
    const db = connect()
    const update: Record<string, unknown> = {}

    if (patch.name !== undefined) update.name = patch.name
    if (patch.username !== undefined) update.username = patch.username
    if (patch.email !== undefined) update.email = patch.email
    if (patch.icon !== undefined) update.icon = patch.icon
    if (patch.isAdmin !== undefined) update.is_admin = patch.isAdmin
    if (patch.password) {
        if (patch.password.length < 6) {
            throw dbError("Password must be at least 6 characters", 400)
        }
        update.password_hash = await bcrypt.hash(patch.password, SALT_ROUNDS)
    }

    if (Object.keys(update).length === 0) {
        throw dbError("No fields to update", 400)
    }

    const { data, error } = await db
        .from(TABLE)
        .update(update)
        .eq("id", id)
        .select("*")
        .maybeSingle()

    if (error) throw dbError(error.message)
    if (!data) throw dbError("User not found", 404)
    return rowToUser(data)
}

export async function remove(id: string): Promise<User> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .delete()
        .eq("id", id)
        .select("*")
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("User not found", 404)
    return rowToUser(data)
}
export async function verifyPassword(
    plaintext: string,
    hash: string,
): Promise<boolean> {
    return bcrypt.compare(plaintext, hash)
}
