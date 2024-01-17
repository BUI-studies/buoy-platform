import express from 'express'
import { PaymentsController } from '@/controllers'

export const paymentsRoutes = express.Router()

paymentsRoutes.get('/', PaymentsController.get)
paymentsRoutes.post('/', PaymentsController.save)
paymentsRoutes.put('/', PaymentsController.update)
paymentsRoutes.delete('/:id', PaymentsController.remove)
