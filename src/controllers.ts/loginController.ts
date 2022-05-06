import { Request,Response } from "express";
import {LoginCounterSevice, LoginSevice} from "../services/loginService"
import jwt from "jsonwebtoken";
import { User } from "../entities/user";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { getRepository} from "typeorm";

dotenv.config();


export class LoginController {
    async handle (req:Request,res:Response){
        const {uname,upassword}=req.body;


        const service = new LoginSevice;

        const resullt = await service.execute({uname,upassword});

        if(resullt instanceof Error) return res.status(400).json(resullt.message)

        return res.json(resullt);
    }
}


export class LoginCounterController {
    async handle (req:Request,res:Response){
        const {cname,cpassword}=req.body;


        const service = new LoginCounterSevice;

        const resulllt = await service.execute({cname,cpassword});

        if(resulllt instanceof Error) return res.status(400).json(resulllt.message)

        return res.json(resulllt);
    }
}


class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User);
        const { uname, upassword } = req.body;

        const user = await repository.findOne({ where: {uname:uname }});

        if(!user) {
            return res.status(401).json({ message: "Unable to login"});
        }

        const validPassword = await bcrypt.compare(upassword,user.upassword);


    //   const validPassword =await repository.findOne({ where: {upassword:upassword }});

        if(!uname || !upassword) {
            return res.status(400).json({ message: "Unable to create user" });
        }
        

        // if(user.upassword !== (upassword))
        // {

        if(!validPassword) {
            return res.status(401).json({ message: "Unable to login"});
        }

        const token = jwt.sign({ 
                id: user.id, 
                name: user.uname, 
                password: user.upassword, 
               // type: user.type
            }, 
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN as string
                }
            );
                
        return res.json({user:user.id,name:user.uname,token});
    }
}

export default new AuthController();