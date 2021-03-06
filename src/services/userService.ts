import { getRepository } from "typeorm";
import { AppDataSource } from "../app";
import {User} from '../entities/user'

type userRequest ={
    uname :string;
    upassword: string;
};

export class CreateUserService {
    async execute({uname, upassword}:userRequest):Promise<User | Error> {
        const repo =AppDataSource.getRepository(User);

        if(await repo.findOne({where: { uname } })) return new Error("User Already Exists")
        
        const user =repo.create({uname,upassword});

        await repo.save(user);

        return user;


    }
}