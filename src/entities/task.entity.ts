import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    dueDate: string;

    @Column()
    status: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    completedAt: Date;

    @Column()
    notes: string;

    @ManyToOne((type) => User, (user) => user.id)
    user: User;
}