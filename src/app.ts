import exp from 'constants';
import  express  from  'express';
import { createConnection } from "typeorm";
import { Counter } from './entities/counter';
import { Count_Person } from './entities/Cuser';
import { Issue } from './entities/issue';
import { Queue } from './entities/queue';
import { Queuee } from './entities/queuee';
//import { Queue } from './entities/queue';
import { User } from "./entities/user";
import {routes} from "./routes/routes"

const app = express();

app.use(express.json());

app.use(routes)

//const add = (a:number,b:number):number => a+b;

createConnection ({
    type:"mysql",
    database:"nodequeue",
    username:"root",
    password:"",
    logging:true,
    synchronize:true,
    entities:[User,Issue,Queue,Queuee,Count_Person,Counter],

});




app.get('/',(req,res)=>{
  //  console.log(add(5,5))
    res.send('Hello');
});

app.listen(5000,()=> console.log('Server Running'));