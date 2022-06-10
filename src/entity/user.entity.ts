import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryColumn()
    email?: string

    @Column()
    password?: string
}