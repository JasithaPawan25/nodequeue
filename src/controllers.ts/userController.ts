import {Request,Response} from 'express';
import { CreateUserService } from '../services/userService';

export class CreateUserController {
    async handle(req:Request,res:Response){
        const {uname,upassword } = req.body;

        const service = new CreateUserService();
        const result =await service.execute({uname,upassword});

        if(result instanceof Error) return res.status(400).json(result.message);

        return res.json(result);

    }
}