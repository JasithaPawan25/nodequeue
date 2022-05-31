import { Request,Response } from "express";
import  jwt  from "jsonwebtoken";
import jwt_decode from 'jwt-decode'
import Pool from "mysql2/typings/mysql/lib/Pool";
import { Any, createQueryBuilder, getRepository } from "typeorm";
import sql from "ts-sql"

//import { MySQLQueryBuilder } from "ts-sql";
 //import { MySQLQueryCompiler } from "ts-sql";
 import { Countern } from "../entities/counterx";
import { Counter1people, Counter2people, Counter3people, Counterupdate, CreateCounterIssueService, CreateIssueService, DeleteIssueService, GetAllIssuesCounter1Service, GetAllIssuesCounter2Service, GetAllIssuesCounter3Service, GetAllIssuesService, GetCouterforPersonService, GetNextIssueCounter1Service, GetNextIssueCounter2Service, GetNextIssueCounter3Service, GetOneIssueService, UpdateIssueService } from "../services/issueService";
import Connection from "mysql2/typings/mysql/lib/Connection";
import { User } from "../entities/user";
import { Issue } from "../entities/issue";
import { Count_Person } from "../entities/Cuser";
import { userInfo } from "os";
import { AppDataSource } from "../app";


 //let i: number = 1;



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
  

   //const joe = await Countern.create({ queueNo: "1",	counter_Id:"2" }).save(); 
   
 // const UUID = decodeidd.id;

//  for (i=1, i<4; i++;) {
 

        const {issuename,telephone,email,detail,user_id,IssueNo,count_Id }=req.body;;
        const UUID:any = decodeidd.id;
        //const {user_id}=UUID;

        const service = new CreateIssueService();
        const Counterservice = new CreateCounterIssueService();
        const countern =AppDataSource.getRepository(Countern)




        const { Counter1_ID_sum } = await AppDataSource.getRepository(Countern)
    .createQueryBuilder("countern")
    .select("Count(countern.counter_id)", "Counter1_ID_sum")
    .where("countern.counter_id = :id", { id: 1 })
    .andWhere("countern.queueNo =:Nid",{Nid:1})
    .getRawOne();

    console.log("Counter1_ID_sum :",Counter1_ID_sum);


        const { Counter2_ID_sum } = await AppDataSource.getRepository(Countern)
    .createQueryBuilder("countern")
    .select("Count(countern.counter_id)", "Counter2_ID_sum")
    .where("countern.counter_id = :id", { id: 2 })
    .andWhere("countern.queueNo =:Nid",{Nid:1})
    .getRawOne();

    console.log("Counter2_ID_sum :",Counter2_ID_sum);



    const { Counter3_ID_sum } = await AppDataSource.getRepository(Countern)
    .createQueryBuilder("countern")
    .select("Count(countern.counter_id)", "Counter3_ID_sum")
    .where("countern.counter_id = :id", { id: 3 })
    .andWhere("countern.queueNo =:Nid",{Nid:1})
    .getRawOne();

    console.log("Counter3_ID_sum :",Counter3_ID_sum);

    const Counter1_ID_summ = parseInt(Counter1_ID_sum);
    const Counter2_ID_summ = parseInt(Counter2_ID_sum);
    const Counter3_ID_summ = parseInt(Counter3_ID_sum);


      
    //   const xwer = "select * from user";

    //   const { sum } = await getRepository(User)
    // .createQueryBuilder("user")
    // .select("SUM(user.unameCount)", "sum")
    // .where("user.id = :id", { id: 1 })
    // .getRawOne();

    // console.log(sum);


  //#id  //QueueId CountID
 //1        // 1    1
 //2       // 1     2
 //2        // 1     3
 //2       // 2      1
 //2       // 2      2
 //2       // 2      3
 //2       // 3      1
 //2       // 3      2
 //2       // 3      3

 // issue table ekata issueNo manage karanna
 // counter table eken queueNo eka ain karanna.
 // counter table ekata counterNo (001,002).

 // issue table ekata query ekak ghanna counter_id eken group karala max issueNo eka ganna.

 // counter_id 1 | 3
  // counter_id 2 | 6
   // counter_id 3 | 2

// me ena resulkt eken aduma issueNo eka thyena counter ekata assign karanawa.

// mewidiye object ekek return kara ganna
//{counter_id 3 | 2}

