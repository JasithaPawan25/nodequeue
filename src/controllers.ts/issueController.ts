import { Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import jwt_decode from 'jwt-decode'
import { CreateIssueService, DeleteIssueService, GetAllIssuesService, GetOneIssueService, UpdateIssueService } from "../services/issueService";




export class CreateIssueController {
    async handle(req:Request,res:Response){
    //    const UUID = parseInt(user_id);
  // const dead = req.headers.authorization?.split('')[1];

    const dead = req.headers.authorization!;



    const deaddi = dead.split('')[1];
    const decodeidd:any = jwt_decode(dead);
    




   
    //  console.log('decodeId :',deaddi)
     console.log('***decode :',decodeidd.id)
  //   console.log('***decode :',decodeidd.id)
   
 // const UUID = decodeidd.id;
        const {issuename,telephone,email,detail,user_id,queueId}=req.body;;
        const UUID:any = decodeidd.id;
        //const {user_id}=UUID;

        const service = new CreateIssueService();

        const resullt = await service.execute({issuename,telephone,email,detail,user_id :UUID,queueId});

        if(resullt instanceof Error) return res.status(400).json(resullt.message)

        return res.json(resullt);

    }
}

export class GetAllIssueController {
    async handle (req:Request,res:Response){
        const service =new GetAllIssuesService();

        const issues = await service.execute();
        return res.json(issues);
    }
}

export class GetOneIssueController {
    async handle(req:Request,res:Response){
        const {iid} =req.params;

        const service =new GetOneIssueService();

       // const xx = parseInt(iid);
        
        const result = await service.execute({iid});

        if(result instanceof Error) return res.status(400).json(result.message);
        return res.json(result);
    }
}

export class DeleteIssueController {
    async handle(req:Request,res:Response){
        const {id} =req.params;

        const service = new DeleteIssueService();

        const result = await service.execute(id);

        if (result instanceof Error) return res.status(400).json(result.message);
        return res.status(204).end();
    }
}

export class UpdateIssueController{
    async handle(req:Request,res:Response){
        const {id}=req.params;
        const {issuename,telephone,email,detail,user_id}=req.body;

       // const uuudi=parseInt(id) ;

        const service = new UpdateIssueService();
        const result =await service.execute({id,issuename,telephone,email,detail,user_id});

        if (result instanceof Error) return res.status(400).json(result.message);

          return res.json(result);
  

    }
}