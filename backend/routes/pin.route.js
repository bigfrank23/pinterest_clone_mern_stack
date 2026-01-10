import express from 'express'
import { getPins, getPin, createPin, interactionCheckPin, interactPin} from '../controllers/pin.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.get('/', getPins)
router.get('/:id', getPin)
router.post('/', verifyToken, createPin)
router.get('/interaction-check/:id', interactionCheckPin)
router.post('/interact/:id', verifyToken, interactPin)

export default router