import { generateKey } from "crypto";
import { Entity,PrimaryGeneratedColumn,Column,BaseEntity, ManyToOne, JoinColumn, OneToMany, Generated, OneToOne } from "typeorm";
import { Counter } from "./counter";
import { Issue } from "./issue";

@Entity()
export class Queue {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    queueNo!:string;
    

//     @Column()
//    zzzId!:string;

    // @ManyToOne(() => Issue)
    // @JoinColumn({ name: "queue_id" })
    //  queue!: string;

    // @OneToOne(() => Counter)
    // @JoinColumn({ name: "zzzId" })
    //  counter!: string;

    //  @OneToMany(() => Issue, (issue) => issue.queue)
    //  issues!: Issue;


    @Column()
    counter_Id!:string;

    // @ManyToOne(() => Issue)
    // @JoinColumn({ name: "queue_id" })
    //  queue!: string;

    @ManyToOne(() => Counter)
    @JoinColumn({ name: "counter_Id" })
     counter!:string;



    // @OneToOne(() => Counter)
    // @JoinColumn({})
    // counter!:Counter;



    // @OneToOne(() => Counter)
    // @JoinColumn({ name: "couter_Id" })
    // counter!:string;
   //  counter!: Counter;


}

