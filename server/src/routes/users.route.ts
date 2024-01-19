import express from 'express'
import { UsersController } from '@/controllers'

export const usersRoutes = express.Router()

usersRoutes.get('/', UsersController.get)
usersRoutes.post('/', UsersController.save)
usersRoutes.put('/', UsersController.update)
usersRoutes.delete('/:id', UsersController.remove)
