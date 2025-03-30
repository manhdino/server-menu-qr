'use strict';

import { OK } from "@/responses/successResponse";
import DishesService from "@/services/dishes";
import { Request, Response } from "express";


class DishesController {

    index = async (req:Request, res:Response) => {
        console.log(`[P]::get list dishes:`)
        new OK({
            message: "Get list dishes successfully",
            metadata: await DishesService.index()
        }).send(res)
    }

}


export default new DishesController();