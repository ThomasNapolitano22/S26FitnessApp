import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import type { JwtPayload } from "../types"
export default function requireAuth(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer ")) {
        const err = new Error("Missing or invalid Authorization header") as Error & {
            status: number
        }
        err.status = 401
        return next(err)
    }

    const token = header.slice("Bearer ".length).trim()
    const secret = process.env.JWT_SECRET
    if (!secret) {
        const err = new Error("Server is missing JWT_SECRET") as Error & { status: number }
        err.status = 500
        return next(err)
    }

    try {
        const decoded = jwt.verify(token, secret) as JwtPayload & { iat: number; exp: number }
        req.user = {
            id: decoded.id,
            username: decoded.username,
            isAdmin: decoded.isAdmin,
        }
        next()
    } catch {
        const err = new Error("Invalid or expired token") as Error & { status: number }
        err.status = 401
        next(err)
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}
