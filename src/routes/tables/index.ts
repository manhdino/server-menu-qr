'use strict'

import asyncHandler from '@/helpers/asyncHandler'
import express from 'express'
import tablesController from '@controllers/tables'
const router = express.Router()

router.get('/', asyncHandler(tablesController.index))

router.get('/:id', asyncHandler(tablesController.show))

router.post('/', asyncHandler(tablesController.create))

router.put('/:id', asyncHandler(tablesController.update))

router.delete('/:id', asyncHandler(tablesController.destroy))
export default router
