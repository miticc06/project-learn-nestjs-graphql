import { Entity, ObjectIdColumn, Column } from 'typeorm';
@Entity()
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column()
    username: string;

    @Column()
    password: string;
}

export class AuthData {
    userId: string;
    token: string;
}