import express from 'express'
import { HomeworksController } from '@/controllers'

export const homeworksRoutes = express.Router()

homeworksRoutes.get('/', HomeworksController.get)
homeworksRoutes.post('/', HomeworksController.save)
homeworksRoutes.put('/', HomeworksController.update)
homeworksRoutes.delete('/:id', HomeworksController.remove)
