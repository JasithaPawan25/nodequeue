import { Entity,PrimaryGeneratedColumn,Column,BaseEntity,ManyToOne,JoinColumn } from "typeorm";
import { Queue } from "./queue";
// import { Queue } from "./queue";

import {User} from './user';

@Entity()
export class Issue {
    @PrimaryGeneratedColumn("increment")
    id!:number;

    @Column() 
    issuename!:string;

    @Column()
    telephone!:string;

    @Column()
    email!:string;

    @Column()
    detail!:string;

    @Column()
    user_id!:string;

    @Column()
    queueId!:string;

    // @Column()
    // queue_id!:string;

    // @ManyToOne((=>UserEntity,(user:UserEntity)=>user.issues))
    // user:UserEntity

    @ManyToOne(() => User)
     @JoinColumn({ name: "user_id" })
     user!: string;

     @ManyToOne(() => Queue)
     @JoinColumn({ name: "queueId" })
      queue!: string;
      // @ManyToOne(() => Queue, (queue) => queue.issues)
      // queue!: Queue;

}