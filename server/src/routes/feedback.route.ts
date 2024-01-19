import express from 'express'
import { FeedbackController } from '@/controllers'

export const feedbackRoutes = express.Router()

feedbackRoutes.post('/', FeedbackController.save)
