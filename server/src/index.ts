import * as dotenv from "dotenv"
import express, { json, urlencoded } from "express"
import path from "path"

import meetings from "./routes/meetings.route"

// TODO: make oAuth or firebase google auth
// import auth from "./utils/auth.js"

const app = express()

dotenv.config()
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.resolve(path.dirname("")) + "/public/"))
// app.use("*", auth)

app.use("/api/meetings", meetings)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
