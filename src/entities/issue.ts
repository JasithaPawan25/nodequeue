import { Entity,PrimaryGeneratedColumn,Column,BaseEntity,ManyToOne,JoinColumn } from "typeorm";
import { Countern } from "./counterx";
import { Queue } from "./queue";
// import { Queue } from "./queue";

import {User} from './user';

@Entity()
export class Issue extends BaseEntity {
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
    IssueNo!:string;

    @Column()
    count_Id!:string;

    // @Column()
    // queue_id!:string;

    // @ManyToOne((=>UserEntity,(user:UserEntity)=>user.issues))
    // user:UserEntity

    @ManyToOne(() => User)
     @JoinColumn({ name: "user_id" })
     user!: string;

    //  @ManyToOne(() => Queue)
    //  @JoinColumn({ name: "queueId" })
    //   queue!: string;

      @ManyToOne(() => Countern)
      @JoinColumn({ name: "count_Id" })
       counterx!: string;

      //  @ManyToOne(() => Countern, countern => countern.issues)
      //  countern!: Countern;

      // @ManyToOne(() => Queue, (queue) => queue.issues)
      // queue!: Queue;

}