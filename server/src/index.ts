import path from "path"
import * as dotenv from "dotenv"
import mongoose, { ConnectOptions } from "mongoose"
import express, { json, urlencoded } from "express"

import { Sheets, auth } from "@/utils"

import {
  meetingsRoutes,
  usersRoutes,
  authRoutes,
  paymentsRoutes,
  homeworksRoutes,
} from "./routes/"

const app = express()

dotenv.config()
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.resolve(path.dirname("")) + "/public/"))

app.use("/api/auth", authRoutes)
app.use("/api/meetings", auth, meetingsRoutes)
app.use("/api/payments", auth, paymentsRoutes)
app.use("/api/homeworks", auth, homeworksRoutes)
app.use("/api/users", auth, usersRoutes)

mongoose
  .connect(process.env.DB_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error(err))

app.listen(process.env.SERVER_PORT, () => {
  Sheets.init()
  console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
