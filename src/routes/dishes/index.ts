'use strict'

import asyncHandler from '@/helpers/asyncHandler'
import express from 'express'
import dishesController from '@controllers/dishes'
const router = express.Router()

router.get('/', asyncHandler(dishesController.index))

router.get('/:id', asyncHandler(dishesController.show))

router.post('/', asyncHandler(dishesController.create))

router.put('/:id', asyncHandler(dishesController.update))

export default router
