import express from 'express'
import { FeedbackController } from '@/controllers'

export const feedbackRoutes = express.Router()

feedbackRoutes.get('/', FeedbackController.get)
feedbackRoutes.post('/', FeedbackController.save)