//new issue no = 2+1


          const {Countersum}  = await AppDataSource.getRepository(Countern)
          .createQueryBuilder("countern")
          .select("counter_id","Countersum")
          .orderBy("id","DESC")
          .limit(1)

          // .where("issue.id = :id", { id: 1 })
          .getRawOne();

          console.log("****Count_Id",Countersum);


           const Countersumm = parseInt(Countersum);

          // const adddone = 1;
      
        
      
          // const counter_nub = Countersumm + adddone;
          // const counter_nubb =counter_nub.toString();
          // console.log("****Count**ID",counter_nubb);
          // const counter_nubbb = parseInt(counter_nubb);


          if (Counter1_ID_summ >= Counter2_ID_summ  && Counter3_ID_summ >= Counter2_ID_summ  )
{







           const rslt:any =await Counterservice.execute({ queueNo: "1",counter_Id:"2" });

       const rrrit =rslt.id;


    //   const xxx = await service.findOne({where: { id :parseInt(user_id) } }) ;
    

    const {sum}  = await AppDataSource.getRepository(Issue)
    .createQueryBuilder("issue")
    .select("IssueNo","sum")
    .orderBy("id","DESC")
    .limit(1)

    
  // .where("issue.id = :id", { id: 1 })
    .getRawOne();

    console.log("****Count",sum);

      const summ = parseInt(sum);

    const addone = 1;

  

    const issue_nub = summ + addone;
    const issue_nubb =issue_nub.toString();
    console.log("****CountNOxxx",issue_nubb);


        

        //  let i: number = 1;

        //  for (i=1, i<4; i++;) {

            

            // const rslt:any =await Counterservice.execute({ queueNo: "1",counter_Id:i.toString() });


            // const rrrit =rslt.id;

            const resullt = await service.execute({issuename,telephone,email,detail,user_id:UUID,IssueNo:issue_nubb,count_Id:rrrit});

            if(resullt instanceof Error) return res.status(400).json(resullt.message)

            return res.json(resullt);
          //  console.log((count_Id))
         
}





else if (Counter1_ID_summ < Counter2_ID_summ && Counter3_ID_summ > Counter1_ID_summ )
{


           const rslt:any =await Counterservice.execute({ queueNo: "1",counter_Id:"1" });

       const rrrit =rslt.id;


    //   const xxx = await service.findOne({where: { id :parseInt(user_id) } }) ;
    

    const {sum}  = await AppDataSource.getRepository(Issue)
    .createQueryBuilder("issue")
    .select("IssueNo","sum")
    .orderBy("id","DESC")
    .limit(1)
    
  // .where("issue.id = :id", { id: 1 })
    .getRawOne();

    console.log("****Count",sum);

      const summ = parseInt(sum);

    const addone = 1;

  

    const issue_nub = summ + addone;
    const issue_nubb =issue_nub.toString();
    console.log("****CountNOxxx",issue_nubb);


        

        //  let i: number = 1;

        //  for (i=1, i<4; i++;) {

            

            // const rslt:any =await Counterservice.execute({ queueNo: "1",counter_Id:i.toString() });


            // const rrrit =rslt.id;

            const resullt = await service.execute({issuename,telephone,email,detail,user_id:UUID,IssueNo:issue_nubb,count_Id:rrrit});

            if(resullt instanceof Error) return res.status(400).json(resullt.message)

            return res.json(resullt);
          //  console.log((count_Id))
         
}




else (Counter3_ID_summ < Counter2_ID_summ && Counter1_ID_summ >= Counter3_ID_summ)
{







           const rslt:any =await Counterservice.execute({ queueNo: "1",counter_Id:"3" });

       const rrrit =rslt.id;


    //   const xxx = await service.findOne({where: { id :parseInt(user_id) } }) ;
    

    const {sum}  = await AppDataSource.getRepository(Issue)
    .createQueryBuilder("issue")
    .select("IssueNo","sum")
    .orderBy("id","DESC")
    .limit(1)
    
  // .where("issue.id = :id", { id: 1 })
    .getRawOne();

    console.log("****Count",sum);

      const summ = parseInt(sum);

    const addone = 1;

  

    const issue_nub = summ + addone;
    const issue_nubb =issue_nub.toString();
    console.log("****CountNOxxx",issue_nubb);


        

        //  let i: number = 1;

        //  for (i=1, i<4; i++;) {

            

            // const rslt:any =await Counterservice.execute({ queueNo: "1",counter_Id:i.toString() });


            // const rrrit =rslt.id;

            const resullt = await service.execute({issuename,telephone,email,detail,user_id:UUID,IssueNo:issue_nubb,count_Id:rrrit});

            if(resullt instanceof Error) return res.status(400).json(resullt.message)

            return res.json(resullt);
          //  console.log((count_Id))
         
}



    }
}




