import { Router } from "express";

import { CreateUserController } from "../controllers.ts/userController";
import { CreateIssueController, DeleteIssueController, GetAllIssueController, GetOneIssueController, UpdateIssueController } from "../controllers.ts/issueController";
import { GetAllqueueService } from "../services/CuserService";
import { CreateCUserController, CreateQueueNoController, GetAllCuserController } from "../controllers.ts/cuserController";
import loginController, { LoginController, LoginCounterController } from "../controllers.ts/loginController";
import authMiddleware from "../auth/auth";
import CounterauthMiddleware from "../auth/counter_auth";

const routes =Router();

//Client auth =authMiddleware
//Counter_Person =CounterauthMiddleware

// Client issue

//adduser

routes
    .route("/adduser")
    .post(new CreateUserController().handle);
//  .route("/platforms")
//  .get(new GetAllPlatformsController().handle)
 // .post(new CreatePlatformsController().handle);


//add issue

 routes
    .route("/addissue")
    .post(authMiddleware,new CreateIssueController().handle);

// see the notifications

// see the queue number




//Counter_person

//see all the issues

routes
    .route("/all")
    .get(authMiddleware,new GetAllIssueController().handle);


// can see the issues in particular issue    

routes
    .route("/one/:iid")
    .get(new GetOneIssueController().handle);

// can update the issue

routes
    .route("/update/:id")
    .put(new UpdateIssueController().handle);

//can delete the issue    
    
routes
    .route("/delete/:id")
    .delete(new DeleteIssueController().handle);    


//can see al the counter persons

routes
    .route("/alll")
    .get(CounterauthMiddleware,new GetAllCuserController().handle); 
    

    

    routes
    .route("/addcuser")
    .post(new CreateCUserController().handle);
    

    routes
    .route("/addqueue")
    .post(new CreateQueueNoController().handle);


    routes
    .route("/login")
    .post(new LoginController().handle);

    routes
    .route("/logincounter")
    .post(new LoginCounterController().handle);

    // routes
    // .route("/loginn")
    // .post(AuthController);

routes.post('/auth', loginController.authenticate);
    


 export {routes};