import express from 'express'
import { registerForWebinar } from '../controllers/registrationController.js'

const router = express.Router()

router.post('/', registerForWebinar)

export default router
