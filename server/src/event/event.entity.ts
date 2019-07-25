import { Entity, ObjectIdColumn, Column } from "typeorm";
// import { User } from "../user/user.entity";

@Entity()
export class Event {
    @ObjectIdColumn()
    _id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    date: string;

    @Column()
    creator: string;
}