import { Request,Response } from "express";
import { CreateCUserService, CreateQueueNoService, GetAllqueueService } from "../services/CuserService";

import { CreateUserService } from '../services/userService';

export class CreateCUserController {
    async handle(req:Request,res:Response){
        const {cname,cpassword } = req.body;

        const service = new CreateCUserService();
        const result =await service.execute({cname,cpassword});

        if(result instanceof Error) return res.status(400).json(result.message);

        return res.json(result);

    }
}


export class CreateQueueNoController {
    async handle(req:Request,res:Response){
    //    const UUID = parseInt(user_id);
        const {queueNo,counter_Id}=req.body;
   //     const UUID = parseInt(user_id);

        const service = new CreateQueueNoService();

        const resullt = await service.execute({queueNo,counter_Id});

        if(resullt instanceof Error) return res.status(400).json(resullt.message)

        return res.json(resullt);

    }
}


export class GetAllCuserController {
    async handle (req:Request,res:Response){
        const service =new GetAllqueueService();

        const issues = await service.execute();
        return res.json(issues);
    }
}