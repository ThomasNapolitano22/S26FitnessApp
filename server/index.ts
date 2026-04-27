import express from "express"
import path from "path"
import { config } from "dotenv"

config()

console.log("[env]", {
    SUPABASE_URL: process.env.SUPABASE_URL ? "set" : "MISSING",
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY ? "set" : "MISSING",
    JWT_SECRET: process.env.JWT_SECRET ? "set" : "MISSING",
    cwd: process.cwd(),
})

import authController from "./controllers/auth"
import usersController from "./controllers/users"
import activitiesController from "./controllers/activities"
import exerciseTypesController from "./controllers/exerciseTypes"
import friendsController from "./controllers/friends"
import type { DataEnvelope } from "./types"

const PORT = Number(process.env.PORT ?? 3000)
const SERVER = process.env.SERVER ?? "localhost"
const STATIC_DIR = process.env.STATIC_DIR ?? "client/dist"
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "*"

const app = express()

app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", CLIENT_ORIGIN)
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS",
    )
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    )
    if (_req.method === "OPTIONS") {
        res.sendStatus(204)
        return
    }
    next()
}).use(express.json())

app.use(express.static(path.resolve(STATIC_DIR)))

app.get("/api/v1", (_req, res) => {
    res.send({
        data: "Nature Runner API",
        isSuccess: true,
        message: "v1",
    })
})
    .use("/api/v1/auth", authController)
    .use("/api/v1/users", usersController)
    .use("/api/v1/activities", activitiesController)
    .use("/api/v1/exercise-types", exerciseTypesController)
    .use("/api/v1/friends", friendsController)

app.get(/^\/(?!api\/).*/, (_req, res) => {
    res.sendFile(path.resolve(STATIC_DIR, "index.html"), (err) => {
        if (err) {
            res.status(404).send({
                data: null,
                isSuccess: false,
                message: "Not found",
            })
        }
    })
})

app.use(
    (
        err: Error & { status?: number },
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(err)
        const response: DataEnvelope<null> = {
            data: null,
            isSuccess: false,
            message: err.message ?? "An error occurred",
        }
        res.status(err.status ?? 500).send(response)
    },
)

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})
