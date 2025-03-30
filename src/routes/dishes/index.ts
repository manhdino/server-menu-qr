'use strict';

import asyncHandler from "@/helpers/asyncHandler";
import express from "express";
import dishesController from '@controllers/dishes'
const router = express.Router();



router.get('/',  asyncHandler(dishesController.index));


export default router;