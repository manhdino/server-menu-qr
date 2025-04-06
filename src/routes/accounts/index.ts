'use strict'

import asyncHandler from '@/helpers/asyncHandler'
import express from 'express'
import accountsController from '@controllers/accounts/index'
const router = express.Router()

router.get('/', asyncHandler(accountsController.index))

// router.get('/:id', asyncHandler(dishesController.show))

router.post('/', asyncHandler(accountsController.create))

// router.put('/:id', asyncHandler(dishesController.update))

router.delete('/:id', asyncHandler(accountsController.destroy))
export default router
