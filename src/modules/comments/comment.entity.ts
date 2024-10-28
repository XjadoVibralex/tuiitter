import { Column, CreateDateColumn, Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import {User} from "../users/users.entity";
import { Tuit } from "../tuits/tuit.entity";
import { Reaction } from "../reactions/reaction.entity";

@Entity()
export class Comment{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
    

    @ManyToOne((type)=>Tuit,(tuit) => tuit.comments)
    @JoinColumn({name:'tuit_id'})
    tuit: Tuit;

    @OneToMany(()=> Reaction, (reaction) => reaction.comment)
    reactions: Reaction[];

    @CreateDateColumn()
    createdAt: Date;



}