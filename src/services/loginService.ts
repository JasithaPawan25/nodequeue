import {CannotReflectMethodParameterTypeError, getRepository} from "typeorm";
import { User } from "../entities/user";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Count_Person } from "../entities/Cuser";

dotenv.config();




type loginRequest ={
    uname:string,
    upassword:string
}

export class LoginSevice {
    async execute( {uname,upassword}:loginRequest){
        const repo =getRepository(User);

        const user = await repo.findOne({ where: {uname:uname }});

        if(!user) {
           // return res.status(401).json({ message: "Unable to login"});
         return  new  Error("Unable to login");
       
        }

        const validPassword = await bcrypt.compare(upassword,user.upassword);


    //   const validPassword =await repository.findOne({ where: {upassword:upassword }});

        if(!uname || !upassword) {
           // return res.status(400).json({ message: "Unable to create user" });
            return new  Error("Please check the username and password and try again");
        }
        

        // if(user.upassword !== (upassword))
        // {

        if(!validPassword) {
          //  return res.status(401).json({ message: "Unable to login"});
            return new  Error("Wrong password !! please try again");
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
                
       return ({user:user.id,name:user.uname,token});
  // return token;
  
    
        // res.json({message:"Welcome Back, User", token:jwtToken,id:FindUserName.id})
        // return(res);      //  const findUserPassword = await compare(upassword,FindUserName.upassword)

    }

}


type ConterloginRequest ={
    cname:string,
    cpassword:string
}


export class LoginCounterSevice {
    async execute( {cname,cpassword}:ConterloginRequest){
        const repo =getRepository(Count_Person);

        const userc = await repo.findOne({ where: {cname:cname }});

        if(!userc) {
           // return res.status(401).json({ message: "Unable to login"});
         return  new  Error("Unable to login");
       
        }

        const validPasswordc = await bcrypt.compare(cpassword,userc.cpassword);


    //   const validPassword =await repository.findOne({ where: {upassword:upassword }});

        if(!cname || !cpassword) {
           // return res.status(400).json({ message: "Unable to create user" });
            return new  Error("Please check the username and password and try again");
        }
        

        // if(user.upassword !== (upassword))
        // {

        if(!validPasswordc) {
          //  return res.status(401).json({ message: "Unable to login"});
            return new  Error("Wrong password !! please try again");
        }

        const token = jwt.sign({ 
                id: userc.id, 
                name: userc.cname, 
                password: userc.cpassword, 
               // type: user.type
            }, 
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN as string
                }
            );
                
       return ({user:userc.id,name:userc.cname,token});
  // return token;
  
    
        // res.json({message:"Welcome Back, User", token:jwtToken,id:FindUserName.id})
        // return(res);      //  const findUserPassword = await compare(upassword,FindUserName.upassword)

    }

}