import express from "express"
import usersController from "./controllers/users"
import { DataEnvelope } from "./types"

const PORT = 3000
const SERVER = "localhost"

const app = express()

///////// Middleware
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE") 
    res.setHeader("Access-Control-Allow-Headers", "*") 
    next()
}).use(express.json()) 

///////// Routes
app.get("/", (_req, res) => {
    res.send("Welcome to the Nature Runner API!")
})
.use("/api/v1/users", usersController)

app.use(
    (
        err: Error,
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

        res.status((err as any).status ?? 500).send(response)
    },
)

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})

console.log("Listening for requests...")