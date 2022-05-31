import { generateKey } from "crypto";
import { Entity,PrimaryGeneratedColumn,Column,BaseEntity, ManyToOne, JoinColumn, OneToMany, Generated, OneToOne } from "typeorm";
import { Counter } from "./counter";
import { Issue } from "./issue";
import { User } from "./user";

@Entity()
export class Countern extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    queueNo!:string;
    

    @Column()
    counter_Id!:string;

//     @OneToMany(() => Issue , (issue) => issue.counterx)
//    //   @JoinColumn({ name: "count_Id" })
//        issues!: Issue[];


    //    @OneToMany(() => Issue, issue => issue.countern)
    //    issues!: Issue[];

    // @ManyToOne(() => Issue)
    // @JoinColumn({ name: "queue_id" })
    //  queue!: string;

    // @OneToOne(() => Counter)
    // @JoinColumn({ name: "counter_Id" })
    //  counter!: string;

    //  @OneToMany(() => Issue, (issue) => issue.queue)
    //  issues!: Issue;


    // @OneToOne(() => Counter)
    // @JoinColumn({})
    // counter!:Counter;



    // @OneToOne(() => Counter)
    // @JoinColumn({ name: "couter_Id" })
    // counter!:string;
   //  counter!: Counter;


}
