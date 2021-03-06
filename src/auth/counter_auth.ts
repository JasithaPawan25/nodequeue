


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type TokenPayload ={
    id: number;
    name: string;
    password: string;
  //  type: string;
    iat: number;
    exp: number;
}

export default function CounterauthMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id, name, password } = data as TokenPayload;
        
       // req.userToken ={id,name,password};

        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized on catch"});
    }

}


