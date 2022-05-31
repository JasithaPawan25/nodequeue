import exp from 'constants';
import   express  from  'express';
import { Any, createConnection, DataSource } from "typeorm";
import { Counter } from './entities/counter';
import { Countern } from './entities/counterx';
import { Count_Person } from './entities/Cuser';
import { Issue } from './entities/issue';
import { Queue } from './entities/queue';
//import { Queue } from './entities/queue';
import { User } from "./entities/user";
import {routes} from "./routes/routes";
import cors from 'cors'
import  {Server}  from 'socket.io';
import path from 'path';
import * as http  from "http";
import { isObject } from 'util';



const app = express();
app.set("port", process.env.PORT || 5000);

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
     //   origin:"http://localhost:3000/cissuecounter",
        methods:["GET","POST"]
    }
});

//const corss = require('cors')

app.use(cors())

app.use(express.json());

app.use(routes)

//const add = (a:number,b:number):number => a+b;

export const AppDataSource = new DataSource ({
    type:"mysql",
    database:"nodequeue",
    username:"root",
    password:"19970825",
    logging:true,
    synchronize:true,
    entities:[User,Issue,Queue,Countern,Count_Person,Counter],

});

//const http = createServer();

//var http = require("http").Server(app);



// const server = http.createServer(app);
// const io = new socketio.Server(server);

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))




app.get('/',(req:any,res:any)=>{
  //  console.log(add(5,5))
 res.sendFile(path.resolve("./src/client/index.html"));

 //res.send({ uptime: process.uptime() });

   // res.send('Hello');
});

// io.on("connection",(...params)=>{console.log(params,"A User connected")

// })

// io.on("connection", (socket) => {
//     console.log("A User Connected");

//     socket.on("message",(message)=>{
//         console.log(message);

//         socket.emit("message", message);

//     })
//   });

  io.on('connection', function(socket) {

    console.log(`"A User Connected": ${socket.id}`);
    
    // socket.on('fromClient',function(data){
   
    //     console.log( 'ON: fromClient');
        
    //     socket.emit('fromServer', { message: 'Received message! Returning message!!' });
    //     console.log( 'EMIT: fromServers');
    
    // });
    socket.on("send_message",(data)=>{
        //console.log(data)
        socket.broadcast.emit("receive_message",data)

    })

    socket.on("send_queueNo",(data)=>{
        //console.log(data)
        socket.broadcast.emit("receive_queueNo",data)

    })
    
});


// io.on("connection",function(socket:any){
//     console.log("A User connected");

//     socket.on("message", function(message: any) {
//         console.log(message);


//         socket.emit("message", message);
//       });

// });

server.listen(5000,()=> console.log('Server Running'));