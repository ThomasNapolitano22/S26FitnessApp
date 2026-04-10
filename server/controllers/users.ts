import express from 'express'
import * as usersModel from '../models/users'
import { DataEnvelope, DataListEnvelope, User } from '../types'

const router = express.Router()

router
    .get('/', (req, res, next) => {
        try {
            // Pass the query parameters (like ?page=1&search=thomas) to the model
            const { users, count } = usersModel.getAll(req.query)
            
            const response: DataListEnvelope<User> = {
                data: users,
                total: count,
                isSuccess: true
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .get('/:id', (req, res, next) => {
        try {
            const user = usersModel.get(Number(req.params.id))
            const response: DataEnvelope<User> = {
                data: user,
                isSuccess: true
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .post('/', (req, res, next) => {
        try {
            const newUser = usersModel.create(req.body)
            const response: DataEnvelope<User> = {
                data: newUser,
                isSuccess: true,
                message: "User created successfully"
            }
            res.status(201).send(response)
        } catch (error) {
            next(error)
        }
    })
    .patch('/:id', (req, res, next) => {
        try {
            const updatedUser = usersModel.update(Number(req.params.id), req.body)
            const response: DataEnvelope<User> = {
                data: updatedUser,
                isSuccess: true,
                message: "User updated successfully"
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })
    .delete('/:id', (req, res, next) => {
        try {
            const removedUser = usersModel.remove(Number(req.params.id))
            const response: DataEnvelope<User> = {
                data: removedUser,
                isSuccess: true,
                message: "User deleted successfully"
            }
            res.send(response)
        } catch (error) {
            next(error)
        }
    })

export default router