export class GetAllIssueController {
 // constructor(public readonly issuename:string, public readonly details:string){}
    async handle (req:Request,res:Response){

     // constructor(public readonly issuename:string, public readonly details:string){}

        const service =new GetAllIssuesService();

        const issues  = await service.execute();
        return res.json(issues);
    }
}


// getting the issues as counter

export class GetAllIssueCounter1Controller {
  async handle (req:Request,res:Response){
      const service =new GetAllIssuesCounter1Service();

    //  const count_people = new Counter1people();

     // const count1_people = await count_people.execute();
    //  res.json(count1_people);
      const issues = await service.execute();
      return res.json(issues);
     
  }
}

//GetNextIssueCounter1Service

//Get next issue in counter wise


export class GetNextIssueCounter1Controller {
  async handle (req:Request,res:Response){
      const service =new GetNextIssueCounter1Service();

    //  const count_people = new Counter1people();

     // const count1_people = await count_people.execute();
    //  res.json(count1_people);
      const issues = await service.execute();
      return res.json(issues);
     
  }
}

export class GetNextIssueCounter2Controller {
  async handle (req:Request,res:Response){
      const service =new GetNextIssueCounter2Service();

    //  const count_people = new Counter1people();

     // const count1_people = await count_people.execute();
    //  res.json(count1_people);
      const issues = await service.execute();
      return res.json(issues);
     
  }
}

export class GetNextIssueCounter3Controller {
  async handle (req:Request,res:Response){
      const service =new GetNextIssueCounter3Service();

    //  const count_people = new Counter1people();

     // const count1_people = await count_people.execute();
    //  res.json(count1_people);
      const issues = await service.execute();
      return res.json(issues);
     
  }
}




export class GetAllCounter1peopleController {
  async handle (req:Request,res:Response){
    //  const service =new GetAllIssuesCounter1Service();

      const count_people = new Counter1people();

      const count1_people = await count_people.execute();
      return res.json(count1_people);
     
  }
}


export class GetAllCounter2peopleController {
  async handle (req:Request,res:Response){
    //  const service =new GetAllIssuesCounter1Service();

      const count_people = new Counter2people();

      const count2_people = await count_people.execute();
      return res.json(count2_people);
     
  }
}

export class GetAllCounter3peopleController {
  async handle (req:Request,res:Response){
    //  const service =new GetAllIssuesCounter1Service();

      const count_people = new Counter3people();

      const count3_people = await count_people.execute();
      return res.json(count3_people);
     
  }
}




export class GetAllIssueCounter2Controller {
  async handle (req:Request,res:Response){
      const service =new GetAllIssuesCounter2Service();

      const issues = await service.execute();
      return res.json(issues);
     
  }
}

export class GetAllIssueCounter3Controller {
  async handle (req:Request,res:Response){
      const service =new GetAllIssuesCounter3Service();

      const issues = await service.execute();
      return res.json(issues);
     
  }
}



// GetAllIssuesCounter1Service

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




export class GetOneCounterController {
  async handle(req:Request,res:Response){
      const {iid} =req.params;

      const service =new GetCouterforPersonService();

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
       // return res.status(204).end();
        return res.json("Issue Deleted");
    }
}

export class UpdateIssueController{
    async handle(req:Request,res:Response){
        const {id}=req.params;
        const {issuename,telephone,email,detail,user_id,IssueNo,count_Id}=req.body;

       // const uuudi=parseInt(id) ;

        const service = new UpdateIssueService();
        const result =await service.execute({id,issuename,telephone,email,detail,user_id,IssueNo,count_Id});

        if (result instanceof Error) return res.status(400).json(result.message);

          return res.json(result);
  

    }
}



export class UpdateCounterController{
  async handle(req:Request,res:Response){
      const {id}=req.params;
      const {queueNo,count_id}=req.body;

     // const uuudi=parseInt(id) ;

      const service = new Counterupdate();
      const result =await service.execute({id,queueNo,count_id});

      if (result instanceof Error) return res.status(400).json(result.message);

        return res.json(result);


  }
}





export class NotificationY {
  async handle(req:Request,res:Response){
     

       res.send('Hello!! Mister You are the next get ready');
  }
}





