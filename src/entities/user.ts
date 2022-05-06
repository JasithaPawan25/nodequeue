import { Entity,PrimaryGeneratedColumn,Column,BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from 'bcrypt'

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    uname!:string;

    @Column()
    upassword!:string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.upassword = bcrypt.hashSync(this.upassword, 8);
    }

}