import uploadImgCloud from '@/configs/cloudinary'
import dishRoutes from '@/routes/dishes/index'
import tableRoutes from '@/routes/tables/index'
import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs are ready to use.' })
})

router.use('/dishes', dishRoutes)
router.use('/tables', tableRoutes)

router.post('/upload', uploadImgCloud.single('image'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' })
  }
  res.status(200).json({
    message: 'Upload image successfully',
    metadata: {
      file: req.file
    }
  })
})

export default router
