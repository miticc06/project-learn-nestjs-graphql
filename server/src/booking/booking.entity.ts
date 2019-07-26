import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Booking {
    @ObjectIdColumn()
    _id: string;

    @Column()
    eventId: string;

    @Column()
    userId: string;

    @Column()
    createdAt: string;

}