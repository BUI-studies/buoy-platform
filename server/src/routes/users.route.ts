import express from "express"
import { UsersController } from "@/controllers"

export const usersRoutes = express.Router()

usersRoutes.get("/", UsersController.getAll)
