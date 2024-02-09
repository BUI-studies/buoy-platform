import path from 'path'
import * as dotenv from 'dotenv'
import mongoose, { ConnectOptions } from 'mongoose'
import express, { json, urlencoded } from 'express'

import { Sheets, auth } from '@/utils'

import {
	meetingsRoutes,
	authRoutes,
	paymentsRoutes,
	homeworksRoutes,
	feedbackRoutes,
} from './src/routes'
import { usersRoutes } from '@/routes/users.route'

const app = express()

dotenv.config()
app.use(json())
app.use(urlencoded({ extended: false }))

// Serve static files
app.use(express.static('./dist/public'))

app.use('/api/auth', authRoutes)
app.use('/api/meetings', auth, meetingsRoutes)
app.use('/api/payments', auth, paymentsRoutes)
app.use('/api/homeworks', auth, homeworksRoutes)
app.use('/api/users', auth, usersRoutes)
app.use('/api/feedbacks', auth, feedbackRoutes)

//handling client routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'))
})

mongoose
	.connect(process.env.DB_URL || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as ConnectOptions)
	.then(() => console.log('MongoDb connected'))
	.catch(err => console.error(err))

app.listen(process.env.SERVER_PORT, () => {
	Sheets.getDoc()
	console.log(`Server is running on port: ${process.env.SERVER_PORT}`)
})
