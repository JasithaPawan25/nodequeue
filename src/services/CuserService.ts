import { Any, getRepository } from "typeorm";
import { AppDataSource } from "../app";
import { Counter } from "../entities/counter";
import { Count_Person } from "../entities/Cuser";
import { Queue } from "../entities/queue";
// import { Queue } from "../entities/queue";



import {User} from '../entities/user'

type CuserRequest ={
    cname :string;
    cpassword: string;
};

export class CreateCUserService {
    async execute({cname, cpassword}:CuserRequest):Promise<Count_Person | Error> {
        const repo =AppDataSource.getRepository(Count_Person);

        if(await repo.findOne({where: { cname } })) return new Error("User Already Exists")
        
        const user =repo.create({cname,cpassword});

        await repo.save(user);

        return user;


    }
}


export class GetAllqueueService {
    async execute (){
        const repo = getRepository(Counter);
        const issues = await repo.find({
            relations:["Cuser"]
        })

        return issues;
    }
}


type QueueRequest = {
    queueNo :string;
    counter_Id:string;

}


export class CreateQueueNoService{
    async execute({queueNo,counter_Id}:QueueRequest):Promise<Queue|Error>{
        const repo = getRepository(Queue);
        const repoCounter =getRepository(Counter);
      //  const repoQueue =getRepository(Queue);

       // parseInt(user_id)  ;
        //{ where: { UUid } }

     //   if(!(await repoQueue.findOne({where: { id :parseInt(queueId) } }))  ) return new Error ("User Do not Exists!");


       if(!(await repoCounter.findOne({where: { id :parseInt(counter_Id) } })) ) return new Error ("User Do not Exists!");

        const issue =repo.create({queueNo,counter_Id});

        await repo.save(issue);

        return issue;

    }


}

