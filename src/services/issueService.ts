import { Connection, DataSource, getRepository, MinKey, Repository } from "typeorm";
import { Countern } from "../entities/counterx";
import { Issue } from "../entities/issue";
import { Queue } from "../entities/queue";
import { AppDataSource } from "../app"

//import { Queue } from "../entities/queue";
import { User } from "../entities/user";
import { PostDto } from "../dto/IssueObject";

type IssueRequest ={
    issuename :string;
    telephone:string;
    email:string;
    detail:string;
    user_id:string;
  //  queueId:string;
    count_Id :string;
    IssueNo:string;
   // countern:number;
}

export class CreateIssueService{
    async execute({issuename,telephone,email,detail,user_id,IssueNo,count_Id}:IssueRequest):Promise<Issue|Error>{
        
      //  const userRepo = DataSource.getRepository(Issue) 
        
        const repo = AppDataSource.getRepository(Issue);
        const repoUser =AppDataSource.getRepository(User);
    //    const repoQueue =getRepository(Queue);
      //  const ccountern = getRepository(Countern)

       // parseInt(user_id)  ;
        //{ where: { UUid } }

     //   if(!(await repoQueue.findOne({where: { id :parseInt(queueId) } }))  ) return new Error ("User Do not Exists!");


    //   if(!(await repoUser.findOne({where: { id :parseInt(user_id) } }) && await repoQueue.findOne({where: { id :parseInt(IssueNo) } }) )  ) return new Error ("User Do not Exists!");

       if(!(await repoUser.findOne({where: { id :parseInt(user_id) } })))   return new Error ("User Do not Exists!");



        const issue =repo.create({issuename,telephone,email,detail,user_id,IssueNo,count_Id});
      


        await repo.save(issue);

        return issue;

    }


}

/////
type CreateCounterIssueRequest ={
                queueNo : string
                counter_Id :string
                        }

export class CreateCounterIssueService{
    async execute({queueNo,counter_Id}:CreateCounterIssueRequest):Promise<Countern|Error>{
      //  const repo = getRepository(Issue);

   //   const userRepository =  Repository(User)


    //    const repoUser =getRepository(User);
    //    const repoQueue =getRepository(Queue);

        const countern =AppDataSource.getRepository(Countern)

       // parseInt(user_id)  ;
        //{ where: { UUid } }

     //   if(!(await repoQueue.findOne({where: { id :parseInt(queueId) } }))  ) return new Error ("User Do not Exists!");


    //    if(!(await countern.findOne({
    //     select: Min(counter_Id)
    //     }))
       


      // if(!(await countern.findOne({where: { id :parseInt(counter_Id) } })) ) return new Error ("User Do not Exists!");


        const counter =countern.create({queueNo,counter_Id});
      


        await countern.save(counter);

        return counter;

    }


}









////






export class DeleteIssueService {
    async execute(id:string){
        const repo =AppDataSource.getRepository(Issue);
        const repop =AppDataSource.getRepository(Countern);

        // (await repo.findOne({where: { id :parseInt(id) } }))

        const deleteId =await repo.findOne({where: { id :parseInt(id) } })

        if(!(deleteId)) return new Error("Issue does not exists!");

        const counternID = await repop.findOne({where: { id :parseInt(deleteId!.count_Id) } })

      //  repop.delete(deleteId!.count_Id)
        await repo.delete(id)
        return  repop.delete(deleteId!.count_Id) 
    }
}

type CounterupdateRequest = {
    id:string;
    queueNo:string;
    count_id:string;
}

export class Counterupdate{
    async execute({id,queueNo,count_id}:CounterupdateRequest){
       const repo =AppDataSource.getRepository(Countern);

        const countern = await repo.findOne({where:{id:parseInt(id)}});

        if(!countern) return new Error("Issue does not Exists!");


      //  if(!(await countern.findOne({where:{id: parseInt(id)}}))) return new Error ("Counter does not exists!");
    //   countern.queueNo=queueNo?queueNo:counter.queueNo;
    //   counter.count_id=count_id?count_id:counter.count_id;
    countern.queueNo=queueNo?queueNo:countern?.queueNo
    countern.counter_Id=count_id?count_id:countern?.counter_Id

         await repo.save(countern)

       return countern;

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
    IssueNo:string;
    count_Id:string
}


export class UpdateIssueService {
    async execute ({id,issuename,telephone,email,detail,user_id,IssueNo,count_Id}:IssueUpdateRequest){
        const repo =AppDataSource.getRepository(Issue);
        const repoUserr = AppDataSource.getRepository(User) ;

        const issue = await repo.findOne({where:{id:parseInt(id)}});

        if(!issue) return new Error("Issue does not Exists!");

        if(!(await repoUserr.findOne({where:{id: parseInt(user_id)}}))) return new Error ("Users does not exists!");

        issue.issuename=issuename?issuename:issue.issuename;
        issue.telephone=telephone?telephone:issue.telephone;
        issue.email=email?email:issue.email;
        issue.detail=detail?detail:issue.detail;
        issue.user_id=user_id?user_id:issue.user_id;

        issue.IssueNo=IssueNo?IssueNo:issue.IssueNo;
        issue.count_Id=count_Id?count_Id:issue.count_Id;

        await repo.save(issue);

        return issue;

        //if(!(await repoUserr))
    }
}

interface post {
    issuename:string;
    //details:string;
    id:string;
    //  iid:number;
     // issuename :string;
      telephone:string;
      email:string;
      detail:string;
      user_id:string;
      IssueNo:string;
      count_Id:string
}

type issuesPreview =Omit<post,"id">;


export class GetAllIssuesService {
  
async execute (){

   // type issuesPreview =PostDto<post,"id" | "issuename">;

        const repo =AppDataSource.getRepository(Issue);
 
    //      const issues  = await repo.find({
    //         relations:["user"],order:({id:"DESC"})
 
    //    })

       
       const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 1 })
      .andWhere("countern.queueNo =:Nid",{Nid:2})
      
