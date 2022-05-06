import { getRepository } from "typeorm";
import { Issue } from "../entities/issue";
import { Queue } from "../entities/queue";

//import { Queue } from "../entities/queue";
import { User } from "../entities/user";

type IssueRequest ={
    issuename :string;
    telephone:string;
    email:string;
    detail:string;
    user_id:string;
    queueId:string;
}

export class CreateIssueService{
    async execute({issuename,telephone,email,detail,user_id,queueId}:IssueRequest):Promise<Issue|Error>{
        const repo = getRepository(Issue);
        const repoUser =getRepository(User);
        const repoQueue =getRepository(Queue);

       // parseInt(user_id)  ;
        //{ where: { UUid } }

     //   if(!(await repoQueue.findOne({where: { id :parseInt(queueId) } }))  ) return new Error ("User Do not Exists!");


       if(!(await repoUser.findOne({where: { id :parseInt(user_id) } }) && await repoQueue.findOne({where: { id :parseInt(queueId) } }) )  ) return new Error ("User Do not Exists!");

        const issue =repo.create({issuename,telephone,email,detail,user_id,queueId});

        await repo.save(issue);

        return issue;

    }


}

export class DeleteIssueService {
    async execute(id:string){
        const repo =getRepository(Issue);

        if(!(await repo.findOne({where: { id :parseInt(id) } }))) return new Error("Issue does not exists!");

        return repo.delete(id)
    }
}

type IssueUpdateRequest ={
    id:string;
  //  iid:number;
    issuename :string;
    telephone:string;
    email:string;
    detail:string;
    user_id:string;
}


export class UpdateIssueService {
    async execute ({id,issuename,telephone,email,detail,user_id}:IssueUpdateRequest){
        const repo =getRepository(Issue);
        const repoUserr = getRepository(User) ;

        const issue = await repo.findOne({where:{id:parseInt(id)}});

        if(!issue) return new Error("Issue does not Exists!");

        if(!(await repoUserr.findOne({where:{id: parseInt(user_id)}}))) return new Error ("User does not exists!");

        issue.issuename=issuename?issuename:issue.issuename;
        issue.telephone=telephone?telephone:issue.telephone;
        issue.email=email?email:issue.email;
        issue.detail=detail?detail:issue.detail;
        issue.user_id=user_id?user_id:issue.user_id;

        await repo.save(issue);

        return issue;

        //if(!(await repoUserr))
    }
}


export class GetAllIssuesService {
    async execute (){
        const repo = getRepository(Issue);
        const issues = await repo.find({
            relations:["user","queue"]
        })

        return issues;
    }
}

type IssueGetRequest = {
   // id:string;
    iid:string;
}

export class GetOneIssueService {
    async execute({iid}:IssueGetRequest){
        const repo =getRepository(Issue);

        const issue =await repo.findOne({ where: { id:parseInt(iid) },relations:["user"] });

        if(!issue) return new  Error("Issue does not exists!!");

        return issue;

    }
}



