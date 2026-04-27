import express from "express"
import * as friendsModel from "../models/friends"
import requireAuth from "../middleware/requireAuth"
import type { DataEnvelope, DataListEnvelope, Friend, FriendWithUser } from "../types"

const router = express.Router()

router.use(requireAuth)

router
    .get("/", async (req, res, next) => {
        try {
            const list = await friendsModel.listAccepted(req.user!.id)
            const response: DataListEnvelope<FriendWithUser> = {
                data: list,
                total: list.length,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/requests", async (req, res, next) => {
        try {
            const list = await friendsModel.listIncomingPending(req.user!.id)
            const response: DataListEnvelope<FriendWithUser> = {
                data: list,
                total: list.length,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .post("/request/:userId", async (req, res, next) => {
        try {
            const requesterId = req.user!.id
            const addresseeId = String(req.params.userId)
            const friend = await friendsModel.request(requesterId, addresseeId)
            const response: DataEnvelope<Friend> = {
                data: friend,
                isSuccess: true,
                message: "Friend request sent",
            }
            res.status(201).send(response)
        } catch (error) {
            next(error)
        }
    })
    .post("/accept/:id", async (req, res, next) => {
        try {
            const friend = await friendsModel.accept(String(req.params.id), req.user!.id)
            const response: DataEnvelope<Friend> = {
                data: friend,
                isSuccess: true,
                message: "Friend request accepted",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .post("/decline/:id", async (req, res, next) => {
        try {
            const friend = await friendsModel.decline(String(req.params.id), req.user!.id)
            const response: DataEnvelope<Friend> = {
                data: friend,
                isSuccess: true,
                message: "Friend request declined",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .delete("/:id", async (req, res, next) => {
        try {
            const friend = await friendsModel.remove(String(req.params.id), req.user!.id)
            const response: DataEnvelope<Friend> = {
                data: friend,
                isSuccess: true,
                message: "Friendship removed",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

export default router
