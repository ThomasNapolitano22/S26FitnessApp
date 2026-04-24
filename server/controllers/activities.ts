import express from "express"
import * as activitiesModel from "../models/activities"
import * as friendsModel from "../models/friends"
import requireAuth from "../middleware/requireAuth"
import type {
    Activity,
    ActivityStats,
    ActivityWithDetails,
    DataEnvelope,
    DataListEnvelope,
} from "../types"

const router = express.Router()

router.use(requireAuth)

router
    .get("/", async (req, res, next) => {
        try {
            const list = await activitiesModel.getByUser(req.user!.id)
            const response: DataListEnvelope<ActivityWithDetails> = {
                data: list,
                total: list.length,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/feed", async (req, res, next) => {
        try {
            const list = await activitiesModel.getFeed(req.user!.id)
            const response: DataListEnvelope<ActivityWithDetails> = {
                data: list,
                total: list.length,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/stats", async (req, res, next) => {
        try {
            const rawPeriod = String(req.query.period ?? "alltime")
            const period = (["today", "week", "alltime"].includes(rawPeriod)
                ? rawPeriod
                : "alltime") as "today" | "week" | "alltime"
            const stats = await activitiesModel.getStats(req.user!.id, period)
            const response: DataEnvelope<ActivityStats> = { data: stats, isSuccess: true }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/:id", async (req, res, next) => {
        try {
            const activity = await activitiesModel.get(String(req.params.id))
            const callerId = req.user!.id

            if (activity.userId !== callerId) {
                const friends = await friendsModel.listAccepted(callerId)
                const isFriend = friends.some((f) => f.friend.id === activity.userId)
                if (!isFriend) {
                    throw Object.assign(
                        new Error("You don't have access to this activity"),
                        { status: 403 },
                    )
                }
            }

            const response: DataEnvelope<ActivityWithDetails> = {
                data: activity,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .post("/", async (req, res, next) => {
        try {
            const {
                exerciseTypeId,
                title,
                description,
                date,
                location,
                durationMinutes,
                calories,
                distanceMiles,
            } = req.body ?? {}

            if (!exerciseTypeId || !title || !date || durationMinutes == null) {
                throw Object.assign(
                    new Error(
                        "exerciseTypeId, title, date, and durationMinutes are required",
                    ),
                    { status: 400 },
                )
            }

            const created = await activitiesModel.create({
                userId: req.user!.id,
                exerciseTypeId,
                title,
                description,
                date,
                location,
                durationMinutes: Number(durationMinutes),
                calories: calories != null ? Number(calories) : null,
                distanceMiles: distanceMiles != null ? Number(distanceMiles) : null,
            })

            const response: DataEnvelope<Activity> = {
                data: created,
                isSuccess: true,
                message: "Activity created",
            }
            res.status(201).send(response)
        } catch (error) {
            next(error)
        }
    })
    .patch("/:id", async (req, res, next) => {
        try {
            const id = String(req.params.id)
            const existing = await activitiesModel.get(id)
            if (existing.userId !== req.user!.id) {
                throw Object.assign(
                    new Error("You can only modify your own activities"),
                    { status: 403 },
                )
            }

            const { userId: _ignore, ...patch } = req.body ?? {}
            void _ignore

            const updated = await activitiesModel.update(id, patch)
            const response: DataEnvelope<Activity> = {
                data: updated,
                isSuccess: true,
                message: "Activity updated",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .delete("/:id", async (req, res, next) => {
        try {
            const id = String(req.params.id)
            const existing = await activitiesModel.get(id)
            if (existing.userId !== req.user!.id && !req.user!.isAdmin) {
                throw Object.assign(
                    new Error("You can only delete your own activities"),
                    { status: 403 },
                )
            }
            const removed = await activitiesModel.remove(id)
            const response: DataEnvelope<Activity> = {
                data: removed,
                isSuccess: true,
                message: "Activity deleted",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

export default router
