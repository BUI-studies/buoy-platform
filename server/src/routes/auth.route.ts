import express from 'express'
import { AuthController } from '@/controllers'

export const authRoutes = express.Router()

authRoutes.get('/', AuthController.verifyToken)
authRoutes.post('/login', AuthController.login)
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.remove)
