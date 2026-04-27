import express from "express"
import jwt from "jsonwebtoken"
import * as usersModel from "../models/users"
import requireAuth from "../middleware/requireAuth"
import type { DataEnvelope, JwtPayload, User } from "../types"

const router = express.Router()
function signTokenFor(user: User): string {
    const secret = process.env.JWT_SECRET
    if (!secret) throw Object.assign(new Error("JWT_SECRET is not configured"), { status: 500 })
    const payload: JwtPayload = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
    }
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d"
    return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions)
}

router
    .post("/signup", async (req, res, next) => {
        try {
            const { name, username, email, password, icon } = req.body ?? {}
            if (!name || !username || !email || !password) {
                throw Object.assign(
                    new Error("name, username, email, and password are required"),
                    { status: 400 },
                )
            }
            const user = await usersModel.register({
                name,
                username,
                email,
                password,
                icon: icon ?? null,
            })
            const token = signTokenFor(user)
            const response: DataEnvelope<{ token: string; user: User }> = {
                data: { token, user },
                isSuccess: true,
                message: "Account created",
            }
            res.status(201).send(response)
        } catch (error) {
            next(error)
        }
    })
    .post("/login", async (req, res, next) => {
        try {
            const { loginId, password } = req.body ?? {}
            if (!loginId || !password) {
                throw Object.assign(
                    new Error("loginId (username or email) and password are required"),
                    { status: 400 },
                )
            }
            const userWithHash = await usersModel.findByLogin(loginId)
            if (!userWithHash) {
                throw Object.assign(new Error("Invalid credentials"), { status: 401 })
            }
            const ok = await usersModel.verifyPassword(password, userWithHash.passwordHash)
            if (!ok) {
                throw Object.assign(new Error("Invalid credentials"), { status: 401 })
            }
            const { passwordHash: _drop, ...user } = userWithHash
            void _drop
            const token = signTokenFor(user)
            const response: DataEnvelope<{ token: string; user: User }> = {
                data: { token, user },
                isSuccess: true,
                message: "Login successful",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/me", requireAuth, async (req, res, next) => {
        try {
            const id = req.user!.id
            const user = await usersModel.get(id)
            const response: DataEnvelope<User> = { data: user, isSuccess: true }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

export default router
