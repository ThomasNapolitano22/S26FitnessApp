import type { Request, Response, NextFunction } from "express"
export default function requireAdmin(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    if (!req.user) {
        const err = new Error("Not authenticated") as Error & { status: number }
        err.status = 401
        return next(err)
    }
    if (!req.user.isAdmin) {
        const err = new Error("Admin privileges required") as Error & { status: number }
        err.status = 403
        return next(err)
    }
    next()
}
