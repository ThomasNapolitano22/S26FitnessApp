import { createClient, SupabaseClient } from "@supabase/supabase-js"

let cachedClient: SupabaseClient | null = null
export function connect(): SupabaseClient {
    const SUPABASE_URL = process.env.SUPABASE_URL ?? ""
    const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY ?? ""

    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
        throw new Error(
            "Supabase credentials missing. Set SUPABASE_URL and SUPABASE_SECRET_KEY in your .env file."
        )
    }
    if (!cachedClient) {
        cachedClient = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
            auth: { persistSession: false },
        })
    }
    return cachedClient
}
export function dbError(message: string, status = 500): Error {
    const err = new Error(message) as Error & { status: number }
    err.status = status
    return err
}
