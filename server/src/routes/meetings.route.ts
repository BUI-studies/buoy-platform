import express from "express"
import { MeetingsController } from "../controllers"

export const meetingsRoutes = express.Router()

meetingsRoutes.get("/", MeetingsController.get)
meetingsRoutes.post("/", MeetingsController.save)
meetingsRoutes.put("/", MeetingsController.update)
meetingsRoutes.delete("/:id", MeetingsController.delete)