      .orderBy({
        "countern.id": "DESC"
    })
        .getMany()
       
       
    //    let responseData : Array<PostDto> = new Array();

    //    for (const issue of issues) {
    //     responseData.push(new PostDto(issue));
    //    }

    //     return responseData ;

        return repoz;
    }
}


export class GetAllIssuesCounter1Service {
    async execute (){

        const repo = AppDataSource.getRepository(Issue);
   

        const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 1 })
      .andWhere("countern.queueNo =:Nid",{Nid:1})
      
      .orderBy({
        "countern.id": "ASC"
    })
        .getMany()
       
        console.log("noljlijlj",repoz);


        // let responseData : Array<PostDto> = new Array();

        // for (const issue of repoz) {
        //  responseData.push(new PostDto(issue));
        // }
 
        //  return responseData;
    

        return repoz;



    }
}

export class GetAllIssuesCounter2Service {
    async execute (){

        const repo = AppDataSource.getRepository(Issue);
   

        const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 2 })
      .andWhere("countern.queueNo =:Nid",{Nid:1})
      .orderBy({
        "countern.id": "ASC"
    })
        .getMany()
        console.log("counter_Id",repoz);
        console.log("sub",);
     //   console.log("sub",subQuery);

        // let responseData : Array<PostDto> = new Array();

        // for (const issue of repoz) {
        //  responseData.push(new PostDto(issue));
        // }
 
       //  return responseData;

         return repoz;



    }
}

export class GetAllIssuesCounter3Service {
    async execute (){

        const repo = AppDataSource.getRepository(Issue);
   

        const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 3 })
      .andWhere("countern.queueNo =:Nid",{Nid:1})
      .orderBy({
        "countern.id": "ASC"
    })
        .getMany()
        console.log("counter_Id",repoz);

        // let responseData : Array<PostDto> = new Array();

        // for (const issue of repoz) {
        //  responseData.push(new PostDto(issue));
        // }
 
        //  return responseData;

        return repoz;


    }
}


export class GetNextIssueCounter1Service{

    async execute (){

        const repo = AppDataSource.getRepository(Issue);
   

        const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 1 })
      .andWhere("countern.queueNo =:Nid",{Nid:1})
      .orderBy({
        "countern.id": "ASC"
    })
    .getOne()
        //.getMany()
        console.log("counter_Id",repoz);

        // let responseData : Array<PostDto> = new Array();

        // for (const issue of repoz) {
        //  responseData.push(new PostDto(issue));
        // }
 
        //  return responseData;

        return repoz;

}

}



export class GetNextIssueCounter2Service{

    async execute (){

        const repo = AppDataSource.getRepository(Issue);
   

        const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 2 })
      .andWhere("countern.queueNo =:Nid",{Nid:1})
      .orderBy({
        "countern.id": "ASC"
    })
    .getOne()
        //.getMany()
        console.log("counter_Id",repoz);

        // let responseData : Array<PostDto> = new Array();

        // for (const issue of repoz) {
        //  responseData.push(new PostDto(issue));
        // }
 
        //  return responseData;

        return repoz;

}

}

export class GetNextIssueCounter3Service{

    async execute (){

        const repo = AppDataSource.getRepository(Issue);
   

        const repoz = await repo.createQueryBuilder('issue')
       // .where("count_Id=3")
        .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
      //  .getOne();
      .where("countern.counter_Id = :id", { id: 3 })
      .andWhere("countern.queueNo =:Nid",{Nid:1})
      .orderBy({
        "countern.id": "ASC"
    })
    .getOne()
        //.getMany()
        console.log("counter_Id",repoz);

        // let responseData : Array<PostDto> = new Array();

        // for (const issue of repoz) {
        //  responseData.push(new PostDto(issue));
        // }
 
        //  return responseData;

        return repoz;

}

}



