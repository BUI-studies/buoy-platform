import express from "express"
import MeetingsController from "../controllers/meetings.controller.ts"

const meetingsRoutes = express.Router()

meetingsRoutes.get("/", MeetingsController.getAll)
meetingsRoutes.post("/", MeetingsController.save)
meetingsRoutes.put("/", MeetingsController.update)
meetingsRoutes.delete("/:id", MeetingsController.delete)

export default meetingsRoutes
