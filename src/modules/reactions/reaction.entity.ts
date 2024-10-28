import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/users.entity";
import { Tuit } from "../tuits/tuit.entity";
import {Comment} from '../comments/comment.entity';
import { IsEnum } from "class-validator";


export enum ReactionType{
    LIKE = 'me gusta',
    FUNNY = 'me divierte',
    ANGRY = 'me enfada',
    SAD = 'me entristece',
}
@Entity()
export class Reaction{
    
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> User,(user)=> user.reactions,{nullable:false})
    user: User;

    @ManyToOne(()=> Tuit,(tuit)=>tuit.reactions,{nullable:true})
    tuit: Tuit;

    @ManyToOne(()=> Comment,(comment)=>comment.reactions,{nullable:true})
    comment:Comment;

    @IsEnum(ReactionType)
    @Column({type:'enum',enum:ReactionType})
    type: ReactionType;

    @CreateDateColumn()
    createdAt: Date;


}