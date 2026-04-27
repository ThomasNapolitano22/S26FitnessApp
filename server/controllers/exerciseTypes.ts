import express from "express"
import * as typesModel from "../models/exerciseTypes"
import requireAuth from "../middleware/requireAuth"
import requireAdmin from "../middleware/requireAdmin"
import type { DataEnvelope, DataListEnvelope, ExerciseType } from "../types"

const router = express.Router()

router
    .get("/", requireAuth, async (req, res, next) => {
        try {
            const category = typeof req.query.category === "string" ? req.query.category : null
            const types = category
                ? await typesModel.getByCategory(category)
                : await typesModel.getAll()
            const response: DataListEnvelope<ExerciseType> = {
                data: types,
                total: types.length,
                isSuccess: true,
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get("/:id", requireAuth, async (req, res, next) => {
        try {
            const item = await typesModel.get(String(req.params.id))
            const response: DataEnvelope<ExerciseType> = { data: item, isSuccess: true }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .post("/", requireAuth, requireAdmin, async (req, res, next) => {
        try {
            const { name, category, tracksDistance } = req.body ?? {}
            if (!name || !category) {
                throw Object.assign(new Error("name and category are required"), { status: 400 })
            }
            const item = await typesModel.create({ name, category, tracksDistance })
            const response: DataEnvelope<ExerciseType> = {
                data: item,
                isSuccess: true,
                message: "Exercise type created",
            }
            res.status(201).send(response)
        } catch (error) {
            next(error)
        }
    })
    .patch("/:id", requireAuth, requireAdmin, async (req, res, next) => {
        try {
            const item = await typesModel.update(String(req.params.id), req.body)
            const response: DataEnvelope<ExerciseType> = {
                data: item,
                isSuccess: true,
                message: "Exercise type updated",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
        try {
            const item = await typesModel.remove(String(req.params.id))
            const response: DataEnvelope<ExerciseType> = {
                data: item,
                isSuccess: true,
                message: "Exercise type deleted",
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

export default router
