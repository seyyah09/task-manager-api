import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    dueDate: Date;

    @Column()
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    notes: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    userId: number;
}