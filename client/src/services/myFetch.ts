const API_BASE_URL: string =
    (import.meta.env.VITE_API_ROOT as string) || '/api/v1/'

const TOKEN_KEY = 'nr_token'

const unauthorizedListeners: Array<() => void> = []

export function onUnauthorized(fn: () => void): void {
    unauthorizedListeners.push(fn)
}

export function getToken(): string | null {
    try {
        return localStorage.getItem(TOKEN_KEY)
    } catch {
        return null
    }
}

export function setToken(token: string | null): void {
    try {
        if (token) localStorage.setItem(TOKEN_KEY, token)
        else localStorage.removeItem(TOKEN_KEY)
    } catch {
    }
}

export type ApiOptions = {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
    body?: unknown
    skipAuth?: boolean
}
export async function api<T>(
    endpoint: string,
    options: ApiOptions = {},
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    }

    if (!options.skipAuth) {
        const token = getToken()
        if (token) headers['Authorization'] = `Bearer ${token}`
    }

    const url = endpoint.startsWith('http')
        ? endpoint
        : `${API_BASE_URL}${endpoint.replace(/^\//, '')}`

    const res = await fetch(url, {
        method: options.method ?? (options.body !== undefined ? 'POST' : 'GET'),
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    })

    const raw = await res.text()
    let parsed: { message?: string } | null = null
    try {
        parsed = raw ? JSON.parse(raw) : null
    } catch {
        parsed = { message: raw }
    }

    if (!res.ok) {
        if (res.status === 401) {
            setToken(null)
            unauthorizedListeners.forEach((fn) => fn())
        }
        const msg = parsed?.message || `Request failed (${res.status})`
        throw new Error(msg)
    }

    return parsed as T
}
