import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Booking {
    @ObjectIdColumn()
    _id: string;

    @Column()
    event: string;

    @Column()
    user: string;

    @Column()
    createdAt: string;

}