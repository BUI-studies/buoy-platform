import express from "express"
import { UsersController } from "../controllers/"
import auth from "../utils/auth"

export const usersRoutes = express.Router()

usersRoutes.get("/", auth, UsersController.getAll)
usersRoutes.post("/login", UsersController.login)
// usersRoutes.post("/", UsersController.save)
// usersRoutes.put("/", UsersController.update)
// usersRoutes.delete("/:id", UsersController.delete)
