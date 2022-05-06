import { Entity,PrimaryGeneratedColumn,Column,BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { Count_Person } from "./Cuser";
import { User } from "./user";

@Entity()
export class Counter extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    counterNo!:string;

    // @Column()
    // cpassword!:string;

    @Column()
    userr_id!:string;

    @ManyToOne(() => Count_Person)
    @JoinColumn({ name: "userr_id" })
     Cuser!: string;

}