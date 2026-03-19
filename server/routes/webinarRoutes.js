import express from 'express'
import { createWebinar, getWebinars, getWebinarById } from '../controllers/webinarController.js'

const router = express.Router()

router.post('/create', createWebinar)
router.get('/', getWebinars)
router.get('/:id', getWebinarById)

export default router
