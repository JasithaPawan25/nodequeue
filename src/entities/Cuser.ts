import { Entity,PrimaryGeneratedColumn,Column,BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from 'bcrypt'


@Entity()
export class Count_Person extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    cname!:string;

    @Column()
    cpassword!:string;

    // @Column()
    // counterNo!:string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.cpassword = bcrypt.hashSync(this.cpassword, 8);
    }

}