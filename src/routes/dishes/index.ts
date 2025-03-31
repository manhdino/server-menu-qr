'use strict'

import asyncHandler from '@/helpers/asyncHandler'
import express from 'express'
import dishesController from '@controllers/dishes'
import uploadImgCloud from '@/configs/cloudinary'
const router = express.Router()

router.get('/', asyncHandler(dishesController.index))

router.get('/:id', asyncHandler(dishesController.show))

router.post('/', uploadImgCloud.single('image'), asyncHandler(dishesController.create))

router.put('/:id', asyncHandler(dishesController.update))

router.delete('/:id', asyncHandler(dishesController.destroy))
export default router
