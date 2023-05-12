import express from "express"
import { UsersController } from "../controllers/"

export const usersRoutes = express.Router()

usersRoutes.get("/", UsersController.getAll)
usersRoutes.get("/login", UsersController.login)
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.delete)
