import express from "express"
import { UsersController } from "@/controllers"

export const usersRoutes = express.Router()

usersRoutes.get("/", UsersController.getAll)
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.delete)
