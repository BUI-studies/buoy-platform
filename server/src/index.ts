import path from "path"
import mongoose, { ConnectOptions } from "mongoose"
import express, { json, urlencoded } from "express"
import * as dotenv from "dotenv"

import { meetingsRoutes, usersRoutes, authRoutes } from "./routes/"
import auth from "./utils/auth"

const app = express()

dotenv.config()
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.resolve(path.dirname("")) + "/public/"))

app.use("/api/auth", authRoutes)
app.use("/api/meetings", auth, meetingsRoutes)
app.use("/api/users", auth, usersRoutes)

mongoose
  .connect(process.env.DB_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.error(err))

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
