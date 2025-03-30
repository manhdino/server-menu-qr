import  dishRoutes  from '@/routes/dishes/index';
import express from 'express'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs are ready to use.' })
})


router.use('/dishes', dishRoutes)

export default router
