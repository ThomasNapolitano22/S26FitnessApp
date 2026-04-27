import express from "express"
import * as usersModel from "../models/users"
import requireAuth from "../middleware/requireAuth"
import requireAdmin from "../middleware/requireAdmin"
import type { DataEnvelope, DataListEnvelope, User } from "../types"

const router = express.Router()

router
    .get("/", requireAuth, requireAdmin, async (req, res, next) => {
        try {
            const { users, count } = await usersModel.getAll(req.query)
            const response: DataListEnvelope<User> = {
                data: users,
                total: count,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/search", requireAuth, async (req, res, next) => {
        try {
            const q = String(req.query.q ?? "").trim()
            if (!q) {
                const response: DataListEnvelope<User> = {
                    data: [],
                    total: 0,
                    isSuccess: true,
                }
                res.send(response)
                return
            }
            const users = await usersModel.search(q)
            const response: DataListEnvelope<User> = {
                data: users,
                total: users.length,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/:id", requireAuth, async (req, res, next) => {
        try {
            const user = await usersModel.get(String(req.params.id))
            const response: DataEnvelope<User> = { data: user, isSuccess: true }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .patch("/:id", requireAuth, async (req, res, next) => {
        try {
            const targetId = String(req.params.id)
            const caller = req.user!

            if (caller.id !== targetId && !caller.isAdmin) {
                throw Object.assign(
                    new Error("You can only update your own profile"),
                    { status: 403 },
                )
            }

            const patch = { ...req.body }
            if (!caller.isAdmin) delete patch.isAdmin

            const updated = await usersModel.update(targetId, patch)
            const response: DataEnvelope<User> = {
                data: updated,
                isSuccess: true,
                message: "User updated",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
        try {
            const removed = await usersModel.remove(String(req.params.id))
            const response: DataEnvelope<User> = {
                data: removed,
                isSuccess: true,
                message: "User deleted",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

export default router
