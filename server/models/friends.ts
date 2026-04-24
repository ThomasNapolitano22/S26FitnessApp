import { connect, dbError } from "./database"
import type { Friend, FriendWithUser, User } from "../types"

const TABLE = "friends"

function rowToFriend(r: any): Friend {
    return {
        id: r.id,
        requesterId: r.requester_id,
        addresseeId: r.addressee_id,
        status: r.status,
        createdAt: r.created_at,
    }
}

function rowToUser(r: any): User {
    return {
        id: r.id,
        name: r.name,
        username: r.username,
        email: r.email,
        isAdmin: r.is_admin,
        icon: r.icon,
    }
}
export async function listAccepted(userId: string): Promise<FriendWithUser[]> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .select(
            "*, requester:users!friends_requester_id_fkey ( id, name, username, email, is_admin, icon ), addressee:users!friends_addressee_id_fkey ( id, name, username, email, is_admin, icon )",
        )
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
        .eq("status", "accepted")
    if (error) throw dbError(error.message)

    return (data || []).map((r: any) => {
        const otherRow = r.requester_id === userId ? r.addressee : r.requester
        return { ...rowToFriend(r), friend: rowToUser(otherRow) }
    })
}
export async function listIncomingPending(userId: string): Promise<FriendWithUser[]> {
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .select(
            "*, requester:users!friends_requester_id_fkey ( id, name, username, email, is_admin, icon )",
        )
        .eq("addressee_id", userId)
        .eq("status", "pending")
    if (error) throw dbError(error.message)

    return (data || []).map((r: any) => ({
        ...rowToFriend(r),
        friend: rowToUser(r.requester),
    }))
}

export async function get(id: string): Promise<Friend> {
    const db = connect()
    const { data, error } = await db.from(TABLE).select("*").eq("id", id).maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Friend record not found", 404)
    return rowToFriend(data)
}
export async function request(requesterId: string, addresseeId: string): Promise<Friend> {
    if (requesterId === addresseeId) {
        throw dbError("You cannot friend yourself", 400)
    }

    const db = connect()

    const { data: existing } = await db
        .from(TABLE)
        .select("*")
        .or(
            `and(requester_id.eq.${requesterId},addressee_id.eq.${addresseeId}),and(requester_id.eq.${addresseeId},addressee_id.eq.${requesterId})`,
        )
        .maybeSingle()

    if (existing) {
        if (existing.status === "accepted") throw dbError("Already friends", 409)
        if (existing.status === "pending") throw dbError("Request already pending", 409)
        const { data, error } = await db
            .from(TABLE)
            .update({ status: "pending", requester_id: requesterId, addressee_id: addresseeId })
            .eq("id", existing.id)
            .select("*")
            .single()
        if (error) throw dbError(error.message)
        return rowToFriend(data)
    }

    const { data, error } = await db
        .from(TABLE)
        .insert({
            requester_id: requesterId,
            addressee_id: addresseeId,
            status: "pending",
        })
        .select("*")
        .single()
    if (error) throw dbError(error.message)
    return rowToFriend(data)
}
export async function accept(id: string, userId: string): Promise<Friend> {
    const existing = await get(id)
    if (existing.addresseeId !== userId) {
        throw dbError("Only the addressee can accept this request", 403)
    }
    if (existing.status !== "pending") {
        throw dbError("Request is not pending", 400)
    }
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .update({ status: "accepted" })
        .eq("id", id)
        .select("*")
        .single()
    if (error) throw dbError(error.message)
    return rowToFriend(data)
}

export async function decline(id: string, userId: string): Promise<Friend> {
    const existing = await get(id)
    if (existing.addresseeId !== userId) {
        throw dbError("Only the addressee can decline this request", 403)
    }
    if (existing.status !== "pending") {
        throw dbError("Request is not pending", 400)
    }
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .update({ status: "declined" })
        .eq("id", id)
        .select("*")
        .single()
    if (error) throw dbError(error.message)
    return rowToFriend(data)
}
export async function remove(id: string, userId: string): Promise<Friend> {
    const existing = await get(id)
    if (existing.requesterId !== userId && existing.addresseeId !== userId) {
        throw dbError("You are not part of this friendship", 403)
    }
    const db = connect()
    const { data, error } = await db
        .from(TABLE)
        .delete()
        .eq("id", id)
        .select("*")
        .maybeSingle()
    if (error) throw dbError(error.message)
    if (!data) throw dbError("Friend record not found", 404)
    return rowToFriend(data)
}
