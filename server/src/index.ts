import path from "path"
import mongoose, { ConnectOptions } from "mongoose"
import express, { json, urlencoded } from "express"
import * as dotenv from "dotenv"

import meetings from "./routes/meetings.route"
import auth from "./utils/auth"

const app = express()

dotenv.config()
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.resolve(path.dirname("")) + "/public/"))
app.use("*", auth)

app.use("/api/meetings", meetings)

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