export class Counter1people {
    async execute (){


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

        return Counter1_ID_summ ; 


    }

}

export class Counter2people {
    async execute (){

            const { Counter2_ID_sum } = await AppDataSource.getRepository(Countern)
        .createQueryBuilder("countern")
        .select("Count(countern.counter_id)", "Counter2_ID_sum")
        .where("countern.counter_id = :id", { id: 2 })
        .andWhere("countern.queueNo =:Nid",{Nid:1})
        .getRawOne();
    
        console.log("Counter2_ID_sum :",Counter2_ID_sum);
    
    
    
        const Counter2_ID_summ = parseInt(Counter2_ID_sum);
       
        return Counter2_ID_summ ; 


    }

}

export class Counter3people {
    async execute (){

        const { Counter3_ID_sum } = await AppDataSource.getRepository(Countern)
        .createQueryBuilder("countern")
        .select("Count(countern.counter_id)", "Counter3_ID_sum")
        .where("countern.counter_id = :id", { id: 3 })
        .andWhere("countern.queueNo =:Nid",{Nid:1})
        .getRawOne();
    
        console.log("Counter3_ID_sum :",Counter3_ID_sum);
    
        const Counter3_ID_summ = parseInt(Counter3_ID_sum);

        return Counter3_ID_summ ; 

        
    }

}




type IssueGetRequest = {
   // id:string;
    iid:string;
}

export class GetOneIssueService {
    async execute({iid}:IssueGetRequest){
        const repo =AppDataSource.getRepository(Issue);

        const oneIssue =await repo.findOne({ where: { id :parseInt(iid) } } );
        //,relations:["user"]

        if(!oneIssue) return new  Error("Issue does not exists!!");

        
        // let responseData : Array<PostDto> = new Array();

       
        //  responseData.push(new PostDto(oneIssue));
       
 
        //  return responseData;

          return oneIssue;



    }
}



type CounterNoGetRequest = {
    // id:string;
     iid:string;
 }


export class GetCouterforPersonService {
    async execute({iid}:CounterNoGetRequest){
        const repo =AppDataSource.getRepository(Issue);

        const iidd = parseInt(iid);

        // if(iidd=1)
        // {
        //     const { Counter1_ID_sum } = await getRepository(Countern)
        //     .createQueryBuilder("countern")
        //     .select("Count(countern.counter_id)", "Counter2_ID_sum")
        //     .where("countern.counter_id = :id", { id: 1 })
        //     .getRawOne();
        
        //     console.log("Counter2_ID_sum :",Counter1_ID_sum);
        
        
        
        //     const Counter1_ID_summ = parseInt(Counter1_ID_sum);

        // //    if(!Counter1_ID_summ) return new  Error("Issue does not exists!!");
           
        //     return Counter1_ID_summ ; 
        // }



        if(iidd==1)
        {

        const repoz = await repo.createQueryBuilder('issue')
        
        // .where("count_Id=3")
        .orderBy("issue.id","DESC")
         .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
        //  .leftJoinAndSelect()
       //  .getOne();
       .where("countern.counter_Id = :id", { id: 1 })
      // .orderBy({"issue.id":"DESC"})
      
       
        .getMany()
         console.log("counter_Id",repoz);
            
        //  if(!(iidd!=1)) return new  Error("Issue does not exists!!");
         return repoz;

        }
        else if(iidd==2)
        {

        const repoz = await repo.createQueryBuilder('issue')
        // .where("count_Id=3")
        .orderBy("issue.id","DESC")
         .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
         
       //  .getOne();
       .where("countern.counter_Id = :id", { id: 2 })
         .getMany()
         console.log("counter_Id",repoz);


            
        //  if(!(iidd!=1)) return new  Error("Issue does not exists!!");
         return repoz;

        }
        else if(iidd==3)
        {

        const repoz = await repo.createQueryBuilder('issue')
        // .where("count_Id=3")
        .orderBy("issue.id","DESC")
         .leftJoinAndSelect(Countern, 'countern', 'issue.count_Id = countern.id')
       //  .getOne();
       .where("countern.counter_Id = :id", { id: 3 })
       //.orderBy("issue.id","ASC")
         .getMany()
         console.log("counter_Id",repoz);
            
        //  if(!(iidd!=1)) return new  Error("Issue does not exists!!");
         return repoz;

        }


        else
        {
            return new  Error("Counter does not exists!!");
        }

        // const issue =await repo.findOne({ where: { id:parseInt(iid) },relations:["user"] });

        // if(!issue) return new  Error("Issue does not exists!!");

        // return issue;

    }
}




