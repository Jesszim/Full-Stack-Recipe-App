import express from "express"
import cors from 'cors'
import dbConnect from "./db/index.js"
import router from "./routes/appRoutes.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(router)

dbConnect(app)